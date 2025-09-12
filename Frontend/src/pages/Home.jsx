import React from "react";
import {
  Leaf,
  ShieldCheck,
  Truck,
  PackageCheck,
  MapPin,
  LockKeyhole,
  PhoneCall,
} from "lucide-react";
import { Link } from "react-router-dom";
import StatisticalData from "./Creators/StatisticalData";
import { motion } from "framer-motion";

const Home = () => {
  let states = [
    "MP",
    "Maharashtra",
    "Rajasthan",
    "Gujarat",
    "Odisha",
    "Karnataka",
    "Sikkim",
    "Uttar Pradesh",
  ];

  const loopStates = [...states, ...states, ...states];

  return (
    <div className="w-full bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="w-full bg-green-100 py-12 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold leading-snug text-green-800 mb-6">
            Bridging Farmers and Buyers with Trust & Technology
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto text-sm sm:text-lg leading-relaxed">
            CropConnect empowers farmers by enabling them to directly showcase
            and sell their produce—complete with certification, pricing, and
            location—eliminating middlemen and boosting incomes.
          </p>
        </div>
      </section>

      {/* Organic Farming */}
      <section className="w-full py-12 px-4 sm:px-8 lg:px-16 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-xl sm:text-2xl lg:text-4xl font-bold text-green-700 mb-8">
            Growing Organic Movement 🍃
          </h3>
          <p className="text-gray-700 max-w-4xl mx-auto mb-6 text-sm sm:text-lg leading-relaxed">
            India leads globally with over 4.4 million organic farmers—and has
            nearly 2.78 million hectares under certification, though it
            comprises just ~2% of national farmland.
          </p>

          {/* Infinite carousel for states */}
          <div className="relative overflow-hidden w-full">
            <motion.div
              className="flex gap-4 whitespace-nowrap"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                repeat: Infinity,
                duration: 25,
                ease: "linear",
              }}
            >
              {loopStates.map((state, idx) => (
                <div
                  key={idx}
                  className="border border-green-300 bg-white py-3 px-6 rounded-xl shadow-sm text-gray-700 inline-block min-w-[120px] sm:min-w-[160px] text-center text-sm sm:text-base hover:shadow-md transition"
                >
                  {state}
                </div>
              ))}
            </motion.div>
          </div>

          <p className="text-xs sm:text-sm text-gray-500 mt-4">
            (Top organic states per APEDA 2022-23)
          </p>
        </div>
      </section>

      {/* Statistical Highlights */}
      <StatisticalData />

      {/* Snapshot Facts */}
      <section className="w-full py-12 px-4 sm:px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-xl sm:text-2xl lg:text-4xl font-bold text-green-700 mb-10">
            India's Agriculture Snapshot 📊
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <FactCard number="16 %" label="of GDP from agriculture" />
            <FactCard
              number="394 million acres"
              label="Arable land (world's 2nd largest)"
            />
            <FactCard number="48.3 %" label="of cropland is irrigated" />
            <FactCard number="354 MT" label="Food grains output (2025 est.)" />
          </div>
        </div>
      </section>


      {/* Features */}
      <section className="w-full py-4 px-4 sm:px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-xl sm:text-2xl lg:text-4xl font-bold text-green-700 mb-10">
            Key Features
          </h3>
          <div className="grid grid-cols-4 gap-4">
            {[
              {
                icon: Leaf,
                title: "Organic Listings",
                desc: "Upload certified organic produce with transparent pricing and verification.",
              },
              {
                icon: MapPin,
                title: "Smart Filters",
                desc: "Easily search crops by category, variety, or location for quick access.",
              },
              {
                icon: ShieldCheck,
                title: "Verification",
                desc: "Secure and reliable trading through verified accounts and listings.",
              },
              {
                icon: PackageCheck,
                title: "Weather Insights",
                desc: "Stay informed with real-time, crop-friendly weather updates and alerts.",
              },
              {
                icon: LockKeyhole,
                title: "Secure Login",
                desc: "Protect your account with JWT-secured login and password reset options.",
              },
              {
                icon: Truck,
                title: "Direct Sales",
                desc: "Eliminate middlemen by connecting directly with trusted farmers and buyers.",
              },
              {
                icon: LockKeyhole,
                title: "Role-Based Access",
                desc: "Manage access and permissions securely based on user roles and rights.",
              },
              {
                icon: Truck,
                title: "Seasonal Crop Guides",
                desc: "Access guides and resources to grow crops effectively each season.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-green-50 p-6 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center space-y-3"
              >
                <Icon className="w-8 h-8 text-green-600" />
                <p className="font-semibold sm:text-xl text-green-800 text-center">
                  {title}
                </p>
                <p className="hidden sm:block text-sm sm:text-base text-gray-600 leading-relaxed text-center">
                  {desc}
                </p>

              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Call to Action */}
      <section className="w-full py-2 px-4 sm:px-8 lg:px-16 bg-green-700 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h4 className="text-2xl text-black lg:text-5xl font-extrabold mb-6">
            Ready to Empower Farmers?
          </h4>
          <p className="mb-4 text-sm sm:text-lg lg:text-xl leading-relaxed">
            Join CropConnect today and be part of transforming India’s
            agricultural future.
          </p>
          <Link
            to="/signup"
            className="inline-block bg-white text-green-700 font-semibold px-8 py-3 rounded-full shadow hover:bg-gray-100  transition text-sm sm:text-base lg:text-lg"
          >
            Get Started
          </Link>

        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gray-900 text-gray-300 py-6 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm">

          {/* Brand Info */}
          <div className="text-center sm:text-left">
            <h4 className="text-white font-semibold mb-2 text-lg">CropConnect</h4>
            <p className="text-sm">
              Empowering farmers with direct market access and digital tools for a sustainable future.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h4 className="text-white font-semibold mb-2 text-lg">Quick Links</h4>
            <ul className="space-y-1 text-sm">
              <li><Link to="/SeasonalGuide" className="hover:underline">Seasonal Crop Guide</Link></li>
              <li><Link to="/FarmLaw" className="hover:underline">Farmer Laws</Link></li>
              <li><Link to="/weather" className="hover:underline">Weather Updates</Link></li>
              <li><Link to="/signup" className="hover:underline">Register</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="text-center sm:text-left">
            <h4 className="text-white font-semibold mb-2 text-lg">Support</h4>
            <p className="flex justify-center sm:justify-start items-center gap-2 text-sm mb-1">
              <PhoneCall className="w-4 h-4" /> +91-xxxxx-xxxxx
            </p>
            <p className="text-sm">Email: support@cropconnect.in</p>
          </div>

          {/* Social Links */}
          <div className="text-center sm:text-left">
            <h4 className="text-white font-semibold mb-2 text-lg">Follow Us</h4>
            <p className="text-sm">Social media links </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center mt-6 text-xs text-gray-500">
          © {new Date().getFullYear()} CropConnect. All rights reserved.
        </div>
      </footer>

    </div>
  );
};

const FactCard = ({ number, label }) => (
  <div className="bg-green-50 p-6 rounded-xl shadow hover:shadow-md transition">
    <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-green-700">
      {number}
    </h4>
    <p className="mt-2 text-sm sm:text-base text-gray-700">{label}</p>
  </div>
);

export default Home;
