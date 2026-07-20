import React, { useState, useEffect } from 'react';
import { Shield, FileText, RefreshCw, Play } from 'lucide-react';
import { downloadIncidentReport } from '../services/api';

const Navbar = ({ onRefresh, isRefreshing, onOpenDemo }) => {
  const [time, setTime] = useState(new Date().toUTCString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toUTCString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-[#0B0F19]/90 backdrop-blur-md border-b border-slate-800/80 px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Logo & Platform Title */}
        <div className="flex items-center space-x-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 shadow-lg shadow-cyan-500/10">
            <Shield className="w-6 h-6 animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
                CyberSentinel AI
              </h1>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/50">
                v3.0.0
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">Critical Infrastructure Cyber Resilience Platform</p>
          </div>
        </div>

        {/* Live System Status & UTC Clock */}
        <div className="hidden lg:flex items-center space-x-6">
          <div className="flex items-center space-x-2 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-lg text-xs font-mono">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
            <span className="text-slate-300">SYSTEM STATUS:</span>
            <span className="text-emerald-400 font-semibold">PROTECTED</span>
          </div>

          <div className="text-right font-mono text-xs text-slate-400">
            <div>{time}</div>
            <div className="text-[10px] text-cyan-400">CERT-In CNI REGION: US-EAST-OT</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {/* One-Click Hackathon Demo Button */}
          <button
            onClick={onOpenDemo}
            className="flex items-center space-x-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white shadow-lg shadow-purple-500/20 border border-purple-400/40 transition transform active:scale-95 animate-pulse"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>▶ Run Hackathon Demo</span>
          </button>

          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="flex items-center space-x-1.5 px-3 py-2 text-xs font-medium rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            title="Refresh Operational Telemetry"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-cyan-400' : ''}`} />
            <span className="hidden sm:inline">Refresh Data</span>
          </button>

          <button
            onClick={downloadIncidentReport}
            className="flex items-center space-x-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-md shadow-cyan-500/20 transition transform active:scale-95"
          >
            <FileText className="w-4 h-4" />
            <span>Generate PDF</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
