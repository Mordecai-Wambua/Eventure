import { useState, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import HeroImage from '../assets/HeroImage.webp';

export default function DiscoverEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/events', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }

        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="flex justify-center mt-4 sm:mt-10 flex-col items-center space-y-8 sm:space-y-16 px-4 sm:px-0">
      <div>
        <h1 className="font-bold text-2xl sm:text-3xl text-center">Discover Events</h1>
      </div>
      <div className="relative w-full sm:w-11/12 max-w-4xl">
        <Carousel className="w-full">
          <CarouselContent className="-ml-2 sm:-ml-4">
            {events.map((event, index) => (
              <CarouselItem key={index} className="pl-2 sm:pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105">
                  <img 
                    src={HeroImage}
                    alt={event.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="font-semibold text-lg mb-2 truncate">{event.title}</h2>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{event.description}</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>{event.venue}</span>
                      <span>{event.date}</span>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 sm:-left-12 z-10">
            <CarouselPrevious className="h-8 w-8 sm:h-10 sm:w-10 bg-white bg-opacity-50 sm:bg-opacity-100 hover:bg-opacity-75" />
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 sm:-right-12 z-10">
            <CarouselNext className="h-8 w-8 sm:h-10 sm:w-10 bg-white bg-opacity-50 sm:bg-opacity-100 hover:bg-opacity-75" />
          </div>
        </Carousel>
      </div>
      <div className="flex items-center space-x-2">
        <h1 className="text-lg sm:text-xl font-semibold">Explore More</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="24"
          viewBox="0 0 12 24"
          className="text-black"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M10.157 12.711L4.5 18.368l-1.414-1.414l4.95-4.95l-4.95-4.95L4.5 5.64l5.657 5.657a1 1 0 0 1 0 1.414"
          />
        </svg>
      </div>
    </div>
  );
}