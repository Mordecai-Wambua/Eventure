import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

export default function DiscoverEvents() {
  return (
    <div className="flex justify-center mt-10 flex-col items-center space-y-16">
      <div>
        <h1 className="font-bold text-3xl">Discover Events</h1>
      </div>
      <div className="relative mx-20 w-11/12 border-2 rounded-md border-black p-4">
        <Carousel>
          {/* Navigation buttons */}
          <CarouselPrevious />
          <CarouselNext />

          <CarouselContent className="space-x-4 w-1/4">
            {/* Carousel items/slides */}
            <CarouselItem className="bg-gray-200 rounded-md p-4 text-center">Event 1</CarouselItem>
            <CarouselItem className="bg-gray-200 rounded-md p-4 text-center">Event 2</CarouselItem>
            <CarouselItem className="bg-gray-200 rounded-md p-4 text-center">Event 3</CarouselItem>
            <CarouselItem className="bg-gray-200 rounded-md p-4 text-center">Event 4</CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
      <div className="flex items-center space-x-2">
        <h1 className="text-xl font-semibold">Explore More</h1>
          {/* SVG Icon */}
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
        {/* Text */}
      </div>
    </div>
  );
};
