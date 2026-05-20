import React from 'react';
import { AISuggestion } from '../../types';
import { useCopilot } from '../../context/CopilotContext';
import { Check, X, Edit, Lightbulb, Box, MessageSquare, TrendingDown } from 'lucide-react';
import { cn } from '../../lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface Props {
  suggestion: AISuggestion;
  compact?: boolean;
}

export const SuggestionCard: React.FC<Props> = ({ suggestion, compact = false }) => {
  const { handleSuggestionAction } = useCopilot();
  const isResolved = suggestion.status !== 'Pending';

  const icons = {
    Inventory: Box,
    Listing: MessageSquare,
    Ads: TrendingDown,
    Finance: Lightbulb,
  };
  const Icon = icons[suggestion.type] || Lightbulb;

  const colors: Record<string, string> = {
    Inventory: "bg-amber-100 text-amber-600",
    Listing: "bg-blue-100 text-blue-600",
    Ads: "bg-indigo-100 text-indigo-600",
    Finance: "bg-emerald-100 text-emerald-600",
  };
  const containerColors: Record<string, string> = {
    Inventory: "bg-amber-50/50",
    Listing: "bg-white",
    Ads: "bg-white",
    Finance: "bg-white",
  };
  
  const statusLabels: Record<string, string> = {
    'Pending': '待审工作',
    'Approved': '已采纳执行',
    'Rejected': '已拒绝驳回',
    'Modified': '已做修改'
  };

  const colorClass = colors[suggestion.type] || "bg-slate-100 text-slate-600";
  const containerClass = containerColors[suggestion.type] || "bg-white";

  return (
    <div className={cn(
      "flex gap-4 transition-all w-full text-left relative overflow-hidden group border",
      compact ? "p-3 rounded-xl bg-white shadow-sm border-slate-200/60 hover:shadow-md hover:border-blue-200" : "p-5 rounded-xl border-slate-200",
      !compact && containerClass,
      isResolved ? "opacity-75 grayscale-[0.2]" : ""
    )}>
      {!compact && (
        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ring-1 ring-black/5 mt-0.5", colorClass)}>
          <Icon className="w-5 h-5" />
        </div>
      )}
      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex justify-between items-start gap-4 mb-2">
          <div className="flex gap-2 items-start">
             {compact && (
                <span className={cn("w-5 h-5 flex justify-center items-center rounded bg-slate-100 text-slate-500 shrink-0 mt-0.5 ring-1 ring-black/5", colorClass.split(' ')[1])}>
                  <Icon className="w-3 h-3" />
                </span>
             )}
             <p className={cn("font-bold text-slate-800 leading-tight", compact ? "text-sm line-clamp-2" : "text-base")}>{suggestion.title}</p>
          </div>
          {isResolved ? (
            <span className={cn(
              "text-[10px] font-bold px-2 py-0.5 rounded shrink-0 whitespace-nowrap hidden sm:block",
              suggestion.status === 'Approved' ? "bg-emerald-100 text-emerald-700" :
              suggestion.status === 'Rejected' ? "bg-red-100 text-red-700" :
              "bg-amber-100 text-amber-700"
            )}>{statusLabels[suggestion.status] || suggestion.status}</span>
          ) : (
            <span className="text-[10px] text-slate-400 whitespace-nowrap shrink-0 hidden sm:block">
              {formatDistanceToNow(new Date(suggestion.createdAt))} 之前
            </span>
          )}
        </div>
        
        <p className={cn("text-xs text-slate-500 leading-relaxed mb-3", compact && "line-clamp-2")}>
          {suggestion.context} {compact ? "" : <br/>} <span className="font-semibold text-slate-700 mt-1 inline-block"><span className="text-indigo-500/80 mr-1 font-black">↳</span> 建议动作: {suggestion.recommendedAction}</span>
        </p>
        
        <div className="mt-auto flex flex-wrap items-center gap-2 mb-3">
          <span className="bg-slate-50 text-slate-500 text-[10px] font-medium px-1.5 py-0.5 rounded border border-slate-200">
            命中规则: {suggestion.ruleTriggered}
          </span>
          {suggestion.targetId && (
            <span className="text-[10px] font-mono text-slate-400 border border-slate-100 bg-slate-50 px-1 rounded">{suggestion.targetId}</span>
          )}
        </div>

        {!isResolved ? (
          <div className={cn("mt-1 flex flex-wrap gap-2 pt-3 border-t border-slate-100", compact && "grid grid-cols-3")}>
            <button 
              onClick={() => handleSuggestionAction(suggestion.id, 'Approved')}
              className={cn("bg-blue-600 text-white font-bold rounded shadow-sm hover:bg-blue-700 hover:shadow transition-all text-center", compact ? "px-2 py-1.5 text-[10px]" : "px-4 py-2 text-xs")}
            >
              采纳并执行 
            </button>
            <button 
              onClick={() => handleSuggestionAction(suggestion.id, 'Modified')}
              className={cn("bg-white border border-slate-200 text-slate-600 font-bold rounded shadow-sm hover:bg-slate-50 transition-colors text-center", compact ? "px-2 py-1.5 text-[10px]" : "px-3 py-2 text-xs")}
            >
              修改建议
            </button>
            <button 
              onClick={() => handleSuggestionAction(suggestion.id, 'Rejected')}
              className={cn("bg-white border border-slate-200 text-slate-600 font-bold rounded shadow-sm hover:bg-slate-50 transition-colors text-center text-red-600/70 hover:text-red-600", compact ? "px-2 py-1.5 text-[10px]" : "px-3 py-2 text-xs")}
            >
              拦截驳回
            </button>
          </div>
        ) : (
          <div className="mt-2 text-[10px] text-slate-400 font-medium pt-2 border-t border-slate-100">
            人工复核操作于 {new Date(suggestion.resolvedAt!).toLocaleTimeString()} (由后台账号 {suggestion.resolvedBy} 执行)
            {suggestion.feedback && <span className="italic block mt-1.5 bg-slate-50 border border-slate-100 p-2 text-slate-600 rounded">" {suggestion.feedback} "</span>}
          </div>
        )}
      </div>
    </div>
  );
}
