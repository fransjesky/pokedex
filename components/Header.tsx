'use client';

// core components
import Link from 'next/link';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Header() {
  return (
    <Box
      component='nav'
      sx={{
        height: '5rem',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        position: 'fixed',
        top: '0',
        left: '0',
        zIndex: 999,
        color: '#ffffff',
        backgroundColor: '#121212',
        boxShadow:
          '0 0.0625rem 0.5rem 0 rgba(0,0,0,.04), 0 0.0625rem 0.3125rem 0 rgba(0,0,0,.04)',
      }}
    >
      <Link href='https://www.pokemon.com/us' passHref>
        <Image
          priority
          src='/Pokemon.svg'
          width={120}
          height={46}
          alt='Pokemon Logo'
        />
      </Link>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Link href='https://github.com/fransjesky/pokedex' passHref>
          <Typography
            fontSize={12}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <GitHubIcon sx={{ mr: 1, fontSize: 16 }} /> fransjesky/pokedex
          </Typography>
          <Typography fontSize={10} sx={{ opacity: 0.5 }}>
            ver 1.0 ( Initial Release )
          </Typography>
        </Link>
      </Box>
    </Box>
  );
}
