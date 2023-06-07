import { useState } from 'react';
import Image from 'next/image';
import {
  Avatar,
  Box,
  Card as CardComponent,
  CardHeader,
  CardContent,
  Typography,
  IconButton,
} from '@mui/material';

// icons
import {
  WhatshotOutlined as Fire,
  WaterDropOutlined as Water,
  ElectricBoltOutlined as Electric,
  PestControlOutlined as Bug,
  BubbleChartOutlined as Poison,
  GrassOutlined as Grass,
  StormOutlined as Fairy,
  AutoAwesomeOutlined as Psychic,
  LandscapeOutlined as Ground,
  DiamondOutlined as Rock,
  SportsKabaddiOutlined as Fighting,
  CatchingPokemonOutlined as Normal,
  HelpOutlineOutlined as Unknown,
} from '@mui/icons-material';
import { text } from 'stream/consumers';

interface CardProps {
  id: string;
  name: string;
  originalName: string;
  type: string;
  imageURL: string;
  altImageURL: string;
  desc: string;
}

function Card(props: CardProps) {
  // state init
  const [onHover, setOnHover] = useState(false);

  // define type background color
  const defineTypeBgColor = (type: string): string => {
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
    if (type === 'normal') return '#a4acaf';
    return '#121212';
  };

  // define type icon
  const defineTypeIcon = (type: string): JSX.Element => {
    if (type === 'fire') return <Fire />;
    if (type === 'water') return <Water />;
    if (type === 'grass') return <Grass />;
    if (type === 'electric') return <Electric />;
    if (type === 'bug') return <Bug />;
    if (type === 'poison') return <Poison />;
    if (type === 'fairy') return <Fairy />;
    if (type === 'psychic') return <Psychic />;
    if (type === 'ground') return <Ground />;
    if (type === 'rock') return <Rock />;
    if (type === 'fighting') return <Fighting />;
    if (type === 'normal') return <Normal />;
    return <Unknown />;
  };

  return (
    <CardComponent
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
      sx={{
        width: '100%',
        maxWidth: {
          xs: 280,
          sm: 220,
          md: 240,
          lg: 260,
          xl: 280,
        },
        cursor: 'pointer',
        transition: '0.5s all ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          transition: '0.5s all ease',
        },
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: defineTypeBgColor(props.type) }}
            aria-label='type'
          >
            {defineTypeIcon(props.type)}
          </Avatar>
        }
        title={`${props.name.charAt(0).toUpperCase()}${props.name.slice(1)}`}
        subheader={props.id}
        action={
          <IconButton>
            <Image
              height={28}
              width={28}
              alt={props.name}
              src={props.altImageURL}
            />
          </IconButton>
        }
      />
      <Box
        sx={{
          height: {
            xs: 200,
            xl: 220,
          },
          maxWidth: {
            xs: 280,
            sm: 220,
            md: 240,
            lg: 260,
            xl: 280,
          },
          position: 'relative',
        }}
      >
        <Image
          fill
          src={props.imageURL}
          alt={props.name}
          style={{ objectFit: 'contain' }}
        />
      </Box>
      <CardContent
        sx={{
          height: 120,
          minHeight: 120,
          maxHeight: 120,
        }}
      >
        <Typography variant='h6' color='MenuText'>
          {props.originalName}
        </Typography>
        <Typography variant='caption' color='InactiveCaptionText'>
          {props.desc}
        </Typography>
      </CardContent>
    </CardComponent>
  );
}

export default Card;
