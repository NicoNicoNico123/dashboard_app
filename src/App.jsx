import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Hero from './components/Hero';
import ContentRail from './components/ContentRail';
import LanguageSelector from './components/LanguageSelector';

function App() {
  const { t } = useTranslation();
  const [activeContentId, setActiveContentId] = useState(3);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);
  const lastInteractionRef = useRef(Date.now());

  // Get localized content
  const CONTENT = t('content', { returnObjects: true });
  const activeContent = CONTENT.find((c) => c.id === activeContentId) || CONTENT[0];

  // Auto-slide functionality
  useEffect(() => {
    const startAutoSlide = () => {
      // Clear any existing interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      // Don't start if modal is open
      if (isModalOpen) return;

      // Set up new interval for auto-sliding
      intervalRef.current = setInterval(() => {
        setActiveContentId((prevId) => {
          const currentIndex = CONTENT.findIndex((c) => c.id === prevId);
          const nextIndex = (currentIndex + 1) % CONTENT.length;
          return CONTENT[nextIndex].id;
        });
      }, 5000); // 5 seconds
    };

    // Start auto-slide initially
    startAutoSlide();

    // Check for user interaction and restart auto-slide after idle period
    const checkIdle = setInterval(() => {
      const timeSinceLastInteraction = Date.now() - lastInteractionRef.current;
      // If user has been idle for more than 5 seconds, restart auto-slide
      if (timeSinceLastInteraction > 5000 && !intervalRef.current && !isModalOpen) {
        startAutoSlide();
      }
    }, 1000);

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      clearInterval(checkIdle);
    };
  }, [isModalOpen]); // Re-run when modal state changes

  // Handle user selection - pause auto-slide and restart after idle
  const handleSelect = (id) => {
    lastInteractionRef.current = Date.now();
    
    // Clear current interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Update active content
    setActiveContentId(id);

    // Restart auto-slide after 5 seconds of inactivity
    timeoutRef.current = setTimeout(() => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      intervalRef.current = setInterval(() => {
        setActiveContentId((prevId) => {
          const currentIndex = CONTENT.findIndex((c) => c.id === prevId);
          const nextIndex = (currentIndex + 1) % CONTENT.length;
          return CONTENT[nextIndex].id;
        });
      }, 5000);
    }, 5000);
  };

  return (
    <div className="h-dvh w-screen bg-[#0f1014] font-sans overflow-hidden selection:bg-purple-500 selection:text-white relative">
      <LanguageSelector />
      <main className="h-full w-full relative">
        {/* Hero Section */}
        <Hero 
          activeContent={activeContent} 
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />

        {/* Content Rail Overlay */}
        <ContentRail items={CONTENT} activeId={activeContentId} onSelect={handleSelect} />
      </main>
    </div>
  );
}

export default App;
