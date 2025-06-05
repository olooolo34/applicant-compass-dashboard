
import React, { useState } from 'react';
import { Navigation } from '../components/Navigation';
import { HeroBanner } from '../components/HeroBanner';
import { AboutSection } from '../components/AboutSection';
import { ApplicantsSection } from '../components/ApplicantsSection';
import { AdminModal } from '../components/AdminModal';
import { ApplicantModal } from '../components/ApplicantModal';
import { useToast } from '@/hooks/use-toast';

export interface Applicant {
  id: string;
  profilePicture: string;
  fullName: string;
  gender: string;
  age: number;
  passportNumber: string;
  phoneNumber: string;
  status: 'accepted' | 'pending' | 'rejected';
}

const Index = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showApplicantModal, setShowApplicantModal] = useState(false);
  const [editingApplicant, setEditingApplicant] = useState<Applicant | null>(null);
  const { toast } = useToast();

  // Sample data - in a real app, this would come from your backend
  const [applicants, setApplicants] = useState<Applicant[]>([
    {
      id: '1',
      profilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
      fullName: 'Sarah Johnson',
      gender: 'Female',
      age: 28,
      passportNumber: 'US123456789',
      phoneNumber: '+1-555-0123',
      status: 'accepted'
    },
    {
      id: '2',
      profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      fullName: 'Michael Chen',
      gender: 'Male',
      age: 32,
      passportNumber: 'CA987654321',
      phoneNumber: '+1-555-0456',
      status: 'pending'
    },
    {
      id: '3',
      profilePicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      fullName: 'Emily Rodriguez',
      gender: 'Female',
      age: 25,
      passportNumber: 'MX456789123',
      phoneNumber: '+1-555-0789',
      status: 'rejected'
    },
    {
      id: '4',
      profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      fullName: 'David Thompson',
      gender: 'Male',
      age: 30,
      passportNumber: 'UK789123456',
      phoneNumber: '+44-20-7946-0958',
      status: 'pending'
    }
  ]);

  const handleLogin = (password: string) => {
    if (password === 'admin123') {
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

  const handleAddApplicant = (applicant: Omit<Applicant, 'id'>) => {
    const newApplicant = {
      ...applicant,
      id: Date.now().toString()
    };
    setApplicants(prev => [...prev, newApplicant]);
    setShowApplicantModal(false);
    toast({
      title: "Applicant Added",
      description: `${applicant.fullName} has been added successfully.`,
    });
  };

  const handleEditApplicant = (applicant: Applicant) => {
    setApplicants(prev => prev.map(a => a.id === applicant.id ? applicant : a));
    setEditingApplicant(null);
    setShowApplicantModal(false);
    toast({
      title: "Applicant Updated",
      description: `${applicant.fullName}'s information has been updated.`,
    });
  };

  const handleStatusChange = (id: string, newStatus: 'accepted' | 'pending' | 'rejected') => {
    setApplicants(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
    const applicant = applicants.find(a => a.id === id);
    if (applicant) {
      toast({
        title: "Status Updated",
        description: `${applicant.fullName} status changed to ${newStatus}.`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
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
