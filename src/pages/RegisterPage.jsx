import { useState } from 'react';
import { useRouter } from 'next/router';
import { registerUser } from '../lib/api';
import { TextInput, PasswordInput, Button, Box, Title, Text, Container } from '@mantine/core';

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await registerUser(username, email, password);

            localStorage.setItem('access_token', response.access);
            localStorage.setItem('refresh_token', response.refresh);

            router.push('/');
        } catch (err) {
            setError('Registracija nepavyko, bandykite dar kartą.');
        }
    };

    return (
        <Container size={420} my={40}>
            <Title align="center" order={2}>
                Registruotis
            </Title>
            {error && (
                <Text color="red" size="sm" mt="sm" align="center">
                    {error}
                </Text>
            )}
            <Box
                component="form"
                onSubmit={handleSubmit}
                mt="lg"
                sx={(theme) => ({
                    display: 'flex',
                    flexDirection: 'column',
                    gap: theme.spacing.md,
                })}
            >
                <TextInput
                    label="Naudotojo vardas"
                    placeholder="Įveskite savo naudotojo vardą"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <TextInput
                    label="El. pašto adresas"
                    placeholder="Įveskite savo el. pašto adresą"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <PasswordInput
                    label="Slaptažodis"
                    placeholder="Įveskite savo slaptažodį"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button type="submit" fullWidth color="#62da97" mt="md">
                    Registruotis
                </Button>
            </Box>
        </Container>
    );
}