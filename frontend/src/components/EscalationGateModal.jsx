import React, { useState } from 'react';
import { AlertTriangle, ShieldCheck, XCircle, CheckCircle2, Lock, FileText } from 'lucide-react';

const EscalationGateModal = ({ isOpen, onClose, gateItem, onDecision }) => {
  const [notes, setNotes] = useState('');
  const [processing, setProcessing] = useState(false);

  if (!isOpen || !gateItem) return null;

  const handleDecision = async (approved) => {
    setProcessing(true);
    if (onDecision) {
      await onDecision(gateItem.id, approved, notes);
    }
    setProcessing(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="glass-panel p-6 rounded-2xl border border-red-500/50 max-w-lg w-full space-y-4 relative shadow-2xl shadow-red-950/50">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100">SOAR HUMAN ESCALATION GATE</h3>
              <p className="text-[11px] text-slate-400 font-mono">Blast Radius Safety Threshold Exceeded</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200">
            ✕
          </button>
        </div>

        {/* Gate Item Details */}
        <div className="space-y-3 font-mono text-xs">
          <div className="p-3 bg-red-950/30 border border-red-500/40 rounded-xl space-y-1">
            <div className="flex justify-between text-red-300">
              <span>ACTION TYPE:</span>
              <span className="font-bold">{gateItem.action_type}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>TARGET ASSET:</span>
              <span className="text-cyan-400 font-bold">{gateItem.target}</span>
            </div>
            <div className="flex justify-between text-amber-300">
              <span>BLAST RADIUS SCORE:</span>
              <span className="font-bold text-red-400">{gateItem.blast_radius}% (HIGH)</span>
            </div>
            <div className="text-[11px] text-slate-400 pt-1">
              <span>THREAT CAUSE:</span> {gateItem.threat_cause}
            </div>
          </div>

          <div>
            <label className="text-slate-400 text-[11px] block mb-1">SOC OPERATOR AUDIT REASON & NOTES:</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-slate-100 focus:outline-none focus:border-cyan-400"
              placeholder="e.g. Approved by Lead SOC Analyst after verifying PLC controller backup redundancy"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => handleDecision(false)}
            disabled={processing}
            className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700 transition flex items-center justify-center space-x-1"
          >
            <XCircle className="w-4 h-4 text-red-400" />
            <span>Reject Action</span>
          </button>

          <button
            onClick={() => handleDecision(true)}
            disabled={processing}
            className="py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition flex items-center justify-center space-x-1"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Approve & Execute</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EscalationGateModal;
