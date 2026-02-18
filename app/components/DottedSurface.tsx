"use client";
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

type DottedSurfaceProps = Omit<React.ComponentProps<'div'>, 'ref'>;

export function DottedSurface({ className, ...props }: DottedSurfaceProps) {
    const { theme } = useTheme();
    const containerRef = useRef<HTMLDivElement>(null);
    const countRef = useRef(0);

    useEffect(() => {
        if (!containerRef.current) return;

        const SEPARATION = 150;
        const AMOUNTX = 40;
        const AMOUNTY = 60;

        const scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0xffffff, 2000, 10000);

        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;

        const camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
        camera.position.set(0, 355, 1220);

        let renderer: THREE.WebGLRenderer;
        try {
            renderer = new THREE.WebGLRenderer({
                alpha: true,
                antialias: true,
                powerPreference: 'high-performance', // hint for discrete GPU
            });
        } catch (err) {
            console.error('WebGL not supported. Falling back to CanvasRenderer.');
            return; // or implement a canvas fallback here
        }

        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);
        renderer.setClearColor(scene.fog.color, 0);

        containerRef.current.appendChild(renderer.domElement);

        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const context = canvas.getContext('2d')!;
        context.beginPath();
        context.arc(32, 32, 32, 0, Math.PI * 2);
        context.closePath();
        context.fillStyle = '#ffffff';
        context.fill();
        const circleTexture = new THREE.CanvasTexture(canvas);

        const positions = new Float32Array(AMOUNTX * AMOUNTY * 3);
        const colors = new Float32Array(AMOUNTX * AMOUNTY * 3);

        let i = 0;
        for (let ix = 0; ix < AMOUNTX; ix++) {
            for (let iy = 0; iy < AMOUNTY; iy++) {
                positions[i * 3] = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
                positions[i * 3 + 1] = 0;
                positions[i * 3 + 2] = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;

                colors[i * 3] = 1;
                colors[i * 3 + 1] = 1;
                colors[i * 3 + 2] = 1;
                i++;
            }
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 40,
            vertexColors: true,
            transparent: true,
            opacity: 0.9,
            sizeAttenuation: true,
            map: circleTexture,
            alphaTest: 0.5,
        });

        const points = new THREE.Points(geometry, material);
        scene.add(points);

        const posAttr = geometry.attributes.position as THREE.BufferAttribute;
        const cachedPositions = posAttr.array as Float32Array;

        const animate = () => {
            countRef.current += 0.05; // slower for smoother performance

            let idx = 0;
            for (let ix = 0; ix < AMOUNTX; ix++) {
                const sinX = Math.sin((ix + countRef.current) * 0.3) * 50;
                for (let iy = 0; iy < AMOUNTY; iy++) {
                    cachedPositions[idx + 1] = sinX + Math.sin((iy + countRef.current) * 0.5) * 50;
                    idx += 3;
                }
            }

            posAttr.needsUpdate = true;
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            if (!containerRef.current) return;
            const w = containerRef.current.clientWidth;
            const h = containerRef.current.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            geometry.dispose();
            material.dispose();
            renderer.dispose();
            if (containerRef.current) containerRef.current.removeChild(renderer.domElement);
        };
    }, [theme]);

    return <div ref={containerRef} className={cn('absolute inset-0 -z-10', className)} {...props} />;
}
