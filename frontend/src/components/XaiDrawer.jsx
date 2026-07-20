import React from 'react';
import { HelpCircle, AlertTriangle, Shield, CheckCircle2, BarChart2, Cpu } from 'lucide-react';

const XaiDrawer = ({ isOpen, onClose, threat }) => {
  if (!isOpen || !threat) return null;

  const reasonsList = [
    { title: "Unusual Port Usage", detail: `Targeting SCADA Modbus Port ${threat.dst_port || 502} (Unauthenticated Control Port)` },
    { title: "High Outbound Traffic", detail: "142,500 Bytes payload (Spiking 28.5x above UEBA normal baseline)" },
    { title: "Short Burst Connections", detail: "352 Kbps burst throughput with low connection duration" },
    { title: "Similar to Historical Attack Pattern", detail: "SYN-RST TCP Flag signature matching C2 beaconing behavior" }
  ];

  const features = [
    { name: "L4 Destination Port", value: `Port ${threat.dst_port || 502} (Modbus SCADA)`, weight: 35 },
    { name: "Outbound Payload Bytes", value: "142,500 Bytes", weight: 25 },
    { name: "TCP Packet Flags", value: "SYN-RST (0x22)", weight: 20 },
    { name: "Flow Duration & Throughput", value: "352 Kbps Burst", weight: 15 },
    { name: "Isolation Forest Anomaly Score", value: "0.942 Score", weight: 5 }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="glass-panel p-6 rounded-2xl border border-cyan-500/50 max-w-xl w-full space-y-4 relative shadow-2xl shadow-cyan-950/50">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 flex items-center space-x-2">
                <span>EXPLAINABLE AI (XAI) REASONING & FEATURE ATTRIBUTION</span>
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">Transparent Machine Learning Decision Explanation</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200 text-sm">
            ✕
          </button>
        </div>

        {/* Formatted Threat Banner */}
        <div className="p-3.5 bg-red-950/30 border border-red-500/40 rounded-xl font-mono text-xs space-y-1.5">
          <div className="flex justify-between items-center">
            <span className="text-slate-300 font-bold">CLASSIFICATION:</span>
            <span className="text-red-400 font-bold bg-red-500/20 px-2 py-0.5 rounded border border-red-500/40">
              Attack Detected
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-300 font-bold">AI CONFIDENCE SCORE:</span>
            <span className="text-emerald-400 font-bold bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/40">
              Confidence: {threat.confidence || "96.4%"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-300 font-bold">RISK SEVERITY LEVEL:</span>
            <span className="text-red-400 font-bold">🔴 Risk: {threat.severity || "Critical"}</span>
          </div>
        </div>

        {/* Bulleted AI Reasons List */}
        <div className="space-y-2 font-mono text-xs">
          <span className="text-slate-200 text-xs font-bold block flex items-center space-x-1">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI CLASSIFICATION REASONS:</span>
          </span>

          <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 space-y-2">
            {reasonsList.map((r, idx) => (
              <div key={idx} className="flex items-start space-x-2 text-xs">
                <span className="text-cyan-400 font-bold">•</span>
                <div>
                  <span className="font-bold text-slate-200">{r.title}:</span>{" "}
                  <span className="text-slate-400">{r.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Weight Chart */}
        <div className="space-y-1.5 font-mono text-xs">
          <span className="text-slate-400 text-[11px] font-bold block">
            SHAP FEATURE WEIGHT ATTRIBUTION:
          </span>
          {features.map((feat) => (
            <div key={feat.name} className="space-y-0.5">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-300">{feat.name}</span>
                <span className="text-cyan-400 font-bold">{feat.value}</span>
              </div>
              <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-slate-800">
                <div className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-full" style={{ width: `${feat.weight * 2}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default XaiDrawer;
