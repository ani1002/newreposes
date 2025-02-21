import React from 'react';
import { Table,ClipboardPlus, Droplet, Dna, Stethoscope, FileText, CreditCard, UserPlus, Clock, UserPen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import aboutimg from '../assets/aboutimg.jpg';
import logo  from '../assets/interface.png';
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

const LabWebsite = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  // Cards for login, dashboard, etc.
  const cards = [
    {
      icon:   <Stethoscope className="mx-auto text-red-500 mb-4" size={70} />,
      title: 'Collector Login',
     
      path: '/login',
    },
    {
      icon: <Droplet className="mx-auto text-red-500 mb-4" size={70} />,
      title: 'Patient Login',
    
      path: '/form',
    },
    {
      icon: <FileText className="mx-auto text-red-500 mb-4" size={70}/>,
      title: 'Report Download',
     
      path: '/dash-board1',
    },
    {
      icon: <ClipboardPlus  className="mx-auto text-red-500 mb-4" size={70}/>,
      title: 'Dashboard for Mobile',
    
      path: '/dash-board2',
    },
    {
      icon: <Table  className="mx-auto text-red-500 mb-4" size={70}/>,
      title: 'Dashboard for Computer',
      path: '/dash-board1',
    },

{
 icon: <UserPen  className="mx-auto text-red-500 mb-4" size={70}/>,
      title: 'Modify and Delete Data',
      path: '/dash-boardupdate', 
}

  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      {/* Header Section */}
      <header className="bg-white shadow-md p-6 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Medical Equipment" className="h-12" />
       
        </div>
        <nav className="space-x-10">
          <a href="#" className=" text-xl text-slate-700 hover:text-blue-800">Services</a>
          <a href="#" className="text-xl text-slate-700 hover:text-blue-800">About</a>
          <a href="#" className="text-xl text-slate-700 hover:text-blue-800">Contact</a>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* New Section with "Get Well Soon" and medical images */}
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-left">
            <h2 className="text-5xl font-extrabold text-slate-900 mb-6">Get Well Soon</h2>
            <p className="text-xl text-slate-600 mb-6">
              Advanced Diagnostic Solutions
            </p>
          </div>
          <div className="flex justify-center items-center">
          <img src={aboutimg} alt="Medical Equipment" className="max-w-md rounded-lg shadow-lg" />

          </div>
        </section>

        {/* Section with 5 cards */}
        <section className="mt-16 bg-white rounded-xl shadow-md p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-slate-900">Quick Access</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {cards.map((card, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col cursor-pointer hover:shadow-xl transition"
                onClick={() => handleNavigate(card.path)}
              >
                <div className="mx-auto flex items-center justify-center text-blue-500 mb-4 h-24">
                  {card.icon}
                </div>
                <div className="p-4 flex-grow">
                  <h3 className="text-lg font-semibold text-center">{card.title}</h3>
                  <p className="text-gray-600 text-center">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="mt-16 bg-white rounded-xl shadow-md p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-slate-900">
            Why Choose Us
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-blue-800">99%</span>
              </div>
              <h3 className="font-bold text-2xl text-slate-800">Accuracy</h3>
              <p className="text-lg text-slate-600">Precise and reliable test results</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">24/7</span>
              </div>
              <h3 className="font-bold text-2xl text-slate-800">Support</h3>
              <p className="text-lg text-slate-600">Always available for your needs</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">15+</span>
              </div>
              <h3 className="font-bold text-2xl text-slate-800">Years of Experience</h3>
              <p className="text-lg text-slate-600">Trusted medical expertise</p>
            </div>
          </div>
        </section>


      </main>
   {/* Footer Section */}
      <footer className="bg-slate-900 text-white py-4 text-center">
        <div className="flex justify-center items-center space-x-4">
          <Clock className="text-white" />
          <span>Mon-Sat: 7 AM to 9 PM</span>
        </div>
        <p className="mt-2">© 2024 HealthSync Labs. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LabWebsite;
