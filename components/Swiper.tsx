import { Swiper, SwiperSlide } from 'swiper/react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

// required modules
import { EffectCoverflow, Navigation, Pagination } from 'swiper';
import { SwiperPropsType } from '@/types/Swiper';

// swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

export default function SwiperComponent(props: SwiperPropsType) {
  // format string function
  function formatString(input: string): string {
    const words = input.split('-');
    const formattedString = words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return formattedString;
  }

  return (
    <>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        navigation={true}
        centeredSlides={true}
        slidesPerView={2}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={false}
        modules={[EffectCoverflow, Navigation, Pagination]}
        className='mySwiper'
      >
        {props.names.map((name, index) => {
          return (
            <SwiperSlide key={index}>
              <Box
                sx={{
                  height: '10rem',
                  width: '100%',
                  position: 'relative',
                }}
              >
                <Image
                  fill
                  priority
                  alt={name}
                  src={
                    props.images[index]
                      ? props.images[index]
                      : '/Pokemon-001.gif'
                  }
                  style={{ objectFit: 'contain' }}
                  sizes='(min-width: 600px) 101.25px, (min-width: 960px) 112.50px, (min-width: 1280px) 135px, (min-width: 1920px) 146.25px, 96.75px'
                />
              </Box>
              <Box
                my={1}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography variant='body1' fontWeight={700}>
                  {formatString(name)}
                </Typography>
              </Box>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
