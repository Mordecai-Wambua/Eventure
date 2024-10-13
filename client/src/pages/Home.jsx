import Logo from '@/home_components/Logo';
import Navigation from '@/home_components/Navigation';
import SignIn from '@/home_components/Signin';
import Hero from '@/home_components/Hero';
import HeroPic from '@/home_components/HeroPic';
import DiscoverEvents from '@/home_components/DiscoverEvents';
import Descritpion from '@/home_components/Descritpion';
import FAQs from '@/home_components/Faqs';
import Footer from '@/home_components/Footer';

export default function Home() {
  return (
    <>
      <div className='flex p-4 md:space-x-[300px] space-x-[20px]'>
        <Logo />
        <Navigation />
        <SignIn />
      </div>
      <div>
        <Hero />
      </div>
      <div>
        <HeroPic />
      </div>
      <div>
        <DiscoverEvents />
      </div>
      <div>
        <Descritpion />
      </div>
      <div>
        <FAQs />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}
