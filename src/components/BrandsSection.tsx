
import React from 'react';

export const BrandsSection: React.FC = () => {
  const brands = [
    {
      src: "/lovable-uploads/d80c3821-912a-44e4-a799-f3d2f54366f7.png",
      alt: "Cadbury Dairy Milk"
    },
    {
      src: "/lovable-uploads/6f599d62-3cf2-4f9f-821a-e5c50d04477e.png",
      alt: "Oreo"
    },
    {
      src: "/lovable-uploads/9c3f4ada-c5f6-4ddf-98e1-29f2343c4e9e.png",
      alt: "Christie"
    },
    {
      src: "/lovable-uploads/a6d97e6b-5f59-4925-99ac-f60df2b94bed.png",
      alt: "Maynards Bassetts"
    },
    {
      src: "/lovable-uploads/45b7122a-6206-4966-bf4a-38d402e4ea49.png",
      alt: "Ritz Crackers"
    },
    {
      src: "/lovable-uploads/1c725baf-0ebc-46ad-abe1-7834c3ef8334.png",
      alt: "Peek Freans"
    },
    {
      src: "/lovable-uploads/7b3276ff-1607-43cf-8b73-78b30d9774c4.png",
      alt: "Dad's"
    },
    {
      src: "/lovable-uploads/48254f7c-39c6-46ba-8a2b-1c5089c3fbdc.png",
      alt: "Cadbury Creme Egg"
    },
    {
      src: "/lovable-uploads/bcb3b709-5954-4590-8a6f-e5c338b54b5b.png",
      alt: "Caramilk"
    },
    {
      src: "/lovable-uploads/0ac0acec-60bc-4315-94e6-fde48f191234.png",
      alt: "Halls"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Our Iconic Brands
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We're proud to be home to some of Canada's most beloved household favorites. 
            These iconic brands hold leading positions across their categories and are enjoyed by millions of Canadians.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center">
          {brands.map((brand, index) => (
            <div key={index} className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
              <img 
                src={brand.src} 
                alt={brand.alt} 
                className="max-h-16 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
