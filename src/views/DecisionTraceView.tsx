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
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">决策追踪报表 (Trace Audit)</h1>
        <p className="text-sm text-slate-500 mt-1">记录系统产生的所有 AI 建议轨迹及人工干预记录，作为模型学习自留地。</p>
      </div>

      <div className="relative pt-6">
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
