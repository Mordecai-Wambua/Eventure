/* eslint-disable react/prop-types */
import '../styles/globals.css';
import '../styles/fonts.css';
import { 
  Ticket, 
  Map, 
  Clock, 
  Users, 
  UserCheck, 
  CheckSquare, 
  BarChart3, 
  ShieldCheck 
} from 'lucide-react';

const colorSchemes = [
  {
    gradient: 'from-blue-100 to-blue-50',
    icon: 'text-blue-500',
    hover: 'group-hover:text-blue-700',
    text: 'group-hover:text-blue-600'
  },
  {
    gradient: 'from-purple-100 to-purple-50',
    icon: 'text-purple-500',
    hover: 'group-hover:text-purple-700',
    text: 'group-hover:text-purple-600'
  },
  {
    gradient: 'from-green-100 to-green-50',
    icon: 'text-green-500',
    hover: 'group-hover:text-green-700',
    text: 'group-hover:text-green-600'
  },
  {
    gradient: 'from-red-100 to-red-50',
    icon: 'text-red-500',
    hover: 'group-hover:text-red-700',
    text: 'group-hover:text-red-600'
  },
  {
    gradient: 'from-orange-100 to-orange-50',
    icon: 'text-orange-500',
    hover: 'group-hover:text-orange-700',
    text: 'group-hover:text-orange-600'
  },
  {
    gradient: 'from-teal-100 to-teal-50',
    icon: 'text-teal-500',
    hover: 'group-hover:text-teal-700',
    text: 'group-hover:text-teal-600'
  },
  {
    gradient: 'from-pink-100 to-pink-50',
    icon: 'text-pink-500',
    hover: 'group-hover:text-pink-700',
    text: 'group-hover:text-pink-600'
  },
  {
    gradient: 'from-indigo-100 to-indigo-50',
    icon: 'text-indigo-500',
    hover: 'group-hover:text-indigo-700',
    text: 'group-hover:text-indigo-600'
  }
];

const FeatureCard = ({ icon: Icon, title, colorScheme }) => (
  <div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl hover:border-transparent">
    <div className="flex flex-col items-center space-y-4">
      <div className={`rounded-full bg-gradient-to-r ${colorScheme.gradient} p-4 transition-transform duration-300 group-hover:scale-105`}>
        <Icon className={`h-8 w-8 ${colorScheme.icon} transition-colors duration-300 ${colorScheme.hover}`} />
      </div>
      <h3 className={`text-lg font-semibold text-gray-900 tracking-tight transition-colors duration-300 ${colorScheme.text}`}>
        {title}
      </h3>
    </div>
  </div>
);

const features = [
  { icon: Ticket, title: "Easy Ticketing" },
  { icon: Map, title: "Interactive Maps" },
  { icon: Clock, title: "Real-time Updates" },
  { icon: Users, title: "Customizable Experiences" },
  { icon: UserCheck, title: "Attendee Engagement" },
  { icon: CheckSquare, title: "Efficient Check-in" },
  { icon: BarChart3, title: "Detailed Analytics" },
  { icon: ShieldCheck, title: "Secure Payments" }
];

export default function Description() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24 mt-20">
      <div className="text-center mb-12 space-y-8">
        <h2 className="kodchasan-bold text-xl md:text-2xl lg:text-4xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent animate-gradient-slow">
          Discover Seamless Event Experiences
        </h2>
        <h1 className="text-xl md:text-2xl lg:text-2xl text-gray-900 leading-tight tracking-widest">
          Elevate Your Event Planning with Eventure
        </h1>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-10">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            colorScheme={colorSchemes[index]}
          />
        ))}
      </div>
    </div>
  );
}
