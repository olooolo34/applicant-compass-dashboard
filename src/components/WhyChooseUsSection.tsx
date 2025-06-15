
import React from 'react';

export const WhyChooseUsSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8 md:p-12">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Us?
            </h3>
            <p className="text-lg text-gray-700 mb-8 max-w-4xl mx-auto">
              We're proud to be recognized as one of Canada's best employers and a great place to work. 
              Our commitment to our employees and workplace culture has earned us prestigious awards and recognition 
              as one of Greater Toronto's top employers.
            </p>
            
            <div className="flex flex-wrap justify-center items-center gap-8 mb-8">
              <img 
                src="/lovable-uploads/efead1d5-eef2-4060-bc56-04a537d99ea5.png" 
                alt="Great Place to Work Certified Canada" 
                className="h-20 w-auto"
              />
              <img 
                src="/lovable-uploads/b6ece153-caa8-4c86-8de6-3ecd01c06780.png" 
                alt="Greater Toronto's Top 2025 Employers" 
                className="h-20 w-auto"
              />
              <img 
                src="/lovable-uploads/51e46c1a-3e09-4900-9269-9a4de911bc39.png" 
                alt="Canada's Top 100 Employers 2025" 
                className="h-20 w-auto"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">2,683+</div>
                <div className="text-gray-600">Employees Across Canada</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-600 mb-2">$250M</div>
                <div className="text-gray-600">Investment in Ontario Facilities</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-indigo-600 mb-2">Top 3</div>
                <div className="text-gray-600">Market Position in Categories</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
