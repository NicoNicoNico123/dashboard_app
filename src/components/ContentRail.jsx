import { ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { resolvePath } from '../utils/path';

const ContentRail = ({ items, activeId, onSelect }) => {
  const { t } = useTranslation();
  return (
    <div className="absolute bottom-0 w-full z-30 pb-6 md:pb-12 bg-gradient-to-t from-[#0f1014] via-[#0f1014] to-transparent pointer-events-none pt-4 md:pt-[3vh]">
      <div className="flex space-x-4 md:space-x-8 overflow-x-auto scrollbar-hide items-end mask-image-right pointer-events-auto px-4 md:pl-[7vw] md:pr-[1.56vw] pb-4 md:pb-[3vh]">
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <div 
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={`
                relative flex-shrink-0 cursor-pointer transition-all duration-500 ease-out group
                ${isActive ? 'w-52 md:w-64 z-10' : 'w-36 md:w-44 opacity-60 hover:opacity-90 hover:scale-105'}
              `}
            >
              {/* Card Container */}
              <div className={`
                relative rounded-xl overflow-hidden aspect-[16/9] shadow-2xl transition-all duration-500 mb-4 md:mb-8
                ${isActive
                  ? 'ring-2 ring-white shadow-[0_0_30px_rgba(255,255,255,0.3)] scale-105 translate-y-0'
                  : 'ring-0 translate-y-4 hover:translate-y-2 grayscale-[30%] hover:grayscale-0'}
              `}>
                <img
                  src={resolvePath(item.poster || item.image)}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Active Overlay */}
                <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${isActive ? 'opacity-0' : 'opacity-100 group-hover:opacity-0'}`}></div>
                
                </div>
              
              {/* Text Label */}
              <div className={`!mt-3 transition-all duration-500 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <h4 className="text-white font-bold text-base md:text-lg truncate leading-tight">{item.title}</h4>
                <div className="flex items-center space-x-2 mt-1">
                   <span className="text-purple-400 text-xs font-bold uppercase">{item.version}</span>
                   <span className="text-gray-500 text-xs">•</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContentRail;
