import React from 'react';

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className=\"fixed top-0 left-0 h-1 bg-brand-gold z-[99] transition-all duration-100 ease-out\"
      style={{ width: `${scrollProgress}%` }}
    />
  );
}
