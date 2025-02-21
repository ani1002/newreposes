import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { 
  Microscope, Flask, Dna, Beaker, TestTube, 
  Droplet, Brain, Activity, Stethoscope 
} from 'lucide-react';

const AdvancedLabWebsite = () => {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <AnimatedHeader activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="container mx-auto px-6 py-10">
        {activeSection === 'home' && <HeroSection />}
        {activeSection === 'services' && <AdvancedServicesSection />}
        {activeSection === 'technology' && <TechnologyShowcase />}
        {activeSection === 'contact' && <AdvancedContactSection />}
      </main>
      <Footer />
    </div>
  );
};

const AnimatedHeader = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { name: 'home', icon: <Microscope /> },
    { name: 'services', icon: <Dna /> },
    { name: 'technology', icon: <Beaker /> },
    { name: 'contact', icon: <Stethoscope /> }
  ];

  return (
    <motion.header 
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md"
    >
      <nav className="container mx-auto flex justify-between items-center py-4 px-6">
        <motion.div 
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="flex items-center space-x-3"
        >
          <Dna className="text-blue-400" size={40} />
          <h1 className="text-2xl font-bold text-white">NeuroSync Labs</h1>
        </motion.div>
        <div className="flex space-x-6">
          {menuItems.map((item) => (
            <motion.button
              key={item.name}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveSection(item.name)}
              className={`flex items-center space-x-2 ${
                activeSection === item.name 
                  ? 'text-blue-400 font-bold' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="capitalize">{item.name}</span>
            </motion.button>
          ))}
        </div>
      </nav>
    </motion.header>
  );
};

const HeroSection = () => (
  <motion.section 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="min-h-screen flex items-center justify-center text-center"
  >
    <div className="max-w-4xl">
      <motion.h2 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
      >
        Precision Diagnostics, Quantum Insights
      </motion.h2>
      <motion.p
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-xl text-gray-300 mb-10"
      >
        Revolutionizing medical research with advanced computational diagnostics and AI-powered analysis
      </motion.p>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex justify-center space-x-4"
      >
        <Dialog>
          <DialogTrigger asChild>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full transition-all">
              Explore Our Research
            </button>
          </DialogTrigger>
          <DialogContent>
            <h3 className="text-2xl font-bold mb-4">Research Frontiers</h3>
            <p>Breakthrough diagnostics powered by AI and quantum computing</p>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  </motion.section>
);

const AdvancedServicesSection = () => {
  const services = [
    { 
      icon: <TestTube className="text-blue-400" size={40} />, 
      title: "Genomic Sequencing", 
      description: "Advanced DNA analysis with machine learning insights"
    },
    { 
      icon: <Brain className="text-purple-400" size={40} />, 
      title: "Neurological Diagnostics", 
      description: "Cutting-edge brain function and neural pathway analysis"
    },
    { 
      icon: <Activity className="text-green-400" size={40} />, 
      title: "Precision Medicine", 
      description: "Personalized treatment strategies through comprehensive testing"
    }
  ];

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid md:grid-cols-3 gap-8"
    >
      {services.map((service, index) => (
        <motion.div
          key={service.title}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.2 }}
          whileHover={{ scale: 1.05 }}
          className="bg-gray-800 rounded-xl p-6 shadow-2xl hover:bg-gray-700 transition-all"
        >
          <div className="flex items-center mb-4 space-x-4">
            {service.icon}
            <h3 className="text-xl font-bold">{service.title}</h3>
          </div>
          <p className="text-gray-300">{service.description}</p>
        </motion.div>
      ))}
    </motion.section>
  );
};

const TechnologyShowcase = () => (
  <motion.section 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="bg-gray-800/50 rounded-xl p-10"
  >
    <h2 className="text-3xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
      Our Technological Edge
    </h2>
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold">AI-Powered Diagnostics</h3>
        <p className="text-gray-300">
          Leveraging machine learning algorithms to provide unprecedented accuracy in medical diagnostics
        </p>
      </div>
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold">Quantum Computing</h3>
        <p className="text-gray-300">
          Utilizing quantum computational models for complex biological data processing
        </p>
      </div>
    </div>
  </motion.section>
);

const AdvancedContactSection = () => (
  <motion.section 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="bg-gray-800/50 rounded-xl p-10"
  >
    <h2 className="text-3xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
      Connect with NeuroSync
    </h2>
    <div className="max-w-2xl mx-auto grid md:grid-cols-2 gap-8">
      <div>
        <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
        <div className="space-y-3 text-gray-300">
          <p>📍 Quantum Research Complex</p>
          <p>📞 +1 (555) NEURO-LAB</p>
          <p>✉️ research@neurosync.ai</p>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-4">Research Inquiries</h3>
        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-full transition-all">
          Schedule Consultation
        </button>
      </div>
    </div>
  </motion.section>
);

const Footer = () => (
  <motion.footer 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="bg-gray-900/80 backdrop-blur-md py-6 text-center"
  >
    <p className="text-gray-400">© 2024 NeuroSync Labs. All Quantum Rights Reserved.</p>
  </motion.footer>
);

export default AdvancedLabWebsite;