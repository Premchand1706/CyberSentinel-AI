import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  ShieldCheck, 
  Server, 
  Cpu, 
  Database, 
  AlertTriangle, 
  Activity, 
  Zap, 
  RefreshCw, 
  Radio 
} from 'lucide-react';
import { fetchDigitalTwinData } from '../services/api';

const DigitalTwin = () => {
  const [topology, setTopology] = useState(null);
  const [activeSimulation, setActiveSimulation] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);

  useEffect(() => {
    const loadTopology = async () => {
      const data = await fetchDigitalTwinData();
      if (data) {
        setTopology(data);
      } else {
        // Fallback topology state
        setTopology({
          nodes: [
            { id: "node-1", name: "External Internet WAN", type: "INTERNET", tier: 1, ip: "0.0.0.0/0", status: "HEALTHY", risk_score: 15.0, description: "Untrusted external incoming network traffic." },
            { id: "node-2", name: "Next-Gen Perimeter Firewall", type: "FIREWALL", tier: 2, ip: "192.168.1.1", status: "WARNING", risk_score: 65.0, description: "Stateful deep packet inspection & boundary protection." },
            { id: "node-3", name: "Web Server & SCADA HMI DMZ", type: "WEB_SERVER", tier: 3, ip: "10.0.1.50", status: "HEALTHY", risk_score: 35.0, description: "DMZ Web application portal & operator interface." },
            { id: "node-4", name: "App & PLC Controller Server", type: "APP_SERVER", tier: 4, ip: "10.0.2.100", status: "COMPROMISED", risk_score: 94.5, description: "Internal OT control logic and Modbus/MQTT app engine." },
            { id: "node-5", name: "Critical Historian Database", type: "DATABASE", tier: 5, ip: "10.0.3.200", status: "HEALTHY", risk_score: 12.0, description: "Encrypted secure storage for industrial sensor telemetry." }
          ],
          active_attack_paths: [
            { path: ["node-1", "node-2", "node-4"], attack_type: "Command & Control (C2)", mitre_id: "T1071", severity: "CRITICAL" }
          ],
          network_status: "UNDER_ATTACK"
        });
      }
    };
    loadTopology();
  }, []);

  const runSimulation = (scenario) => {
    setActiveSimulation(scenario);
    if (scenario === 'modbus_c2') {
      setTopology(prev => ({
        ...prev,
        network_status: "UNDER_ATTACK",
        nodes: prev.nodes.map(n => {
          if (n.id === 'node-4') return { ...n, status: 'COMPROMISED', risk_score: 95.0 };
          if (n.id === 'node-2') return { ...n, status: 'WARNING', risk_score: 70.0 };
          return { ...n, status: 'HEALTHY', risk_score: 15.0 };
        }),
        active_attack_paths: [
          { path: ["node-1", "node-2", "node-4"], attack_type: "Modbus C2 Command Injection", mitre_id: "T1071", severity: "CRITICAL" }
        ]
      }));
    } else if (scenario === 'ssh_brute') {
      setTopology(prev => ({
        ...prev,
        network_status: "UNDER_ATTACK",
        nodes: prev.nodes.map(n => {
          if (n.id === 'node-2') return { ...n, status: 'COMPROMISED', risk_score: 88.0 };
          if (n.id === 'node-3') return { ...n, status: 'WARNING', risk_score: 60.0 };
          return { ...n, status: 'HEALTHY', risk_score: 15.0 };
        }),
        active_attack_paths: [
          { path: ["node-1", "node-2"], attack_type: "SSH Brute Force Spraying", mitre_id: "T1110", severity: "HIGH" }
        ]
      }));
    } else {
      setTopology(prev => ({
        ...prev,
        network_status: "OPTIMAL",
        nodes: prev.nodes.map(n => ({ ...n, status: 'HEALTHY', risk_score: 15.0 })),
        active_attack_paths: []
      }));
      setActiveSimulation(null);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'INTERNET': return Globe;
      case 'FIREWALL': return ShieldCheck;
      case 'WEB_SERVER': return Server;
      case 'APP_SERVER': return Cpu;
      case 'DATABASE': return Database;
      default: return Server;
    }
  };

  if (!topology) {
    return (
      <div className="flex items-center justify-center h-64 text-cyan-400 font-mono text-sm space-x-3">
        <Activity className="w-5 h-5 animate-spin" />
        <span>Loading Digital Twin Network Topology...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header & Simulation Control Bar */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <h2 className="text-lg font-bold text-slate-100 flex items-center space-x-2">
              <Radio className="w-5 h-5 text-cyan-400 animate-pulse" />
              <span>Digital Twin Critical Infrastructure Network Topology</span>
            </h2>
            <span className={`px-2.5 py-1 rounded text-xs font-mono font-semibold ${
              topology.network_status === 'UNDER_ATTACK'
                ? 'bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse-red'
                : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
            }`}>
              {topology.network_status === 'UNDER_ATTACK' ? '⚠️ CRITICAL THREAT DETECTED' : '✓ ALL SYSTEMS OPTIMAL'}
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Real-time 5-tier critical OT/IT network flow graph with particle attack path propagation
          </p>
        </div>

        {/* Attack Scenario Simulator Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => runSimulation('modbus_c2')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition ${
              activeSimulation === 'modbus_c2'
                ? 'bg-red-500/20 text-red-300 border-red-500'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-red-500/50'
            }`}
          >
            Simulate Modbus C2
          </button>
          <button
            onClick={() => runSimulation('ssh_brute')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition ${
              activeSimulation === 'ssh_brute'
                ? 'bg-amber-500/20 text-amber-300 border-amber-500'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-amber-500/50'
            }`}
          >
            Simulate SSH Spray
          </button>
          <button
            onClick={() => runSimulation('reset')}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/40 hover:bg-cyan-500/20 transition flex items-center space-x-1"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset State</span>
          </button>
        </div>
      </div>

      {/* Interactive 5-Tier Network Flow Graph */}
      <div className="glass-panel p-8 rounded-2xl border border-slate-800 relative overflow-hidden min-h-[420px] flex flex-col justify-center">
        {/* Animated Background Grid & Radar Pulse */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

        {/* 5 Nodes Horizontal Layout */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
          {topology.nodes.map((node, index) => {
            const Icon = getIcon(node.type);
            const isCompromised = node.status === 'COMPROMISED';
            const isWarning = node.status === 'WARNING';
            const isSelected = selectedNode?.id === node.id;

            return (
              <div key={node.id} className="relative flex flex-col items-center">
                {/* Connecting Edge Arrow to Next Node */}
                {index < topology.nodes.length - 1 && (
                  <div className="hidden md:block absolute left-1/2 top-1/2 w-full h-1 -translate-y-1/2 z-0 pointer-events-none">
                    <div className={`h-full w-full ${
                      isCompromised || isWarning
                        ? 'bg-gradient-to-r from-red-500 via-amber-500 to-red-500 animate-pulse'
                        : 'bg-gradient-to-r from-cyan-500/40 to-indigo-500/40'
                    }`}></div>
                    {/* Floating particle */}
                    <div className={`absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full ${
                      isCompromised ? 'bg-red-400 shadow-lg shadow-red-500 animate-ping' : 'bg-cyan-400 shadow-lg shadow-cyan-400'
                    }`} style={{ animationDuration: '1.5s', animationIterationCount: 'infinite' }}></div>
                  </div>
                )}

                {/* Node Card Component */}
                <div
                  onClick={() => setSelectedNode(node)}
                  className={`w-full glass-panel p-4 rounded-xl border transition cursor-pointer relative z-10 ${
                    isSelected
                      ? 'border-cyan-400 shadow-xl shadow-cyan-500/20 scale-105'
                      : (isCompromised
                          ? 'border-red-500/80 bg-red-950/30 animate-pulse-red shadow-lg shadow-red-500/20'
                          : (isWarning
                              ? 'border-amber-500/80 bg-amber-950/20'
                              : 'border-slate-800 hover:border-cyan-500/40'))
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                      TIER {node.tier}
                    </span>
                    <span className={`w-2.5 h-2.5 rounded-full ${
                      isCompromised ? 'bg-red-500 animate-ping' : (isWarning ? 'bg-amber-400' : 'bg-emerald-400')
                    }`}></span>
                  </div>

                  <div className="flex flex-col items-center text-center my-2">
                    <div className={`p-3 rounded-xl mb-2 border ${
                      isCompromised
                        ? 'bg-red-500/20 border-red-500 text-red-400'
                        : (isWarning
                            ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                            : 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400')
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-xs font-bold text-slate-100">{node.name}</h4>
                    <p className="text-[10px] font-mono text-slate-400 mt-0.5">{node.ip}</p>
                  </div>

                  {/* Risk score bar */}
                  <div className="mt-3 pt-2 border-t border-slate-800/80 space-y-1">
                    <div className="flex justify-between text-[10px] font-mono">
                      <span className="text-slate-400">RISK SCORE:</span>
                      <span className={isCompromised ? 'text-red-400 font-bold' : 'text-cyan-400'}>
                        {node.risk_score}/100
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${isCompromised ? 'bg-red-500' : (isWarning ? 'bg-amber-400' : 'bg-cyan-400')}`}
                        style={{ width: `${node.risk_score}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Attack Propagation Banner */}
        {topology.active_attack_paths.length > 0 && (
          <div className="mt-8 relative z-10 p-4 bg-red-950/40 border border-red-500/50 rounded-xl flex items-center justify-between text-xs font-mono text-red-300">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-5 h-5 text-red-400 animate-bounce shrink-0" />
              <div>
                <div className="font-bold text-red-200">
                  ACTIVE ATTACK VECTOR: {topology.active_attack_paths[0].attack_type}
                </div>
                <div className="text-[11px] text-red-300/80">
                  Propagation Path: {topology.active_attack_paths[0].path.join(' ➔ ')} | MITRE: {topology.active_attack_paths[0].mitre_id}
                </div>
              </div>
            </div>
            <span className="px-3 py-1 bg-red-500/20 text-red-400 border border-red-500/40 rounded font-bold">
              {topology.active_attack_paths[0].severity}
            </span>
          </div>
        )}
      </div>

      {/* Selected Node Details Drawer */}
      {selectedNode && (
        <div className="glass-panel p-5 rounded-2xl border border-cyan-500/40 animate-fade-in space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-100 flex items-center space-x-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>Node Telemetry: {selectedNode.name}</span>
            </h3>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-xs text-slate-400 hover:text-slate-200"
            >
              ✕ Close
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800">
              <span className="text-slate-500">IP ADDRESS:</span>
              <p className="text-slate-200 font-bold text-sm mt-0.5">{selectedNode.ip}</p>
            </div>
            <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800">
              <span className="text-slate-500">STATUS:</span>
              <p className={`font-bold text-sm mt-0.5 ${selectedNode.status === 'COMPROMISED' ? 'text-red-400' : 'text-emerald-400'}`}>
                {selectedNode.status}
              </p>
            </div>
            <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800">
              <span className="text-slate-500">RISK SCORE:</span>
              <p className="text-cyan-400 font-bold text-sm mt-0.5">{selectedNode.risk_score} / 100</p>
            </div>
            <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800">
              <span className="text-slate-500">INFRA ROLE:</span>
              <p className="text-slate-300 font-medium text-xs mt-0.5 truncate">{selectedNode.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DigitalTwin;
