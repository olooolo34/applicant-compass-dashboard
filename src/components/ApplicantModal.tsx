
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Applicant } from '../pages/Index';
import { UserPlus, Edit } from 'lucide-react';

interface ApplicantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (applicant: Applicant | Omit<Applicant, 'id'>) => void;
  applicant?: Applicant | null;
}

export const ApplicantModal: React.FC<ApplicantModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  applicant 
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    age: '',
    passportNumber: '',
    phoneNumber: '',
    status: 'pending' as 'accepted' | 'pending' | 'rejected',
    profilePicture: ''
  });

  useEffect(() => {
    if (applicant) {
      setFormData({
        fullName: applicant.fullName,
        gender: applicant.gender,
        age: applicant.age.toString(),
        passportNumber: applicant.passportNumber,
        phoneNumber: applicant.phoneNumber,
        status: applicant.status,
        profilePicture: applicant.profilePicture
      });
    } else {
      setFormData({
        fullName: '',
        gender: '',
        age: '',
        passportNumber: '',
        phoneNumber: '',
        status: 'pending',
        profilePicture: ''
      });
    }
  }, [applicant, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const profilePicture = formData.profilePicture || 
      `https://images.unsplash.com/photo-${Math.random() > 0.5 ? '1494790108755-2616b612b47c' : '1507003211169-0a1dd7228f2d'}?w=150&h=150&fit=crop&crop=face`;

    const applicantData = {
      fullName: formData.fullName,
      gender: formData.gender,
      age: parseInt(formData.age),
      passportNumber: formData.passportNumber,
      phoneNumber: formData.phoneNumber,
      status: formData.status,
      profilePicture
    };

    if (applicant) {
      onSubmit({ ...applicantData, id: applicant.id });
    } else {
      onSubmit(applicantData);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {applicant ? <Edit className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
            {applicant ? 'Edit Applicant' : 'Add New Applicant'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
              placeholder="Enter full name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select value={formData.gender} onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              value={formData.age}
              onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
              placeholder="Enter age"
              min="18"
              max="100"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="passportNumber">Passport Number</Label>
            <Input
              id="passportNumber"
              value={formData.passportNumber}
              onChange={(e) => setFormData(prev => ({ ...prev, passportNumber: e.target.value }))}
              placeholder="Enter passport number"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
              placeholder="Enter phone number"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="profilePicture">Profile Picture URL (Optional)</Label>
            <Input
              id="profilePicture"
              value={formData.profilePicture}
              onChange={(e) => setFormData(prev => ({ ...prev, profilePicture: e.target.value }))}
              placeholder="Enter image URL (optional)"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value: 'accepted' | 'pending' | 'rejected') => setFormData(prev => ({ ...prev, status: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              {applicant ? 'Update Applicant' : 'Add Applicant'}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
