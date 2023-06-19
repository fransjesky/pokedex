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
import getSinglePokemon from '@/api/getSinglePokemon';
import getPokemonAbility from '@/api/getPokemonAbility';
import getGenerationDetails from '@/api/getGenerationDetails';
import getEvolutionsChain from '@/api/getEvolutionsChain';

// custom components
import Caption from './Caption';
import Chart from './Chart';
import SwiperComponent from './Swiper';

// types
import {
  CardProps,
  AbilitiesProps,
  AbilitiesList,
  GenerationProps,
} from '@/types/Card';

function Card(props: CardProps) {
  // state init
  const [open, setOpen] = useState(false);
  const [pokemonAbilities, setPokemonAbilities] = useState<AbilitiesList[]>([]);
  const [generationDetails, setGenerationDetails] =
    useState<GenerationProps | null>(null);
  const [evolutionNameList, setEvolutionNameList] = useState<string[]>([]);
  const [evolutionImageList, setEvolutionImageList] = useState<string[]>([]);

  // modal logic
  const handleOpen = async (
    abilities: AbilitiesProps[],
    gens: string,
    evolve: string
  ) => {
    const fetchAbilities = await Promise.all(
      abilities.map((data) => getPokemonAbility(data.ability.url))
    );

    const fetchGenerationDetails = await getGenerationDetails(gens);
    const fetchEvolvesChain = await getEvolutionsChain(evolve);

    // logic to filter duplicated ability by id
    const completeAbilitiesData: AbilitiesList[] = [];
    const uniqueIds = new Set();

    fetchAbilities.forEach((item) => {
      if (!uniqueIds.has(item.id)) {
        completeAbilitiesData.push(item);
        uniqueIds.add(item.id);
      }
    });
    // --------------------------------------------------
    // ---------- EVOLUTION CHAIN LOGIC SCRIPT ----------
    // --------------------------------------------------
    console.log('Evolve Chain: ', fetchEvolvesChain);

    // fetch evolutions chain - (names)
    const tempNameArr = [];
    const baseFormName = fetchEvolvesChain.chain.species.name;
    const midFormName = fetchEvolvesChain.chain.evolves_to[0]?.species.name;
    const finalFormName =
      fetchEvolvesChain.chain.evolves_to[0]?.evolves_to[0]?.species.name;

    baseFormName ? tempNameArr.push(baseFormName) : null;
    midFormName ? tempNameArr.push(midFormName) : null;
    finalFormName ? tempNameArr.push(finalFormName) : null;

    // fetch evolutions chain - (images)
    const tempImgArr = [];
    const baseFormURL = fetchEvolvesChain.chain.species.name;
    const midFormURL = fetchEvolvesChain.chain.evolves_to[0]?.species.name;
    const finalFormURL =
      fetchEvolvesChain.chain.evolves_to[0]?.evolves_to[0]?.species.name;

    const fetchBaseFormImage = await getSinglePokemon(baseFormURL);
    const fetchMidFormImage = midFormURL
      ? await getSinglePokemon(midFormURL)
      : null;
    const fetchFinalFormImage = finalFormURL
      ? await getSinglePokemon(finalFormURL)
      : null;

    // destruct the data
    const baseImage =
      fetchBaseFormImage.data.sprites.other['official-artwork'].front_default;
    const midImage = fetchMidFormImage
      ? fetchMidFormImage.data.sprites.other['official-artwork'].front_default
      : null;
    const finalImage = fetchFinalFormImage
      ? fetchFinalFormImage.data.sprites.other['official-artwork'].front_default
      : null;

    // push the destructed data to temp arr
    baseImage ? tempImgArr.push(baseImage) : null;
    midImage ? tempImgArr.push(midImage) : null;
    finalImage ? tempImgArr.push(finalImage) : null;
    // --------------------------------------------------

    // state assign
    setPokemonAbilities(completeAbilitiesData);
    setGenerationDetails(fetchGenerationDetails);
    setEvolutionNameList(tempNameArr);
    setEvolutionImageList(tempImgArr);

    // open modal
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  // format string function
  function formatString(input: string): string {
    const words = input.split('-');
    const formattedString = words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return formattedString;
  }

  // format generation string
  const formatGeneration = (input: string): string => {
    // Remove the "generation-" prefix
    const generationNumber = input.slice(11);

    // Convert Roman numerals to Arabic numerals
    const romanToArabic = new Map<string, string>([
      ['i', '1'],
      ['ii', '2'],
      ['iii', '3'],
      ['iv', '4'],
      ['v', '5'],
      ['vi', '6'],
      ['vii', '7'],
      ['viii', '8'],
      ['ix', '9'],
    ]);

    let arabicNumber = romanToArabic.get(generationNumber.toLowerCase());
    if (!arabicNumber) {
      // Default to the input value if it doesn't match any known Roman numerals
      arabicNumber = generationNumber;
    }

    // Capitalize the first letter and join with the Arabic numeral
    const formattedGeneration = `Gen ${arabicNumber
      .charAt(0)
      .toUpperCase()}${arabicNumber.slice(1)}`;

    return formattedGeneration;
  };

  const defineGeneration = () => {
    if (generationDetails) {
      return `${formatGeneration(generationDetails.name)} ${formatVersion(
        generationDetails.version_groups[0].name
      )}`;
    } else {
      return 'Unknown';
    }
  };

  // format version string
  const formatVersion = (input: string) => {
    const splitVersion = input.split('-');
    const versions = splitVersion.map(
      (version) => version.charAt(0).toUpperCase() + version.slice(1)
    );
    return `( Pokemon ${versions[0]} and ${versions[1]} )`;
  };

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

  // stats data
  const statsData = [
    {
      stats: 'HP',
      color: 'rgb(255, 99, 132)',
    },
    {
      stats: 'Attack',
      color: 'rgb(54, 162, 235)',
    },
    {
      stats: 'Defense',
      color: 'rgb(255, 206, 86)',
    },
    {
      stats: 'Sp Atk',
      color: 'rgb(75, 192, 192)',
    },
    {
      stats: 'Sp Def',
      color: 'rgb(153, 102, 255)',
    },
    {
      stats: 'Speed',
      color: 'rgb(255, 159, 64)',
    },
  ];

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
          <IconButton
            onClick={() =>
              handleOpen(props.abilities, props.generation, props.evolutions)
            }
          >
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
      <Modal open={open} onClose={handleClose} disableScrollLock>
        <Box
          sx={{
            m: 0,
            p: 2,
            maxHeight: {
              xs: '32.5rem',
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
            '&::-webkit-scrollbar': {
              width: 0,
              background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'transparent',
            },
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
                <Typography variant='body1' fontWeight={700}>
                  Generation
                </Typography>
                <Typography
                  variant='body2'
                  sx={{
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: 12,
                    fontWeight: 300,
                  }}
                >
                  {defineGeneration()}
                </Typography>
              </Box>
              <Box marginY={2}>
                <Caption text='Abilities' type={props.type[0].type.name} />
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
              <Box marginY={2}>
                <Caption text='Stats' type={props.type[0].type.name} />
                <Box marginY={2}>
                  <Chart data={props.stats.map((data) => data.base_stat)} />
                  <Typography variant='body1' fontWeight={700}>
                    Base Stats
                  </Typography>
                  <Grid container spacing={1}>
                    {statsData.map((value, index) => {
                      return (
                        <Grid
                          item
                          xs={6}
                          sm={4}
                          md={4}
                          lg={4}
                          xl={4}
                          key={index}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'flex-start',
                              alignItems: 'center',
                            }}
                          >
                            <Box
                              sx={{
                                mr: 1,
                                height: '0.75rem',
                                width: '1.625rem',
                                border: '1px solid #ffffff',
                                borderRadius: '0.125rem',
                                backgroundColor: value.color,
                              }}
                            />
                            <Typography variant='caption'>
                              {value.stats}:{' '}
                              <Box
                                component='span'
                                sx={{
                                  color: value.color,
                                  fontWeight: 700,
                                }}
                              >
                                {props.stats[index].base_stat}
                              </Box>
                            </Typography>
                          </Box>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Box>
                <Box mt={2}>
                  <Typography variant='body1' fontWeight={700}>
                    Other Stats
                  </Typography>
                  <Grid container>
                    <Grid item xs={6} sm={4} md={4} lg={4} xl={4}>
                      <Typography variant='caption'>
                        Height: {props.height ? props.height : 'N/A'}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={4} md={4} lg={4} xl={4}>
                      <Typography variant='caption'>
                        Weight: {props.weight ? props.weight : 'N/A'}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={4} md={4} lg={4} xl={4}>
                      <Typography variant='caption'>
                        Base Exp: {props.exp ? props.exp : 'N/A'}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              <Box marginY={2}>
                <Caption text='Evolutions' type={props.type[0].type.name} />
                <Box
                  mt={1}
                  sx={{
                    paddingY: '0.625rem',
                    borderRadius: '0.625rem',
                    backgroundImage: 'url("/Card-Background.gif")',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed',
                    backgroundPosition: 'center center',
                  }}
                >
                  <SwiperComponent
                    names={evolutionNameList}
                    images={evolutionImageList}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </CardComponent>
  );
}

export default Card;
