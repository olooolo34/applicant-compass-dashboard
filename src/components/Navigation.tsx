
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogIn, Plus, Settings, LogOut } from 'lucide-react';

interface NavigationProps {
  isAdmin: boolean;
  onLoginClick: () => void;
  onAddApplicant: () => void;
  onLogout?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ 
  isAdmin, 
  onLoginClick, 
  onAddApplicant,
  onLogout
}) => {
  return (
    <nav className="bg-purple-600/95 backdrop-blur-sm border-b border-purple-500/20 sticky top-0 z-50">
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
              <a href="#home" className="text-purple-100 hover:text-white transition-colors px-3 py-2 rounded-md text-sm font-medium">
                Home
              </a>
              <a href="#about" className="text-purple-100 hover:text-white transition-colors px-3 py-2 rounded-md text-sm font-medium">
                About
              </a>
              <a href="#applicants" className="text-purple-100 hover:text-white transition-colors px-3 py-2 rounded-md text-sm font-medium">
                Applicants
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {isAdmin ? (
              <div className="flex items-center space-x-2">
                <Button
                  onClick={onAddApplicant}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  size="sm"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Applicant
                </Button>
                <div className="flex items-center text-sm text-emerald-200 font-medium">
                  <Settings className="w-4 h-4 mr-1" />
                  Admin Mode
                </div>
                <Button
                  onClick={onLogout}
                  variant="outline"
                  className="border-purple-300 text-purple-100 hover:bg-purple-500 hover:text-white hover:border-purple-400"
                  size="sm"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                onClick={onLoginClick}
                variant="outline"
                className="border-purple-300 text-purple-100 hover:bg-purple-500 hover:text-white hover:border-purple-400"
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
