import React from 'react';
import { Clock, ArrowRight, ShieldAlert, Key, Terminal, ExternalLink } from 'lucide-react';

const AttackTimelineChain = () => {
  const timelineSteps = [
    { time: "10:32:15", title: "Active Scanning & Recon", mitre: "T1595", icon: Clock, color: "text-cyan-400 border-cyan-500/40 bg-cyan-500/10", details: "Port sweep on 22, 502, 1883" },
    { time: "10:33:40", title: "Credential Brute Force", mitre: "T1110", icon: Key, color: "text-amber-400 border-amber-500/40 bg-amber-500/10", details: "SSH password spraying on Port 22" },
    { time: "10:34:55", title: "Modbus C2 Command Injection", mitre: "T1071", icon: Terminal, color: "text-red-400 border-red-500/40 bg-red-500/10", details: "Raw function code injected to PLC" },
    { time: "10:36:10", title: "Double Extortion Exfiltration", mitre: "T1041", icon: ExternalLink, color: "text-purple-400 border-purple-500/40 bg-purple-500/10", details: "Outbound payload transfer (142KB)" }
  ];

  return (
    <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-mono font-bold text-slate-200 flex items-center space-x-2">
          <Clock className="w-4 h-4 text-cyan-400" />
          <span>ATTACK PROGRESSION TIMELINE CHAIN (CHRONOLOGICAL INCIDENT FLOW)</span>
        </h3>
        <span className="text-[10px] font-mono text-slate-400">4 STAGES CORRELATED</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative">
        {timelineSteps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div key={step.time} className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 relative space-y-1.5 hover:border-cyan-500/40 transition">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-slate-400 font-bold">{step.time}</span>
                <span className={`px-1.5 py-0.5 rounded font-bold ${step.color}`}>{step.mitre}</span>
              </div>

              <div className="flex items-center space-x-2">
                <div className={`p-1.5 rounded-lg border ${step.color}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <h4 className="text-xs font-bold text-slate-100 truncate">{step.title}</h4>
              </div>

              <p className="text-[10px] text-slate-400 font-mono truncate">{step.details}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AttackTimelineChain;
