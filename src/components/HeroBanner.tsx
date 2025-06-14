
import React from 'react';
import { ArrowDown } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  return (
    <section id="home" className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-indigo-600/20 to-blue-600/20"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Welcome
            </span>
          </h1>
          
          <div className="mb-8">
            <img 
              src="/lovable-uploads/966b39ff-32f6-4e89-82a2-10f5ef83abc6.png" 
              alt="Manufacturing facility" 
              className="mx-auto rounded-lg shadow-lg max-w-2xl w-full h-auto"
            />
          </div>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            If you get accepted, you'll be working with us in our state-of-the-art facilities! 
            Congratulations in advance on taking this important step in your career journey.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#applicants" 
              className="inline-flex items-center px-8 py-4 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-all duration-200 hover:scale-105"
            >
              View Applicants
              <ArrowDown className="ml-2 w-5 h-5" />
            </a>
            <a 
              href="#about" 
              className="inline-flex items-center px-8 py-4 border-2 border-purple-600 text-purple-600 font-semibold rounded-lg hover:bg-purple-600 hover:text-white transition-all duration-200"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>
    </section>
  );
};
