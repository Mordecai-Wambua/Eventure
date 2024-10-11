import { Calendar } from 'lucide-react';

const FooterSection = ({ title, items }) => (
  <div className="flex flex-col space-y-2">
    <h3 className="font-bold text-lg">{title}</h3>
    <ul className="space-y-1">
      {items.map((item, index) => (
        <li key={index}>
          <a href="#" className="hover:underline">{item}</a>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  const footerSections = [
    {
      title: "Key Features",
      items: ["Easy Event Creation", "Seamless Ticketing", "Attendee Management", "Real-time Analytics", "Customizable Templates"]
    },
    {
      title: "Our Products",
      items: ["Eventure Plus", "Eventure Pro", "Eventure Lite", "Eventure Basic", "Eventure Premium"]
    },
    {
      title: "About Us",
      items: ["Our Story", "Team & Culture", "Mission & Vision", "Partnerships", "Testimonials"]
    },
    {
      title: "Connect With Us",
      items: ["Facebook", "Instagram", "Twitter", "LinkedIn", "YouTube"]
    }
  ];

  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {footerSections.map((section, index) => (
            <FooterSection key={index} title={section.title} items={section.items} />
          ))}
        </div>
        <div className="mt-8 pt-8 border-t border-gray-300 flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-6 h-6" />
            <span className="font-bold text-lg">Eventure - Your Event Experience Partner</span>
          </div>
          <p className="text-sm text-gray-600">
            © 2024 Eventure. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;