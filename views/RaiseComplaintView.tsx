
import React, { useState, useEffect } from 'react';
import { Camera, MapPin, CheckCircle, X, AlertCircle, Loader2 } from 'lucide-react';
import { CATEGORIES } from '../constants';

interface RaiseComplaintViewProps {
  initialCategory: string;
  onSubmit: (complaint: { type: string; description: string; location: string; photoUrl?: string }) => void;
  onCancel: () => void;
}

const RaiseComplaintView: React.FC<RaiseComplaintViewProps> = ({ initialCategory, onSubmit, onCancel }) => {
  const [type, setType] = useState(initialCategory);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);

  useEffect(() => {
    if (initialCategory) {
      const cat = CATEGORIES.find(c => c.id === initialCategory);
      if (cat) setType(cat.name);
    }
  }, [initialCategory]);

  const handleLocationDetect = () => {
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app we'd reverse geocode. Here we simulate.
          setTimeout(() => {
            setLocation(`Lat: ${position.coords.latitude.toFixed(4)}, Lng: ${position.coords.longitude.toFixed(4)} (Ward 12, Market Area)`);
            setIsLocating(false);
          }, 1500);
        },
        () => {
          setLocation("Ward 12, Market Area");
          setIsLocating(false);
        }
      );
    } else {
      setLocation("Ward 12, Market Area");
      setIsLocating(false);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (type && description && location) {
      onSubmit({
        type,
        description,
        location,
        photoUrl: photo || undefined
      });
    }
  };

  return (
    <div className="p-4 flex flex-col gap-6">
      <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl flex gap-3">
        <AlertCircle className="text-orange-500 shrink-0" size={20} />
        <p className="text-xs text-orange-700 font-medium">
          Note: Please provide accurate location and a clear photo to help our team resolve the issue faster.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Complaint Category</label>
          <select 
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none appearance-none font-medium"
            required
          >
            <option value="">Select Category</option>
            {CATEGORIES.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Description</label>
          <textarea 
            placeholder="E.g. Garbage not collected near Ward 12 Market since 2 days..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none h-32 resize-none font-medium"
            required
          ></textarea>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Location</label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="GPS Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none font-medium text-sm"
                required
              />
            </div>
            <button 
              type="button"
              onClick={handleLocationDetect}
              className="px-4 bg-teal-500 text-white rounded-xl hover:bg-teal-600 active:scale-95 transition-all flex items-center justify-center"
              disabled={isLocating}
            >
              {isLocating ? <Loader2 size={20} className="animate-spin" /> : <MapPin size={20} />}
            </button>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Evidence (Photo/Video)</label>
          <div className="grid grid-cols-2 gap-3">
            <label className="border-2 border-dashed border-slate-200 rounded-xl h-24 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-slate-50 transition-colors">
              <Camera size={24} className="text-slate-400" />
              <span className="text-[10px] font-bold text-slate-400">UPLOAD PHOTO</span>
              <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
            </label>
            {photo ? (
              <div className="relative h-24 rounded-xl overflow-hidden group">
                <img src={photo} alt="Preview" className="w-full h-full object-cover" />
                <button 
                  onClick={() => setPhoto(null)}
                  className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-slate-100 rounded-xl h-24 flex flex-col items-center justify-center">
                <span className="text-[10px] font-medium text-slate-300">No image yet</span>
              </div>
            )}
          </div>
        </div>

        <div className="pt-4 flex gap-3">
          <button 
            type="button" 
            onClick={onCancel}
            className="flex-1 border border-slate-200 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-all active:scale-95"
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="flex-[2] bg-orange-500 text-white py-3 rounded-xl font-bold shadow-lg shadow-orange-100 flex items-center justify-center gap-2 hover:bg-orange-600 transition-all active:scale-95"
          >
            <CheckCircle size={20} />
            Submit Complaint
          </button>
        </div>
      </form>
    </div>
  );
};

export default RaiseComplaintView;
