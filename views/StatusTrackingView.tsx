
import React, { useState } from 'react';
import { Complaint, ComplaintStatus } from '../types';
import { Check, Clock, UserCheck, Settings, Circle, ChevronDown, ChevronUp } from 'lucide-react';

interface StatusTrackingViewProps {
  complaints: Complaint[];
}

const StatusTimeline: React.FC<{ currentStatus: ComplaintStatus }> = ({ currentStatus }) => {
  const statuses = [
    { id: ComplaintStatus.RECEIVED, label: 'Received', icon: Check, color: 'text-blue-500', bg: 'bg-blue-500' },
    { id: ComplaintStatus.ASSIGNED, label: 'Assigned to Dept.', icon: UserCheck, color: 'text-purple-500', bg: 'bg-purple-500' },
    { id: ComplaintStatus.IN_PROGRESS, label: 'In Progress', icon: Settings, color: 'text-orange-500', bg: 'bg-orange-500' },
    { id: ComplaintStatus.RESOLVED, label: 'Resolved', icon: Check, color: 'text-green-500', bg: 'bg-green-500' },
  ];

  const currentIndex = statuses.findIndex(s => s.id === currentStatus);

  return (
    <div className="flex flex-col gap-6 relative ml-2 py-4">
      {/* Connector Line */}
      <div className="absolute left-3.5 top-8 bottom-8 w-0.5 bg-slate-100"></div>
      
      {statuses.map((s, idx) => {
        const isDone = idx <= currentIndex;
        const isCurrent = idx === currentIndex;
        const Icon = s.icon;
        
        return (
          <div key={s.id} className="flex items-start gap-4 z-10">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
              isDone ? `${s.bg} border-transparent text-white` : 'bg-white border-slate-200 text-slate-300'
            }`}>
              {isDone ? <Check size={14} strokeWidth={4} /> : <Circle size={10} fill="currentColor" />}
            </div>
            <div className="flex-1 pt-1">
              <h4 className={`text-sm font-bold ${isDone ? 'text-slate-800' : 'text-slate-400'}`}>
                {s.label}
              </h4>
              {isCurrent && (
                <p className="text-[10px] text-orange-500 font-bold mt-0.5 animate-pulse uppercase tracking-wider">
                  Active Stage
                </p>
              )}
              {isDone && !isCurrent && (
                <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                  Completed on {new Date().toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const StatusTrackingView: React.FC<StatusTrackingViewProps> = ({ complaints }) => {
  const [expandedId, setExpandedId] = useState<string | null>(complaints[0]?.id || null);

  if (complaints.length === 0) {
    return (
      <div className="p-12 text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
          <Clock size={32} />
        </div>
        <h3 className="font-bold text-slate-800 mb-2">No complaints yet</h3>
        <p className="text-sm text-slate-500">Any complaints you raise will show up here for tracking.</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-2 px-1">
        <Clock className="text-orange-500" size={18} />
        <h2 className="font-bold text-slate-800">Tracking Timeline</h2>
      </div>

      {complaints.map((comp) => (
        <div key={comp.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden transition-all">
          {/* Header Card */}
          <button 
            onClick={() => setExpandedId(expandedId === comp.id ? null : comp.id)}
            className="w-full p-4 flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
                <Check size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-orange-500 uppercase tracking-wider">{comp.id}</p>
                <h3 className="font-bold text-slate-800">{comp.type}</h3>
              </div>
            </div>
            {expandedId === comp.id ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
          </button>

          {/* Details / Timeline */}
          {expandedId === comp.id && (
            <div className="px-4 pb-6 pt-2 border-t border-slate-50">
              <div className="bg-slate-50 rounded-xl p-3 mb-6">
                <p className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-tight">Reported Problem</p>
                <p className="text-sm text-slate-700 font-semibold">{comp.description}</p>
                <div className="flex items-center gap-2 mt-3 text-slate-400">
                  <Clock size={12} />
                  <span className="text-[10px] font-bold">Reported on {comp.timestamp.toLocaleString()}</span>
                </div>
              </div>

              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1 mb-2">Progress Status</h4>
              <StatusTimeline currentStatus={comp.status} />
              
              <div className="mt-6 flex items-center justify-between bg-teal-50 p-3 rounded-xl">
                <div className="flex items-center gap-2 text-teal-700">
                  <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center">
                    <Check size={14} />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-tight">Notification System Active</span>
                </div>
                <span className="text-[10px] text-teal-600 font-medium">SMS Sent</span>
              </div>
            </div>
          )}
        </div>
      ))}

      <div className="text-center py-4 opacity-50">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nagar Parishad Service</p>
      </div>
    </div>
  );
};

export default StatusTrackingView;
