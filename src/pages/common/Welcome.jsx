import { Navbar } from "../../components/home/Navbar";
import { Hero } from "../../components/home/Hero";
import { Features } from "../../components/home/Features";
import { Contact } from '../../components/home/Contact';
import { Footer } from "../../components/home/Footer";
import { TableSection } from "../../components/home/TableSection";
import { ScheduleSection } from "../../components/home/ScheduleSection";

export const Welcome = () => {

  return (
    <div className="min-h-screen bg-white">
        <Navbar />
        <Hero/>
        <Features/>
        <TableSection />
        <ScheduleSection />
        <Contact/>
        <Footer/>      
    </div>
  )
}
