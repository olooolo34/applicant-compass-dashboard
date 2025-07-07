
import React, { useState, useEffect } from 'react';
import { Applicant } from '@/hooks/useApplicants';
import { ApplicantCard } from './ApplicantCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Edit2, Check, X } from 'lucide-react';

interface ApplicantsSectionProps {
  applicants: Applicant[];
  isAdmin: boolean;
  onEditApplicant: (applicant: Applicant) => void;
  onDeleteApplicant: (id: string) => void;
  onStatusChange: (id: string, status: 'accepted' | 'pending' | 'rejected') => void;
}

export const ApplicantsSection: React.FC<ApplicantsSectionProps> = ({
  applicants,
  isAdmin,
  onEditApplicant,
  onDeleteApplicant,
  onStatusChange
}) => {
  const [pendingCount, setPendingCount] = useState('');
  const [rejectedCount, setRejectedCount] = useState('');
  const [isEditingPending, setIsEditingPending] = useState(false);
  const [isEditingRejected, setIsEditingRejected] = useState(false);

  // Load saved custom counts from localStorage on component mount
  useEffect(() => {
    const savedPendingCount = localStorage.getItem('admin_pending_count');
    const savedRejectedCount = localStorage.getItem('admin_rejected_count');
    
    if (savedPendingCount) {
      setPendingCount(savedPendingCount);
    }
    if (savedRejectedCount) {
      setRejectedCount(savedRejectedCount);
    }
  }, []);

  const acceptedApplicants = applicants.filter(a => a.status === 'accepted').sort((a, b) => a.full_name.localeCompare(b.full_name));
  const pendingApplicants = applicants.filter(a => a.status === 'pending').sort((a, b) => a.full_name.localeCompare(b.full_name));
  const rejectedApplicants = applicants.filter(a => a.status === 'rejected').sort((a, b) => a.full_name.localeCompare(b.full_name));

  const handleSavePendingCount = () => {
    localStorage.setItem('admin_pending_count', pendingCount);
    setIsEditingPending(false);
  };

  const handleSaveRejectedCount = () => {
    localStorage.setItem('admin_rejected_count', rejectedCount);
    setIsEditingRejected(false);
  };

  const handleCancelPendingEdit = () => {
    const savedCount = localStorage.getItem('admin_pending_count') || '';
    setPendingCount(savedCount);
    setIsEditingPending(false);
  };

  const handleCancelRejectedEdit = () => {
    const savedCount = localStorage.getItem('admin_rejected_count') || '';
    setRejectedCount(savedCount);
    setIsEditingRejected(false);
  };

  const StatusColumn = ({ 
    title, 
    applicants, 
    bgColor, 
    textColor, 
    count,
    customCount,
    isEditing,
    onEditClick,
    onCountChange,
    onSave,
    onCancel
  }: { 
    title: string; 
    applicants: Applicant[]; 
    bgColor: string; 
    textColor: string; 
    count: number;
    customCount?: string;
    isEditing?: boolean;
    onEditClick?: () => void;
    onCountChange?: (value: string) => void;
    onSave?: () => void;
    onCancel?: () => void;
  }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className={`${bgColor} ${textColor} p-4 text-center`}>
        <h3 className="text-xl font-bold">{title}</h3>
        <div className="text-sm opacity-90 mt-1 flex items-center justify-center gap-2">
          {title === 'Accepted' ? (
            `${count} applicant${count !== 1 ? 's' : ''}`
          ) : isAdmin && isEditing ? (
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={customCount}
                onChange={(e) => onCountChange?.(e.target.value)}
                className="w-16 h-6 text-xs text-center bg-white/20 border-white/30 text-white placeholder-white/70"
                placeholder="0"
                autoFocus
              />
              <span>applicant{customCount !== '1' ? 's' : ''}</span>
              <Button
                size="sm"
                variant="ghost"
                onClick={onSave}
                className="h-6 w-6 p-0 text-white hover:bg-white/20"
              >
                <Check className="w-3 h-3" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={onCancel}
                className="h-6 w-6 p-0 text-white hover:bg-white/20"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <span>{customCount || count} applicant{(customCount ? parseInt(customCount) : count) !== 1 ? 's' : ''}</span>
              {isAdmin && (
                <Edit2 
                  className="w-3 h-3 cursor-pointer opacity-70 hover:opacity-100" 
                  onClick={onEditClick}
                />
              )}
            </div>
          )}
        </div>
      </div>
      <div className="p-4 space-y-4 min-h-[400px]">
        {applicants.length > 0 ? (
          applicants.map(applicant => (
            <ApplicantCard
              key={applicant.id}
              applicant={applicant}
              isAdmin={isAdmin}
              onEdit={() => onEditApplicant(applicant)}
              onDelete={() => onDeleteApplicant(applicant.id)}
              onStatusChange={(status) => onStatusChange(applicant.id, status)}
            />
          ))
        ) : (
          <div className="text-center text-gray-500 py-8">
            <div className="text-4xl mb-2">📋</div>
            <p>No {title.toLowerCase()} applicants</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <section id="applicants" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Application Status
          </h2>
          <p className="text-xl text-gray-600">
            Applicants can check their results below
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <StatusColumn
            title="Accepted"
            applicants={acceptedApplicants}
            bgColor="bg-green-500"
            textColor="text-white"
            count={acceptedApplicants.length}
          />
          <StatusColumn
            title="Pending"
            applicants={pendingApplicants}
            bgColor="bg-orange-500"
            textColor="text-white"
            count={pendingApplicants.length}
            customCount={pendingCount}
            isEditing={isEditingPending}
            onEditClick={() => setIsEditingPending(true)}
            onCountChange={setPendingCount}
            onSave={handleSavePendingCount}
            onCancel={handleCancelPendingEdit}
          />
          <StatusColumn
            title="Rejected"
            applicants={rejectedApplicants}
            bgColor="bg-red-500"
            textColor="text-white"
            count={rejectedApplicants.length}
            customCount={rejectedCount}
            isEditing={isEditingRejected}
            onEditClick={() => setIsEditingRejected(true)}
            onCountChange={setRejectedCount}
            onSave={handleSaveRejectedCount}
            onCancel={handleCancelRejectedEdit}
          />
        </div>
      </div>
    </section>
  );
};
