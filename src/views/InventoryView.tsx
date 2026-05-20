import { useCopilot } from '../context/CopilotContext';
import { formatCurrency } from '../lib/utils';
import { cn } from '../lib/utils';
import { ArrowRightLeft, FileSpreadsheet, Search } from 'lucide-react';

export function InventoryView() {
  const { skus } = useCopilot();

  return (
    <div className="space-y-6 w-full max-w-[1200px] mx-auto pb-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">库存与商品表现</h1>
          <p className="text-sm text-slate-500 mt-1">跨平台 SKU 数据中心，以及实时的库存健康度监控。</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 shadow-sm rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            <ArrowRightLeft className="w-4 h-4 text-blue-500" />
            同步 ERP
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 shadow-sm rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            <FileSpreadsheet className="w-4 h-4 text-emerald-500" />
            导出报表
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <label className="relative flex items-center max-w-xs w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3" />
            <input type="text" placeholder="搜索 SKU 或商品名..." className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-md text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium" />
          </label>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="text-slate-500 border-b border-slate-200 bg-slate-50/80 font-bold text-xs tracking-wide">
                <th className="px-5 py-3">商品图片 / 信息</th>
                <th className="px-5 py-3">所在平台 / 店铺</th>
                <th className="px-5 py-3 text-right">可用库存</th>
                <th className="px-5 py-3 text-right">在途数量 / 周转</th>
                <th className="px-5 py-3 text-right">近30天销量</th>
                <th className="px-5 py-3 text-right">近30天净利</th>
                <th className="px-5 py-3 text-center">状态</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {skus.map((sku) => (
                <tr key={sku.id} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                  <td className="px-5 py-3 flex gap-3 items-center">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
                       <span className="text-[10px] text-slate-400 font-bold uppercase">Img</span>
                    </div>
                    <div>
                      <div className="font-bold text-slate-800">{sku.name}</div>
                      <div className="font-mono text-[10px] text-slate-400 mt-0.5 bg-slate-100 border border-slate-200 px-1 py-0.5 inline-block rounded">{sku.id}</div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="font-bold text-slate-700">{sku.platform}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{sku.store}</div>
                  </td>
                  <td className={cn(
                    "px-5 py-3 text-right font-mono text-base font-bold",
                    sku.stock < sku.sales7d ? "text-red-600" : "text-slate-800"
                  )}>
                    {sku.stock}
                    {sku.stock < sku.sales7d && <div className="text-[10px] text-red-500 font-sans font-medium mt-0.5 bg-red-50 py-0.5 rounded px-1 max-w-[60px] ml-auto">短缺告警</div>}
                  </td>
                  <td className="px-5 py-3 text-right">
                     <div className="font-mono font-medium text-slate-700">{sku.stockInTransit}</div>
                     <div className="text-[10px] text-slate-500 mt-0.5 font-medium">周转期 {sku.ageDays} 天</div>
                  </td>
                  <td className="px-5 py-3 text-right font-mono font-medium text-slate-800">{sku.sales30d}</td>
                  <td className="px-5 py-3 text-right font-mono font-bold text-emerald-600">{formatCurrency(sku.profit30d)}</td>
                  <td className="px-5 py-3 text-center">
                    <span className={cn(
                      "inline-flex items-center rounded-md px-2 py-1 text-[10px] font-bold border uppercase tracking-wider bg-white shadow-sm",
                      sku.status === 'Active' ? "text-emerald-600 border-emerald-200/60" :
                      sku.status === 'Out of Stock' ? "text-red-600 border-red-200/60" :
                      "text-amber-700 border-amber-200/60"
                    )}>
                      {sku.status === 'Active' ? '在售中' : sku.status === 'Out of Stock' ? '已断货' : '清仓中'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
