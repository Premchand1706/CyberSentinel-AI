import React from 'react';
import { Shield, Radio, Lock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-8 border-t border-slate-800/80 bg-[#0B0F19] py-4 px-6 font-mono text-xs text-slate-500">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <Shield className="w-4 h-4 text-cyan-400" />
          <span className="font-bold text-slate-300">CyberSentinel AI</span>
          <span>— AI-Powered Critical Infrastructure Cyber Resilience Platform</span>
        </div>

        <div className="flex items-center space-x-4 text-[11px]">
          <span>CERT-In Guidelines Aligned</span>
          <span>•</span>
          <span className="text-cyan-400">NF-ToN-IoT-v3 Benchmark</span>
          <span>•</span>
          <span className="text-emerald-400">v3.0.0 Production Prototype</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
