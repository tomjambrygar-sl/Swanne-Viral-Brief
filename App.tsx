
import React, { useState } from 'react';
import { InspirationItem } from './types';
import { INITIAL_DATA } from './constants';
import InspirationCard from './components/InspirationCard';
import { Plus, LayoutGrid, Instagram, Video } from 'lucide-react';

const App: React.FC = () => {
  const [items, setItems] = useState<InspirationItem[]>(INITIAL_DATA);

  const updateItem = (id: string, updates: Partial<InspirationItem>) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  const deleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const addNewItem = () => {
    const newItem: InspirationItem = {
      id: Date.now().toString(),
      url: '',
      notes: '',
      imageSource: ''
    };
    setItems([newItem, ...items]);
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-stone-900 selection:text-white bg-white text-stone-900">
      {/* Elegant Header Section */}
      <header className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto w-full text-center">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-8 mb-12 opacity-30">
            <Instagram size={16} strokeWidth={1} />
            <div className="h-px w-20 bg-stone-900"></div>
            <Video size={16} strokeWidth={1} />
          </div>
          <h1 className="font-serif text-6xl md:text-7xl lg:text-9xl font-light tracking-tighter mb-10">
            Swanne London
          </h1>
          <h2 className="text-[10px] md:text-xs uppercase tracking-[1em] font-semibold text-stone-400 mb-8">
            Creative Inspiration Board
          </h2>
          <p className="text-stone-400 font-light text-sm max-w-2xl mx-auto leading-relaxed italic">
            A quiet sanctuary for visual excellence. <br/>
            Reference library for IG Reels and TikTok production.
          </p>
        </div>
      </header>

      {/* Simplified Controls */}
      <div className="px-6 md:px-12 max-w-7xl mx-auto w-full mb-24 flex flex-col md:flex-row gap-10 justify-between items-center border-b border-stone-50 pb-16">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.5em] font-bold">
             <LayoutGrid size={16} strokeWidth={2} /> Gallery
          </div>
          <div className="h-6 w-px bg-stone-100"></div>
          <span className="text-[10px] uppercase tracking-[0.5em] font-medium text-stone-300">
            {items.length} References
          </span>
        </div>
        <button 
          onClick={addNewItem}
          className="group flex items-center gap-4 bg-stone-900 text-white px-12 py-5 rounded-full text-[10px] uppercase tracking-[0.4em] transition-all hover:bg-stone-800 hover:shadow-2xl active:scale-95 font-bold"
        >
          <Plus size={18} className="transition-transform group-hover:rotate-90" /> New Inspiration
        </button>
      </div>

      {/* Editorial Grid */}
      <main className="px-6 md:px-12 max-w-7xl mx-auto w-full pb-60">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-24">
          {items.map(item => (
            <InspirationCard 
              key={item.id} 
              item={item} 
              onUpdate={updateItem}
              onDelete={deleteItem}
            />
          ))}

          {/* New Item Placeholder */}
          <button 
            onClick={addNewItem}
            className="group flex flex-col items-center justify-center border-2 border-dashed border-stone-100 rounded-[2.5rem] aspect-[9/16] text-stone-200 hover:text-stone-900 hover:border-stone-200 transition-all duration-700 hover:bg-stone-50/20"
          >
            <div className="w-16 h-16 rounded-full border border-stone-100 flex items-center justify-center group-hover:border-stone-900 transition-all mb-6">
              <Plus size={32} strokeWidth={1} />
            </div>
            <span className="text-[10px] uppercase tracking-[0.6em] font-medium">Add Reference</span>
          </button>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="mt-auto py-32 border-t border-stone-50 text-center">
        <div className="text-[10px] uppercase tracking-[1.5em] text-stone-300 font-medium">
          Swanne London &bull; Internal Production Asset
        </div>
      </footer>
    </div>
  );
};

export default App;
