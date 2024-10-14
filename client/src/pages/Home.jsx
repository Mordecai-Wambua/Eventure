import Logo from '@/home_components/Logo';
import Navigation from '@/home_components/Navigation';
import Hero from '@/home_components/Hero';
import HeroPic from '@/home_components/HeroPic';
import DiscoverEvents from '@/home_components/DiscoverEvents';
import Description from '@/home_components/Description';
import FAQs from '@/home_components/Faqs';
import Footer from '@/home_components/Footer';

export default function Home() {
  return (
    <>
      <div className='flex md:flex-row p-4 space-x-4 md:space-x-6'>
        <Logo />
        <Navigation />
      </div>
      <div>
        <Hero />
        <HeroPic />
        <DiscoverEvents />
        <Description />
        <FAQs />
        <Footer />
      </div>
    </>
  );
}
