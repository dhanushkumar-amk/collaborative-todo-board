import React from 'react';
import { MdChecklist, MdSync, MdLock, MdFlashOn } from 'react-icons/md';
import { FaUserFriends } from 'react-icons/fa';

const LandingPage = () => {
  return (
    <main className="w-full min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 text-gray-800">
      {/* Hero Section */}
      <section className="flex flex-col-reverse lg:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-20">
        <div className="text-center lg:text-left space-y-6 max-w-xl">
          <div className="flex items-center justify-center lg:justify-start space-x-2 text-green-600 text-3xl font-extrabold">
            <MdChecklist className="text-4xl" />
            <span>ToDoList</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Stay <span className="text-green-600">Organized</span><br />Boost Your Productivity
          </h1>
          <p className="text-lg text-gray-700">
            Manage tasks, collaborate in real-time, and never miss a deadline again.
          </p>

          <a
            href="#how-it-works"
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Learn How It Works
          </a>
        </div>

        <div className="mb-12 lg:mb-0 lg:ml-12 max-w-md w-full">
          <img
            src="https://cdn.pixabay.com/photo/2015/08/28/12/46/checklist-911840_1280.png"
            alt="Task management illustration"
            className="w-full h-auto object-contain drop-shadow-xl"
          />
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center space-y-10">
          <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-10 text-left">
            <div className="p-6 bg-green-50 rounded-xl shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2">1. Create Account</h3>
              <p>Sign up in seconds with your email and get started immediately with our intuitive interface.</p>
            </div>
            <div className="p-6 bg-green-50 rounded-xl shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2">2. Add Tasks</h3>
              <p>Organize your day by adding, editing, and managing tasks in your personal or team workspace.</p>
            </div>
            <div className="p-6 bg-green-50 rounded-xl shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2">3. Track & Sync</h3>
              <p>Get real-time updates and collaborate with your teammates using Socket.IO live sync.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-6xl mx-auto text-center space-y-12">
          <h2 className="text-3xl font-bold">Features You’ll Love</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            <FeatureCard icon={<MdSync />} title="Real-Time Sync" desc="All tasks update instantly across all devices and users." />
            <FeatureCard icon={<MdLock />} title="Secure Auth" desc="JWT-based authentication keeps your data safe." />
            <FeatureCard icon={<MdFlashOn />} title="Fast Performance" desc="Optimized backend and minimal UI for smooth experience." />
            <FeatureCard icon={<FaUserFriends />} title="Collaborative" desc="Invite others and work together seamlessly." />
            <FeatureCard icon={<MdChecklist />} title="Organized Tasks" desc="Keep your tasks grouped, sorted, and under control." />
            <FeatureCard icon={<MdChecklist />} title="Logs & History" desc="Track every action performed across the app." />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-green-600 text-white text-center py-16 px-4">
        <h2 className="text-3xl font-bold mb-4">Ready to get things done?</h2>
        <p className="text-lg mb-8">Join now and manage your productivity with confidence.</p>
        <a
          href="#"
          className="inline-block bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Get Started Now
        </a>
      </section>
    </main>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center text-center space-y-3">
    <div className="text-green-600 text-4xl">{icon}</div>
    <h3 className="text-xl font-semibold">{title}</h3>
    <p className="text-gray-600">{desc}</p>
  </div>
);

export default LandingPage;
