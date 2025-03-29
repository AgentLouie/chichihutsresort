import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import roomVideo from '../assets/Video1.mp4';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { BsSnow, BsFan } from 'react-icons/bs';

import room1 from '../assets/room1.jpg';
import room2 from '../assets/room2.jpg';
import room11 from '../assets/room11.jpg';
import room22 from '../assets/room22.jpg';
import cottage1 from '../assets/cottage1.jpg';
import cottage11 from '../assets/cottage11.jpg';
import hutsImg from '../assets/huts.jpg';

const Rooms = () => {
  const navigate = useNavigate();
  return (
    <div>
            {/* Video Intro */}
        <div className="relative w-full h-[400px] overflow-hidden">
          <video
            src={roomVideo}
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-start">
          <div className="text-center px-8">
            <h1 className="text-4xl font-montserrat font-extrabold text-orangeCustom uppercase tracking-wide opacity-80">
              Rooms & Cottages
            </h1>
            <p className="text-lg font-montserrat text-whiteCustom mt-2 opacity-80">
              Relax and enjoy your stay with our premium accommodations.
            </p>
          </div>
        </div>
      </div>

      {/* Room */}
      <div className="mb-10">
        <h1 className="text-4xl font-montserrat font-extrabold text-orangeCustom text-center ont-bold mb-20 mt-10">Rooms & Cottages</h1>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          className="w-full max-w-3xl mx-auto"
        >
          {/* First View */}
          <SwiperSlide>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img src={room1} alt="Deluxe Room" className="w-full h-64 object-contain" />
              <div className="p-4">
                <h3 className="text-xl font-montserrat font-bold">Huts</h3>
                <div className="flex items-center gap-2 mt-2 text-orange-500">
                  <BsSnow className="text-2xl" />
                  <BsFan className="text-2xl" />
                  <p className="text-lg font-montserrat font-medium">₱500 per person (Min. 3 people = ₱2000)</p>
                </div>
                <p className="font-montserrat text-gray-600 mt-2">
                  Huts With AC + FAN.
                </p>
              </div>
            </div>
          </SwiperSlide>

          {/* Second View */}
          <SwiperSlide>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img src={room11} alt="Deluxe Room" className="w-full h-64 object-contain" />
              <div className="p-4">
                <h3 className="text-xl font-montserrat font-bold">Deluxe Room</h3>
                <div className="flex items-center gap-2 mt-2 text-orange-500">
                  <BsSnow className="text-2xl" />
                  <BsFan className="text-2xl" />
                  <p className="text-lg font-montserrat font-medium">₱500 per person (Min. 3 people = ₱2000)</p>
                </div>
                <p className="font-montserrat text-gray-600 mt-2">
                  Huts With AC + FAN.
                </p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* HUTS */}
      <div className="mb-10">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          className="w-full max-w-3xl mx-auto"
        >
          {/* First View */}
          <SwiperSlide>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img src={room2} alt="Executive Suite" className="w-full h-64 object-contain" />
              <div className="p-4">
                <h3 className="text-xl font-montserrat font-bold">Huts</h3>
                <div className="flex items-center gap-2 mt-2 text-orange-500">
                  <BsFan className="text-2xl" />
                  <p className="text-lg font-montserrat font-medium">₱500 per person (Min. 3 people = ₱1500)</p>
                </div>
                <p className="font-montserrat text-gray-600 mt-2">
                  Huts With FAN.
                </p>
              </div>
            </div>
          </SwiperSlide>

          {/* Second View */}
          <SwiperSlide>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img src={room22} alt="Executive Suite" className="w-full h-64 object-contain" />
              <div className="p-4">
                <h3 className="text-xl font-montserrat font-bold">Huts</h3>
                <div className="flex items-center gap-2 mt-2 text-orange-500">
                  <BsSnow className="text-2xl" />
                  <p className="text-lg font-montserrat font-medium">₱500 per person (Min. 3 people = ₱1500)</p>
                </div>
                <p className="font-montserrat text-gray-600 mt-2">
                  Huts With FAN.
                </p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Cottages */}
      <div className="mb-10">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          className="w-full max-w-3xl mx-auto"
        >
          {/* Beachfront Cottage */}
          <SwiperSlide>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img src={cottage1} alt="Beachfront Cottage" className="w-full h-64 object-contain" />
              <div className="p-4">
                <h3 className="text-xl font-montserrat font-bold">Beachfront Cottage</h3>
                <div className="flex items-center gap-2 mt-2 text-orange-500">
                  <p className="text-lg font-montserrat font-medium">₱500</p>
                </div>
                <p className="font-montserrat text-gray-600 mt-2">
                  Cozy beachfront cottage with modern amenities.
                </p>
              </div>
            </div>
          </SwiperSlide>

          {/* Cottage */}
          <SwiperSlide>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img src={cottage11} alt="Garden View Cottage" className="w-full h-64 object-contain" />
              <div className="p-4">
                <h3 className="text-xl font-montserrat font-bold">Beachfront Cottage</h3>
                <div className="flex items-center gap-2 mt-2 text-orange-500">
                  <p className="text-lg font-montserrat font-medium">₱500 per person</p>
                </div>
                <p className="font-montserrat text-gray-600 mt-2">
                  Charming cottage with directly looking towards beachfront.
                </p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      
      <section
        className="relative text-center py-20 px-4 md:px-16 bg-cover bg-center bg-no-repeat"
        style={{
        backgroundImage: `url(${hutsImg})`
        }}
        >
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>
      
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-montserrat font-semibold text-white opacity-80">
            Ready to book your stay?
          </h2>
          <p className="mt-2 text-lg text-white opacity-80">
            Call us at: <span className="font-montserrat font-bold opacity-80">+63 900 123 4567</span>
          </p>
          <button onClick={() => {
            navigate('/contact');
            }} className="mt-6 bg-white text-orange-500 px-8 py-3 rounded-full opacity-80 
          hover:bg-gray-100 transition duration-300">
            Book Now
          </button>
        </div>
      </section>
      <div className="mb-20 bg-whiteCustom"></div>
    </div>
  );
};

export default Rooms;
