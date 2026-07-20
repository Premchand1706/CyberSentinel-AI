import React from 'react';

const StatCard = ({ title, value, subtitle, icon: Icon, color = "cyan", trend }) => {
  const colorMap = {
    cyan: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
    red: "text-red-400 bg-red-500/10 border-red-500/30",
    emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    amber: "text-amber-400 bg-amber-500/10 border-amber-500/30",
    purple: "text-purple-400 bg-purple-500/10 border-purple-500/30"
  };

  return (
    <div className="glass-panel glass-panel-hover p-4 rounded-xl relative overflow-hidden">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-slate-400">{title}</span>
        {Icon && (
          <div className={`p-2 rounded-lg border ${colorMap[color] || colorMap.cyan}`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>
      <div className="flex items-baseline space-x-2">
        <span className="text-2xl font-bold font-mono tracking-tight text-slate-100">{value}</span>
        {trend && (
          <span className="text-xs font-mono font-medium text-emerald-400">
            {trend}
          </span>
        )}
      </div>
      {subtitle && <p className="text-[11px] text-slate-500 mt-1 font-mono">{subtitle}</p>}
    </div>
  );
};

export default StatCard;
