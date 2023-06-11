import { useState } from 'react';
import Image from 'next/image';
import {
  Avatar,
  Box,
  Card as CardComponent,
  CardHeader,
  CardContent,
  Grid,
  Modal,
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
  AirOutlined as Flying,
  HelpOutlineOutlined as Unknown,
} from '@mui/icons-material';

// api
import getPokemonAbility from '@/api/getPokemonAbility';

interface CardProps {
  id: string;
  name: string;
  originalName: string;
  type: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  imageURL: string | null;
  altImageURL: string | null;
  desc: string;
  abilities: {
    ability: {
      name: string;
      url: string;
    };
  }[];
}

interface AbilitiesProps {
  ability: {
    name: string;
    url: string;
  };
  is_hidden?: boolean;
  slot?: number;
}

interface AbilitiesList {
  effect_changes: string[];
  effect_entries: {
    effect: string;
    language: {
      name: string;
      url: string;
    };
    short_effect: string;
  }[];
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
      url: string;
    };
    version_group: {
      name: string;
      url: string;
    };
  }[];
  generation: {
    name: string;
    url: string;
  };
  id: number;
  is_main_series: boolean;
  name: string;
  names: {
    language: {
      name: string;
      url: string;
    };
    name: string;
  }[];
  pokemon: {
    is_hidden: boolean;
    pokemon: {
      name: string;
      url: string;
    };
    slot: number;
  }[];
}

function Card(props: CardProps) {
  // state init
  const [open, setOpen] = useState(false);
  const [pokemonAbilities, setPokemonAbilities] = useState<AbilitiesList[]>([]);

  // modal logic
  const handleOpen = async (abilities: AbilitiesProps[]) => {
    const fetchAbilities = await Promise.all(
      abilities.map((data) => getPokemonAbility(data.ability.url))
    );

    // logic to filter duplicated ability by id
    const completeAbilitiesData: AbilitiesList[] = [];
    const uniqueIds = new Set();

    fetchAbilities.forEach((item) => {
      if (!uniqueIds.has(item.id)) {
        completeAbilitiesData.push(item);
        uniqueIds.add(item.id);
      }
    });

    setPokemonAbilities(completeAbilitiesData);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

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
    if (type === 'flying') return <Flying />;
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
      sx={{
        height: {
          xs: '19.5rem',
          sm: '21.5rem',
        },
        width: '100%',
        maxWidth: {
          xs: 180,
          sm: 200,
          md: 220,
          lg: 240,
          xl: 260,
        },
        cursor: 'pointer',
        border: '1px solid #121212',
        borderBottom: `0.25rem solid ${defineTypeColor(
          props.type[0].type.name
        )}80`,
        backgroundSize: 'cover',
        backgroundImage: props.imageURL ? 'url("/Background.jpeg")' : 'none',
        backgroundPosition: 'center center',
        transition: '0.3s all ease',
        '&:hover': {
          transform: 'translateY(-0.5rem)',
          border: `1px solid ${defineTypeColor(props.type[0].type.name)}`,
          borderBottom: `0.25rem solid ${defineTypeColor(
            props.type[0].type.name
          )}`,
          boxShadow: `0 0 1.25rem 0 ${defineTypeColor(
            props.type[0].type.name
          )}`,
          transition: '0.3s all ease',
          zIndex: 2,
        },
      }}
    >
      <CardHeader
        sx={{
          backgroundColor: '#121212',
          '& 	.MuiCardHeader-content': {
            overflow: 'hidden',
          },
          '& .MuiCardHeader-title': {
            fontWeight: 700,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          },
          '& .MuiCardHeader-avatar': {
            marginRight: '0.5rem',
          },
        }}
        avatar={
          <Avatar
            alt={props.name}
            sx={{ bgcolor: defineTypeColor(props.type[0].type.name) }}
            aria-label='type'
          >
            {defineTypeIcon(props.type[0].type.name)}
          </Avatar>
        }
        title={`${formatString(props.name)}`}
        subheader={props.id}
        action={
          <IconButton onClick={() => handleOpen(props.abilities)}>
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
            xs: 101.25,
            sm: 112.5,
            md: 123.75,
            lg: 135,
            xl: 146.25,
          },
          // width defined based on the card width
          width: {
            xs: 180,
            sm: 200,
            md: 220,
            lg: 240,
            xl: 260,
          },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {props.imageURL ? (
          <Image
            fill
            priority
            quality={100}
            alt={props.name}
            src={props.imageURL}
            style={{ objectFit: 'contain' }}
            sizes='(min-width: 600px) 101.25px, (min-width: 960px) 112.50px, (min-width: 1280px) 135px, (min-width: 1920px) 146.25px, 96.75px'
          />
        ) : (
          <img
            alt={props.name}
            src='/Pokemon-001.gif'
            style={{
              objectFit: 'cover',
              width: '100%',
              height: '100%',
            }}
          />
        )}
      </Box>
      <CardContent>
        <Typography
          variant='h6'
          color={defineTypeColor(props.type[0].type.name)}
          fontWeight={700}
        >
          {props.originalName}
        </Typography>
        <Box
          sx={{
            color: '#ececec',
            height: 65,
            maxWidth: '100%',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 3,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          <Typography variant='caption' fontWeight={300}>
            {props.desc}
          </Typography>
        </Box>
      </CardContent>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            m: 0,
            p: 2,
            maxHeight: {
              xs: '70vh',
              sm: '36.625rem',
              md: '36.625rem',
              lg: '36.625rem',
              xl: '39.625rem',
            },
            width: {
              xs: '85vw',
              sm: '25rem',
              md: '27.5rem',
              lg: '30rem',
              xl: '27.5rem',
            },
            borderRadius: '0.625rem',
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#ffffff',
            backgroundColor: '#121212',
            border: `1px solid ${defineTypeColor(props.type[0].type.name)}`,
            boxShadow: `0 0 1.25rem 0 ${defineTypeColor(
              props.type[0].type.name
            )}`,
            overflow: 'auto',
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box
                sx={{
                  height: '25rem',
                  width: '100%',
                  position: 'relative',
                  backgroundSize: 'cover',
                  backgroundImage: 'url("/Background.jpeg")',
                  backgroundPosition: 'center center',
                  borderRadius: '0.625rem',
                }}
              >
                {props.imageURL ? (
                  <Image
                    fill
                    priority
                    quality={100}
                    alt={props.name}
                    src={props.imageURL}
                    style={{ objectFit: 'contain' }}
                    sizes='(min-width: 600px) 100%, (min-width: 960px) 100%, (min-width: 1280px) 100%, (min-width: 1920px) 100%, 100%'
                  />
                ) : (
                  <img
                    alt={props.name}
                    src='/Pokemon-001.gif'
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: '100%',
                    }}
                  />
                )}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={9} xl={9}>
                  <Typography variant='h6'>{props.originalName}</Typography>
                  <Typography
                    variant='h3'
                    fontWeight={900}
                    sx={{ color: defineTypeColor(props.type[0].type.name) }}
                  >
                    {formatString(props.name)}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
                  <Box
                    sx={{
                      height: '100%',
                      width: '100%',
                      display: 'flex',
                      justifyContent: {
                        xs: 'space-around',
                        lg: 'flex-end',
                      },
                      alignItems: 'center',
                    }}
                  >
                    {props.type.map((value, index) => {
                      return (
                        <Box
                          mr={2}
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                          key={index}
                        >
                          <Avatar
                            sx={{ bgcolor: defineTypeColor(value.type.name) }}
                          >
                            {defineTypeIcon(value.type.name)}
                          </Avatar>
                          <Typography mt={1} variant='caption' fontWeight={700}>
                            {formatString(value.type.name)}
                          </Typography>
                        </Box>
                      );
                    })}
                  </Box>
                </Grid>
              </Grid>
              <Typography mt={2} mb={2} variant='body2'>
                {props.desc}
              </Typography>
              <Box>
                <Typography
                  variant='h6'
                  sx={{
                    marginBottom: '0.25rem',
                    color: defineTypeColor(props.type[0].type.name),
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
                        props.type[0].type.name
                      )}FF 0%, ${defineTypeColor(
                        props.type[0].type.name
                      )}00 100%)`,
                    },
                  }}
                >
                  Abilities
                </Typography>
                <Grid container spacing={2}>
                  {pokemonAbilities.map((value, index) => {
                    return (
                      <Grid item xl={6} key={index}>
                        <Typography variant='body1' fontWeight={700}>
                          {formatString(value.name)}
                        </Typography>
                        <Typography
                          variant='body2'
                          sx={{
                            color: 'rgba(255,255,255,0.5)',
                            fontSize: 12,
                            fontWeight: 300,
                          }}
                        >
                          {value.flavor_text_entries.length > 0
                            ? value.flavor_text_entries.find(
                                (entry) => entry.language.name === 'en'
                              )?.flavor_text
                            : `This ability is from ${value.generation.name}, data is unavailable at this moment`}
                        </Typography>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </CardComponent>
  );
}

export default Card;
