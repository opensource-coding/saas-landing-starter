import { useState, useEffect } from 'react';

export function useScrollDirection() {
  const [isScrolledUp, setIsScrolledUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (!isEnabled) return;

      const currentScrollY = window.scrollY;
      setIsScrolledUp(currentScrollY < lastScrollY || currentScrollY < 50);
      setLastScrollY(currentScrollY);
    };

    // Check if body has overflow hidden
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.target === document.body && mutation.attributeName === 'style') {
          const isOverflowHidden = document.body.style.overflow === 'hidden';
          setIsEnabled(!isOverflowHidden);
        }
      });
    });

    observer.observe(document.body, { attributes: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [lastScrollY, isEnabled]);

  return isScrolledUp;
}