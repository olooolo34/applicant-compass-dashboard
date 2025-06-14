
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ImageUpload } from './ImageUpload';
import { Applicant } from '@/hooks/useApplicants';
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
    full_name: '',
    gender: '',
    age: '',
    passport_number: '',
    phone_number: '',
    job: '',
    status: 'pending' as 'accepted' | 'pending' | 'rejected',
    profile_picture: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (applicant) {
      setFormData({
        full_name: applicant.full_name,
        gender: applicant.gender,
        age: applicant.age.toString(),
        passport_number: applicant.passport_number,
        phone_number: applicant.phone_number,
        job: applicant.job || '',
        status: applicant.status,
        profile_picture: applicant.profile_picture || ''
      });
    } else {
      setFormData({
        full_name: '',
        gender: '',
        age: '',
        passport_number: '',
        phone_number: '',
        job: '',
        status: 'pending',
        profile_picture: ''
      });
    }
  }, [applicant, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const applicantData = {
        full_name: formData.full_name,
        gender: formData.gender,
        age: parseInt(formData.age),
        passport_number: formData.passport_number,
        phone_number: formData.phone_number,
        job: formData.job,
        status: formData.status,
        profile_picture: formData.profile_picture || null
      };

      if (applicant) {
        await onSubmit({ ...applicantData, id: applicant.id });
      } else {
        await onSubmit(applicantData);
      }
      
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
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
          <ImageUpload
            value={formData.profile_picture}
            onChange={(url) => setFormData(prev => ({ ...prev, profile_picture: url }))}
            disabled={isSubmitting}
          />

          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={formData.full_name}
              onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
              placeholder="Enter full name"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select 
              value={formData.gender} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}
              disabled={isSubmitting}
            >
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
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="passportNumber">Passport Number</Label>
            <Input
              id="passportNumber"
              value={formData.passport_number}
              onChange={(e) => setFormData(prev => ({ ...prev, passport_number: e.target.value }))}
              placeholder="Enter passport number"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              value={formData.phone_number}
              onChange={(e) => setFormData(prev => ({ ...prev, phone_number: e.target.value }))}
              placeholder="Enter phone number"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="job">Job</Label>
            <Input
              id="job"
              value={formData.job}
              onChange={(e) => setFormData(prev => ({ ...prev, job: e.target.value }))}
              placeholder="Enter job title"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select 
              value={formData.status} 
              onValueChange={(value: 'accepted' | 'pending' | 'rejected') => setFormData(prev => ({ ...prev, status: value }))}
              disabled={isSubmitting}
            >
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
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : (applicant ? 'Update Applicant' : 'Add Applicant')}
            </Button>
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
