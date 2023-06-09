'use client';

import theme from '@/theme';
import { ThemeProvider } from '@mui/material';

// modules
import Landing from '@/modules/Landing';

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <Landing />
    </ThemeProvider>
  );
}
