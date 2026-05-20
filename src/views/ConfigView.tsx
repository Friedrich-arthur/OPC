import { Database, AlertTriangle, Lightbulb, ShieldCheck } from 'lucide-react';

export function ConfigView() {
  const rules = [
    { name: '高风险断货预警', icon: AlertTriangle, conditions: '当前可用库存 < 近7天日均销量 × 7', actions: '建议生成紧急空运补货任务单', target: '通用: 所有活跃 SKU' },
    { name: '冗余滞毁清仓', icon: AlertTriangle, conditions: '库龄 > 365天 且 近30天销量 < 20', actions: '建议设置专属折扣清理库存，停止广告', target: 'FBA 入仓商品' },
    { name: '广告费效比异常监控', icon: Lightbulb, conditions: '近7天 ACOS > 80% 且 花费 > $50', actions: '建议暂停触发低转化关键词，微调竞价', target: '美国站 PPC 推广模块' },
  ];

  return (
    <div className="space-y-6 w-full max-w-[800px] mx-auto pb-10">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">AI 规则墙 (Rule Engine)</h1>
        <p className="text-sm text-slate-500 mt-1">在这里自定义专属您的业务阈值与判定条件，AI 引擎将以此为准则每日遍历并诊断您的店铺数据。</p>
      </div>

      <div className="bg-blue-50 border border-blue-200/60 p-5 rounded-xl text-blue-800 flex gap-4 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/40 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
        <ShieldCheck className="w-6 h-6 shrink-0 text-blue-600 mt-1" />
        <div>
          <p className="font-bold text-base">安全作业模式 (Harness Mode) 正在运行中</p>
          <p className="mt-2 leading-relaxed text-sm text-blue-700/80">为保障财产与运营安全，当前 AI 助理仅被授予了<span className="font-bold bg-white text-blue-600 px-1.5 py-0.5 rounded ml-1 shadow-sm border border-blue-100">建议权 (Operational Only)</span>。系统绝不擅自修改任何真实商业环境的数据。</p>
          <p className="mt-2 text-sm text-blue-700/80">所有由触发规则生成的判定，都将转化为一条待审批的“建议提案”，且必须经由您的 <strong>严格人工复审 (Human Gate)</strong> 方可真正生效并对接给后台系统。</p>
        </div>
      </div>

      <div className="space-y-4 mt-8">
        <h3 className="font-bold text-slate-800 flex items-center gap-2 text-lg mb-2">
          当前已激活的智能判定规则
          <span className="bg-slate-100 text-slate-500 text-xs px-2.5 py-0.5 rounded-full font-bold border border-slate-200">{rules.length} 条有效</span>
        </h3>
        {rules.map((rule, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] gap-4 transition-all hover:border-slate-300 group">
            <div className="flex gap-4 items-start">
              <div className="p-2.5 bg-slate-50 rounded-lg ring-1 ring-slate-100 shrink-0 mt-0.5 group-hover:bg-slate-100 transition-colors">
                <rule.icon className="w-5 h-5 text-slate-400 group-hover:text-slate-500" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-base">{rule.name}</h4>
                <div className="text-sm text-slate-600 mt-3 space-y-1.5 bg-slate-50/80 rounded-md p-3 border border-slate-100">
                   <p className="flex items-start"><span className="text-indigo-500 font-mono text-[10px] font-black mr-2 border border-indigo-100 px-1.5 py-0.5 rounded bg-indigo-50 leading-none mt-0.5 relative top px-1.5">条件</span> {rule.conditions}</p>
                   <p className="flex items-start"><span className="text-emerald-600 font-mono text-[10px] font-black mr-2 border border-emerald-100 px-1.5 py-0.5 rounded bg-emerald-50 leading-none mt-0.5 relative top px-1.5">动作</span> <span className="font-bold text-slate-700">{rule.actions}</span></p>
                </div>
              </div>
            </div>
            <div className="px-3 py-1 bg-slate-50 border border-slate-200 rounded text-[10px] font-bold text-slate-500 shadow-sm whitespace-nowrap self-start sm:self-center">
               受控资源池: {rule.target}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
