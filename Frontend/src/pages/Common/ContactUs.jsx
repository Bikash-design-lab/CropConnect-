import React, { useState, useRef, useEffect } from "react";
import { MapPin, Mail, Phone } from "lucide-react";
import { toast } from "react-toastify";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const dialogTextareaRef = useRef(null);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640); // Tailwind's 'sm' breakpoint
    };
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent background scrolling when dialog is open
  useEffect(() => {
    if (isDialogOpen && !isSmallScreen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isDialogOpen, isSmallScreen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Thank you for your patience.");
  };

  const openDialog = () => {
    if (!isSmallScreen) {
      setIsDialogOpen(true);
      setTimeout(() => {
        if (dialogTextareaRef.current) {
          dialogTextareaRef.current.focus();
        }
      }, 0); // Ensure focus after dialog opens
    }
  };

  const handleDialogBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setFormData((prev) => ({
        ...prev,
        message: dialogTextareaRef.current.value,
      }));
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-2 sm:px-4 lg:px-6 sm:py-6 lg:py-2 ">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10 h-full w-full">
        <img
          src="https://res.cloudinary.com/doavbw5k7/image/upload/v1756971080/contact_nhg5lr.jpg"
          alt="Contact Us"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Contact Form Container */}
      <div className="relative max-w-full w-full sm:max-w-3xl lg:max-w-5xl bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden mx-2 sm:mx-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 py-3 sm:py-4 lg:py-6 px-3 sm:px-6 lg:px-8 text-white text-center rounded-t-2xl">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-200">
            📞 Contact Us
          </h1>
          <p className="text-xs sm:text-sm lg:text-base text-blue-100">We'd love to hear from you!</p>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4 lg:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {/* Form Section */}
            <div className="space-y-3 sm:space-y-4 lg:space-y-6">
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-xs sm:text-sm lg:text-base font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-2 sm:px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-xs sm:text-sm lg:text-base"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm lg:text-base font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    placeholder="Enter email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-2 sm:px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-xs sm:text-sm lg:text-base"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm lg:text-base font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Type your message..."
                    rows="3"
                    className={`w-full px-2 sm:px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-xs sm:text-sm lg:text-base ${isSmallScreen ? "resize-y" : "cursor-pointer"
                      }`}
                    onClick={openDialog}
                    readOnly={!isSmallScreen} // Editable on small screens
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-2 px-4 rounded-lg hover:brightness-110 transition font-medium text-xs sm:text-sm lg:text-base shadow"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-3 sm:space-y-4 lg:space-y-6">
              <div className="bg-blue-50/80 p-3 sm:p-4 lg:p-6 rounded-xl shadow-inner">
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-blue-900 mb-2 sm:mb-3 lg:mb-4">
                  Contact Information
                </h3>
                <div className="space-y-2 sm:space-y-3 lg:space-y-4 text-blue-800 text-xs sm:text-sm lg:text-base">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-3 sm:w-4 lg:w-5 h-3 sm:h-4 lg:h-5" />
                    <span>contact@CropConnect.com</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-3 sm:w-4 lg:w-5 h-3 sm:h-4 lg:h-5" />
                    <span>+91 92345 67890</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-3 sm:w-4 lg:w-5 h-3 sm:h-4 lg:h-5" />
                    <span>123 Business Street, India</span>
                  </div>
                </div>
              </div>

              {/* Map Section */}
              <div className="rounded-xl overflow-hidden h-24 sm:h-32 lg:h-40 shadow-md">
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

      {/* Dialog for Message Input (disabled on small screens) */}
      {isDialogOpen && !isSmallScreen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4"
          onBlur={handleDialogBlur}
          tabIndex={-1}
        >
          <div className="bg-white rounded-2xl p-4 sm:p-6 max-w-full w-full sm:max-w-md lg:max-w-lg shadow-2xl max-h-[80vh] overflow-y-auto">
            <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
              Type Your Message
            </h2>
            <textarea
              ref={dialogTextareaRef}
              name="message"
              defaultValue={formData.message}
              placeholder="Type your message..."
              rows="5"
              className="w-full px-2 sm:px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 transition resize-y text-xs sm:text-sm lg:text-base"
              autoFocus
            />
            <div className="mt-3 sm:mt-4 flex justify-end space-x-2">
              <button
                className="bg-gray-300 text-gray-800 py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg hover:bg-gray-400 transition font-medium text-xs sm:text-sm"
                onClick={() => setIsDialogOpen(false)}
              >
                Close
              </button>
              <button
                className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg hover:brightness-110 transition font-medium text-xs sm:text-sm"
                onClick={() => {
                  setFormData((prev) => ({
                    ...prev,
                    message: dialogTextareaRef.current.value,
                  }));
                  setIsDialogOpen(false);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactUs;