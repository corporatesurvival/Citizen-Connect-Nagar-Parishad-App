
import React from 'react';
import { CATEGORIES, getIcon, APP_SLOGANS } from '../constants';
import { Complaint } from '../types';
import { MapPin, ChevronRight, MessageSquare } from 'lucide-react';

interface HomeViewProps {
  onSelectCategory: (catId: string) => void;
  complaints: Complaint[];
  onViewAll: () => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onSelectCategory, complaints, onViewAll }) => {
  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Banner / Value Message */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-xl font-bold mb-1">Municipal Council</h2>
          <p className="text-orange-50 text-sm font-medium mb-3">Your Digital Connection to City Services</p>
          <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] inline-flex items-center gap-1 font-semibold uppercase tracking-wider">
            <MessageSquare size={12} />
            {APP_SLOGANS[0]}
          </div>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      </div>

      {/* Services Grid */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-800">Available Services</h3>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="flex flex-col items-center gap-2 bg-white p-3 rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-orange-100 transition-all active:scale-95 group"
            >
              <div className={`w-12 h-12 ${cat.color} rounded-xl flex items-center justify-center text-white shadow-inner group-hover:scale-110 transition-transform`}>
                {getIcon(cat.icon, 24)}
              </div>
              <span className="text-[11px] font-bold text-slate-600 text-center line-clamp-1">{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Quick Stats / Location */}
      <div className="bg-white p-4 rounded-xl border border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-teal-50 rounded-full flex items-center justify-center text-teal-600">
            <MapPin size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Your Ward</p>
            <p className="text-sm font-bold text-slate-700">Ward No. 12 - Market Area</p>
          </div>
        </div>
        <ChevronRight size={20} className="text-slate-300" />
      </div>

      {/* Recent Activity */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-800">Your Recent Reports</h3>
          <button 
            onClick={onViewAll}
            className="text-xs font-bold text-orange-500 hover:text-orange-600"
          >
            View All
          </button>
        </div>
        
        {complaints.length > 0 ? (
          <div className="space-y-3">
            {complaints.slice(0, 3).map((comp) => (
              <div key={comp.id} className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden">
                  {comp.photoUrl ? (
                    <img src={comp.photoUrl} alt="Complaint" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-slate-400">
                      {getIcon(CATEGORIES.find(c => c.name === comp.type)?.icon || 'Trash2', 20)}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-0.5">
                    <p className="text-sm font-bold text-slate-800 line-clamp-1">{comp.type}</p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      comp.status === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {comp.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-1">{comp.description}</p>
                  <p className="text-[9px] text-slate-400 mt-1 font-medium">{comp.timestamp.toLocaleDateString()} • {comp.id}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl p-8 text-center">
            <p className="text-slate-400 text-sm font-medium">No complaints raised yet.</p>
            <button 
              onClick={() => onSelectCategory('others')}
              className="mt-2 text-orange-500 text-sm font-bold"
            >
              Raise your first one
            </button>
          </div>
        )}
      </section>

      {/* Footer Info */}
      <div className="mt-4 p-4 rounded-xl bg-slate-100 text-center">
        <p className="text-[10px] text-slate-400 font-medium">Supported by Chandur Railway Municipal Council</p>
        <p className="text-[10px] text-slate-400">Launch Date: 1 January 2026</p>
      </div>
    </div>
  );
};

export default HomeView;
