import React from 'react';
import { ShieldAlert, AlertTriangle, Users, Building2, Flame, CheckCircle2 } from 'lucide-react';

const ExecutiveSummaryCard = () => {
  return (
    <div className="glass-panel p-5 rounded-2xl border border-red-500/40 bg-gradient-to-r from-red-950/20 via-slate-900 to-slate-900 space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 border-b border-red-500/20 pb-3">
        <div className="flex items-center space-x-2">
          <ShieldAlert className="w-5 h-5 text-red-400 animate-pulse" />
          <h3 className="text-sm font-bold text-slate-100">CISO EXECUTIVE SUMMARY & BUSINESS IMPACT ASSESSMENT</h3>
        </div>
        <span className="px-2.5 py-1 rounded bg-red-500/20 text-red-400 border border-red-500/40 text-xs font-mono font-bold">
          IMMEDIATE ACTION REQUIRED
        </span>
      </div>

      {/* Summary Metrics & Impact Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs font-mono">
        <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
          <span className="text-slate-400 text-[10px]">TOTAL THREATS DETECTED:</span>
          <p className="text-base font-bold text-red-400 mt-0.5">249,815 Flow Anomalies</p>
          <span className="text-[10px] text-slate-500 font-sans block mt-1">12 Critical | 48 High Severity</span>
        </div>

        <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
          <span className="text-slate-400 text-[10px]">TARGET CNI INFRASTRUCTURE:</span>
          <p className="text-base font-bold text-amber-400 mt-0.5">SCADA Modbus Power Grid</p>
          <span className="text-[10px] text-slate-500 font-sans block mt-1">Application PLC Controller (Node 4)</span>
        </div>

        <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
          <span className="text-slate-400 text-[10px]">ESTIMATED BUSINESS IMPACT:</span>
          <p className="text-base font-bold text-red-400 mt-0.5">HIGH — Power Grid Blackout</p>
          <span className="text-[10px] text-slate-500 font-sans block mt-1">Potential Regional Grid Shutdown</span>
        </div>

        <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
          <span className="text-slate-400 text-[10px]">AFFECTED CITIZENS / USERS:</span>
          <p className="text-base font-bold text-cyan-400 mt-0.5">2.3 Million Citizens</p>
          <span className="text-[10px] text-slate-500 font-sans block mt-1">Public Grid & State Facilities</span>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveSummaryCard;
