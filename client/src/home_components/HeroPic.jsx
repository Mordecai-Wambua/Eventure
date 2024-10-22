import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroImage from '../assets/HeroImage.webp';
import HeroImage2 from '../assets/HeroImage2.jpeg';
import HeroImage3 from '../assets/HeroImage3.jpeg';
import HeroImage4 from '../assets/HeroImage4.jpeg';
import { useNavigate } from 'react-router-dom';

const images = [HeroImage, HeroImage2, HeroImage3, HeroImage4];

const heroText = [
  { 
    title: "Discover Exclusive Events", 
    description: "Book your spot at the hottest events in town, curated just for you." 
  },
  { 
    title: "Seamless Event Booking", 
    description: "Effortless booking experiences for events that matter to you." 
  },
  { 
    title: "Unforgettable Moments", 
    description: "Let us help you create memories that last a lifetime." 
  },
  { 
    title: "Tailored for You", 
    description: "Personalized event recommendations to suit your interests." 
  },
];

const gradients = [
  'from-violet-600 to-blue-500',
  'from-blue-500 to-indigo-600',
  'from-indigo-600 to-purple-600',
  'from-purple-600 to-violet-600',
];

export default function HeroPic() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    if (!isHovered) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [isHovered]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto mt-8">
      <motion.div 
        className={`relative flex flex-col lg:flex-row justify-center items-center p-8 rounded-2xl shadow-2xl overflow-hidden transition-all duration-1000 bg-gradient-to-br ${gradients[currentIndex]} h-[600px] lg:h-[600px] lg:w-full md:w-full w-10/12 mx-auto`}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
        
        <motion.div 
          className="relative w-full lg:w-1/2 text-center lg:text-left px-4 lg:px-12 py-8 lg:py-0 z-10"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="space-y-6"
            >
              <motion.h2 
                className="text-4xl lg:text-6xl font-bold text-white leading-tight comic-neue-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {heroText[currentIndex].title}
              </motion.h2>
              <motion.p 
                className="text-xl lg:text-2xl text-gray-100 comic-neue-light-italic"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {heroText[currentIndex].description}
              </motion.p>
              
              <motion.button
                className="mt-8 px-8 py-4 bg-white/90 hover:bg-white text-gray-900 rounded-full font-semibold transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/events')}
              >
                Explore Events
              </motion.button>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <div className="relative w-full lg:w-1/2 mt-6 lg:mt-0 z-10">
          <div className="aspect-w-4 aspect-h-3 lg:aspect-w-16 lg:aspect-h-9 rounded-2xl shadow-2xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img 
                key={currentIndex}
                src={images[currentIndex]} 
                alt={`Hero Image ${currentIndex + 1}`} 
                className="w-full h-full object-cover"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.7, ease: "easeInOut" }}
              />
            </AnimatePresence>
          </div>

          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {images.map((_, index) => (
              <motion.button 
                key={index} 
                onClick={() => setCurrentIndex(index)}
                className="group relative"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
              >
                <div 
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentIndex === index 
                      ? 'bg-white scale-125' 
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                />
                {currentIndex === index && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-white/30"
                    layoutId="indicator"
                    transition={{ duration: 0.5 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}