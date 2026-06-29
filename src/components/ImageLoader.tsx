import React, { useState } from 'react';

interface ImageLoaderProps {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
}

export default function ImageLoader({ 
  src, 
  alt, 
  className = '', 
  wrapperClassName = '' 
}: ImageLoaderProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-brand-charcoal/5 ${wrapperClassName}`}>
      {/* Placeholder Skeleton */}
      {!isLoaded && (
        <div className=\"absolute inset-0 bg-gradient-to-r from-brand-charcoal/5 via-brand-charcoal/10 to-brand-charcoal/5 animate-pulse\" />
      )}
      
      <img
        src={src}
        alt={alt}
        loading=\"lazy\"
        onLoad={() => setIsLoaded(true)}
        className={`transition-all duration-700 ease-out ${
          isLoaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-105 blur-md'
        } ${className}`}
      />
    </div>
  );
}
