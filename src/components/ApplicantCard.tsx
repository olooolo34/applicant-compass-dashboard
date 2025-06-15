
import React, { useState } from 'react';
import { Applicant } from '@/hooks/useApplicants';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, ChevronDown, ChevronUp, Phone, FileText, User, Calendar, Briefcase, Trash2 } from 'lucide-react';

interface ApplicantCardProps {
  applicant: Applicant;
  isAdmin: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onStatusChange: (status: 'accepted' | 'pending' | 'rejected') => void;
}

export const ApplicantCard: React.FC<ApplicantCardProps> = ({
  applicant,
  isAdmin,
  onEdit,
  onDelete,
  onStatusChange
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="p-4">
        <div 
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {applicant.profile_picture ? (
            <img
              src={applicant.profile_picture}
              alt={applicant.full_name}
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-100 border-2 border-gray-200 flex items-center justify-center">
              <User className="w-8 h-8 text-gray-400" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="text-md sm:text-lg font-semibold text-gray-900">
              {applicant.full_name}
            </h3>
            <Badge className={`${getStatusColor(applicant.status)} text-xs`}>
              {applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1)}
            </Badge>
          </div>
          <div
            className="text-gray-500"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </div>

        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-gray-100 space-y-3 animate-fade-in">
            <div className="grid grid-cols-1 gap-3 text-sm">
              <div className="flex items-center space-x-2 text-gray-600">
                <User className="w-4 h-4" />
                <span>Gender: {applicant.gender}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Age: {applicant.age} years</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <FileText className="w-4 h-4" />
                <span>Passport: {applicant.passport_number}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Phone className="w-4 h-4" />
                <span>Phone: {applicant.phone_number}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Briefcase className="w-4 h-4" />
                <span>Job: {applicant.job}</span>
              </div>
            </div>

            {isAdmin && (
              <div className="pt-3 border-t border-gray-100">
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onEdit}
                    className="text-blue-600 border-blue-600 hover:bg-blue-50"
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onDelete}
                    className="text-red-600 border-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-3 h-3 mr-1" />
                    Delete
                  </Button>
                  {applicant.status !== 'accepted' && (
                    <Button
                      size="sm"
                      onClick={() => onStatusChange('accepted')}
                      className="bg-green-600 hover:bg-green-700 text-white text-xs"
                    >
                      Accept
                    </Button>
                  )}
                  {applicant.status !== 'pending' && (
                    <Button
                      size="sm"
                      onClick={() => onStatusChange('pending')}
                      className="bg-orange-600 hover:bg-orange-700 text-white text-xs"
                    >
                      Pending
                    </Button>
                  )}
                  {applicant.status !== 'rejected' && (
                    <Button
                      size="sm"
                      onClick={() => onStatusChange('rejected')}
                      className="bg-red-600 hover:bg-red-700 text-white text-xs"
                    >
                      Reject
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
