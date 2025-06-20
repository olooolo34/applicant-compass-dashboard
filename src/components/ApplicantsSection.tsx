import React from 'react';
import { Applicant } from '@/hooks/useApplicants';
import { ApplicantCard } from './ApplicantCard';

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
  const acceptedApplicants = applicants.filter(a => a.status === 'accepted').sort((a, b) => a.full_name.localeCompare(b.full_name));
  const pendingApplicants = applicants.filter(a => a.status === 'pending').sort((a, b) => a.full_name.localeCompare(b.full_name));
  const rejectedApplicants = applicants.filter(a => a.status === 'rejected').sort((a, b) => a.full_name.localeCompare(b.full_name));

  const StatusColumn = ({ 
    title, 
    applicants, 
    bgColor, 
    textColor, 
    count 
  }: { 
    title: string; 
    applicants: Applicant[]; 
    bgColor: string; 
    textColor: string; 
    count: number;
  }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className={`${bgColor} ${textColor} p-4 text-center`}>
        <h3 className="text-xl font-bold">{title}</h3>
        <div className="text-sm opacity-90 mt-1">{count} applicant{count !== 1 ? 's' : ''}</div>
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
          />
          <StatusColumn
            title="Rejected"
            applicants={rejectedApplicants}
            bgColor="bg-red-500"
            textColor="text-white"
            count={rejectedApplicants.length}
          />
        </div>
      </div>
    </section>
  );
};
