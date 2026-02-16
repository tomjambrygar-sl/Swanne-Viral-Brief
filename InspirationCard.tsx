
import React, { useState, useRef } from 'react';
import { InspirationItem } from '../types';
import { ExternalLink, Edit2, Check, Trash2, Play, Image as ImageIcon, Upload } from 'lucide-react';

interface InspirationCardProps {
  item: InspirationItem;
  onUpdate: (id: string, updates: Partial<InspirationItem>) => void;
  onDelete: (id: string) => void;
}

const InspirationCard: React.FC<InspirationCardProps> = ({ item, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdate(item.id, { imageSource: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="group relative bg-white flex flex-col h-full transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] rounded-[2.5rem] overflow-hidden border border-stone-50">
      {/* 9:16 Aspect Ratio Thumbnail Area */}
      <div className="relative aspect-[9/16] overflow-hidden bg-stone-50 group/img">
        {item.imageSource ? (
          <img 
            src={item.imageSource} 
            alt="Inspiration thumbnail" 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-100"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-stone-200">
            <ImageIcon size={48} strokeWidth={1} className="mb-4 opacity-20" />
            <span className="text-[10px] uppercase tracking-[0.4em] font-light">No Image Selected</span>
          </div>
        )}
        
        {/* Play Overlay (Only if URL exists) */}
        {item.url && !isEditing && (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500 flex items-center justify-center">
              <a 
                href={item.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-500 bg-white/90 text-stone-900 px-8 py-3.5 rounded-full text-[10px] tracking-[0.3em] uppercase font-bold hover:bg-white flex items-center gap-2 shadow-2xl backdrop-blur-md"
              >
                <Play size={12} fill="currentColor" /> Watch
              </a>
          </div>
        )}

        {/* Action Buttons Overlay */}
        <div className="absolute top-8 right-8 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-[-10px] group-hover:translate-y-0 z-10">
          <button 
            onClick={() => setIsEditing(!isEditing)} 
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-stone-900 hover:bg-white transition-all shadow-lg"
          >
            {isEditing ? <Check size={16} /> : <Edit2 size={16} />}
          </button>
          <button 
            onClick={() => onDelete(item.id)}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-stone-400 hover:text-red-500 transition-all shadow-lg"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-10 flex flex-col flex-grow bg-white">
        {isEditing ? (
          <div className="space-y-8 flex-grow">
            {/* Image Source Controls */}
            <div className="space-y-4">
              <div>
                <label className="block text-[9px] uppercase tracking-[0.4em] text-stone-400 mb-3 font-bold">Thumbnail URL</label>
                <input 
                  type="text" 
                  value={item.imageSource} 
                  onChange={(e) => onUpdate(item.id, { imageSource: e.target.value })}
                  className="w-full text-xs font-light p-4 bg-stone-50 border-none rounded-2xl focus:ring-1 focus:ring-stone-200 focus:outline-none transition-all"
                  placeholder="Paste image link..."
                />
              </div>
              <div className="flex items-center gap-4">
                <div className="h-px flex-grow bg-stone-100"></div>
                <span className="text-[9px] uppercase tracking-[0.4em] text-stone-300 font-bold">OR</span>
                <div className="h-px flex-grow bg-stone-100"></div>
              </div>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center justify-center gap-2 py-4 border border-dashed border-stone-200 rounded-2xl text-[10px] uppercase tracking-[0.3em] text-stone-400 hover:text-stone-900 hover:border-stone-400 transition-all"
              >
                <Upload size={14} /> Upload File
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                className="hidden" 
                accept="image/*" 
              />
            </div>

            <div className="h-px bg-stone-50"></div>

            <div>
              <label className="block text-[9px] uppercase tracking-[0.4em] text-stone-400 mb-3 font-bold">Video Link</label>
              <input 
                type="text" 
                value={item.url} 
                onChange={(e) => onUpdate(item.id, { url: e.target.value })}
                className="w-full text-xs font-light p-4 bg-stone-50 border-none rounded-2xl focus:ring-1 focus:ring-stone-200 focus:outline-none transition-all"
                placeholder="TikTok / Reels / YouTube URL"
              />
            </div>
            <div>
              <label className="block text-[9px] uppercase tracking-[0.4em] text-stone-400 mb-3 font-bold">Inspiration Notes</label>
              <textarea 
                value={item.notes} 
                onChange={(e) => onUpdate(item.id, { notes: e.target.value })}
                className="w-full text-xs font-light p-5 bg-stone-50 border-none rounded-2xl focus:ring-1 focus:ring-stone-200 focus:outline-none min-h-[140px] resize-none transition-all leading-relaxed"
                placeholder="What makes this special?"
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <p className="text-lg font-light text-stone-700 leading-[1.8] mb-8 flex-grow font-serif italic">
              {item.notes ? `“${item.notes}”` : "Click edit to add notes."}
            </p>
            <div className="pt-6 border-t border-stone-50 flex justify-between items-center">
               <div className="flex flex-col gap-1">
                 <span className="text-[8px] uppercase tracking-[0.5em] text-stone-300 font-bold">Reference Link</span>
                 <a 
                   href={item.url || '#'} 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className={`text-[10px] uppercase tracking-[0.2em] transition-colors flex items-center gap-2 ${item.url ? 'text-stone-500 hover:text-stone-900' : 'text-stone-200 cursor-default'}`}
                 >
                   {item.url ? 'Open Source' : 'No link provided'} <ExternalLink size={10} />
                 </a>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InspirationCard;
