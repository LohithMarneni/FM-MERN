import React, { useState } from 'react';

function ContactUs() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = () => {
    const mailtoLink = `mailto:lohith.marneni@gmail.com?subject=Contact Us - ${name}&body=Name: ${name}%0AEmail: ${email}%0AMessage:%0A${message}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="Login flex justify-center mt-4 h-2/3">
      <div className="bg-green-100 bg-opacity-10 backdrop-blur-sm p-8 rounded-lg shadow-lg w-full max-w-md font-mono font-bold text-center ">
        <h2 className="text-2xl mb-6 text-white hover:text-orange-400">Contact Us</h2>
        <form className="space-y-6" autoComplete="on">
          <div className='contactUsForm relative'>
            <input
              type="text"
              id="name"
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded bg-green-100 bg-opacity-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white-500 placeholder:text-green-900"
              required
            />
          </div>
          <div className='contactUsForm relative'>
            <input
              type="email"
              id="email"
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded bg-green-100 bg-opacity-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white-500 placeholder:text-green-900"
              required
            />
          </div>
          <div className='contactUsForm relative'>
            <textarea
              id="message"
              value={message}
              placeholder='Type your message here'
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2 rounded bg-green-100 bg-opacity-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white-500 placeholder:text-green-900"
              rows="4"
              required
            />
          </div>
            <button
              type="button"
              onClick={handleSend}
              className="btn w-full bg-orange-200 text-green-900 py-2 rounded hover:bg-orange-600 hover:text-white"
            >
              Send
            </button>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
