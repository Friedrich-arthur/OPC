import { Bell, Search, Hexagon } from 'lucide-react';

export function TopBar() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-10 relative">
      <div className="flex items-center gap-3 w-1/3">
        <label className="relative flex items-center w-full max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3" />
          <input 
            type="text" 
            placeholder="搜索 SKU、任务号、平台数据..."
            className="pl-9 pr-4 py-2 bg-slate-100 hover:bg-slate-200/50 border border-transparent rounded-lg text-sm focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none w-full transition-all"
          />
        </label>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex gap-6 mr-4 hidden xl:flex">
          <div className="text-right leading-none">
            <p className="text-[10px] uppercase text-slate-500 font-bold tracking-wide mb-1">本月净利润 (MTD)</p>
            <p className="text-lg font-mono font-bold text-emerald-600">$12,482.50</p>
          </div>
          <div className="text-right leading-none border-l border-slate-200 pl-6">
            <p className="text-[10px] uppercase text-slate-500 font-bold tracking-wide mb-1">全局投资回报率 (ROI)</p>
            <p className="text-lg font-mono font-bold text-slate-800">3.42x</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-blue-600 bg-blue-50 px-2 py-1.5 rounded-md border border-blue-200/60 shadow-sm">
          <Hexagon className="w-3 h-3 fill-blue-600 translate-y-[-0.5px]" />
          <span>智能助手 MVP 激活中</span>
        </div>
        
        <div className="h-6 w-px bg-slate-200 hidden md:block"></div>
        
        <button className="relative p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors hidden md:block group">
          <Bell className="w-5 h-5 group-hover:animate-pulse" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
        </button>
        
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-bold text-sm shrink-0 cursor-pointer shadow-md ring-2 ring-blue-50 hover:ring-blue-100 transition-all">
          管
        </div>
      </div>
    </header>
  );
}
