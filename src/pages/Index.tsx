import React, { useState, useEffect } from 'react';
import { Navigation } from '../components/Navigation';
import { HeroBanner } from '../components/HeroBanner';
import { AboutSection } from '../components/AboutSection';
import { ApplicantsSection } from '../components/ApplicantsSection';
import { WhyChooseUsSection } from '../components/WhyChooseUsSection';
import { BrandsSection } from '../components/BrandsSection';
import { AdminModal } from '../components/AdminModal';
import { ApplicantModal } from '../components/ApplicantModal';
import { useApplicants, Applicant } from '../hooks/useApplicants';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const Index = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showApplicantModal, setShowApplicantModal] = useState(false);
  const [editingApplicant, setEditingApplicant] = useState<Applicant | null>(null);
  const { toast } = useToast();
  
  const { applicants, loading, addApplicant, updateApplicant, deleteApplicant, updateStatus } = useApplicants();

  // Check for persistent admin login on component mount
  useEffect(() => {
    const checkPersistentLogin = () => {
      const deviceInfo = getDeviceInfo();
      const storedAdminInfo = localStorage.getItem('admin_session');
      
      if (storedAdminInfo) {
        const { deviceHash, timestamp } = JSON.parse(storedAdminInfo);
        const currentDeviceHash = btoa(deviceInfo);
        const daysSinceLogin = (Date.now() - timestamp) / (1000 * 60 * 60 * 24);
        
        // Auto-login if same device and within 30 days
        if (deviceHash === currentDeviceHash && daysSinceLogin < 30) {
          setIsAdmin(true);
        } else {
          localStorage.removeItem('admin_session');
        }
      }
    };

    checkPersistentLogin();
  }, []);

  const getDeviceInfo = () => {
    const userAgent = navigator.userAgent;
    const screenResolution = `${screen.width}x${screen.height}`;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const language = navigator.language;
    
    return `${userAgent}-${screenResolution}-${timezone}-${language}`;
  };

  const handleLogin = (password: string) => {
    if (password === 'vip777') {
      const deviceInfo = getDeviceInfo();
      const deviceHash = btoa(deviceInfo);
      
      // Store admin session with device info
      localStorage.setItem('admin_session', JSON.stringify({
        deviceHash,
        timestamp: Date.now()
      }));
      
      setIsAdmin(true);
      setShowAdminModal(false);
      toast({
        title: "Login Successful",
        description: "Welcome, Administrator! You'll stay logged in on this device.",
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid password. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_session');
    setIsAdmin(false);
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
  };

  const handleAddApplicant = async (applicant: Omit<Applicant, 'id'>) => {
    try {
      await addApplicant(applicant);
      setShowApplicantModal(false);
    } catch (error) {
      // Error is handled in the hook
    }
  };

  const handleEditApplicant = async (applicant: Applicant) => {
    try {
      await updateApplicant(applicant.id, applicant);
      setEditingApplicant(null);
      setShowApplicantModal(false);
    } catch (error) {
      // Error is handled in the hook
    }
  };

  const handleDeleteApplicant = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this applicant? This action cannot be undone.')) {
      try {
        await deleteApplicant(id);
      } catch (error) {
        // Error is handled in the hook
      }
    }
  };

  const handleStatusChange = async (id: string, newStatus: 'accepted' | 'pending' | 'rejected') => {
    try {
      await updateStatus(id, newStatus);
    } catch (error) {
      // Error is handled in the hook
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading applicants...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <Navigation 
        isAdmin={isAdmin} 
        onLoginClick={() => setShowAdminModal(true)}
        onLogout={handleLogout}
      />
      <HeroBanner />
      <AboutSection />
      <ApplicantsSection 
        applicants={applicants}
        isAdmin={isAdmin}
        onEditApplicant={(applicant) => {
          setEditingApplicant(applicant);
          setShowApplicantModal(true);
        }}
        onDeleteApplicant={handleDeleteApplicant}
        onStatusChange={handleStatusChange}
      />
      <WhyChooseUsSection />
      <BrandsSection />

      {isAdmin && (
        <Button
          onClick={() => setShowApplicantModal(true)}
          className="fixed bottom-8 right-8 z-50 h-16 w-16 rounded-full bg-purple-600 text-white shadow-lg hover:bg-purple-700 transition-transform hover:scale-110 flex items-center justify-center"
          aria-label="Add new applicant"
        >
          <Plus className="h-8 w-8" />
        </Button>
      )}

      <AdminModal
        isOpen={showAdminModal}
        onClose={() => setShowAdminModal(false)}
        onLogin={handleLogin}
      />

      <ApplicantModal
        isOpen={showApplicantModal}
        onClose={() => {
          setShowApplicantModal(false);
          setEditingApplicant(null);
        }}
        onSubmit={editingApplicant ? handleEditApplicant : handleAddApplicant}
        applicant={editingApplicant}
      />
    </div>
  );
};

export default Index;
