import React, { useState } from 'react';
import { 
  ShieldAlert, 
  UserX, 
  Ban, 
  Bell, 
  Ticket, 
  CheckCircle2, 
  Zap, 
  Clock, 
  AlertTriangle,
  Lock,
  HelpCircle
} from 'lucide-react';
import EscalationGateModal from '../components/EscalationGateModal';
import { executeResponseAction } from '../services/api';

const ThreatCenter = () => {
  const [targetInput, setTargetInput] = useState('10.0.2.100 (PLC Controller)');
  const [reasonInput, setReasonInput] = useState('Modbus/TCP command injection vulnerability alert T1071');
  const [executing, setExecuting] = useState(false);
  const [activeGateItem, setActiveGateItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [actionLog, setActionLog] = useState([
    { id: 1, action: "Block IP Address", target: "192.168.1.105", status: "EXECUTED", timestamp: "16:22:15", blast: "25%", operator: "CyberSentinel SOAR Agent" },
    { id: 2, action: "Notify SOC Analyst Queue", target: "SOC-Tier2-Alerts", status: "DELIVERED", timestamp: "16:20:50", blast: "5%", operator: "Auto-Policy" },
    { id: 3, action: "Isolate Endpoint", target: "10.0.2.100 (PLC Controller)", status: "PENDING_HUMAN_APPROVAL", timestamp: "16:18:30", blast: "85%", operator: "Human Gate Escalation" },
    { id: 4, action: "Create Ticket", target: "INC-2026-9041", status: "CREATED", timestamp: "16:15:10", blast: "5%", operator: "Auto-Policy" }
  ]);

  const handleTrigger = async (actionType, blastRadius) => {
    if (!targetInput) return;
    setExecuting(true);

    if (blastRadius >= 60) {
      setActiveGateItem({
        id: `GATE-2026-${Date.now().toString().slice(-4)}`,
        action_type: actionType,
        target: targetInput,
        blast_radius: blastRadius,
        threat_cause: reasonInput || "High Blast Radius Threshold Triggered"
      });
      setIsModalOpen(true);
      setExecuting(false);
    } else {
      try {
        await executeResponseAction(actionType, targetInput, reasonInput);
      } catch (err) {
        // Fallback
      }
      const newEntry = {
        id: Date.now(),
        action: actionType,
        target: targetInput,
        status: "AUTONOMOUSLY_EXECUTED",
        timestamp: new Date().toLocaleTimeString(),
        blast: `${blastRadius}%`,
        operator: "SOAR Agent (Safe Blast Radius)"
      };
      setActionLog([newEntry, ...actionLog]);
      setExecuting(false);
    }
  };

  const handleGateDecision = (gateId, approved, operatorNotes) => {
    const newEntry = {
      id: Date.now(),
      action: activeGateItem?.action_type || "High Impact Action",
      target: activeGateItem?.target || targetInput,
      status: approved ? "HUMAN_APPROVED_AND_EXECUTED" : "REJECTED_BY_HUMAN_OPERATOR",
      timestamp: new Date().toLocaleTimeString(),
      blast: `${activeGateItem?.blast_radius || 85}%`,
      operator: `SOC Analyst (${operatorNotes || (approved ? 'Approved' : 'Rejected')})`
    };
    setActionLog([newEntry, ...actionLog]);
  };

  const responseActions = [
    {
      title: "Block IP Address",
      icon: Ban,
      blast: 25,
      color: "text-red-400 border-red-500/40 bg-red-500/10",
      description: "Drop all inbound and outbound traffic from suspicious source IP on perimeter firewalls.",
      reason: "Detected active command-and-control (C2) packet stream (T1071).",
      recommended_action: "Block source IP immediately on perimeter firewalls."
    },
    {
      title: "Disable User Account",
      icon: UserX,
      blast: 45,
      color: "text-amber-400 border-amber-500/40 bg-amber-500/10",
      description: "Revoke Active Directory / LDAP user session tokens and force immediate password reset.",
      reason: "Detected high-frequency SSH password spraying (T1110).",
      recommended_action: "Revoke user tokens and enforce MFA reset."
    },
    {
      title: "Isolate Endpoint",
      icon: ShieldAlert,
      blast: 85,
      requires_gate: true,
      color: "text-purple-400 border-purple-500/40 bg-purple-500/10",
      description: "Isolate compromised SCADA controller or workstation onto secure VLAN sandbox.",
      reason: "Detected raw Modbus/TCP command injection targeting Application PLC Server.",
      recommended_action: "Sandbox PLC Server onto isolated VLAN (Requires Human Approval Gate)."
    },
    {
      title: "Notify SOC Analyst",
      icon: Bell,
      blast: 5,
      color: "text-cyan-400 border-cyan-500/40 bg-cyan-500/10",
      description: "Dispatch urgent high-priority notification to SOC PagerDuty and Slack incident channel.",
      reason: "High risk threat score (84.5/100) exceeding alert threshold.",
      recommended_action: "Dispatch PagerDuty alert to Tier-2 SOC Analyst."
    },
    {
      title: "Create Ticket",
      icon: Ticket,
      blast: 5,
      color: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10",
      description: "Generate structured ITSM incident ticket in Jira / ServiceNow with threat telemetry.",
      reason: "Immutable incident record needed for CERT-In compliance audit.",
      recommended_action: "Log structured Jira ticket INC-2026-9041."
    }
  ];

  return (
    <div className="space-y-6">
      <EscalationGateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        gateItem={activeGateItem}
        onDecision={handleGateDecision}
      />

      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center space-x-2">
            <ShieldAlert className="w-6 h-6 text-red-400" />
            <span>Autonomous SOAR Orchestrator & Action Explanations</span>
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Execute playbooks with explicit threat justifications, blast radius checks, and human escalation gates
          </p>
        </div>
        <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
          Blast Threshold: 60% Max
        </span>
      </div>

      {/* Target & Reason Configuration Bar */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-xs font-mono text-slate-400 block mb-1">TARGET ASSET / IP / ID:</label>
          <input
            type="text"
            value={targetInput}
            onChange={(e) => setTargetInput(e.target.value)}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-slate-100 focus:outline-none focus:border-cyan-400"
            placeholder="e.g. 10.0.2.100 (PLC Controller)"
          />
        </div>
        <div className="md:col-span-2">
          <label className="text-xs font-mono text-slate-400 block mb-1">MITIGATION POLICY JUSTIFICATION:</label>
          <input
            type="text"
            value={reasonInput}
            onChange={(e) => setReasonInput(e.target.value)}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-slate-100 focus:outline-none focus:border-cyan-400"
            placeholder="e.g. Modbus/TCP command injection vulnerability alert T1071"
          />
        </div>
      </div>

      {/* 5 Response Action Cards with Explicit Reason Explanations */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {responseActions.map((act) => {
          const Icon = act.icon;
          const isHighBlast = act.blast >= 60;
          return (
            <div key={act.title} className="glass-panel glass-panel-hover p-4 rounded-xl border border-slate-800 flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg border ${act.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                    isHighBlast ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                  }`}>
                    Blast {act.blast}%
                  </span>
                </div>
                <h3 className="text-xs font-bold text-slate-100">{act.title}</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed font-sans">{act.description}</p>

                {/* Explicit Explanation Box */}
                <div className="p-2 bg-slate-900/90 rounded border border-slate-800 text-[10px] font-mono space-y-1">
                  <div className="text-amber-400">
                    <span className="font-bold">REASON:</span> {act.reason}
                  </div>
                  <div className="text-cyan-300">
                    <span className="font-bold">RECOMMENDED:</span> {act.recommended_action}
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleTrigger(act.title, act.blast)}
                disabled={executing}
                className={`w-full py-2 rounded-lg font-bold text-[11px] border transition flex items-center justify-center space-x-1 ${
                  isHighBlast
                    ? 'bg-red-950/40 text-red-300 border-red-500/50 hover:bg-red-900/40'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                }`}
              >
                {isHighBlast ? <Lock className="w-3.5 h-3.5 text-red-400" /> : <Zap className="w-3.5 h-3.5 text-cyan-400" />}
                <span>{isHighBlast ? 'Trigger (Human Gate)' : 'Execute Action'}</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Response Action Execution Log Table */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-100 flex items-center space-x-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            <span>SOAR Orchestration Audit Trail & Human Decisions Log</span>
          </h3>
          <span className="text-[10px] font-mono text-slate-400">FULL AUDITABILITY</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="text-slate-400 border-b border-slate-800">
                <th className="pb-2">TIME</th>
                <th className="pb-2">ACTION TYPE</th>
                <th className="pb-2">TARGET ASSET</th>
                <th className="pb-2">BLAST RADIUS</th>
                <th className="pb-2">OPERATOR / AGENT</th>
                <th className="pb-2 text-right">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {actionLog.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-2.5 text-slate-400">{log.timestamp}</td>
                  <td className="py-2.5 font-bold text-slate-200">{log.action}</td>
                  <td className="py-2.5 text-cyan-400">{log.target}</td>
                  <td className="py-2.5 text-slate-300">{log.blast}</td>
                  <td className="py-2.5 text-slate-400">{log.operator}</td>
                  <td className="py-2.5 text-right font-bold">
                    <span className={`px-2 py-0.5 rounded text-[10px] ${
                      log.status.includes('EXECUTED') || log.status === 'HUMAN_APPROVED_AND_EXECUTED' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' :
                      log.status.includes('PENDING') ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' :
                      'bg-red-500/20 text-red-400 border border-red-500/40'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ThreatCenter;
