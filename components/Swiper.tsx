import { Swiper, SwiperSlide } from 'swiper/react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

// required modules
import { EffectCoverflow, Pagination } from 'swiper';
import { SwiperPropsType } from '@/types/Swiper';

// swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

export default function SwiperComponent(props: SwiperPropsType) {
  return (
    <>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className='mySwiper'
      >
        {props.names.map((name, index) => {
          return (
            <SwiperSlide key={index}>
              <Box
                sx={{ height: '10rem', width: '100%', position: 'relative' }}
              >
                <Image
                  fill
                  priority
                  quality={100}
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
              <Typography>{name}</Typography>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
