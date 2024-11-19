import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { saveProject } from "@/lib/api";
import { notifications } from "@mantine/notifications";
import { TextInput, Button, Box, Group } from "@mantine/core";

//Neveikia taip kaip turėtų
export default function ThreeScene({ image, imageId }) {
    const mountRef = useRef(null);
    const sceneRef = useRef(null);
    const cameraRef = useRef(null);

    const [projectName, setProjectName] = useState("Projekto pavadinimas");

    useEffect(() => {
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        cameraRef.current = camera;
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        // Apsvietimas
        const light = new THREE.DirectionalLight(0xffffff, 5);
        light.position.set(2, 2, 5);
        scene.add(light);

        const controls = new OrbitControls(camera, renderer.domElement);
        camera.position.set(0, 1.5, 3);
        controls.update();

        // Nuotraukos uzkrovimas
        const textureLoader = new THREE.TextureLoader();
        const faceTexture = textureLoader.load(image);

        const handleResize = () => {
            const width = mountRef.current.clientWidth;
            const height = mountRef.current.clientHeight;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };
        window.addEventListener("resize", handleResize);

        // 3D Modelis
        const loader = new OBJLoader();
        loader.load(
            "/model/free_head.obj",
            (object) => {
                object.position.set(0, -10, 0);
                object.scale.set(6, 6, 6);

                object.traverse((child) => {
                    if (child.isMesh) {
                        if (child.geometry.attributes.uv) {
                            child.material = new THREE.MeshStandardMaterial({
                                map: faceTexture,
                                metalness: 0.3,
                                roughness: 0.8,
                            });
                        } else {
                            child.material = new THREE.MeshStandardMaterial({
                                color: 0xcccccc,
                                metalness: 0.3,
                                roughness: 0.8,
                            });
                        }
                    }
                });

                scene.add(object);
            },
            undefined,
            (error) => {
                console.error("Error loading OBJ model:", error);
            }
        );

        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
            window.removeEventListener("resize", handleResize);
            renderer.dispose();
        };
    }, []);

    const handleSaveProject = async () => {
        if (!sceneRef.current || !cameraRef.current) return;

        const sceneData = {
            name: projectName,
            photo_id: imageId,
            scene_data: {
                texture: image.image,
                camera: {
                    position: cameraRef.current.position.toArray(),
                    rotation: cameraRef.current.rotation.toArray(),
                },
                model: "/model/free_head.obj",
            },
        };

        try {
            const response = await saveProject(sceneData);
            notifications.show({
                message: "Projektas išsaugotas sėkmingai!",
                color: "green",
                position: "bottom-right",
            });
        } catch (error) {
            notifications.show({
                title: "Klaida!",
                message: "Nepavyko išsaugoti projekto.",
                color: "red",
                position: "bottom-right",
            });
        }
    };

    return (
        <div
            style={{
                position: "relative",
                width: "100%",
                height: "calc(100vh - 60px)",
                overflow: "hidden",
            }}
        >
            <div ref={mountRef} style={{ width: "100%", height: "100%" }} />

            <Box
                style={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    zIndex: 10,
                }}
            >
                <Group direction="column" spacing="xs">
                    <TextInput
                        label="Projekto pavadinimas"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        placeholder="Įrašykite projekto pavadinimą"
                        size="md"
                    />
                    <Button
                        onClick={handleSaveProject}
                        style={{ backgroundColor: "#62da97" }}
                    >
                        Išsaugoti Projektą
                    </Button>
                </Group>
            </Box>
        </div>
    );
}