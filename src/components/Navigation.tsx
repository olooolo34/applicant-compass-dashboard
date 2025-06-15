
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LogIn, Plus, Settings, LogOut, Menu, X } from 'lucide-react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsDrawerOpen(false);
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

          {/* Mobile Hamburger Menu */}
          <div className="md:hidden">
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
              <DrawerTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-purple-100 hover:text-white hover:bg-purple-500"
                >
                  <Menu className="w-6 h-6" />
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader className="text-left">
                  <DrawerTitle>Navigation</DrawerTitle>
                  <DrawerClose asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-4 top-4"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </DrawerClose>
                </DrawerHeader>
                <div className="px-4 pb-6 space-y-4">
                  {/* Navigation Links */}
                  <div className="space-y-2">
                    <button
                      onClick={() => handleNavClick('#home')}
                      className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                    >
                      Home
                    </button>
                    <button
                      onClick={() => handleNavClick('#about')}
                      className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                    >
                      About
                    </button>
                    <button
                      onClick={() => handleNavClick('#applicants')}
                      className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                    >
                      Applicants
                    </button>
                  </div>

                  {/* Admin Controls */}
                  <div className="border-t pt-4 space-y-3">
                    {isAdmin ? (
                      <>
                        <div className="flex items-center text-sm text-emerald-600 font-medium px-4">
                          <Settings className="w-4 h-4 mr-2" />
                          Admin Mode
                        </div>
                        <Button
                          onClick={() => {
                            onAddApplicant();
                            setIsDrawerOpen(false);
                          }}
                          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                          size="sm"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Applicant
                        </Button>
                        <Button
                          onClick={() => {
                            onLogout?.();
                            setIsDrawerOpen(false);
                          }}
                          variant="outline"
                          className="w-full border-red-300 text-red-600 hover:bg-red-50"
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
                          setIsDrawerOpen(false);
                        }}
                        variant="outline"
                        className="w-full border-purple-300 text-purple-600 hover:bg-purple-50"
                      >
                        <LogIn className="w-4 h-4 mr-2" />
                        Admin Login
                      </Button>
                    )}
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </nav>
  );
};
