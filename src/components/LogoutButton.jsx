import React from 'react';
import { useRouter } from 'next/router';
import { logoutUser } from '../lib/api';
import { Box } from '@mantine/core';

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = () => {
        logoutUser();
        router.push('/');
    };

    return (
        <Box
            style={{
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
            }}
            onClick={() => handleLogout()}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#f0f0f0')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '')}
        >
            Atsijungti
        </Box>
    );
};