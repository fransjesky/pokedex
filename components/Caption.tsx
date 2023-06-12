import { Typography } from '@mui/material';

interface CaptionProps {
  text: string;
  type: string;
}

export default function Caption(props: CaptionProps) {
  // define type color
  const defineTypeColor = (type: string): string => {
    if (type === 'fire') return '#fd7d24';
    if (type === 'water') return '#4592c4';
    if (type === 'grass') return '#9bcc50';
    if (type === 'electric') return '#eed535';
    if (type === 'bug') return '#729f3f';
    if (type === 'poison') return '#b97fc9';
    if (type === 'fairy') return '#fdb9e9';
    if (type === 'psychic') return '#f366b9';
    if (type === 'ground') return '#f7de3f';
    if (type === 'rock') return '#a38c21';
    if (type === 'fighting') return '#d56723';
    if (type === 'ghost') return '#7b62a3';
    if (type === 'ice') return '#51c4e7';
    if (type === 'dragon') return '#f16e57';
    if (type === 'dark') return '#313131';
    if (type === 'steel') return '#9eb7b8';
    if (type === 'normal') return '#a4acaf';
    if (type === 'flying') return '#3dc7ef';
    return '#121212';
  };

  return (
    <Typography
      variant='h6'
      sx={{
        marginBottom: '0.25rem',
        color: defineTypeColor(props.type),
        fontWeight: 900,
        position: 'relative',
        '&:before': {
          content: '""',
          height: '0.125rem',
          width: '25%',
          position: 'absolute',
          bottom: 0,
          left: 0,
          borderRadius: '0.25rem',
          background: `linear-gradient(90deg, ${defineTypeColor(
            props.type
          )}FF 0%, ${defineTypeColor(props.type)}00 100%)`,
        },
      }}
    >
      {props.text}
    </Typography>
  );
}
