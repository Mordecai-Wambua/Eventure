// Footer
import { Calendar } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-6 h-6 text-blue-600" />
            <span className="font-bold text-xl text-gray-800">Eventure - Your Event Experience Partner</span>
          </div>
          <p className="text-sm text-gray-600 text-center max-w-prose px-4">
            Your ultimate solution for creating, managing, and attending events seamlessly.
          </p>
          <p className="text-xs text-gray-600">
            © 2024 Eventure. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
