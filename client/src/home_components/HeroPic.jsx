import heroImage from '../assets/HeroImage.webp'; // Adjust the path according to your folder structure

export default function HeroPic() {
  return (
    <div className="flex justify-center items-center p-4 mt-8">
      <img 
        src={heroImage} 
        alt="Hero Image" 
        className="max-w-full h-auto" 
      />
    </div>
  );
}
