'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaGamepad, FaChild, FaStar, FaHeart } from 'react-icons/fa';
import Header from '@/components/Header';

const AboutPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
     
      
      <main className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-400">
            About JoyCall Kiddies
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Where Learning Meets Play in a World of Colorful Adventures!
          </p>
        </motion.section>

        {/* Features Grid */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {[
            {
              icon: <FaGamepad className="w-8 h-8 text-yellow-400" />,
              title: "Fun Games",
              description: "Engaging and interactive games designed specifically for young minds to explore and enjoy."
            },
            {
              icon: <FaChild className="w-8 h-8 text-pink-400" />,
              title: "Kid-Friendly",
              description: "Safe, ad-free environment with content curated for children of all ages."
            },
            {
              icon: <FaStar className="w-8 h-8 text-blue-400" />,
              title: "Educational",
              description: "Games that encourage learning through play, developing essential skills."
            }
          ].map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-pink-400/30 transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-yellow-300">{feature.title}</h3>
              <p className="text-blue-100">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* About Content */}
        <motion.section 
          className="max-w-4xl mx-auto bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-yellow-300">Our Story</h2>
          <div className="space-y-6 text-blue-100">
            <p>
              Welcome to JoyCall Kiddies, a magical world where learning and fun come together! 
              Our mission is to create engaging, educational experiences that spark joy and 
              curiosity in young minds.
            </p>
            <p>
              Developed with love by a team of parents and educators, our games are designed 
              to be both entertaining and beneficial for children's development. We believe 
              that the best learning happens when kids are having fun!
            </p>
            <p>
              Every game in our collection is carefully crafted to be age-appropriate, 
              ad-free, and safe for children. We're committed to creating a positive 
              digital environment where kids can explore, learn, and grow.
            </p>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold mb-6 text-yellow-300">Ready for an Adventure?</h3>
          <motion.button
            onClick={() => router.push('/arcade')}
            className="bg-gradient-to-r from-yellow-400 to-pink-500 text-white px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-yellow-400/30 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Our Games
          </motion.button>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-blue-200">
        <div className="flex justify-center items-center gap-2 mb-4">
          <FaHeart className="text-pink-400" />
          <span>Made with love for kids everywhere</span>
        </div>
        <p className="text-sm">© {new Date().getFullYear()} JoyCall Kiddies. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutPage;
