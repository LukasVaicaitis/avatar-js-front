import React from 'react';
import { useRouter } from 'next/router';
import { Button, Container, Title, Group } from '@mantine/core';

export default function Home() {
    const router = useRouter();

    const handleLogin = () => {
        router.push('/LoginPage');
    };

    const handleRegister = () => {
        router.push('/RegisterPage');
    };

    return (
        <Container
            size="fullWidth"
            style={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                textAlign: 'center',
                backgroundColor: '#f5f5f5',
            }}
        >
            <Title order={1} style={{ marginBottom: '2rem', fontSize: '2.5rem', color: '#333' }}>
                3D Avataro Generavimo Sistema
            </Title>

            <Group position="center" spacing="lg">
                <Button size="lg" color="#62da97" onClick={handleLogin}>
                    Prisijungti
                </Button>
                <Button size="lg" color="#62da97" onClick={handleRegister}>
                    Registruotis
                </Button>
            </Group>
        </Container>
    );
};