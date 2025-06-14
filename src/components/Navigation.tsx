
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogIn, Plus, Settings } from 'lucide-react';

interface NavigationProps {
  isAdmin: boolean;
  onLoginClick: () => void;
  onAddApplicant: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ 
  isAdmin, 
  onLoginClick, 
  onAddApplicant 
}) => {
  return (
    <nav className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/277eb854-9fa4-4579-aee6-822f80b89e61.png" 
              alt="ApplicantHub Logo" 
              className="h-8 w-auto"
            />
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-md text-sm font-medium">
                Home
              </a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-md text-sm font-medium">
                About
              </a>
              <a href="#applicants" className="text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-md text-sm font-medium">
                Applicants
              </a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-md text-sm font-medium">
                Contact
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {isAdmin ? (
              <div className="flex items-center space-x-2">
                <Button
                  onClick={onAddApplicant}
                  className="bg-green-600 hover:bg-green-700 text-white"
                  size="sm"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Applicant
                </Button>
                <div className="flex items-center text-sm text-green-600 font-medium">
                  <Settings className="w-4 h-4 mr-1" />
                  Admin Mode
                </div>
              </div>
            ) : (
              <Button
                onClick={onLoginClick}
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Admin Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
