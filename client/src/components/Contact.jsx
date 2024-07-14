import { useState } from 'react';
import emailjs from '@emailjs/browser';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Ensure Font Awesome is imported

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stateMessage, setStateMessage] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs
      .sendForm(
        'service_xitsyxk',
        'template_c6o8646',
        e.target,
        'SsPDxBPGWiWRatgMj'
      )
      .then(
        (result) => {
          console.log(result.text);
          setStateMessage('Message sent!');
          setIsSubmitting(false);
          setTimeout(() => {
            setStateMessage(null);
          }, 5000);
        },
        (error) => {
          console.log(error.text);
          setStateMessage('Something went wrong, please try again later');
          setIsSubmitting(false);
          setTimeout(() => {
            setStateMessage(null);
          }, 5000);
        }
      );
    e.target.reset();
  };

  return (
    <div className="py-16 bg-gray-100" id="contact">
      <div className="container mx-auto px-6">
        <h3 className="text-3xl font-bold text-center mb-8">Contact Me</h3>

        <div className="flex flex-wrap justify-center gap-8">
          <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
            <form onSubmit={sendEmail} className="space-y-4">
              <input
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-roboto"
                placeholder="Name"
                name="from_name"
                required
              />
              <input
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-roboto"
                placeholder="Email"
                type="email"
                name="email_id"
                required
              />
              <textarea
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-roboto"
                id="c-textarea"
                placeholder="Message"
                name="message"
                rows="4"
                required
              />
              <button
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 font-roboto"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send'}
              </button>
              {stateMessage && (
                <p className={`text-center mt-4 ${stateMessage.includes('Sent') ? 'text-green-500' : 'text-red-500'} font-roboto`}>
                  {stateMessage}
                </p>
              )}
            </form>
          </div>
          <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 font-roboto">
            <div className="space-y-6 text-center">
              <div className="flex flex-col items-center space-y-4 border-b border-gray-200 pb-4">
                <i className="fas fa-location-dot text-2xl text-blue-500"></i>
                <div>
                  <p className="text-lg font-semibold">Address:</p>
                  <p className="text-gray-600">Rajkot, Gujarat, India</p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 border-b border-gray-200 pb-4">
                <i className="fas fa-envelope text-2xl text-blue-500"></i>
                <div>
                  <p className="text-lg font-semibold">Email :</p>
                  <p className="text-gray-600">admin@gmail.com</p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <i className="fas fa-phone text-2xl text-blue-500"></i>
                <div>
                  <p className="text-lg font-semibold">Contact No.</p>
                  <p className="text-gray-600">+91 xxxxxxxxxx</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
