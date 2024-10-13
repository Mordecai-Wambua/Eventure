import { useState } from 'react';
import HeroImage from '../assets/HeroImage.webp';
import HeroImage2 from '../assets/HeroImage2.webp';
import HeroImage3 from '../assets/HeroImage3.webp';
import HeroImage4 from '../assets/HeroImage4.webp';

const images = [HeroImage, HeroImage2, HeroImage3, HeroImage4];

export default function HeroPic() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative flex flex-col justify-center items-center p-4 mt-8">
      <img 
        src={images[currentIndex]} 
        alt="Hero Image" 
        className="w-full max-w-3xl h-auto rounded-lg shadow-lg" 
      />
      
      {/* Left Arrow */}
      <button 
        onClick={prevImage} 
        className="absolute left-20 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 p-2 rounded-full shadow hover:bg-gray-200 transition duration-300"
      >
        &lt;
      </button>
      
      {/* Right Arrow */}
      <button 
        onClick={nextImage} 
        className="absolute right-20 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 p-2 rounded-full shadow hover:bg-gray-200 transition duration-300"
      >
        &gt;
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex">
        {images.map((_, index) => (
          <button 
            key={index} 
            onClick={() => setCurrentIndex(index)} 
            className={`h-2 w-2 rounded-full mx-1 ${currentIndex === index ? 'bg-blue-600' : 'bg-gray-300'}`}
          />
        ))}
      </div>
    </div>
  );
}
