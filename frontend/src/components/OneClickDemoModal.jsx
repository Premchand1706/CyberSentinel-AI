import React, { useState, useEffect } from 'react';
import { Play, CheckCircle2, RefreshCw, Shield, FileText, ArrowRight, X } from 'lucide-react';
import { downloadIncidentReport } from '../services/api';

const OneClickDemoModal = ({ isOpen, onClose, onNavigate }) => {
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);

  const steps = [
    { title: "Ingesting NF-ToN-IoT-v3 Dataset", desc: "Loading 1,048,575 records across 18 numerical flow features", path: "/upload-trainer" },
    { title: "Running Dual AI Model Engine", desc: "Evaluating Random Forest Classifier & Unsupervised UEBA Isolation Forest", path: "/upload-trainer" },
    { title: "Detecting Threats & Explainable AI", desc: "Attributing Modbus C2 (T1071) attack with 96.4% Confidence & SHAP features", path: "/" },
    { title: "Animating Digital Twin Topology", desc: "Propagating red particle attack path from WAN ➔ Firewall ➔ PLC Controller", path: "/digital-twin" },
    { title: "SOAR Safety & Escalation Gate", desc: "Evaluating 85% Blast Radius and triggering Human Approval Gate", path: "/threat-center" },
    { title: "Generating Incident PDF Report", desc: "Compiling ReportLab PDF report with MITRE matrices & remediation logs", path: "/reports" }
  ];

  useEffect(() => {
    let timer;
    if (running && step < steps.length) {
      if (onNavigate && steps[step].path) {
        onNavigate(steps[step].path);
      }
      timer = setTimeout(() => {
        if (step < steps.length - 1) {
          setStep(prev => prev + 1);
        } else {
          setRunning(false);
        }
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [running, step]);

  if (!isOpen) return null;

  const startDemo = () => {
    setStep(0);
    setRunning(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="glass-panel p-6 rounded-2xl border border-cyan-500/50 max-w-xl w-full space-y-5 relative shadow-2xl shadow-cyan-950/50">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 animate-pulse">
              <Play className="w-5 h-5 fill-cyan-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100">AUTOMATED HACKATHON DEMO RUNNER</h3>
              <p className="text-[11px] text-slate-400 font-mono">End-to-End Story Simulator for Judges</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="space-y-3 font-mono text-xs">
          <div className="flex justify-between text-[11px] text-cyan-400 font-bold">
            <span>DEMO PROGRESS: STEP {step + 1} OF {steps.length}</span>
            <span>{running ? 'LIVE RUNNING...' : (step === steps.length - 1 ? 'DEMO COMPLETE' : 'READY')}</span>
          </div>

          <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
            <div
              className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 h-full transition-all duration-500"
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            ></div>
          </div>

          {/* Current Active Step Box */}
          <div className="p-4 bg-slate-900/90 rounded-xl border border-cyan-500/40 space-y-1">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              <h4 className="font-bold text-slate-100 text-xs">{steps[step].title}</h4>
            </div>
            <p className="text-[11px] text-slate-400 font-sans pl-4">{steps[step].desc}</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-2">
          {!running && (
            <button
              onClick={startDemo}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition flex items-center justify-center space-x-2"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>{step === steps.length - 1 ? 'Restart Full Demo Story' : 'Start 4-Minute Judge Demo Sequence'}</span>
            </button>
          )}

          {running && (
            <div className="w-full py-3 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-mono font-bold flex items-center justify-center space-x-2">
              <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
              <span>Advancing Hackathon Demo Story...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OneClickDemoModal;
