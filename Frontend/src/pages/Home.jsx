import React from "react";
import { Leaf, ShieldCheck, Truck, PackageCheck, MapPin, LockKeyhole, PhoneCall } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => (
  <div className="min-h-screen bg-gray-50 text-gray-800">
    <section className="bg-green-100 py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-green-800">
          Bridging Farmers and Buyers with Trust & Technology
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto text-sm sm:text-base">
          CropConnect empowers farmers by enabling them to directly showcase and sell their produce—complete with certification, pricing, and location—eliminating middlemen and boosting incomes.
        </p>
      </div>
    </section>

    <section className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <h3 className="text-2xl font-bold text-green-700 mb-8">India's Agriculture Snapshot 📊</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm sm:text-base">
          <FactCard number="16 %" label="of GDP from agriculture" />
          <FactCard number="394 million acres" label="Arable land (world's 2nd largest)" />
          <FactCard number="48.3 %" label="of cropland is irrigated" />
          <FactCard number="354 MT" label="Food grains output (2025 est.)" />
        </div>
      </div>
    </section>

    {/* Organic Farming */}
    <section className="py-16 px-6 bg-gray-100">
      <div className="max-w-6xl mx-auto text-center">
        <h3 className="text-2xl font-bold text-green-700 mb-8">Growing Organic Movement 🍃</h3>
        <p className="text-gray-700 max-w-3xl mx-auto mb-4 text-sm sm:text-base">
          India leads globally with over 4.4 million organic farmers—and has nearly 2.78 million hectares under certification, though it comprises just ~2 % of national farmland.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 mt-8 text-sm">
          {["MP", "Maharashtra", "Rajasthan", "Gujarat", "Odisha", "Karnataka", "Sikkim", "Uttar Pradesh"].map(state => (
            <div key={state} className="bg-white p-4 rounded-lg shadow-sm text-gray-700">
              {state}
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-2">(Top organic states per APEDA 2022‑23)</p>
      </div>
    </section>

    {/* Features */}
    <section className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <h3 className="text-2xl font-bold text-green-700 mb-8">Key Features</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {[
            { icon: Leaf, title: "Organic Listings", desc: "Farmers can upload verified organic produce with certification and pricing." },
            { icon: MapPin, title: "Crop: Variery,Category based Filters", desc: "Buyers can filter CROP by multiple options." },
            { icon: ShieldCheck, title: "Verification", desc: "All accounts and listings are verified to ensure authentic and secure trading." },
            { icon: PackageCheck, title: "Weather update", desc: "Take Update of Weather helpful for crop (Harvested, Growing) to reflect real-time data." },
            { icon: LockKeyhole, title: "Secure Login", desc: "JWT-secured login with token-based password reset functionality." },
            { icon: Truck, title: "Direct Sales", desc: "No middlemen. Connect directly with verified farmers and buyers." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-green-50 p-6 rounded-lg shadow">
              <Icon className="w-8 h-8 text-green-600 mb-4" />
              <h4 className="font-bold text-lg mb-2">{title}</h4>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Call to Action */}
    <section className="py-12 px-6 bg-green-700 text-white text-center">
      <h3 className="text-2xl font-bold mb-4  text-white " >Ready to Empower Farmers?</h3>
      <p className="mb-6">Join CropConnect today and help transform India’s agricultural future.</p>
      <Link
        to="/signup"
        className="bg-white text-green-700 font-semibold px-6 py-2 rounded hover:bg-gray-100"
      >
        Get Started
      </Link>
    </section>

    {/* Footer */}
    <footer className="bg-gray-800 text-gray-300 py-6 px-4">
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-8 text-sm">
        <div>
          <h4 className="text-white font-semibold mb-2">CropConnect</h4>
          <p>Empowering farmers with direct market access and digital tools.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1">
           
            <li><Link to= "/SeasonalGuide" className="hover:underline">Seasonal crop growing guide</Link></li>

            <li><Link to="/FarmLaw" className="hover:underline">Law for farmer</Link></li>
            <li><Link to="/weather" className="hover:underline">Weather update</Link></li>
            <li><Link to="/signin" className="hover:underline">Login</Link></li>
            <li><Link to="/signup" className="hover:underline">Register</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-2">Support</h4>
          <p className="flex items-center gap-2"><PhoneCall className="w-4 h-4" /> +91-xxxxx-xxxxx</p>
          <p>Email: support@cropconnect.in</p>
        </div>
      </div>
      <div className="text-center mt-8 text-xs text-gray-400">
        © {new Date().getFullYear()} CropConnect. All rights reserved.
      </div>
    </footer>
  </div>
);

const FactCard = ({ number, label }) => (
  <div className="bg-green-50 p-4 rounded-lg shadow-sm">
    <h4 className="text-xl font-bold text-green-700">{number}</h4>
    <p className="mt-1">{label}</p>
  </div>
);

export default Home;
