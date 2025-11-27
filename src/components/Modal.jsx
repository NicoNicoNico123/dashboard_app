import { useEffect } from 'react';

const Modal = ({ isOpen, onClose, content }) => {
  // Handle escape key to close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen || !content) return null;

  const isExternal = content.contentType === 'external';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className={`
        relative w-full bg-[#0f1014]/90 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col
        transition-all duration-300 transform scale-100
        ${isExternal ? 'h-[85vh] max-w-6xl' : 'max-w-2xl max-h-[80vh]'}
        /* iOS fix: ensure transform doesn't create new stacking context that breaks fixed elements inside */
        transform-gpu
      `}>
        
        {/* Close Button - Moved outside the scroll container logic slightly or ensured z-index */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 text-white/70 hover:text-white hover:bg-white/20 transition-all cursor-pointer"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="flex-1 w-full h-full overflow-hidden relative">
          {isExternal ? (
            /* External Iframe Mode */
            /* iOS Iframe Scrolling Fix: 
               1. Wrapper needs -webkit-overflow-scrolling: touch
               2. Wrapper needs fixed height or absolute positioning
               3. Iframe needs to be 100% height/width
            */
            <div className="absolute inset-0 w-full h-full overflow-y-auto overscroll-y-contain" style={{ WebkitOverflowScrolling: 'touch' }}>
              <iframe 
                src={content.url} 
                title="External Content"
                className="w-full h-full border-none bg-white"
                style={{ 
                  minHeight: '100%',
                  // iOS fix to prevent body scroll locking 
                  pointerEvents: 'auto' 
                }} 
              />
            </div>
          ) : (
            /* Container/Details Mode */
            <div className="flex flex-col h-full overflow-y-auto custom-scrollbar">
              {/* Image Header */}
              <div className="relative w-full h-64 sm:h-72 shrink-0">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0f1014] z-10" />
                <img 
                  src={content.containerImg || content.image} 
                  alt={content.containerTitle || content.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Text Content */}
              <div className="p-8 -mt-12 relative z-20">
                <div className="mb-6">
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 tracking-tight">
                    {content.containerTitle || content.title}
                  </h2>
                  {(content.containerSubtitle || content.subtitle) && (
                    <h3 className="text-xl text-cyan-400 font-medium tracking-wide">
                      {content.containerSubtitle || content.subtitle}
                    </h3>
                  )}
                </div>
                
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-line">
                    {content.description}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
