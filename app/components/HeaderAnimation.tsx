import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import Image from 'next/image';
import { motion } from 'framer-motion';

const HeaderAnimation = () => {
    const mountRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const frameRef = useRef<number | null>(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const codeBlocksRef = useRef<Array<{
        mesh: THREE.Mesh;
        originalPosition: THREE.Vector3;
        rotationSpeed: { x: number; y: number; z: number };
    }>>([]);
    const geometryObjectsRef = useRef<Array<{
        mesh: THREE.Mesh;
        originalPosition: THREE.Vector3;
        rotationSpeed: { x: number; y: number; z: number };
        floatSpeed: number;
        floatAmplitude: number;
    }>>([]);
    const particlesRef = useRef<THREE.Points | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // Code snippets for floating code blocks
    const codeSnippets = [
        'const dev = () => {\n  return magic;\n}',
        'function build() {\n  dream();\n  code();\n  deploy();\n}',
        'class Developer {\n  constructor() {\n    this.passion = ∞;\n  }\n}',
        'npm run success',
        'git commit -m "✨"',
        'console.log("Hello, World!");'
    ];

    useEffect(() => {
        if (!mountRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0a0a0f);
        sceneRef.current = scene;

        // Camera setup
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;
        cameraRef.current = camera;

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        rendererRef.current = renderer;
        mountRef.current.appendChild(renderer.domElement);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0x00ffff, 1);
        directionalLight.position.set(5, 5, 5);
        directionalLight.castShadow = true;
        scene.add(directionalLight);

        const pointLight1 = new THREE.PointLight(0xff6b35, 0.8, 100);
        pointLight1.position.set(-10, 0, 0);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0x4ecdc4, 0.8, 100);
        pointLight2.position.set(10, 0, 0);
        scene.add(pointLight2);

        // Create floating particles
        const createParticles = () => {
            const particleCount = 150;
            const positions = new Float32Array(particleCount * 3);
            const colors = new Float32Array(particleCount * 3);

            for (let i = 0; i < particleCount; i++) {
                positions[i * 3] = (Math.random() - 0.5) * 20;
                positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
                positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

                const color = new THREE.Color();
                color.setHSL(Math.random() * 0.3 + 0.5, 0.8, 0.6);
                colors[i * 3] = color.r;
                colors[i * 3 + 1] = color.g;
                colors[i * 3 + 2] = color.b;
            }

            const geometry = new THREE.BufferGeometry();
            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

            const material = new THREE.PointsMaterial({
                size: 0.05,
                vertexColors: true,
                transparent: true,
                opacity: 0.8
            });

            const particles = new THREE.Points(geometry, material);
            particlesRef.current = particles;
            scene.add(particles);
        };

        // Create floating code blocks
        const createCodeBlocks = () => {
            // Since we can't load external fonts, we'll create simple text representations
            codeSnippets.forEach((code, index) => {
                // Create a plane for each code block
                const geometry = new THREE.PlaneGeometry(2, 1);
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.width = 512;
                canvas.height = 256;

                if (context) {
                    // Style the canvas
                    context.fillStyle = 'rgba(10, 10, 15, 0.9)';
                    context.fillRect(0, 0, canvas.width, canvas.height);

                    // Add border
                    context.strokeStyle = '#00ffff';
                    context.lineWidth = 2;
                    context.strokeRect(0, 0, canvas.width, canvas.height);

                    // Add text
                    context.fillStyle = '#4ecdc4';
                    context.font = '20px monospace';
                    const lines = code.split('\n');
                    lines.forEach((line, lineIndex) => {
                        context.fillText(line, 20, 40 + lineIndex * 30);
                    });
                }

                const texture = new THREE.CanvasTexture(canvas);
                const material = new THREE.MeshBasicMaterial({
                    map: texture,
                    transparent: true,
                    opacity: 0.8
                });

                const mesh = new THREE.Mesh(geometry, material);
                mesh.position.set(
                    (Math.random() - 0.5) * 15,
                    (Math.random() - 0.5) * 10,
                    (Math.random() - 0.5) * 10
                );
                mesh.rotation.set(
                    Math.random() * Math.PI * 0.5,
                    Math.random() * Math.PI * 0.5,
                    Math.random() * Math.PI * 0.5
                );

                codeBlocksRef.current.push({
                    mesh,
                    originalPosition: mesh.position.clone(),
                    rotationSpeed: {
                        x: (Math.random() - 0.5) * 0.003,
                        y: (Math.random() - 0.5) * 0.003,
                        z: (Math.random() - 0.5) * 0.003
                    }
                });

                scene.add(mesh);
            });
        };

        // Create geometric objects
        const createGeometricObjects = () => {
            const geometries = [
                new THREE.BoxGeometry(0.5, 0.5, 0.5),
                new THREE.SphereGeometry(0.3, 16, 16),
                new THREE.ConeGeometry(0.3, 0.8, 8),
                new THREE.CylinderGeometry(0.2, 0.2, 0.8, 8),
                new THREE.OctahedronGeometry(0.4),
                new THREE.TetrahedronGeometry(0.5)
            ];

            for (let i = 0; i < 20; i++) {
                const geometry = geometries[Math.floor(Math.random() * geometries.length)];
                const material = new THREE.MeshPhongMaterial({
                    color: new THREE.Color().setHSL(Math.random(), 0.8, 0.6),
                    transparent: true,
                    opacity: 0.7,
                });

                const mesh = new THREE.Mesh(geometry, material);
                mesh.position.set(
                    (Math.random() - 0.5) * 20,
                    (Math.random() - 0.5) * 20,
                    (Math.random() - 0.5) * 20
                );
                mesh.castShadow = true;
                mesh.receiveShadow = true;

                geometryObjectsRef.current.push({
                    mesh,
                    originalPosition: mesh.position.clone(),
                    rotationSpeed: {
                        x: (Math.random() - 0.5) * 0.008,
                        y: (Math.random() - 0.5) * 0.008,
                        z: (Math.random() - 0.5) * 0.008
                    },
                    floatSpeed: Math.random() * 0.008 + 0.004,
                    floatAmplitude: Math.random() * 0.8 + 0.4
                });

                scene.add(mesh);
            }
        };

        // Mouse movement handler
        const handleMouseMove = (event: MouseEvent) => {
            mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };

        // Resize handler
        const handleResize = () => {
            if (!cameraRef.current || !rendererRef.current) return;

            cameraRef.current.aspect = window.innerWidth / window.innerHeight;
            cameraRef.current.updateProjectionMatrix();
            rendererRef.current.setSize(window.innerWidth, window.innerHeight);
        };

        // Animation loop
        const animate = (time: number) => {
            frameRef.current = requestAnimationFrame(animate);

            // Rotate particles - slower rotation
            if (particlesRef.current) {
                particlesRef.current.rotation.x += 0.0003;
                particlesRef.current.rotation.y += 0.0005;
            }

            // Animate code blocks
            codeBlocksRef.current.forEach((codeBlock, index) => {
                const { mesh, originalPosition, rotationSpeed } = codeBlock;

                // Rotation
                mesh.rotation.x += rotationSpeed.x;
                mesh.rotation.y += rotationSpeed.y;
                mesh.rotation.z += rotationSpeed.z;

                // Floating motion - much slower and more subtle
                mesh.position.y = originalPosition.y + Math.sin(time * 0.0003 + index) * 0.2;

                // Mouse interaction - more subtle
                const mouseInfluence = 0.2;
                mesh.position.x = originalPosition.x + mouseRef.current.x * mouseInfluence;
                mesh.position.z = originalPosition.z + mouseRef.current.y * mouseInfluence;
            });

            // Animate geometric objects
            geometryObjectsRef.current.forEach((obj, index) => {
                const { mesh, originalPosition, rotationSpeed, floatSpeed, floatAmplitude } = obj;

                // Rotation
                mesh.rotation.x += rotationSpeed.x;
                mesh.rotation.y += rotationSpeed.y;
                mesh.rotation.z += rotationSpeed.z;

                // Floating motion - much slower and more subtle
                mesh.position.y = originalPosition.y + Math.sin(time * floatSpeed * 0.3 + index) * (floatAmplitude * 0.3);

                // Mouse interaction - more subtle
                const mouseInfluence = 0.15;
                mesh.position.x = originalPosition.x + mouseRef.current.x * mouseInfluence;
                mesh.position.z = originalPosition.z + mouseRef.current.y * mouseInfluence;
            });

            // Camera movement based on mouse
            if (cameraRef.current) {
                cameraRef.current.position.x += (mouseRef.current.x * 0.5 - cameraRef.current.position.x) * 0.05;
                cameraRef.current.position.y += (mouseRef.current.y * 0.5 - cameraRef.current.position.y) * 0.05;
                cameraRef.current.lookAt(0, 0, 0);
            }

            if (rendererRef.current && sceneRef.current && cameraRef.current) {
                rendererRef.current.render(sceneRef.current, cameraRef.current);
            }
        };

        // Initialize everything
        createParticles();
        createCodeBlocks();
        createGeometricObjects();

        // Add event listeners
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);

        // Start animation
        animate(0);
        setIsLoaded(true);

        // Cleanup
        return () => {
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);

            if (mountRef.current && rendererRef.current) {
                mountRef.current.removeChild(rendererRef.current.domElement);
            }

            // Dispose of geometries and materials
            codeBlocksRef.current.forEach(({ mesh }) => {
                if (mesh.geometry) mesh.geometry.dispose();
                if (mesh.material) {
                    const material = mesh.material as THREE.MeshBasicMaterial;
                    if (material.map) material.map.dispose();
                    material.dispose();
                }
            });

            geometryObjectsRef.current.forEach(({ mesh }) => {
                if (mesh.geometry) mesh.geometry.dispose();
                if (mesh.material) {
                    const material = mesh.material as THREE.MeshPhongMaterial;
                    material.dispose();
                }
            });

            if (particlesRef.current) {
                if (particlesRef.current.geometry) particlesRef.current.geometry.dispose();
                if (particlesRef.current.material) {
                    const material = particlesRef.current.material as THREE.PointsMaterial;
                    material.dispose();
                }
            }
        };
    }, []);

    return (
        <div className="relative w-full h-screen overflow-hidden bg-gray-900">
            <div ref={mountRef} className="absolute inset-0" />

            {!isLoaded && (
                <div className="h-full w-full bg-gray-900"></div>
            )}

            <div className="absolute inset-0 pointer-events-none">
                <div className="flex flex-col justify-center h-full max-w-3xl text-white px-4 mx-auto">
                    {/* Avatar/logo on top for mobile, after name for desktop */}
                    <div className="flex flex-col md:flex-row md:items-center md:gap-4 mb-2 items-start">
                        {/* Mobile: avatar above, Desktop: avatar after name */}
                        <div className="md:hidden w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 p-1 flex items-center justify-center mb-4">
                            <div className="relative w-full h-full rounded-full overflow-hidden">
                                <img
                                    src="/avatar.jpeg"
                                    alt="Max Stouten portrait"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        <motion.h1
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            className="text-3xl flex items-center  text-white text-left"
                        >
                            <motion.span
                                className="text-3xl md:text-4xl mr-2 md:mr-4 my-auto"
                                initial={{ rotate: 0 }}
                                animate={{ rotate: [0, 20, -10, 20, -5, 0] }}
                                transition={{ delay: 1, duration: 1.2, times: [0, 0.2, 0.4, 0.6, 0.8, 1] }}
                            >
                                👋
                            </motion.span>
                                Hi! I'm
                            <span className="px-2 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 flex items-center">
                                Max Stouten
                                <span className="hidden md:inline-block ml-4 w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 p-1">
                                    <span className="relative w-full h-full rounded-full overflow-hidden block">
                                        <img
                                            src="/avatar.jpeg"
                                            alt="Max Stouten portrait"
                                            className="w-full h-full object-cover"
                                        />
                                    </span>
                                </span>
                            </span>
                        </motion.h1>
                    </div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.7 }}
                        className="text-lg md:text-3xl mb-6 text-gray-300 text-left max-w-3xl"
                    >
                        A full-stack software developer looking for new problems to solve and creative solutions to solve them with.
                    </motion.h2>

                    {/* Pills for programming languages with framer-motion staggered animation */}
                    <motion.div
                        className="flex flex-row flex-wrap gap-3 mb-10 items-start"
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.5 }}
                        variants={{
                            visible: { transition: { staggerChildren: 0.18 } },
                        }}
                    >
                        {/* React pill */}
                        <motion.span
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            transition={{ duration: 0.5 }}
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#20232a] font-semibold text-base shadow-md border border-[#61dafb]"
                        >
                            <img src="/assets/react_logo.svg" alt="React" className="w-5 h-5" style={{ filter: "invert(1)" }} /> React
                        </motion.span>
                        {/* TypeScript pill */}
                        <motion.span
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            transition={{ duration: 0.5 }}
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#007acc] font-semibold text-base shadow-md border border-[#007acc] text-white"
                        >
                            <img src="/assets/typescript_logo.svg" alt="TypeScript" className="w-5 h-5" style={{ filter: "invert(1)" }} /> TypeScript
                        </motion.span>
                        {/* Node.js pill */}
                        <motion.span
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            transition={{ duration: 0.5 }}
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#30330c] font-semibold text-base shadow-md border border-[#8cc84b] "
                        >
                            <img src="/assets/node_logo.svg" alt="Node.js" className="w-5 h-5" style={{ filter: "invert(1)" }} /> Node.js
                        </motion.span>
                        {/* Ruby on Rails pill */}
                        <motion.span
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            transition={{ duration: 0.5 }}
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#c00] font-semibold text-base shadow-md border border-[#c00] text-white"
                        >
                            <img src="/assets/rails_logo.svg" alt="Ruby on Rails" className="w-5 h-5" style={{ filter: "invert(1)" }} /> Ruby on Rails
                        </motion.span>
                        {/* Vue.js pill */}
                        <motion.span
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            transition={{ duration: 0.5 }}
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#31475E] font-semibold text-base shadow-md border border-[#40B47F] text-white"
                        >
                            <img src="/assets/vuejs_logo.svg" alt="Vue.js" className="w-5 h-5" style={{ filter: "invert(1)" }} /> Vue.js
                        </motion.span>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default HeaderAnimation;