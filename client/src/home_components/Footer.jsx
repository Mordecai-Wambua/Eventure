import { Calendar, Mail, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' }
  ];

  return (
    <footer className="bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 rounded-lg p-2">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h1 className="font-bold text-2xl text-gray-800">eventure</h1>
            </div>
            <p className="text-gray-600 max-w-md">
              Your ultimate solution for creating, managing, and attending events seamlessly.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">Quick Links</h3>
            <ul className="space-y-2">
              {['About Us', 'Services', 'Blog', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">Get in Touch</h3>
            <div className="flex items-center space-x-2">
              <Mail className="w-5 h-5 text-blue-600" />
              <a href="mailto:hello@eventure.com" className="text-gray-600 hover:text-blue-600 transition-colors">
                hello@eventure.com
              </a>
            </div>
            <div className="flex space-x-4 pt-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="text-gray-500 hover:text-blue-600 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-600">
              © 2024 Eventure. All Rights Reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;