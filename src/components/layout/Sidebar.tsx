import { BarChart3, PackageOpen, ClipboardList, Database, Wand2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useCopilot } from '../../context/CopilotContext';

export function Sidebar() {
  const { currentView, setCurrentView } = useCopilot();

  const navItems = [
    { id: 'dashboard', label: '经营总览', icon: BarChart3 },
    { id: 'inventory', label: '库存管理', icon: PackageOpen },
    { id: 'listing', label: 'AI 内容创作', icon: Wand2 },
    { id: 'trace', label: '决策追踪', icon: ClipboardList },
    { id: 'config', label: 'AI 规则墙', icon: Database },
  ] as const;

  return (
    <aside className="w-56 bg-[#0f172a] text-slate-300 flex flex-col hidden md:flex shrink-0 z-10 border-r border-[#1e293b]">
      <div className="h-16 flex items-center px-6 border-b border-[#1e293b] shrink-0">
        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center mr-3 shadow-md border border-blue-500/30">
          <span className="text-white font-bold text-lg">O</span>
        </div>
        <span className="font-bold tracking-tight text-white text-lg">OPC 助理</span>
      </div>
      <div className="p-4 flex-1 overflow-y-auto">
        <p className="text-[10px] uppercase font-bold text-slate-500 mb-4 px-2 tracking-wider">核心工作台</p>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id as any)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all cursor-pointer text-left border overflow-hidden relative",
                  isActive 
                    ? "bg-blue-600 border-blue-500 shadow-md text-white font-medium" 
                    : "border-transparent text-slate-400 hover:text-slate-100 font-medium hover:bg-white/5"
                )}
              >
                {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/30 rounded-r shadow-sm"></div>}
                <item.icon className={cn("w-4 h-4 shrink-0 z-10", isActive ? "text-white" : "")} />
                <span className="text-sm z-10">{item.label}</span>
              </button>
            )
          })}
        </nav>
      </div>
      <div className="mt-auto p-4 border-t border-[#1e293b] shrink-0">
        <div className="bg-[#1e293b]/50 border border-[#334155] rounded-xl p-3.5 text-left backdrop-blur flex flex-col gap-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-3xl mix-blend-screen pointer-events-none -mr-12 -mt-12"></div>
          <p className="text-[10px] text-blue-400 font-bold uppercase tracking-wider flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span> 系统运行中</p>
          <div className="mt-1 space-y-1">
             <p className="text-xs text-slate-300 font-medium">权限: <span className="text-emerald-400">仅建议 (建议层)</span></p>
             <p className="text-xs text-slate-300 font-medium">审批: <span className="text-amber-400">拦截开启 (人审)</span></p>
          </div>
          <p className="text-[9px] text-slate-500 mt-2 font-mono uppercase bg-slate-900/50 py-1 px-1.5 rounded border border-slate-700/50 block text-center">Trace: tr_8f92a1</p>
        </div>
      </div>
    </aside>
  );
}
