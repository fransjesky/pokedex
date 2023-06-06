'use client';

// core components
import Link from 'next/link';
import Image from 'next/image';
import { Box } from '@mui/material';

// data
import { Navigation } from '@/data/Navigations';

export default function Header() {
  return (
    <Box
      component='nav'
      sx={{
        height: '5rem',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'fixed',
        top: '0',
        left: '0',
        zIndex: 999,
        backgroundColor: '#ffffff',
        boxShadow:
          '0 0.0625rem 0.5rem 0 rgba(0,0,0,.04), 0 0.0625rem 0.3125rem 0 rgba(0,0,0,.04)',
      }}
    >
      <Box
        sx={{
          width: '22.5vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
      >
        <Link href='/'>
          <Image
            priority
            src='/Pokemon.svg'
            width={146}
            height={46}
            alt='Pokemon Logo'
          />
        </Link>
        {Navigation.map((nav, index) => {
          return (
            <Link
              key={index}
              href={nav.url}
              style={{
                fontSize: '12px',
                fontWeight: 500,
                textTransform: 'capitalize',
              }}
            >
              {nav.label}
            </Link>
          );
        })}
      </Box>
    </Box>
  );
}
