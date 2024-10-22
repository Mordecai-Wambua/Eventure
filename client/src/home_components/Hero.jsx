import Image_1 from '../assets/Image_1.jpeg';
import '../styles/fonts.css';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 md:gap-16">
          <div className="w-full md:w-1/2 text-center md:text-left space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400 bg-clip-text text-transparent kodchasan-bold leading-tight">
                Events & Adventure
              </h1>
              <h2 className="text-2xl md:text-3xl lg:text-4xl text-gray-700 dark:text-gray-300 kodchasan-bold">
                Your Gateway to Unforgettable Experiences
              </h2>
            </div>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 kodchasan-light-italic">
              Explore, Create, and Join Memorable Events with Just a Few Clicks!
            </p>
            
            <div className="flex justify-center md:justify-start gap-4">
              <button className="group relative px-8 py-4 bg-violet-600 hover:bg-violet-700 text-white rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl"
              onClick={() => navigate('/register')}>
                <span className="relative z-10 font-semibold">Get Started</span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></div>
              </button>
           
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-300"></div>
              <div className="relative">
                <img
                  src={Image_1}
                  alt="Adventure Events"
                  className="w-full h-auto object-cover rounded-lg shadow-xl transform transition duration-500 hover:scale-[1.02]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;