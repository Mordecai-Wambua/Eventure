import { motion } from 'framer-motion';
import Logo from '@/home_components/Logo';
import Navigation from '@/home_components/Navigation';
import Hero from '@/home_components/Hero';
import HeroPic from '@/home_components/HeroPic';
import DiscoverEvents from '@/home_components/DiscoverEvents';
import Description from '@/home_components/Description';
import FAQs from '@/home_components/Faqs';
import Footer from '@/home_components/Footer';

export default function Home() {
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <div className='bg-gray-100'>
      <div className='p-6'>
        <motion.div
          className='flex md:flex-row px-6 py-3 space-x-4 md:space-x-6 border rounded-full border-blue-600 shadow-md bg-gradient-to-r from-blue-300 via-blue-200 to-purple-300 border-none'
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <Logo />
          <Navigation />
        </motion.div>
      </div>

      <div className='mt-2'>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Hero />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <HeroPic />
        </motion.div>
      </div>

      <motion.div
        className='pt-24 mt-10'
        initial="hidden"
        whileInView="visible"
        variants={fadeIn}
      >
        <DiscoverEvents />
      </motion.div>

      <motion.div
        className='mt-10'
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
      >
        <Description />
      </motion.div>

      <motion.div
        className='mt-10'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <FAQs />
      </motion.div>

      <motion.div
        className='mt-10'
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Footer />
      </motion.div>
    </div>
  );
}
