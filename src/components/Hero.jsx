import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Hero = ({ activeContent }) => {
  const { t } = useTranslation();
  const [loaded, setLoaded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayContent, setDisplayContent] = useState(activeContent);

  useEffect(() => {
    // Start transition
    setIsTransitioning(true);
    setLoaded(false);
    
    // Fade out current content
    const fadeOutTimer = setTimeout(() => {
      setDisplayContent(activeContent);
      setIsTransitioning(false);
      
      // Load new image
      const img = new Image();
      img.src = activeContent.image;
      img.onload = () => {
        setLoaded(true);
      };
    }, 300); // Half of transition duration

    return () => clearTimeout(fadeOutTimer);
  }, [activeContent]);

  const NeonButton = ({ text }) => {
    const [isHovered, setIsHovered] = useState(false);

    // Configuration for the glow colors
    const primaryColor = '0, 210, 255'; // Cyan-ish blue
    const glowColor = '0, 230, 255';    // Slightly brighter cyan for glow

    return (
      <button
        onClick={() => console.log('Button clicked')}
        className="
          relative
          rounded-full
          bg-transparent
          text-white
          text-sm
          font-light
          tracking-[0.3em]
          uppercase
          cursor-pointer
          transition-all duration-500 ease-out
          border-2
          z-10
        "
        style={{
          // Force larger button dimensions
          padding: '0.5rem 0.5rem',
          minWidth: '200px',
          minHeight: '70px',
          // Dynamic styles for the complex glow effects
          borderColor: `rgba(${primaryColor}, ${isHovered ? '1' : '0.5'})`,
          backgroundColor: isHovered
            ? `rgba(${primaryColor}, 0.15)`
            : 'transparent',
          boxShadow: isHovered
            ? `
              0 0 20px rgba(${glowColor}, 1),
              0 0 40px rgba(${glowColor}, 0.8),
              0 0 80px rgba(${glowColor}, 0.6),
              0 0 120px rgba(${glowColor}, 0.4),
              inset 0 0 40px rgba(${glowColor}, 0.4)
              `
            : `
              0 0 8px rgba(${glowColor}, 0.4),
              0 0 16px rgba(${glowColor}, 0.2),
              inset 0 0 20px rgba(${glowColor}, 0.2)
              `,
          textShadow: isHovered
            ? `0 0 16px rgba(${glowColor}, 1), 0 0 32px rgba(${glowColor}, 0.6)`
            : `0 0 8px rgba(${glowColor}, 0.4)`,
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {text}

        {/* Inner highlight line to simulate the "glassy" top edge often seen in UI like this */}
        <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-200/60 to-transparent opacity-70"></div>
      </button>
    );
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background Layer */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black z-0" /> {/* Fallback black */}
        <img 
          src={displayContent.image} 
          alt={displayContent.title}
          className={`w-full h-full object-cover transition-all duration-600 ease-out transform z-0 ${
            loaded && !isTransitioning ? 'scale-105 opacity-60' : 'scale-110 opacity-0 blur-xl'
          }`}
        />
        
        {/* Cinematic Gradients - Refined for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent z-10 w-2/3"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1014] via-[#0f1014]/60 to-transparent z-10 h-full"></div>
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/40 z-10"></div>
      </div>

      {/* Content Info Container - UPDATED LAYOUT */}
      <div className="absolute top-0 left-0 h-full flex flex-col justify-end z-20 max-w-2xl" style={{ paddingBottom: '45vh', paddingLeft: '9vw', paddingRight: '4vw' }}>
        <div className={`transition-all duration-600 ease-in-out ${
          isTransitioning ? 'opacity-0 translate-x-[-20px] translate-y-4' : 'opacity-100 translate-x-0 translate-y-0'
        }`}>
          
          {/* Tags Row */}
          <div className="flex items-center space-x-3 mb-8">
             <div className="flex items-center bg-white/10 backdrop-blur-md px-3 py-1 rounded-md border border-white/10">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                <span className="text-white text-[10px] font-bold uppercase tracking-wider">{t('live_app')}</span>
             </div>
            {displayContent.tags.map((tag) => (
              <span key={tag} className="text-gray-300 text-xs font-medium px-2 py-1 rounded border border-transparent hover:border-white/20 transition-colors cursor-default">
                {tag}
              </span>
            ))}
          </div>
          
          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-tight drop-shadow-2xl mb-8" style={{ marginBottom: '2vh' }}>
            {displayContent.title}
          </h1>
          
          {/* Description */}
          <p className="text-gray-300 text-base md:text-lg leading-relaxed line-clamp-3 font-light max-w-xl text-shadow mb-6" style={{ marginBottom: '2vh' }}>
            {displayContent.description}
          </p>
          
          {/* Actions */}
          <div className="relative group" style={{ paddingTop: '2vh' }}>
            {/* Ambient background glow behind the button (for atmosphere) */}
            <div className="absolute -inset-4 bg-cyan-500/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <NeonButton text={t('enter')} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
