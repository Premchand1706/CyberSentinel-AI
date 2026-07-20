import React from 'react';
import { Bot, ShieldCheck, Activity, Cpu, Radio, Network } from 'lucide-react';

const AgentPanel = ({ agents }) => {
  const defaultAgents = agents || [
    { name: "UEBA Anomaly Agent", status: "ACTIVE", type: "Unsupervised UEBA", anomaly_rate: "99.2%", icon: Activity, color: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10" },
    { name: "APT Attribution Agent", status: "ACTIVE", type: "CERT-In & MITRE TTPs", attribution_accuracy: "96.4%", icon: Bot, color: "text-purple-400 border-purple-500/30 bg-purple-500/10" },
    { name: "SOAR Orchestrator", status: "ACTIVE", type: "Autonomous + Human Gate", coverage: "94%", icon: ShieldCheck, color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10" },
    { name: "CVE Prioritizer", status: "ACTIVE", type: "CVSS Topology Engine", vulnerability_count: 5, icon: Cpu, color: "text-amber-400 border-amber-500/30 bg-amber-500/10" },
    { name: "Digital Twin Simulator", status: "ACTIVE", type: "5-Tier Attack Modeler", health: "UNDER_ATTACK", icon: Network, color: "text-red-400 border-red-500/30 bg-red-500/10" }
  ];

  return (
    <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-mono font-bold text-slate-200 flex items-center space-x-2">
          <Bot className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>MULTI-AGENT AI CYBER RESILIENCE ORCHESTRATION LAYER</span>
        </h3>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
          5/5 AGENTS ONLINE
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {defaultAgents.map((agent) => {
          const Icon = agent.icon || Bot;
          return (
            <div key={agent.name} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between hover:border-cyan-500/30 transition">
              <div className="flex items-center justify-between mb-2">
                <div className={`p-1.5 rounded-lg border ${agent.color || 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10'}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              </div>
              <div>
                <h4 className="text-[11px] font-bold text-slate-100 truncate">{agent.name}</h4>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5 truncate">{agent.type}</p>
              </div>
              <div className="mt-2 pt-1.5 border-t border-slate-800/80 text-[10px] font-mono text-cyan-400 flex justify-between">
                <span className="text-slate-500">STATE:</span>
                <span className="font-semibold text-emerald-400">OPERATIONAL</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AgentPanel;
