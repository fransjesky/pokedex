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
  SportsMartialArtsOutlined as Fighting,
  SentimentVeryDissatisfiedOutlined as Ghost,
  AcUnitOutlined as Ice,
  GradeOutlined as Dragon,
  NightsStayOutlined as Dark,
  ShieldMoonOutlined as Steel,
  CatchingPokemonOutlined as Normal,
  HelpOutlineOutlined as Unknown,
} from '@mui/icons-material';

interface CardProps {
  id: string;
  name: string;
  originalName: string;
  type: string;
  imageURL: string | null;
  altImageURL: string | null;
  desc: string;
}

function Card(props: CardProps) {
  // state init
  const [onHover, setOnHover] = useState(false);

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
    if (type === 'ghost') return <Ghost />;
    if (type === 'ice') return <Ice />;
    if (type === 'dragon') return <Dragon />;
    if (type === 'dark') return <Dark />;
    if (type === 'steel') return <Steel />;
    if (type === 'normal') return <Normal />;
    return <Unknown />;
  };

  // format string function
  function formatString(input: string): string {
    const words = input.split('-');
    const formattedString = words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return formattedString;
  }

  return (
    <CardComponent
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
      sx={{
        height: '21.25rem',
        width: '100%',
        borderLeft: `0.5rem solid ${defineTypeColor(props.type)}`,
        maxWidth: {
          xs: 180,
          sm: 200,
          md: 220,
          lg: 240,
          xl: 260,
        },
        cursor: 'pointer',
        transition: '0.3s all ease',
        '&:hover': {
          transform: 'translateY(-6px)',
          transition: '0.3s all ease',
        },
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: defineTypeColor(props.type) }}
            aria-label='type'
          >
            {defineTypeIcon(props.type)}
          </Avatar>
        }
        title={`${formatString(props.name)}`}
        subheader={props.id}
        action={
          <IconButton>
            {props.altImageURL ? (
              <Image
                height={30}
                width={30}
                alt={props.name}
                src={props.altImageURL}
              />
            ) : (
              <img
                height={30}
                width={30}
                alt={props.name}
                src='/Pokemon-000.gif'
              />
            )}
          </IconButton>
        }
      />
      <Box
        component='div'
        sx={{
          // height defined with width as the base for aspect ratio 16:9
          height: {
            xs: 96.75,
            sm: 108,
            md: 119.25,
            lg: 130.50,
            xl: 141.75,
          },
          width: {
            xs: 172,
            sm: 192,
            md: 212,
            lg: 232,
            xl: 252,
          },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {props.imageURL ? (
          <Image
            fill
            src={props.imageURL}
            alt={props.name}
            style={{ objectFit: 'contain' }}
            sizes='(min-width: 600px) 108px, (min-width: 960px) 119.25px, (min-width: 1280px) 130.50px, (min-width: 1920px) 141.75px, 96.75px'
          />
        ) : (
          <img
            src='/Pokemon-001.gif'
            alt={props.name}
            style={{ objectFit: 'contain', width: '100%', height: '100%' }}
          />
        )}
      </Box>
      <CardContent
        sx={{
          height: 120,
          minHeight: 120,
          maxHeight: 120,
        }}
      >
        <Typography
          variant='h6'
          color={defineTypeColor(props.type)}
          fontWeight={700}
        >
          {props.originalName}
        </Typography>
        <Box
          sx={{
            color: '#808080',
            height: 65,
            maxWidth: '100%',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 3,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          <Typography variant='caption'>{props.desc}</Typography>
        </Box>
      </CardContent>
    </CardComponent>
  );
}

export default Card;
