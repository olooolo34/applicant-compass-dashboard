
import React, { useState } from 'react';
import { Navigation } from '../components/Navigation';
import { HeroBanner } from '../components/HeroBanner';
import { AboutSection } from '../components/AboutSection';
import { ApplicantsSection } from '../components/ApplicantsSection';
import { BrandsSection } from '../components/BrandsSection';
import { AdminModal } from '../components/AdminModal';
import { ApplicantModal } from '../components/ApplicantModal';
import { useApplicants, Applicant } from '../hooks/useApplicants';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showApplicantModal, setShowApplicantModal] = useState(false);
  const [editingApplicant, setEditingApplicant] = useState<Applicant | null>(null);
  const { toast } = useToast();
  
  const { applicants, loading, addApplicant, updateApplicant, updateStatus } = useApplicants();

  const handleLogin = (password: string) => {
    if (password === 'vip777') {
      setIsAdmin(true);
      setShowAdminModal(false);
      toast({
        title: "Login Successful",
        description: "Welcome, Administrator!",
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid password. Please try again.",
        variant: "destructive",
      });
    }
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
        onAddApplicant={() => setShowApplicantModal(true)}
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
        onStatusChange={handleStatusChange}
      />
      <BrandsSection />

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
