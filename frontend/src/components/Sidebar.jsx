import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Network, 
  UploadCloud, 
  ShieldAlert, 
  AlertOctagon, 
  FileCheck2,
  Workflow
} from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { path: '/', label: 'SOC Dashboard', icon: LayoutDashboard },
    { path: '/workflow', label: 'System Workflow', icon: Workflow },
    { path: '/digital-twin', label: 'Digital Twin Graph', icon: Network },
    { path: '/threat-center', label: 'Threat & Response', icon: ShieldAlert },
    { path: '/vulnerabilities', label: 'Vulnerabilities', icon: AlertOctagon },
    { path: '/upload-trainer', label: 'ML Model & Dataset', icon: UploadCloud },
    { path: '/reports', label: 'Incident Reports', icon: FileCheck2 },
  ];

  return (
    <aside className="w-64 bg-[#0B0F19] border-r border-slate-800/80 min-h-[calc(100vh-61px)] p-4 flex flex-col justify-between shrink-0">
      <div className="space-y-6">
        <div>
          <h2 className="px-3 text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-wider mb-3">
            SOC Navigation
          </h2>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs font-medium transition ${
                      isActive
                        ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-sm shadow-cyan-500/10'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* OT Infrastructure Info Box */}
        <div className="glass-panel p-3.5 rounded-xl border border-slate-800 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-slate-400">TARGET INFRA</span>
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
          </div>
          <p className="text-slate-200 font-semibold text-[11px]">SCADA / Modbus Grid Cluster #4</p>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-cyan-500 h-full w-[88%]"></div>
          </div>
          <div className="flex justify-between text-[10px] font-mono text-slate-500">
            <span>MODEL: RF + ISO</span>
            <span>ACC: 88.6%</span>
          </div>
        </div>
      </div>

      {/* Footer info */}
      <div className="pt-4 border-t border-slate-800/80 text-[10px] text-slate-500 font-mono">
        <p>NF-ToN-IoT-v3 Benchmark</p>
        <p className="text-slate-600">1,048,575 Dataset Records</p>
      </div>
    </aside>
  );
};

export default Sidebar;
