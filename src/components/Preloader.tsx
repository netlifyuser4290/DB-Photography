
'use client';

import { useState, useEffect } from 'react';

const Preloader = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000); // Adjust timing as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      id="preloader"
      className={`fixed inset-0 bg-white z-[9999] flex justify-center items-center transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <h1 className="font-signature text-4xl md:text-6xl text-charcoal">Dhruv Badlawala </h1>
    </div>
  );
};

export default Preloader;
