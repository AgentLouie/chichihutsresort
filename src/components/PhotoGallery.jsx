import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import swiper1 from '../assets/swiper1.jpg';
import swiper2 from '../assets/swiper2.jpg';
import swiper3 from '../assets/swiper3.jpg';
import swiper4 from '../assets/swiper4.jpg';
import swiper5 from '../assets/swiper5.jpg';
import swiper6 from '../assets/swiper6.jpg';
import swiper7 from '../assets/swiper7.jpg';

const PhotoGallery = () => {
  const images = [swiper1, swiper2, swiper3, swiper4, swiper5, swiper6, swiper7];

  return (
    <div className="my-8 px-4 bg-whiteCustom">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{
          clickable: true,
          el: '.swiper-pagination',
        }}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="w-full max-w-4xl mx-auto"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-[500px] object-cover rounded-lg shadow-md"
            />
          </SwiperSlide>
        ))}
        {/* navigation buttons */}
        <div className="swiper-button-next !text-orange-500 hover:!text-orange-700"></div>
        <div className="swiper-button-prev !text-orange-500 hover:!text-orange-700"></div>
        {/* pagination container */}
        <div className="swiper-pagination !bottom-0"></div>
      </Swiper>
    </div>
  );
};

export default PhotoGallery;