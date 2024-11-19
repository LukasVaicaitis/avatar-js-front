import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container, Title, Text, Grid, Card, Paper } from '@mantine/core';

//Components
import ThreeScene from '../components/ThreeScene';
import { Header } from '@/components/Header';

import { getProjects, fetchImageUrlById } from '@/lib/api';

export default function ProjectsPage() {
    const router = useRouter();
    const { image, photo_id } = router.query;
    const [projects, setProjects] = useState([]);
    const [selectedImage, setSelectedImage] = useState(image);
    const [selectedImageId, setSelectedImageId] = useState(photo_id);

    useEffect(() => {
        if (!image) {
            const fetchProjects = async () => {
                try {
                    const response = await getProjects();
                    setProjects(response);
                } catch (error) {
                    console.error('Error fetching projects:', error);
                }
            };

            fetchProjects();
        }
    }, [image]);

    const handleProjectClick = async (project) => {
        try {
            const imageUrl = await fetchImageUrlById(project.photo);
            setSelectedImage(imageUrl);
            setSelectedImageId(project.photo);
        } catch (error) {
            console.error('Error fetching image URL:', error);
        }
    };

    return (
        <div>
            <Header />

            <Container size="lg" style={{ paddingTop: '20px' }}>

                {/* selected image with 3d scene */}
                {(selectedImage || image) ? (
                    <Paper padding="md" shadow="sm" style={{ marginBottom: '20px' }}>
                        <Title order={3}>Pasirinkta nuotrauka modelyje:</Title>
                        <ThreeScene
                            image={selectedImage || image}
                            imageId={selectedImageId || photo_id}
                        />
                    </Paper>
                ) : (
                    <div style={{ marginTop: '20px' }}>
                        <Title order={2}>Kaip pradėti redaguoti 3D avatarą</Title>
                        <div style={{ lineHeight: '1.8' }}>
                            <ol>
                                <li>Atidarykite nuotraukų meniu.</li>
                                <li>Pasirinkite norimą nuotrauką.</li>
                                <li>Paspauskite mygtuką „Naudoti 3D avatarui“.</li>
                            </ol>
                        </div>

                        <Title order={2} style={{ marginTop: '40px' }}>Mano projektai:</Title>

                        <Grid grow style={{ marginTop: '20px' }}>
                            {projects.length > 0 ? (
                                projects.map((project) => (
                                    <Grid.Col key={project.id} span={4}>
                                        <Card
                                            shadow="sm"
                                            padding="lg"
                                            style={{
                                                cursor: 'pointer',
                                                transition: 'transform 0.3s ease',
                                            }}
                                            onClick={() => handleProjectClick(project)}
                                            onMouseEnter={(e) =>
                                                (e.currentTarget.style.transform = 'scale(1.05)')
                                            }
                                            onMouseLeave={(e) =>
                                                (e.currentTarget.style.transform = 'scale(1)')
                                            }
                                        >
                                            <Text weight={500}>{project.name}</Text>
                                            <Text size="sm" color="dimmed">Projekto ID: {project.id}</Text>
                                            <Text size="sm" color="dimmed">
                                                Sukurtas: {new Date(project.created_at).toLocaleDateString()}
                                            </Text>
                                        </Card>
                                    </Grid.Col>
                                ))
                            ) : (
                                <Text>Projektų nerasta.</Text>
                            )}
                        </Grid>
                    </div>
                )}
            </Container>
        </div>
    );
}