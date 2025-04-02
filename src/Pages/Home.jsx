import { useNavigate } from 'react-router-dom';
import React from 'react';
import introVideo from '../assets/Video1.mp4';
import hutsImg from '../assets/huts.jpg';
import cottageImg from '../assets/cottage.jpg';
import beachImg from '../assets/beach.jpg';
import PhotoGallery from '../components/PhotoGallery';
import user1 from '../assets/user1.jpg';

const amenitiesPreview = [
  { name: 'Huts', img: hutsImg },
  { name: 'Cottages', img: cottageImg },
  { name: 'Beachfront', img: beachImg },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-whiteCustom">
      {/* Video Background */}
      <section className="relative h-screen w-full">
        <video
          src={introVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/50 to-black/20" />
        <div className="absolute top-1/2 left-8 md:left-16 transform -translate-y-1/2">
          <h1 className="text-5xl md:text-7xl lg:text-7xl font-montserrat text-orange-500 font-bold opacity-80">
            ChiChi
          </h1>
          <h1 className="text-3xl md:text-5xl lg:text-5xl font-montserrat text-gray-400 font-bold opacity-80">
            Huts
          </h1>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-montserrat text-gray-300 font-bold opacity-80">
            Resort
          </h1>
          <p className="mt-4 text-lg md:text-xl font-montserrat text-gray-200 opacity-80">
            Escape the everyday and find your peace
          </p>
          <p className="mt-4 text-lg md:text-xl font-montserrat text-gray-200 opacity-80">
            in our serene environment, perfect for unwinding
          </p>
          <p className="mt-4 text-lg md:text-xl font-montserrat text-gray-200 opacity-80">
            and rejuvenating.
          </p>
          <button
            onClick={() => navigate('/rooms')}
            className="mt-8 bg-orange-500 text-white px-8 py-3 rounded-full hover:bg-orange-600 transition duration-300 opacity-80"
          >
            Explore Rooms
          </button>
        </div>
      </section>

      {/* Room Section */}
      <section id="amenities" className="py-20 px-4 md:px-16">
        <h2 className="text-3xl md:text-4xl font-montserrat text-center font-semibold text-orangeCustom mb-8">
          Rooms
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {amenitiesPreview.map((amenity, index) => (
            <div
              key={index}
              className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={amenity.img}
                alt={amenity.name}
                className="w-full h-80 object-cover transform hover:scale-105 transition-transform duration-300"
              />
              <div className="p-6 bg-white">
                <h3 className="text-xl font-montserrat text-orangeCustom font-semibold mb-2">{amenity.name}</h3>
                <p className="text-orangeCustom">Discover our {amenity.name.toLowerCase()}.</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/rooms')}
            className="bg-orange-500 text-white px-8 py-3 rounded-full hover:bg-orange-600 transition duration-300"
          >
            View More
          </button>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-20 bg-whiteCustom">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-montserrat font-semibold text-orangeCustom text-center mb-4">
            Photo Gallery
          </h2>
          <p className="text-lg font-montserrat font- text-orangeCustom text-center mb-8">
            Explore the beauty of ChiChi Huts Resort through our gallery.
          </p>
          <PhotoGallery />
        </div>
      </section>

      {/* Location */}
      <section id="location" className="py-20 px-4 md:px-16">
        <h2 className="text-3xl md:text-4xl font-montserrat font-semibold text-orangeCustom text-center mb-8">Our Location</h2>
        <p className='text-orangeCustom'>
          Coastal Road, Sitio Tektek, Brgy. Sindol, San Felipe, Philippines, 2204
        </p>
        <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1926.0670651604707!2d120.0516784610783!3d15.09593450322191!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33942d50cd01c553%3A0xf55464a2b63e654b!2sChichi%20Huts%20Resort!5e0!3m2!1sen!2sph!4v1742728194971!5m2!1sen!2sph"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>

      {/* Guest Feedback */}
      <section id="feedback" className="py-20 bg-whiteCustom px-4 md:px-16">
        <h2 className="text-3xl md:text-4xl font-montserrat font-semibold text-center mb-8">
          Guest Feedback
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center mb-2">
              <img
                src={user1}
                alt="user1"
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <p className="font-semibold text-orangeCustom font-montserrat">Ailene Aycardo</p>
                <div className="flex text-orange-400">
                  {'★★★★★'}
                </div>
              </div>
            </div>
            <p className="text-gray-600 font-monsterrat">
              "Thank you so much, ChiChi Huts Resort. Ang babait lahat ng staff, accommodating, friendly and approachable. Ang ganda ng place, malinis, kumpleto sa gamit, not crowded and pet-friendly. Yung beach, fine sand and also not crowded even though holy week kami nagpunta. Highly recommended ang resort, we would definitely come back. 🤍"
            </p>
          </div>
          </div>
        </section>

        <section
          className="relative text-center py-20 px-4 md:px-16 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${hutsImg})`
          }}
          >
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>

          {/* Contact */}
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-montserrat font-semibold text-orangeCustom opacity-80">
              Ready to book your stay?
            </h2>
            <p className="mt-2 text-lg text-white opacity-90">
              Call us at: <span className="font-montserrat font-bold opacity-80">+63 977 471 7299</span>
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

export default Home;