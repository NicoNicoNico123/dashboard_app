import { useEffect } from 'react';
import { resolvePath } from '../utils/path';

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
        relative w-full bg-[#0f1014]/90 border border-white/10 rounded-2xl shadow-2xl overflow-hidden
        transition-all duration-300 transform scale-100
        ${isExternal ? 'h-[90vh] sm:h-[85vh] max-w-7xl' : 'max-w-2xl max-h-[80vh]'}
        /* iOS fix: ensure transform doesn't create new stacking context that breaks fixed elements inside */
        transform-gpu
      `}>

        {/* Content */}
        <div className={`
          ${isExternal ? 'w-full h-full' : 'flex-1 w-full h-full overflow-hidden relative'}
        `}>
          {isExternal ? (
            /* External Iframe Mode - Better layout for iframe */
            <>
              {/* Header Bar with Close Button - Fixed position for iframe mode */}
              <div className="absolute top-0 left-0 right-0 z-40 h-16 bg-black/70 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-white/70 text-sm ml-2 truncate max-w-xs">
                    {content.title}
                  </span>
                </div>

                {/* Close Button - Better positioning in iframe mode */}
                <button
                  onClick={onClose}
                  className="p-2 rounded-full bg-black/50 text-white/70 hover:text-white hover:bg-white/20 transition-all cursor-pointer border border-white/10 flex items-center justify-center"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                  title="Close (ESC)"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Iframe Container - Takes full height minus header */}
              <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ paddingTop: '4rem' }}>
                <div className="w-full h-full overflow-y-auto overscroll-y-contain" style={{ WebkitOverflowScrolling: 'touch' }}>
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
              </div>
            </>
          ) : (
            /* Container/Details Mode */
            <div className="flex flex-col h-full overflow-y-auto custom-scrollbar relative">
              {/* Close Button for Details Mode */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 text-white/70 hover:text-white hover:bg-white/20 transition-all cursor-pointer border border-white/10 flex items-center justify-center backdrop-blur-sm"
                style={{ WebkitTapHighlightColor: 'transparent' }}
                title="Close (ESC)"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Image Header */}
              <div className="relative w-full shrink-0">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0f1014] z-10 pointer-events-none" />
                <img 
                  src={resolvePath(content.containerImg || content.image)} 
                  alt={content.containerTitle || content.title} 
                  className="w-full h-auto object-contain max-h-[40vh] bg-black/50"
                />
              </div>
              
            {/* Text Content */}
            <div className="relative z-20 pl-10 pr-6 w-full pb-10">
              <div className="mb-6 mt-6">
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 tracking-tight">
                    {content.containerTitle || content.title}
                  </h2>
                  {(content.containerSubtitle || content.subtitle) && (
                    <h3 className="text-xl text-cyan-400 font-medium tracking-wide">
                      {content.containerSubtitle || content.subtitle}
                    </h3>
                  )}
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
