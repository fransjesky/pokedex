'use client';

// core components
import { Container, Grid } from '@mui/material';
import Card from '@/components/Card';

export default function Landing() {
  return (
    <Container maxWidth='xl' sx={{ display: 'flex', justifyContent: 'center' }}>
      <Grid
        container
        rowSpacing={4}
        sx={{
          paddingTop: '2.5rem',
          paddingBottom: '2.5rem',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundImage: 'url(/Pokeball.png)',
          backgroundAttachment: 'fixed',
          overflowY: 'auto',
        }}
      >
        <Grid item xl={3} display='flex' justifyContent='center'>
          <Card
            id='#0001'
            name='bulbasaur'
            type='grass'
            imageURL='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png'
            desc='There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.'
          />
        </Grid>
        <Grid item xl={3} display='flex' justifyContent='center'>
          <Card
            id='#0004'
            name='charmander'
            type='fire'
            imageURL='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png'
            desc='It has a preference for hot things. When it rains, steam is said to spout from the tip of its tail.'
          />
        </Grid>
        <Grid item xl={3} display='flex' justifyContent='center'>
          <Card
            id='#0007'
            name='squirtle'
            type='water'
            imageURL='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png'
            desc='When it retracts its long neck into its shell, it squirts out water with vigorous force.'
          />
        </Grid>
        <Grid item xl={3} display='flex' justifyContent='center'>
          <Card
            id='#0010'
            name='caterpie'
            type='bug'
            imageURL='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10.png'
            desc='For protection, it releases a horrible stench from the antenna on its head to drive away enemies.'
          />
        </Grid>
        <Grid item xl={3} display='flex' justifyContent='center'>
          <Card
            id='#0023'
            name='ekans'
            type='poison'
            imageURL='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/23.png'
            desc='The older it gets, the longer it grows. At night, it wraps its long body around tree branches to rest.'
          />
        </Grid>
        <Grid item xl={3} display='flex' justifyContent='center'>
          <Card
            id='#0025'
            name='pikachu'
            type='electric'
            imageURL='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png'
            desc='When several of these Pokémon gather, their electricity can build and cause lightning storms.'
          />
        </Grid>
        <Grid item xl={3} display='flex' justifyContent='center'>
          <Card
            id='#0027'
            name='sandshrew'
            type='ground'
            imageURL='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/27.png'
            desc='It loves to bathe in the grit of dry, sandy areas. By sand bathing, the Pokémon rids itself of dirt and moisture clinging to its body.'
          />
        </Grid>
        <Grid item xl={3} display='flex' justifyContent='center'>
          <Card
            id='#0035'
            name='clefairy'
            type='fairy'
            imageURL='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/35.png'
            desc='It is said that happiness will come to those who see a gathering of Clefairy dancing under a full moon.'
          />
        </Grid>
        <Grid item xl={3} display='flex' justifyContent='center'>
          <Card
            id='#0056'
            name='mankey'
            type='fighting'
            imageURL='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/56.png'
            desc='It lives in groups in the treetops. If it loses sight of its group, it becomes infuriated by its loneliness.'
          />
        </Grid>
        <Grid item xl={3} display='flex' justifyContent='center'>
          <Card
            id='#0074'
            name='geodude'
            type='rock'
            imageURL='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/74.png'
            desc='Commonly found near mountain trails and the like. If you step on one by accident, it gets angry.'
          />
        </Grid>
        <Grid item xl={3} display='flex' justifyContent='center'>
          <Card
            id='#0151'
            name='mew'
            type='psychic'
            imageURL='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/151.png'
            desc='When viewed through a microscope, this Pokémon’s short, fine, delicate hair can be seen.'
          />
        </Grid>
      </Grid>
    </Container>
  );
}
