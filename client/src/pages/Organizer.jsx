//Organizer Page
import Header from "@/organizer_components/Header"
import Sidebar from "@/organizer_components/Sidebar"
import MainDash from "@/organizer_components/MainDash"

export default function Organizer() {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="flex flex-row space-x-8">
        <div>
          <Sidebar />
        </div>
        <div>
          <MainDash />
        </div>
        </div>
      </div>
  )
};
