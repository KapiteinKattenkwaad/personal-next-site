import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import Image from 'next/image';

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
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                    <div className="text-cyan-400 text-xl font-mono animate-pulse">
                        Initializing...
                    </div>
                </div>
            )}

            <div className="absolute inset-0 pointer-events-none">
                <div className="flex flex-col items-center justify-center h-full text-white">
                    {/* Profile image  */}
                    <div className="w-48 h-48 rounded-full mb-8 bg-gradient-to-br from-cyan-400 to-blue-600 p-1">
                        <div className="relative w-full h-full rounded-full overflow-hidden">
                            <img
                                src="/avatar.jpeg"
                                alt="Max Stouten portrait"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>


                    <h1 className="text-5xl font-bold mb-4 text-transparent text-center bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                        Hey, I'm Max Stouten
                    </h1>
                    <p className="text-xl text-gray-300 mb-2 text-center max-w-4xl leading-relaxed">
                        Full-stack software developer focusing on React
                    </p>
                    <p className="text-xl text-gray-300 mb-8 text-center max-w-4xl leading-relaxed">
                        (TypeScript) & Node.js.
                    </p>

                    <a href="#projects" className="px-8 py-4 border-2 border-cyan-400 text-cyan-400 rounded-full font-semibold hover:bg-cyan-400 hover:text-black transition-all duration-300 pointer-events-auto flex items-center space-x-2 group">
                        <span>View my work</span>
                        <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default HeaderAnimation;