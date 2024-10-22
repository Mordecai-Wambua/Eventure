import { useState } from 'react';
import Header from "@/organizer_components/Header";
import Sidebar from "@/organizer_components/Sidebar";
import MainDash from "@/organizer_components/MainDash";
import '../styles/fonts.css';

export default function Organizer() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 kodchasan">
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
        <Header />
      </div>

      <div className="flex flex-1 flex-col md:flex-row">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        <main className={`flex-1 p-4 md:p-6 lg:p-8 transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
          <MainDash />
        </main>
      </div>

      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" 
          onClick={toggleSidebar}
          aria-hidden="true"
        ></div>
      )}
    </div>
  );
}