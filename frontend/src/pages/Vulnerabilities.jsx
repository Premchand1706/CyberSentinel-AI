import React, { useState, useEffect } from 'react';
import { AlertOctagon, ShieldAlert, CheckCircle, ExternalLink, Filter } from 'lucide-react';
import { fetchVulnerabilities } from '../services/api';

const Vulnerabilities = () => {
  const [vulns, setVulns] = useState([]);
  const [filterSeverity, setFilterSeverity] = useState('ALL');

  useEffect(() => {
    const loadVulns = async () => {
      const data = await fetchVulnerabilities();
      if (data && data.vulnerabilities) {
        setVulns(data.vulnerabilities);
      } else {
        setVulns([
          {
            id: "VULN-2026-001",
            cve: "CVE-2026-1048",
            title: "Modbus/TCP Unauthorized Command Execution",
            asset: "Industrial PLC Controller (App Server)",
            port: 502,
            cvss: 9.8,
            severity: "CRITICAL",
            mitre: "T1071",
            description: "Unauthenticated remote attack vector permitting raw Modbus function code manipulation.",
            recommendation: "Enforce Modbus Security Gateway TLS encryption and disable unauthenticated function codes."
          },
          {
            id: "VULN-2026-002",
            cve: "CVE-2026-8842",
            title: "SSH Credential Spraying & Weak Cipher Exposure",
            asset: "Perimeter Firewall & Secure Gateway",
            port: 22,
            cvss: 8.6,
            severity: "HIGH",
            mitre: "T1110",
            description: "High frequency brute force attempts exploiting legacy SSH password authentication.",
            recommendation: "Disable password authentication, enforce Ed25519 SSH keys, and enable Fail2Ban rate limiting."
          },
          {
            id: "VULN-2026-003",
            cve: "CVE-2026-3491",
            title: "SQL Injection & Data Exfiltration in Historian Database",
            asset: "Critical Historian SQL Database",
            port: 443,
            cvss: 8.1,
            severity: "HIGH",
            mitre: "T1041",
            description: "Exfiltration of sensitive telemetry data via unvalidated parameter inputs.",
            recommendation: "Implement parameterized prepared queries, strict egress filtering, and database DLP monitoring."
          },
          {
            id: "VULN-2026-004",
            cve: "CVE-2026-5210",
            title: "MQTT Broker Unauthenticated Telemetry Injection",
            asset: "SCADA IoT HMI Gateway",
            port: 1883,
            cvss: 7.5,
            severity: "HIGH",
            mitre: "T1595",
            description: "IoT sensor topic spoofing allowing adversaries to inject false grid operational metrics.",
            recommendation: "Require X.509 client certificate authentication for all MQTT client connections."
          },
          {
            id: "VULN-2026-005",
            cve: "CVE-2026-1192",
            title: "HTTP Application Buffer Overflow Volumetric DoS",
            asset: "Web Server DMZ Gateway",
            port: 80,
            cvss: 6.8,
            severity: "MEDIUM",
            mitre: "T1498",
            description: "Volumetric packet flooding exhausting server socket pools.",
            recommendation: "Deploy Web Application Firewall (WAF) rate-limiting rules and SYN cookies."
          }
        ]);
      }
    };
    loadVulns();
  }, []);

  const filtered = filterSeverity === 'ALL'
    ? vulns
    : vulns.filter(v => v.severity === filterSeverity);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center space-x-2">
            <AlertOctagon className="w-6 h-6 text-amber-400" />
            <span>Critical Infrastructure Vulnerability Ranking & Prioritization</span>
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">
            CVSS v3.1 Risk Scoring matrix prioritized by OT/IT operational impact and target port exposure
          </p>
        </div>

        {/* Severity Filter */}
        <div className="flex items-center space-x-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800 text-xs font-mono">
          <Filter className="w-3.5 h-3.5 text-slate-400 ml-2" />
          {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM'].map(sev => (
            <button
              key={sev}
              onClick={() => setFilterSeverity(sev)}
              className={`px-3 py-1 rounded-lg transition ${
                filterSeverity === sev
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Vulnerability List Cards */}
      <div className="space-y-4">
        {filtered.map((v) => (
          <div key={v.id} className="glass-panel glass-panel-hover p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div className="flex items-center space-x-3">
                <span className={`px-2.5 py-1 rounded font-mono text-xs font-bold ${
                  v.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border border-red-500/40' :
                  v.severity === 'HIGH' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' :
                  'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                }`}>
                  CVSS {v.cvss} ({v.severity})
                </span>
                <span className="font-mono text-xs text-purple-400 font-bold">{v.cve}</span>
                <span className="text-xs text-slate-400 font-mono">| MITRE: {v.mitre}</span>
              </div>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-800/50">
                Target Port {v.port}
              </span>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-100">{v.title}</h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5">Asset Target: {v.asset}</p>
            </div>

            <p className="text-xs text-slate-300 font-sans leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
              {v.description}
            </p>

            <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 rounded-xl text-xs font-mono text-emerald-300 flex items-start space-x-2">
              <CheckCircle className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
              <div>
                <span className="font-bold">RECOMMENDED REMEDIATION:</span> {v.recommendation}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vulnerabilities;
