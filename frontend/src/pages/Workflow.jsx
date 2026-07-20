import React from 'react';
import { 
  UploadCloud, 
  Cpu, 
  ShieldAlert, 
  Zap, 
  Network, 
  ShieldCheck, 
  FileText, 
  ArrowRight,
  CheckCircle2,
  Workflow as WorkflowIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Workflow = () => {
  const workflowStages = [
    {
      stage: 1,
      title: "Network Log Dataset Ingestion",
      icon: UploadCloud,
      color: "text-cyan-400 border-cyan-500/40 bg-cyan-500/10",
      link: "/upload-trainer",
      description: "Ingests 1,048,575 NF-ToN-IoT-v3 network flow traffic records across 18 numerical features."
    },
    {
      stage: 2,
      title: "Dual AI Feature Analysis",
      icon: Cpu,
      color: "text-purple-400 border-purple-500/40 bg-purple-500/10",
      link: "/upload-trainer",
      description: "Supervised Random Forest Classifier + Unsupervised UEBA Isolation Forest anomaly detection."
    },
    {
      stage: 3,
      title: "Threat Detection & MITRE ATT&CK",
      icon: ShieldAlert,
      color: "text-red-400 border-red-500/40 bg-red-500/10",
      link: "/",
      description: "Detects intrusion signatures and maps signatures to MITRE T1110, T1071, T1041, T1595."
    },
    {
      stage: 4,
      title: "Dynamic Risk Score Engine",
      icon: Zap,
      color: "text-amber-400 border-amber-500/40 bg-amber-500/10",
      link: "/",
      description: "Calculates 0-100 risk score: 40% RF Prob + 30% UEBA + 20% Port Weight + 10% Volume."
    },
    {
      stage: 5,
      title: "Digital Twin 5-Tier Topology",
      icon: Network,
      color: "text-red-400 border-red-500/40 bg-red-500/10",
      link: "/digital-twin",
      description: "Animates red particle attack path propagation: Internet ➔ Firewall ➔ PLC Controller."
    },
    {
      stage: 6,
      title: "Autonomous SOAR & Human Gate",
      icon: ShieldCheck,
      color: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10",
      link: "/threat-center",
      description: "Executes 1-click playbooks with Blast Radius checks & Human Escalation Gate approval."
    },
    {
      stage: 7,
      title: "Publication-Grade PDF Report",
      icon: FileText,
      color: "text-cyan-400 border-cyan-500/40 bg-cyan-500/10",
      link: "/reports",
      description: "ReportLab engine generates downloadable PDF incident analysis reports."
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center space-x-2">
            <WorkflowIcon className="w-6 h-6 text-cyan-400" />
            <span>End-to-End System Workflow Architecture</span>
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Complete 7-stage data pipeline from raw network log ingestion to automated SOAR mitigation & PDF reporting
          </p>
        </div>
        <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
          7 Connected Stages
        </span>
      </div>

      {/* Visual Workflow Diagram */}
      <div className="space-y-4">
        {workflowStages.map((wf, idx) => {
          const Icon = wf.icon;
          return (
            <div key={wf.stage} className="relative">
              <div className="glass-panel glass-panel-hover p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 border border-slate-700 font-mono text-xs font-bold text-cyan-400 shrink-0">
                    0{wf.stage}
                  </div>
                  <div className={`p-3 rounded-xl border shrink-0 ${wf.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-100 flex items-center space-x-2">
                      <span>{wf.title}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    </h3>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">{wf.description}</p>
                  </div>
                </div>

                <Link
                  to={wf.link}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-semibold border border-slate-700 transition flex items-center space-x-1 shrink-0"
                >
                  <span>View Stage</span>
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                </Link>
              </div>

              {/* Connecting Arrow */}
              {idx < workflowStages.length - 1 && (
                <div className="w-0.5 h-4 bg-gradient-to-b from-cyan-500 to-indigo-500 mx-auto my-1"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Workflow;
