import React from 'react';
import { ShieldAlert, ArrowRight, Zap, Target, Bot } from 'lucide-react';

const AptPredictorCard = ({ prediction }) => {
  const data = prediction || {
    attributed_actor: "Volt Typhoon / Cyber-Grid APT Group",
    threat_confidence: 96.2,
    current_stage: {
      stage: 1,
      name: "Command & Control Protocol Abuse (Modbus/502)",
      mitre_id: "T1071",
      status: "DETECTED_ACTIVE"
    },
    predicted_stage_2: {
      stage: 2,
      name: "Double Extortion Telemetry Exfiltration",
      mitre_id: "T1041",
      probability: 0.95,
      time_window: "In 5 - 10 minutes",
      preemptive_fix: "Deploy egress DLP packet inspection and block outbound TCP/443 exfiltration tunnels."
    },
    predicted_stage_3: {
      stage: 3,
      name: "Volumetric Denial of Service on Grid HMI",
      mitre_id: "T1498",
      probability: 0.88,
      time_window: "In 30 - 45 minutes",
      preemptive_fix: "Enable automated WAF rate-limiting and drop inbound SYN flood packets."
    }
  };

  return (
    <div className="glass-panel p-5 rounded-2xl border border-purple-500/30 space-y-4 bg-gradient-to-r from-slate-900/90 via-purple-950/20 to-slate-900/90">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 border-b border-purple-500/20 pb-3">
        <div className="flex items-center space-x-2">
          <Bot className="w-5 h-5 text-purple-400 animate-pulse" />
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center space-x-2">
              <span>APT Campaign Attribution & Multi-Stage Attack Prediction Agent</span>
            </h3>
            <p className="text-[11px] text-slate-400 font-mono">MITRE ATT&CK & CERT-In Predictive TTP Forecaster</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-1 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-mono font-bold">
            CAMPAIGN: {data.attributed_actor}
          </span>
          <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-mono font-bold">
            {data.threat_confidence}% CONFIDENCE
          </span>
        </div>
      </div>

      {/* 3-Step Predictive Chain Horizontal Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
        {/* Stage 1: Current Detected Attack */}
        <div className="p-4 rounded-xl bg-red-950/30 border border-red-500/50 space-y-2 relative">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/40 font-bold">
              STAGE 1 — ACTIVE NOW
            </span>
            <span className="text-xs font-mono text-red-400 font-bold">{data.current_stage.mitre_id}</span>
          </div>
          <h4 className="text-xs font-bold text-slate-100">{data.current_stage.name}</h4>
          <p className="text-[11px] text-red-300 font-mono">Status: DETECTED BY UEBA ENGINE</p>
        </div>

        {/* Stage 2: Predicted Next Attack (Stage 2) */}
        <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/50 space-y-2 relative">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold">
              STAGE 2 — PREDICTED ({(data.predicted_stage_2.probability * 100).toFixed(0)}%)
            </span>
            <span className="text-xs font-mono text-purple-400 font-bold">{data.predicted_stage_2.mitre_id}</span>
          </div>
          <h4 className="text-xs font-bold text-slate-100">{data.predicted_stage_2.name}</h4>
          <p className="text-[10px] text-amber-300 font-mono">ETA: {data.predicted_stage_2.time_window}</p>
          <div className="p-2 bg-slate-900/80 rounded border border-purple-500/30 text-[10px] font-mono text-purple-200">
            <span className="font-bold text-cyan-400">PREEMPTIVE FIX:</span> {data.predicted_stage_2.preemptive_fix}
          </div>
        </div>

        {/* Stage 3: Predicted Next Attack (Stage 3) */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700 space-y-2 relative">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-bold">
              STAGE 3 — PREDICTED ({(data.predicted_stage_3.probability * 100).toFixed(0)}%)
            </span>
            <span className="text-xs font-mono text-slate-400 font-bold">{data.predicted_stage_3.mitre_id}</span>
          </div>
          <h4 className="text-xs font-bold text-slate-100">{data.predicted_stage_3.name}</h4>
          <p className="text-[10px] text-slate-400 font-mono">ETA: {data.predicted_stage_3.time_window}</p>
          <div className="p-2 bg-slate-900/80 rounded border border-slate-800 text-[10px] font-mono text-slate-300">
            <span className="font-bold text-cyan-400">PREEMPTIVE FIX:</span> {data.predicted_stage_3.preemptive_fix}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AptPredictorCard;
