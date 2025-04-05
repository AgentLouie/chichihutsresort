import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { X } from 'lucide-react';
import { db, collection, addDoc } from '../firebase';
import emailjs from '@emailjs/browser';
import introVideo from '../assets/Video1.mp4';
import ReCAPTCHA from "react-google-recaptcha";


const BookingForm = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    mobile: Yup.string().matches(/^[0-9]+$/, 'Only numbers are allowed').required('Required'),
    roomType: Yup.string().required('Please select a room type'),
    numberOfPeople: Yup.number().min(1, 'Must be at least 1').required('Required'),
    checkInDate: Yup.date().required('Required'),
    checkOutDate: Yup.date()
      .required('Required')
      .min(Yup.ref('checkInDate'), 'Check-out date must be after check-in'),
    message: Yup.string(),
  });

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  const [recaptchaToken, setRecaptchaToken] = useState(null);


  const handleSubmit = async (values, { resetForm }) => {
    try {
      await addDoc(collection(db, 'bookings'), values);
      console.log('Booking stored in Firebase:', values);

      sendEmail(values);
  
      setShowSuccess(true);
      resetForm();
  
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving booking:', error);
      alert('Failed to submit booking.');
    }
  };

  const sendEmail = (values) => {
    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: values.name,
          email: values.email,
          mobile: values.mobile,
          roomType: values.roomType,
          numberOfPeople: values.numberOfPeople,
          checkInDate: values.checkInDate,
          checkOutDate: values.checkOutDate,
          message: values.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        (response) => {
          console.log('Email Sent Successfully', response.status, response.text);
        },
        (error) => {
          console.log('Failed To Sent Email', error);
        }
      );
  };


  return (
    <div>
      {/*Contact Us*/}
      <section className="relative h-96">
        <video
          src={introVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60" />
        <div className="absolute top-1/2 left-8 md:left-16 transform -translate-y-1/2 opacity-80 font-bebas">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-7xl font-bold text-orange-500">Contact Us</h1>
            <p className="mt-2 text-lg md:text-xl">We’d love to hear from you!</p>
          </div>
        </div>
      </section>

      {/*Booking Form Section*/}
      <div className="max-w-6xl mx-auto my-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-3xl font-bebas text-orangeCustom mb-4">Get In Touch</h2>
          <Formik
            initialValues={{
              name: '',
              email: '',
              mobile: '',
              roomType: '',
              numberOfPeople: '',
              checkInDate: '',
              checkOutDate: '',
              message: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isValid }) => (
              <Form className="space-y-4">
                {/*Name and Email*/}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-bebas font-medium">Your Name *</label>
                    <Field
                      type="text"
                      name="name"
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
                    />
                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-bebas font-medium">Email *</label>
                    <Field
                      type="email"
                      name="email"
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                  </div>
                </div>

                {/*Mobile and RoomType*/}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-bebas font-medium">Mobile Number *</label>
                    <Field
                      type="text"
                      name="mobile"
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
                    />
                    <ErrorMessage name="mobile" component="div" className="text-red-500 text-sm" />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-bebas font-medium">Room Type *</label>
                    <Field
                      as="select"
                      name="roomType"
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
                    >
                      <option value="" label="Select room type" />
                      <option value="Huts With Aircon + Fan" label="Huts With Aircon + Fan" />
                      <option value="Huts Without Aircon + Fan" label="Huts With Fan" />
                    </Field>
                    <ErrorMessage name="roomType" component="div" className="text-red-500 text-sm" />
                  </div>
                </div>

                {/*Number of People*/}
                <div>
                  <label className="block text-gray-700 font-bebas font-medium">Number of People *</label>
                  <Field
                    type="number"
                    name="numberOfPeople"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
                  />
                  <ErrorMessage name="numberOfPeople" component="div" className="text-red-500 text-sm" />
                </div>

                {/*Check-in and Check-out Dates*/}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-bebas font-medium">Check-In Date *</label>
                    <Field
                      type="date"
                      name="checkInDate"
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
                    />
                    <ErrorMessage name="checkInDate" component="div" className="text-red-500 text-sm" />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-bebas font-medium">Check-Out Date *</label>
                    <Field
                      type="date"
                      name="checkOutDate"
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
                    />
                    <ErrorMessage name="checkOutDate" component="div" className="text-red-500 text-sm" />
                  </div>
                </div>

                {/*Message*/}
                <div>
                  <label className="text-gray-700 font-bebas font-medium">Message</label>
                  <Field as="textarea" name="message" rows="4" className="w-full border rounded-md" />
                </div>

                {/*Privacy Policy Checkbox*/}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="privacy"
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                    className="mr-2 h-5 w-5 text-orange-500 focus:ring-2 focus:ring-orange-300"
                  />
                  <label htmlFor="privacy" className="text-gray-700 font-bebas">
                    By sending this form you agree to our{' '}
                    <button type="button" className="text-orange-500 font-bebas hover:underline" onClick={() => setIsModalOpen(true)}>
                      privacy policy.
                    </button>
                  </label>
                </div>
                <ReCAPTCHA
                  sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                  onChange={handleRecaptchaChange}
                  className="scale-90 transform origin-left"
                />
                {/*Submit Button*/}
                <button
                  type="submit"
                  disabled={!isChecked || !isValid || !recaptchaToken}
                  className={`w-full py-3 rounded-lg text-white font-medium transition ${
                    isChecked && isValid ? 'bg-orange-500 hover:bg-orange-600' : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  Send
                </button>
              </Form>
            )}
          </Formik>
        </div>
        {/* (Contact Info) */}
        <div className="bg-gray-100 p-6 rounded-md">
        {/* Address Section */}
        <div>
          <div className="flex items-center space-x-3">
            <span className="text-orange-500">📍</span>
            <span className="text-orange-500 font-serif font-medium uppercase text-sm">
              Address
            </span>
          </div>
          <p className="text-gray-800 font-serif mt-1">
            Coastal Road, Sitio Tektek, Brgy. Sindol, San Felipe, Philippines, 2204
          </p>
        </div>

        {/* Hotline Section */}
        <div>
          <div className="flex items-center space-x-3">
            <span className="text-orange-500">📞</span>
            <span className="text-orange-500 font-serif font-medium uppercase text-sm">
              Hot Line
            </span>
          </div>
          <p className="text-gray-800 font-serif mt-1">
            0977 471 7299
          </p>
        </div>

        {/* Email Section */}
        <div>
          <div className="flex items-center space-x-3">
            <span className="text-orange-500">✉️</span>
            <span className="text-gray-500 font-serif font-medium uppercase text-sm">
              Email
            </span>
          </div>
          <p className="text-gray-800 mt-1">
            <a
              href="mailto:info@mangroveresortsubic.com"
              className="text-orange-500 hover:underline font-serif"
            >
              chichihutsresort07@gmail.com
            </a>
          </p>
        </div>
        {/* Google Maps */}
        <div className="mt-4">
        <h1 className="text-2xl text-orange-500 font-bebas">Location</h1>
        <iframe
          title="Chichi Huts Resort Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1926.0670651604707!2d120.0516784610783!3d15.09593450322191!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33942d50cd01c553%3A0xf55464a2b63e654b!2sChichi%20Huts%20Resort!5e0!3m2!1sen!2sph!4v1742728194971!5m2!1sen!2sph"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-md shadow-md">
        </iframe>
        </div>
      </div>
      </div>
      {/*Privacy Policy*/}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={() => setIsModalOpen(false)}>
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md max-h-[90vh] overflow-y-auto relative" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-2 right-2 p-1 rounded-full" onClick={() => setIsModalOpen(false)}>
              <X className="w-5 h-5 text-orange-600" />
            </button>
            <h2 className="text-xl font-bold font-serif mb-2">Privacy Policy</h2>
            <p className="font-montserrat text-gray-600">
              Welcome to Chichi Huts Resort. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our website chichihutsresort.com and use our booking services. By using our website and services, you consent to the practices described in this policy.
            </p>
            <br />
            <h2 className="text-xl font-bold font-serif mb-2">Information We Collect</h2>
            <p className="font-montserrat text-gray-600">
            We may collect your name, email, phone number, and other details when you fill out forms.
            </p>
            <br />
            <h2 className="text-xl font-bold font-serif mb-2">Information Sharing</h2>
            <p className="font-montserrat text-gray-600">
              We do not sell or share your information with non-affiliated companies, except with your consent or when required by law.
            </p>
            <p className="font-montserrat text-gray-600">
              We may share your information with trusted third-party service providers to assist us in operating our website and conducting our business, as long as those parties agree to keep this information confidential.
            </p>
            <br />
            <h2 className="text-xl font-bold font-serif mb-2">Changes to This Policy</h2>
            <p className="font-montserrat text-gray-600">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on our website. You are advised to review this Privacy Policy periodically for any changes.
            </p>
            <br />
            <h2 className="text-xl font-bold font-serif mb-2">Contact Us</h2>
            <p className="font-montserrat text-gray-600">
              If you have any questions about this Privacy Policy, please contact us at:
              <br />
              <strong>Facebook</strong>
              <br />
              https://www.facebook.com/ChiChiHutsResort
              <br />
              <strong>Phone</strong>
              <br />
              0977 471 7299
            </p>
          </div>
        </div>
      )}
      {showSuccess && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg">
          ✅ Thank you for booking! We will get back to you soon.
        </div>
      )}
    </div>
  );
};

export default BookingForm;
