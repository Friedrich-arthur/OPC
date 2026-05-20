import { useCopilot } from '../context/CopilotContext';
import { SuggestionCard } from '../components/ui/SuggestionCard';
import { formatCurrency } from '../lib/utils';
import { TrendingUp, AlertTriangle, PackageOpen, Target, ChevronDown, Check } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { name: '10/14', sales: 120, orders: 40 },
  { name: '10/15', sales: 150, orders: 48 },
  { name: '10/16', sales: 180, orders: 55 },
  { name: '10/17', sales: 140, orders: 45 },
  { name: '10/18', sales: 210, orders: 60 },
  { name: '10/19', sales: 250, orders: 75 },
  { name: '10/20', sales: 220, orders: 65 },
];

export function DashboardView() {
  const { skus, suggestions } = useCopilot();

  const activeSKUs = skus.filter(s => s.status === 'Active').length;
  const totalProfit = skus.reduce((acc, sku) => acc + sku.profit30d, 0);
  const pendingSuggestions = suggestions.filter(s => s.status === 'Pending');
  
  const metrics = [
    { label: '近30天净利润', value: formatCurrency(totalProfit), change: '+12.5% 周环比', trend: 'up', icon: TrendingUp },
    { label: '待处理智能决策', value: pendingSuggestions.length.toString(), change: '需要人工确认', trend: 'neutral', icon: Target },
    { label: '断货预警 SKU', value: '1', change: '高风险', trend: 'down', icon: AlertTriangle },
    { label: '在售商品数', value: activeSKUs.toString(), change: '运行平稳', trend: 'neutral', icon: PackageOpen },
  ];

  return (
    <div className="space-y-6 w-full max-w-[1200px] mx-auto pb-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">经营总览</h1>
          <p className="text-sm text-slate-500 mt-1">你的 AI 运营副驾驶已准备好当前的数据分析简报。</p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-slate-200 text-sm font-medium px-3 py-1.5 rounded-md hover:bg-slate-50 text-slate-600 shadow-sm cursor-pointer">
          按时间段过滤: <span className="font-bold text-slate-800">近 7 天</span> <ChevronDown className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-slate-500 tracking-wide">{m.label}</span>
              <div className="p-1.5 bg-slate-50 rounded-md ring-1 ring-slate-100">
                 <m.icon className="w-4 h-4 text-slate-400" />
              </div>
            </div>
            <div>
              <div className="text-2xl font-mono font-bold text-slate-800 mt-1">{m.value}</div>
              <div className={`text-xs font-bold mt-2 flex items-center gap-1 ${
                m.trend === 'up' ? 'text-emerald-500' : 
                m.trend === 'down' ? 'text-red-500' : 'text-slate-400'
              }`}>
                {m.trend === 'up' ? '↑' : m.trend === 'down' ? '↓' : '-'} {m.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Digital Dashboard space */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-slate-200 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex flex-col overflow-hidden min-h-[400px]">
           <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
             <h2 className="font-bold text-slate-700 text-base">店铺销售趋势 (过去 7 天)</h2>
             <div className="flex gap-4 text-xs font-bold text-slate-500">
               <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-sm bg-blue-500"></div> 销售额</div>
               <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-sm bg-indigo-200"></div> 订单量</div>
             </div>
           </div>
           <div className="p-5 flex-1 w-full min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 500}} dy={10} />
                  <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 500}} />
                  <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 500}} />
                  <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar yAxisId="left" dataKey="sales" name="销售额" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={40} />
                  <Bar yAxisId="right" dataKey="orders" name="订单量" fill="#c7d2fe" radius={[4, 4, 0, 0]} maxBarSize={40} />
                </BarChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Action log */}
        <div className="xl:col-span-1 bg-white rounded-xl border border-slate-200 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex flex-col overflow-hidden max-h-[600px] xl:max-h-none">
          <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h2 className="font-bold text-slate-700 text-base flex items-center gap-2">
              待办决策
              <span className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full font-bold">{pendingSuggestions.length}</span>
            </h2>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 bg-slate-50 relative p-3">
            {pendingSuggestions.length === 0 ? (
              <div className="p-12 text-center text-slate-500 flex flex-col items-center justify-center h-full gap-3 absolute inset-0">
                <div className="w-12 h-12 bg-white shadow-sm ring-1 ring-slate-200 rounded-full flex items-center justify-center mb-2">
                  <Check className="w-6 h-6 text-emerald-500" />
                </div>
                <p className="font-medium">暂无待处理建议<br/><span className="text-xs text-slate-400 font-normal">AI 正在后台持续监控中...</span></p>
              </div>
            ) : (
              <div className="space-y-3">
                 {pendingSuggestions.map(s => (
                   <SuggestionCard key={s.id} suggestion={s} compact />
                 ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
