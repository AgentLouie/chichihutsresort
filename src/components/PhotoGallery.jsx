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
    <section className="py-20 bg-whiteCustom px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8">
        {/* Left: Text Content */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-montserrat font-semibold text-orangeCustom mb-4">
            Photo Gallery
          </h2>
          <p className="text-lg font-montserrat text-orangeCustom leading-relaxed">
            Explore the beauty of ChiChi Huts Resort through our gallery.
          </p>
        </div>

        {/* Right: Swiper Gallery */}
        <div className="w-full md:w-1/2">
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
            className="w-full"
          >
            {images.map((src, index) => (
              <SwiperSlide key={index}>
                <img
                  src={src}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-[300px] md:h-[400px] object-cover rounded-lg shadow-md"
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
      </div>
    </section>
  );
};

export default PhotoGallery;
