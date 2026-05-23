'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { calculateCategoryTotals } from '@/lib/calculations';
import { useTransactions } from '@/hooks/useTransactions';

const categoryColors: Record<string, string> = {
  Food: '#ef4444',
  Transport: '#f97316',
  Entertainment: '#eab308',
  Utilities: '#06b6d4',
  Healthcare: '#06b6d4',
  Shopping: '#ec4899',
  Other: '#6b7280',
};

function BarGeometry({ position, height, color, label }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const materialColor = hovered ? new THREE.Color(color).multiplyScalar(1.4) : new THREE.Color(color);

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <boxGeometry args={[0.6, height, 0.6]} />
        <meshPhongMaterial color={materialColor} emissive={hovered ? color : '#000000'} />
      </mesh>
    </group>
  );
}

export function Chart3D() {
  const { filteredTransactions } = useTransactions();

  const categories = useMemo(() => {
    const totals = calculateCategoryTotals(filteredTransactions);
    const maxAmount = Math.max(...totals.map(c => c.total), 1);

    return totals
      .sort((a, b) => b.total - a.total)
      .map((cat, index) => ({
        category: cat.category,
        total: cat.total,
        height: (cat.total / maxAmount) * 3,
        color: categoryColors[cat.category],
        position: [index - 2, 0, 0] as [number, number, number],
      }));
  }, [filteredTransactions]);

  if (categories.length === 0) {
    return (
      <div className="w-full h-96 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center">
        <p className="text-slate-600 text-lg">Add transactions to see the 3D visualization</p>
      </div>
    );
  }

  return (
    <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 1.5, 5]} />
        <OrbitControls autoRotate autoRotateSpeed={4} />
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, 10, 10]} intensity={0.4} />

        {categories.map((cat, idx) => (
          <BarGeometry
            key={cat.category}
            position={cat.position}
            height={cat.height}
            color={cat.color}
            label={cat.category}
          />
        ))}

        <gridHelper args={[10, 10]} position={[0, -0.5, 0]} />
      </Canvas>
    </div>
  );
}
