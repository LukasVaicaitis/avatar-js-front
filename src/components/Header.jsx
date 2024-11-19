import { Group, Box, Text, rem } from '@mantine/core';
import { useRouter } from 'next/router';

import LogoutButton from './LogoutButton';

export function Header() {
  const router = useRouter();

  return (
    <Box
      style={{
        height: rem(60),
        padding: '0 16px',
        borderBottom: `1px solid rgba(0, 0, 0, 0.1)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f5f5f5',
      }}
    >

      <Group spacing="md" style={{ display: 'flex', alignItems: 'center' }}>
        <Box
          style={{
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
          }}
          onClick={() => router.push("/Dashboard")}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#f0f0f0')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '')}
        >
          Nuotraukos
        </Box>
        <Box
          style={{
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
          }}
          onClick={() => router.push("/ProjectsPage")}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#f0f0f0')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '')}
        >
          Projektai
        </Box>
      </Group>

      <Group style={{ display: 'flex', alignItems: 'center' }}>
        <Text style={{ fontWeight: 500, marginRight: 10 }}>Sveiki!</Text>

        <LogoutButton />

      </Group>
    </Box>
  );
}