
import React from 'react';
import { CheckCircle, Clock, Users, Shield } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const features = [
    {
      icon: Users,
      title: "Comprehensive Tracking",
      description: "Monitor all applicant information in one centralized dashboard with detailed profiles and status updates."
    },
    {
      icon: Clock,
      title: "Real-time Updates",
      description: "Get instant notifications when application statuses change and keep everyone informed automatically."
    },
    {
      icon: CheckCircle,
      title: "Easy Management",
      description: "Streamlined workflow for reviewing, accepting, or rejecting applications with simple click actions."
    },
    {
      icon: Shield,
      title: "Secure Access",
      description: "Admin-protected features ensure only authorized personnel can modify applicant data and statuses."
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            About Us
          </h2>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8 md:p-12 mb-16">
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-6">
              We are one of the largest snacking companies in Canada with delicious household favourites including Cadbury, Oreo, Christie and Maynards. Our brands are iconic, occupying many of the number one, two or three spots across their categories; and our makers and bakers have the enviable job of inventing and making chocolate, cookies, crackers and candy across our iconic Ontario manufacturing facilities and sites.
            </p>
            <p className="mb-6">
              We are a business that has set ambitious targets for growth, with around $250 million being invested into our Ontario-based manufacturing facilities in the last few years alone; we are leading marketing campaigns with innovations such as Cadbury Dark Milk and Oreo flavours, including Birthday Cake and Peppermint Bark. Our community of over 2,683 employees is based across Canada, with our head office in Toronto.
            </p>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
              We embrace the power of difference
            </h3>
            <p className="mb-4">
              What makes our workplace great is passion and personality. We expect people to be themselves, speak up, and embrace our diversity as our strength. We're mindful of the space and time you need to work flexibly, and the importance of trust and empathy in promoting a strong sense of belonging.
            </p>
            <p>
              Should you require reasonable accommodations through any stage of the recruitment process, please let your recruiter known when you are contacted and we will work with you to meet your needs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
