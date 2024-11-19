import React, { useState } from 'react';
import { loginUser } from '../lib/api';
import { TextInput, PasswordInput, Button, Container, Title, Text, Box } from '@mantine/core';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await loginUser(username, password);

      localStorage.setItem('access_token', response.access);
      localStorage.setItem('refresh_token', response.refresh);

      window.location.href = '/Dashboard';
    } catch (err) {
      setError('Nepavyko prisijungti, patikrinkite prisijungimo duomenis.');
      console.error(err);
    }
  };

  return (
    <Container size={420} my={40}>
      <Title align="center" order={2}>
        Prisijungti
      </Title>

      {error && (
        <Text color="red" size="sm" mt="sm" align="center">
          {error}
        </Text>
      )}

      <Box
        component="form"
        onSubmit={handleLogin}
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
        <PasswordInput
          label="Slaptažodis"
          placeholder="Įveskite savo slaptažodį"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" fullWidth color="#62da97" mt="md">
          Prisijungti
        </Button>
      </Box>
    </Container>
  );
};