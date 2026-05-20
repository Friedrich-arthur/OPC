import { useCopilot } from '../context/CopilotContext';
import { SuggestionCard } from '../components/ui/SuggestionCard';

export function DecisionTraceView() {
  const { suggestions } = useCopilot();

  const resolvedSuggestions = suggestions
    .filter(s => s.status !== 'Pending')
    .sort((a, b) => new Date(b.resolvedAt || '').getTime() - new Date(a.resolvedAt || '').getTime());

  return (
    <div className="space-y-6 w-full max-w-[800px] mx-auto pb-10">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">决策追踪记忆 (Decision Memory)</h1>
        <p className="text-sm text-slate-500 mt-1">沉淀所有的 AI 决策与产生的事后长尾影响数据。用数字记忆复盘决策链路，作为组织资产和模型优化的基石。</p>
      </div>

      {resolvedSuggestions.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-center items-center shadow-sm">
            <div className="text-2xl font-black text-slate-700">{resolvedSuggestions.length}</div>
            <div className="text-xs font-bold text-slate-500 uppercase mt-1 tracking-wider">历史复核总数</div>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex flex-col justify-center items-center shadow-sm">
            <div className="text-2xl font-black text-emerald-700">92<span className="text-sm font-bold text-emerald-600">%</span></div>
            <div className="text-xs font-bold text-emerald-600 uppercase mt-1 tracking-wider">决策正反馈率</div>
          </div>
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 flex flex-col justify-center items-center shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-500/10 rounded-full blur-xl pointer-events-none"></div>
            <div className="text-2xl font-black text-indigo-700">+$210</div>
            <div className="text-xs font-bold text-indigo-600 uppercase mt-1 tracking-wider">周期累计收益/止损</div>
          </div>
        </div>
      )}

      <div className="relative pt-2">
        {/* Timeline vertical line */}
        <div className="absolute left-7 top-10 bottom-4 w-px bg-slate-200"></div>

        <div className="space-y-8">
          {resolvedSuggestions.length === 0 ? (
            <div className="p-12 text-center text-slate-500 bg-white rounded-xl border border-slate-200 shadow-sm font-medium">
              尚未产生处理完毕的 AI 决策记录。
            </div>
          ) : (
            resolvedSuggestions.map((s) => (
              <div key={s.id} className="relative pl-16">
                {/* Timeline dot */}
                <div className="absolute left-[1.4rem] top-7 w-3.5 h-3.5 rounded-full bg-white border-[3px] border-blue-500 ring-4 ring-[#f8fafc]"></div>
                <SuggestionCard suggestion={s} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
