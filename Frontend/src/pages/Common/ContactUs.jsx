import React, { useState } from "react";
import { MapPin, Mail, Phone } from "lucide-react";
import contact from "../../Accets/contact.jpg";
import { toast } from "react-toastify";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Thank you for your patience.");
  };

  return (
    <div className="relative min-h-[50vh] sm:min-h-[55vh] lg:min-h-[60vh] flex items-center justify-center px-3 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://res.cloudinary.com/doavbw5k7/image/upload/v1756971080/contact_nhg5lr.jpg"
          alt="Contact Us"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Contact Form Container */}
      <div className="relative max-w-5xl w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 py-4 sm:py-6 px-4 sm:px-8 text-white text-center rounded-t-2xl">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-200">
            📞 Contact Us
          </h1>
          <p className="text-xs sm:text-sm text-blue-100">We'd love to hear from you!</p>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Form Section */}
            <div className="space-y-4 sm:space-y-6">
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-2 sm:px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    placeholder="Enter email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-2 sm:px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Type your message..."
                    rows="3"
                    className="w-full px-2 sm:px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 transition resize-none text-sm"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-2 px-4 rounded-lg hover:brightness-110 transition font-medium shadow text-sm sm:text-base"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-blue-50/80 p-4 sm:p-6 rounded-xl shadow-inner">
                <h3 className="text-base sm:text-lg font-semibold text-blue-900 mb-3 sm:mb-4">
                  Contact Information
                </h3>
                <div className="space-y-3 sm:space-y-4 text-blue-800 text-sm sm:text-base">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>contact@CropConnect.com</span>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>+91 92345 67890</span>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>123 Business Street, India</span>
                  </div>
                </div>
              </div>

              {/* Map Section */}
              <div className="rounded-xl overflow-hidden h-32 sm:h-40 lg:h-40 shadow-md">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30773484.55170563!2d61.02451656116589!3d19.69009515037612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1734818086329!5m2!1sen!2sin"
                  className="w-full h-full border-0"
                  allowFullScreen=""
                  loading="lazy"
                  title="Location Map"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ContactUs;
