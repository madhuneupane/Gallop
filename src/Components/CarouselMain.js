import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { EffectCoverflow, Pagination } from "swiper";
import image1 from "../Assets/Images/helena-lopes-lIeqGEdvex0-unsplash.jpg";
import image2 from "../Assets/Images/luisa-peter-Olt577JtPM0-unsplash.jpg";
import image3 from "../Assets/Images/mikayla-storms-9h_bJdGqzCk-unsplash.jpg";
import image4 from "../Assets/Images/pieter-van-noorden-cjSUZMA2iW8-unsplash.jpg";

export function CarouselMain() {
  return (
    <div className="carouselMain">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide><img alt="Horse 1" src={image1} /></SwiperSlide>
        <SwiperSlide><img alt="Horse 2" src={image2} /></SwiperSlide>
        <SwiperSlide><img alt="Horse 3" src={image3} /></SwiperSlide>
        <SwiperSlide><img alt="Horse 4" src={image4} /></SwiperSlide>
      </Swiper>
    </div>
  );
}
