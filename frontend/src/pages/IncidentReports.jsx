import React from 'react';
import { FileCheck2, Download, FileText, CheckCircle2, Shield, AlertTriangle } from 'lucide-react';
import { downloadIncidentReport } from '../services/api';

const IncidentReports = () => {
  const reportsHistory = [
    { id: "REP-2026-001", filename: "CyberSentinel_Incident_Report.pdf", date: "2026-07-19 16:24:32 UTC", threats: 12, risk_score: 84.5, status: "READY" },
    { id: "REP-2026-002", filename: "NF-ToN-IoT-v3_Benchmark_Audit.pdf", date: "2026-07-19 15:00:00 UTC", threats: 45, risk_score: 88.2, status: "ARCHIVED" },
    { id: "REP-2026-003", filename: "Modbus_SCADA_C2_Mitigation_Report.pdf", date: "2026-07-19 14:15:20 UTC", threats: 8, risk_score: 94.0, status: "ARCHIVED" }
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center space-x-2">
            <FileCheck2 className="w-6 h-6 text-cyan-400" />
            <span>Automated PDF Incident Report Generator</span>
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Publication-grade PDF reports compiling executive summaries, threat logs, MITRE ATT&CK mappings, and remediations
          </p>
        </div>
        <button
          onClick={downloadIncidentReport}
          className="flex items-center space-x-2 px-4 py-2.5 text-xs font-bold rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/20 transition transform active:scale-95"
        >
          <Download className="w-4 h-4" />
          <span>Generate & Download PDF</span>
        </button>
      </div>

      {/* Report Features Showcase Box */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
        <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-1">
          <div className="flex items-center space-x-2 text-cyan-400">
            <Shield className="w-4 h-4" />
            <span className="font-bold">EXECUTIVE METRICS</span>
          </div>
          <p className="text-slate-400 text-[11px] font-sans">
            Includes overall system risk score, total flow volume analyzed, and attack/normal ratio.
          </p>
        </div>
        <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-1">
          <div className="flex items-center space-x-2 text-purple-400">
            <AlertTriangle className="w-4 h-4" />
            <span className="font-bold">MITRE TAXONOMY</span>
          </div>
          <p className="text-slate-400 text-[11px] font-sans">
            Explicit technique mapping for T1110, T1003, T1071, T1595, T1041, T1498 with affected assets.
          </p>
        </div>
        <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-1">
          <div className="flex items-center space-x-2 text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <span className="font-bold">MITIGATION LOGS</span>
          </div>
          <p className="text-slate-400 text-[11px] font-sans">
            Timestamped execution audit trail of automated IP blocks, endpoint isolations, and SOC alerts.
          </p>
        </div>
      </div>

      {/* Generated Reports History Table */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800">
        <h3 className="text-sm font-semibold text-slate-100 mb-4 flex items-center space-x-2">
          <FileText className="w-4 h-4 text-cyan-400" />
          <span>Generated Incident Reports Archive</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="text-slate-400 border-b border-slate-800">
                <th className="pb-2">REPORT ID</th>
                <th className="pb-2">FILENAME</th>
                <th className="pb-2">GENERATED TIME</th>
                <th className="pb-2">THREATS ANALYZED</th>
                <th className="pb-2">AVG RISK SCORE</th>
                <th className="pb-2 text-right">DOWNLOAD</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {reportsHistory.map((rep) => (
                <tr key={rep.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3 text-cyan-400 font-bold">{rep.id}</td>
                  <td className="py-3 text-slate-200 font-semibold">{rep.filename}</td>
                  <td className="py-3 text-slate-400">{rep.date}</td>
                  <td className="py-3 text-slate-300">{rep.threats} Detections</td>
                  <td className="py-3 font-bold text-red-400">{rep.risk_score} / 100</td>
                  <td className="py-3 text-right">
                    <button
                      onClick={downloadIncidentReport}
                      className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 transition flex items-center space-x-1 ml-auto text-[11px]"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </button>
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

export default IncidentReports;
