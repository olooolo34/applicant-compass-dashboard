
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LogIn, Plus, Settings, LogOut, Menu, X } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface NavigationProps {
  isAdmin: boolean;
  onLoginClick: () => void;
  onLogout?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ 
  isAdmin, 
  onLoginClick, 
  onLogout
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

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

          {/* Desktop Navigation */}
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

          {/* Desktop Admin Controls */}
          <div className="hidden md:flex items-center space-x-4">
            {isAdmin ? (
              <div className="flex items-center space-x-4">
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
                Login
              </Button>
            )}
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="md:hidden">
            <Popover open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-purple-100 hover:text-white hover:bg-purple-500"
                >
                  <Menu className="w-6 h-6" />
                </Button>
              </PopoverTrigger>
              <PopoverContent 
                className="w-64 p-0 bg-white border border-gray-200 shadow-lg" 
                align="end"
                sideOffset={8}
              >
                <div className="py-2">
                  {/* Navigation Links */}
                  <div className="border-b pb-2 mb-2">
                    <button
                      onClick={() => handleNavClick('#home')}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Home
                    </button>
                    <button
                      onClick={() => handleNavClick('#about')}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      About
                    </button>
                    <button
                      onClick={() => handleNavClick('#applicants')}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Applicants
                    </button>
                  </div>

                  {/* Admin Controls */}
                  <div className="px-2 space-y-2">
                    {isAdmin ? (
                      <>
                        <div className="flex items-center text-sm text-emerald-600 font-medium px-2 py-1">
                          <Settings className="w-4 h-4 mr-2" />
                          Admin Mode
                        </div>
                        <Button
                          onClick={() => {
                            onLogout?.();
                            setIsMobileMenuOpen(false);
                          }}
                          variant="outline"
                          className="w-full border-red-300 text-red-600 hover:bg-red-50 justify-start"
                          size="sm"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Logout
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={() => {
                          onLoginClick();
                          setIsMobileMenuOpen(false);
                        }}
                        variant="outline"
                        className="w-full border-purple-300 text-purple-600 hover:bg-purple-50 justify-start"
                        size="sm"
                      >
                        <LogIn className="w-4 h-4 mr-2" />
                        Login
                      </Button>
                    )}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </nav>
  );
};
