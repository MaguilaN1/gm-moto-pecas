import React, { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images, productName }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main Large Image */}
      <div className="relative aspect-square bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center p-6 group">
        <img
          src={images[selectedImage] || images[0]}
          alt={productName}
          className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(idx)}
              className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 bg-slate-950 p-1 ${
                selectedImage === idx
                  ? 'border-brand-500 ring-2 ring-brand-500/20 scale-105'
                  : 'border-slate-800 hover:border-slate-700 opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={img}
                alt={`${productName} miniatura ${idx + 1}`}
                className="w-full h-full object-cover rounded-xl"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
