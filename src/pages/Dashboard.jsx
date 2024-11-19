import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Container, Button, Text, Group, Title } from '@mantine/core';

//Components
import PhotoGallery from '@/components/PhotoGallery';
import UploadForm from '@/components/UploadForm';
import { Header } from '@/components/Header';

export default function Dashboard() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();
    const [refreshKey, setRefreshKey] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            router.push('/');
        } else {
            setIsAuthenticated(true);
        }
    }, [router]);

    const handlePictureUploaded = () => {
        setRefreshKey((prevKey) => prevKey + 1);
    };

    const handleDeleteSuccess = () => {
        setRefreshKey((prevKey) => prevKey + 1);
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    if (!isAuthenticated) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <Header />

            <Container size="lg" style={{ paddingTop: '20px' }}>
                {/* Header Section */}
                <Group position="apart" style={{ marginBottom: '20px' }}>
                    <Title order={2}>Jūsų nuotraukų sąrašas:</Title>
                    <Button onClick={openModal} variant="outline" color="#62da97">
                        Pridėti nuotrauką
                    </Button>
                </Group>

                <PhotoGallery refreshKey={refreshKey} onDeleteSuccess={handleDeleteSuccess} />

                <UploadForm
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    handlePictureUploaded={handlePictureUploaded}
                />
            </Container>
        </div>
    );
};