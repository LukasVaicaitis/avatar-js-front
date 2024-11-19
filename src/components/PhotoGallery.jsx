import { useEffect, useState } from 'react';
import { getPhotos, deletePhoto } from '../lib/api';
import { notifications } from '@mantine/notifications';
import { Grid, Card, Image, Button, Modal, Group } from '@mantine/core';
import { useRouter } from 'next/router';

export default function PhotoGallery({ refreshKey, onDeleteSuccess }) {
    const [photos, setPhotos] = useState([]);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [modalOpened, setModalOpened] = useState(false);
    const router = useRouter();

    useEffect(() => {
        (async () => {
            const fetchedPhotos = await getPhotos();
            setPhotos(fetchedPhotos);
        })();
    }, [refreshKey]);

    const handleDelete = async (photoId) => {
        console.log(`Deleting photo with ID: ${photoId}`);
        try {
            await deletePhoto(photoId);
            notifications.show({
                message: 'Nuotrauka pašalinta sėkmingai!',
                color: 'green',
                position: 'bottom-right',
            });

            setPhotos((prevPhotos) => prevPhotos.filter(photo => photo.id !== photoId));
            if (onDeleteSuccess) onDeleteSuccess(photoId);
            setModalOpened(false);
        } catch (error) {
            console.error("Klaida trinant nuotrauką:", error);
        }
    };

    const handleUseForAvatar = (photo) => {
        console.log(photo.image);
        router.push({
            pathname: '/ProjectsPage',
            query: { image: photo.image, photo_id: photo.id },
        });
    };

    const openModal = (photo) => {
        setSelectedPhoto(photo);
        setModalOpened(true);
    };

    const closeModal = () => {
        setSelectedPhoto(null);
        setModalOpened(false);
    };

    return (
        <div>
            <Grid gutter="md">
                {photos.map((photo) => (
                    <Grid.Col key={photo.id} span={4}>
                        <Card shadow="sm" padding="lg" onClick={() => openModal(photo)} style={{ cursor: 'pointer' }}>
                            <Card.Section>
                                <Image src={photo.image} alt={`Photo by user ${photo.user}`} height={160} />
                            </Card.Section>
                        </Card>
                    </Grid.Col>
                ))}
            </Grid>

            <Modal
                opened={modalOpened}
                onClose={closeModal}
                title="Nuotrauka"
                size="lg"
                centered
            >
                {selectedPhoto && (
                    <div style={{ textAlign: 'center' }}>
                        <Image
                            src={selectedPhoto.image}
                            alt={`Expanded photo by user ${selectedPhoto.user}`}
                            style={{ marginBottom: '20px' }}
                            width="100%"
                            height="auto"
                        />
                        <Group position="center" style={{ gap: '10px' }}>
                            <Button color="#62da97" onClick={() => handleDelete(selectedPhoto.id)}>
                                Ištrinti nuotrauką
                            </Button>
                            <Button color="#62da97" onClick={() => handleUseForAvatar(selectedPhoto)}>
                                Naudoti 3D avatarui
                            </Button>
                        </Group>
                    </div>
                )}
            </Modal>
        </div>
    );
}