import React, { useState } from 'react';
import { Sparkles, UploadCloud, AlertCircle, CheckCircle2, Image as ImageIcon, Video, FileText, Target, ChevronRight, PenTool, Table, ArrowRight, Gauge, BrainCircuit } from 'lucide-react';
import { cn } from '../lib/utils';

export function ListingCopilotView() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [warningMsg, setWarningMsg] = useState('');

  const [inputs, setInputs] = useState({
    productName: '',
    sellingPoints: '',
    keywords: '',
  });

  const [hasImages, setHasImages] = useState(false);
  const [hasKeywordTable, setHasKeywordTable] = useState(false);

  const handleAnalyze = () => {
    let msg = '';
    
    if (inputs.productName.length < 2) {
      msg = '麻烦写一下商品名称哦，连卖什么都不知道 AI 会抓瞎的啦！';
      setWarningMsg(msg);
      return;
    }
    if (inputs.sellingPoints.length < 5) {
      msg = '随便写点卖点吧，告诉 AI 为什么要买它？哪怕是很简单的一句话也行。';
      setWarningMsg(msg);
      return;
    }

    setWarningMsg('');
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setStep(2);
    }, 1500);
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setStep(3);
    }, 2000);
  };

  return (
    <div className="space-y-6 w-full max-w-[1000px] mx-auto pb-10">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-indigo-500" />
          全能商品内容生成 (Listing Copilot)
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          专为新手设计的上架神器 —— 只要提供最基础的商品信息和几张原图，一键为您生成 Listing 文案、主图排版、短视频脚本和广告测词策略。
        </p>
      </div>

      {/* Step 1: Input */}
      {step === 1 && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
          <div className="p-6 md:p-8 space-y-8">
            {warningMsg && (
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg flex gap-3 text-amber-800 animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-amber-600" />
                <div>
                  <h4 className="font-bold text-sm text-amber-900">提示</h4>
                  <p className="text-sm mt-1">{warningMsg}</p>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">1. 您要卖什么商品？ (名称与品类)</label>
                <input 
                  type="text"
                  placeholder="例如：一款给1-3岁宝宝用的硅胶防摔餐盘..."
                  className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                  value={inputs.productName}
                  onChange={e => setInputs(prev => ({...prev, productName: e.target.value}))}
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">2. 它的核心卖点是什么？ (用自己的话随便写)</label>
                <textarea 
                  placeholder="例如：底部带吸盘不会被打翻，食品级硅胶没有味道，可以放洗碗机洗，颜色很丰富..."
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm h-28 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none resize-none"
                  value={inputs.sellingPoints}
                  onChange={e => setInputs(prev => ({...prev, sellingPoints: e.target.value}))}
                />
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <label className="block font-bold text-slate-700 mb-1 cursor-pointer">
                    3. 目标搜索大词 (选填)
                  </label>
                  <input 
                    type="text"
                    placeholder="例如：baby plate..."
                    className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                    value={inputs.keywords}
                    onChange={e => setInputs(prev => ({...prev, keywords: e.target.value}))}
                  />
                </div>
                <div className="flex-1">
                  <label className="block font-bold text-slate-700 mb-1">4. 提供原始图片或参考图 (选填)</label>
                  <div 
                    className={cn(
                      "border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all h-[76px]",
                      hasImages ? "border-emerald-400 bg-emerald-50" : "border-slate-300 bg-slate-50 hover:bg-slate-100"
                    )}
                    onClick={() => setHasImages(!hasImages)} // Toggle for demo
                  >
                    {hasImages ? (
                       <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                          <p className="font-bold text-emerald-700 text-sm">已上传 1 张图 (点击取消)</p>
                       </div>
                    ) : (
                       <div className="flex items-center gap-2">
                          <UploadCloud className="w-5 h-5 text-slate-400" />
                          <p className="font-bold text-slate-700 text-sm">点击模拟上传图片</p>
                       </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-slate-100">
              <button 
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-lg py-4 rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-70"
              >
                {isAnalyzing ? (
                   <>
                     <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                     正在诊断当前物料能做什么...
                   </>
                ) : (
                   <>
                     第一步：AI 诊断与预检 <ArrowRight className="w-5 h-5" />
                   </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Assessment & Education */}
      {step === 2 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
           <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden p-6 md:p-8 space-y-6">
             <div className="border-b border-slate-100 pb-4">
               <div className="flex justify-between items-center">
                 <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                   <BrainCircuit className="w-6 h-6 text-indigo-500" />
                   数据认知与生成方案预检
                 </h2>
                 <button onClick={() => setStep(1)} className="text-sm text-slate-500 hover:text-slate-800 font-medium">返回修改基本素材</button>
               </div>
               <p className="text-sm text-slate-500 mt-1">AI 已经评估了您目前提供的数据物料，向您展示目前的“生成能力上限”与进阶建议。</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Available capability */}
                <div className="bg-slate-50 rounded-lg p-5 border border-slate-200 shadow-inner flex flex-col">
                   <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
                     <Gauge className="w-5 h-5 text-slate-500" />
                     基于目前数据「能做什么」
                   </h3>
                   <ul className="space-y-4 text-sm text-slate-600 flex-1">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                        <div>
                          <strong className="text-slate-800 block">基础 Listing 文本</strong>
                          <span className="text-xs text-slate-500 mt-0.5 block">基于您提供的中文字面意思，做语法正确的英文翻译和结构排版。</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        {hasImages ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                        )}
                        <div>
                          <strong className="text-slate-800 block">视觉内容</strong>
                          <span className="text-xs text-slate-500 mt-0.5 block">
                            {hasImages ? "已获取实物图，可提供主图修图排版建议及视频脚本。" : "【缺乏实拍图】仅能瞎编一套通用型的视频拍摄指导，没有实物画面对应。"}
                          </span>
                        </div>
                      </li>
                      <li className="flex items-start gap-2 p-3 bg-amber-50 rounded-lg border border-amber-100">
                        <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                        <div>
                          <strong className="text-amber-800 block">流量获取与广告策略</strong>
                          <span className="text-xs text-amber-700/80 mt-1 block leading-relaxed">
                            【缺少深度的市场词库】仅能靠 AI 常识给一些诸如 "{inputs.keywords || '常见大词'}" 的通俗词。因为不知道这些词的真实市场竞争程度，直接去投流可能会浪费大量广告费。
                          </span>
                        </div>
                      </li>
                   </ul>
                </div>

                {/* Education section */}
                <div className={cn("rounded-xl p-6 border transition-all flex flex-col relative overflow-hidden", hasKeywordTable ? "bg-emerald-50 border-emerald-200" : "bg-blue-50 border-blue-200 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)]")}>
                   {hasKeywordTable && <div className="absolute right-0 top-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>}
                   
                   <h3 className={cn("font-bold flex items-center gap-2 mb-4 relative z-10", hasKeywordTable ? "text-emerald-800" : "text-blue-800")}>
                     {hasKeywordTable ? <CheckCircle2 className="w-5 h-5 flex-shrink-0" /> : <Sparkles className="w-5 h-5 flex-shrink-0" />}
                     {hasKeywordTable ? "完美！您已解锁「高转化数据形态」" : "💡 AI 进阶建议：上传表单解锁「爆单形态」"}
                   </h3>
                   
                   {hasKeywordTable ? (
                     <div className="flex-1 flex flex-col justify-between relative z-10">
                       <p className="text-sm text-emerald-700 leading-relaxed bg-white/60 p-4 rounded-lg border border-emerald-100 shadow-sm">
                         太棒了！我们成功读取了数据表中的：<br/>
                         <strong>搜索词、精确月搜索量、竞争度、预估 CPC</strong>。
                       </p>
                       <div className="mt-4">
                         <p className="font-bold text-emerald-800 text-sm mb-2">生成能力将得到蜕变：</p>
                         <ul className="text-xs text-emerald-700 space-y-2 pl-4 list-disc marker:text-emerald-500">
                           <li>标题和卖点自动注入 <strong className="font-bold">高搜索/低竞争</strong> 的长尾词，拦截免费自然流量。</li>
                           <li>为您生成精确到美分的 CPC 出价建议表，把每一分广告费花在刀刃上。</li>
                         </ul>
                       </div>
                     </div>
                   ) : (
                     <div className="space-y-4 flex-1 flex flex-col justify-between">
                       <p className="text-sm text-blue-800 leading-relaxed">
                         如果您手上有一份竞品或同类目的<strong>「关键词搜索词洞察表」</strong>（例如从卖家后台导出的 Excel 报表），请一并提供给我们。
                       </p>
                       <div className="bg-white/50 p-3 rounded-lg border border-blue-100">
                         <p className="text-xs font-bold text-blue-900 mb-1">仅需包含以下列，AI 即可化腐朽为神奇：</p>
                         <ul className="text-xs text-blue-700 space-y-1 pl-4 list-disc marker:text-blue-400">
                           <li>搜索词 (Search Term)</li>
                           <li>月搜索量 (Search Volume)</li>
                           <li>竞争商品数或竞争激烈度</li>
                         </ul>
                       </div>
                       <div 
                         onClick={() => setHasKeywordTable(true)} // Simulation logic
                         className="mt-2 border border-dashed border-blue-400 bg-white hover:bg-blue-100/50 text-blue-600 hover:text-blue-700 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition-colors shadow-sm relative group overflow-hidden"
                       >
                         <div className="absolute inset-0 bg-blue-50/50 translate-y-full group-hover:translate-y-0 transition-transform"></div>
                         <Table className="w-6 h-6 mb-1 opacity-70 relative z-10" />
                         <span className="font-bold text-sm relative z-10">点此处：模拟挂载一份关键词 CSV 表格</span>
                         <span className="text-[10px] opacity-70 text-center mt-1 relative z-10">体验 AI 结合大盘数据进行精细化内容生成</span>
                       </div>
                     </div>
                   )}
                </div>
             </div>

             <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-end gap-3 mt-4">
                {!hasKeywordTable && (
                  <button 
                     onClick={handleGenerate}
                     disabled={isGenerating}
                     className="px-6 py-2.5 rounded-lg border border-slate-300 text-slate-600 font-bold hover:bg-slate-50 transition-colors text-sm w-full sm:w-auto"
                  >
                    没有表格，直接生成基础版
                  </button>
                )}
                <button 
                   onClick={handleGenerate}
                   disabled={isGenerating}
                   className={cn(
                     "px-6 py-2.5 rounded-lg font-bold text-white transition-all shadow-sm flex items-center justify-center gap-2 w-full sm:w-auto", 
                     hasKeywordTable ? "bg-emerald-600 hover:bg-emerald-700 ring-4 ring-emerald-500/20" : "bg-blue-600 hover:bg-blue-700 disabled:opacity-70"
                   )}
                >
                  {isGenerating ? (
                    <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> 努力合成中...</>
                  ) : (
                    hasKeywordTable ? "开始生成！(满配爆单版)" : "我也要生成基础版"
                  )} 
                </button>
             </div>
           </div>
        </div>
      )}

      {/* Step 3: Result */}
      {step === 3 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-emerald-500" />
               生成完毕！请查看您的素材包配置
               {hasKeywordTable && <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full ml-1 border border-emerald-200">数据驱动精准版</span>}
            </h2>
            <button 
              onClick={() => {
                setStep(1);
                setHasKeywordTable(false);
              }}
              className="text-sm font-medium text-slate-500 hover:text-slate-800 bg-white border border-slate-200 px-3 py-1.5 rounded-md shadow-sm transition-colors hover:bg-slate-50"
            >
              重新开始
            </button>
          </div>
          
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Listing Section */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div className="bg-slate-50/80 px-5 py-3 border-b border-slate-100 flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-500" />
                <h3 className="font-bold text-slate-800">1. Listing 原文 (排版与埋词)</h3>
              </div>
              <div className="p-5 space-y-5">
                 <div className="text-xs font-medium text-indigo-700 bg-indigo-50/50 px-3 py-2 rounded-md border border-indigo-100 w-full">
                   💡 {hasKeywordTable ? "基于您上传的《关键词洞察表》，我们直接将搜索量高达万级的蓝海长尾词（高亮标出）预埋到了权重最高的标题和卖点首行。" : "提示：这是基于您的只言片语做的一般性翻译和语态优化。因为没有大盘词汇数据，只能按常识提供泛流通词。"}
                 </div>
                 
                 <div>
                   <p className="text-xs font-bold text-slate-400 mb-1.5">高权重标题框架 (Title)</p>
                   <p className="text-sm font-medium text-slate-800 bg-slate-50 p-4 rounded-lg border border-slate-100 leading-relaxed shadow-inner">
                     {inputs.productName} - 
                     {hasKeywordTable ? <span className="bg-yellow-100 text-yellow-900 font-bold px-1 rounded mx-1">Toddler Silicone Feeding Plate with Suction</span> : <span className="mx-1">Baby Plates</span>} 
                     {inputs.sellingPoints.slice(0, 20)}... Easy to Use & Safe For Kid
                   </p>
                 </div>
                 
                 <div>
                   <p className="text-xs font-bold text-slate-400 mb-1.5">五大核心卖点摘要 (Bullet Points)</p>
                   <ul className="space-y-3 text-sm text-slate-700 bg-slate-50 p-4 rounded-lg border border-slate-100 shadow-inner">
                     <li className="flex items-start gap-2">
                       <span className="text-indigo-500 font-bold mt-0.5">•</span>
                       <span className="leading-relaxed"><strong className="text-slate-800">✅ 击中痛点：</strong>{inputs.sellingPoints.slice(0, 15)}... {hasKeywordTable && <span className="font-bold text-emerald-700 bg-emerald-50 px-1 py-0.5 rounded mx-1 pb-1 inline-block">(已埋词: Non-SLIP bowl stay put)</span>} 增加代入感。</span>
                     </li>
                     <li className="flex items-start gap-2">
                       <span className="text-indigo-500 font-bold mt-0.5">•</span>
                       <span className="leading-relaxed"><strong className="text-slate-800">✅ 材质保证：</strong>重点突出了安全环保材质。</span>
                     </li>
                     <li className="flex items-start gap-2 text-slate-400">... (展示其余条目以供粘贴复制)</li>
                   </ul>
                 </div>
              </div>
            </div>

            {/* Visual Section */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div className="bg-slate-50/80 px-5 py-3 border-b border-slate-100 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-pink-500" />
                <h3 className="font-bold text-slate-800">2. 视觉营销 (主图设计与视频脚本)</h3>
              </div>
              <div className="p-5 space-y-5">
                 
                 <div>
                   <p className="text-xs font-bold text-slate-400 mb-1.5">主图拆解建议与文案</p>
                   <div className="flex gap-4">
                     <div className="w-[120px] aspect-square bg-slate-100 rounded-lg p-2.5 border border-slate-200 flex flex-col justify-between shadow-inner relative overflow-hidden group shrink-0">
                       <div className="text-[10px] font-black text-slate-700 w-full z-10 leading-tight bg-white/80 p-1 rounded backdrop-blur-sm">稳固吸盘<br/>打不翻</div>
                       {hasImages && <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&auto=format&fit=crop')] bg-cover bg-center transition-transform group-hover:scale-110"></div>}
                     </div>
                     <div className="flex-1 rounded-lg border border-slate-100 bg-slate-50 p-4 text-sm text-slate-600 flex flex-col justify-center">
                       <p className="leading-relaxed">📸 <strong>主图首发:</strong> 展现产品全貌，左上角加大字号标出痛点词。{hasKeywordTable && <span className="font-bold text-pink-600 block mt-1">（因为数据表显示 "spill proof" 是被热搜的，建议大字打在图上作为视觉锤）</span>}</p>
                     </div>
                   </div>
                 </div>

                 <div className="mt-4">
                   <p className="text-xs flex items-center gap-1 font-bold text-slate-400 mb-1.5"><Video className="w-4 h-4 text-purple-400" /> 短剧化商品展示视频脚本</p>
                   <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-sm shadow-inner">
                     <p className="leading-relaxed">
                       <span className="font-bold text-purple-600 bg-purple-100 px-1.5 py-0.5 rounded text-[10px] mr-2">前 3 秒</span> 
                       <span className="text-slate-700">展示令人崩溃的痛点场景锁定注意力。</span>
                     </p>
                     <p className="mt-3 leading-relaxed">
                       <span className="font-bold text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded text-[10px] mr-2">3-8 秒</span> 
                       <span className="text-slate-700">产品特写展示，直接演示产品如何解决这一痛点，配合强有力的音效与字幕。</span>
                     </p>
                   </div>
                 </div>
              </div>
            </div>

            {/* Ads Section */}
            <div className="xl:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col relative overflow-hidden">
               {hasKeywordTable && <div className="absolute right-0 top-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>}
              <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between z-10 relative bg-slate-50/50">
                 <div className="flex items-center gap-2">
                   <Target className={cn("w-5 h-5", hasKeywordTable ? "text-emerald-500" : "text-amber-500")} />
                   <h3 className="font-bold text-slate-800">3. 广告投流建议 (PPC 起手式)</h3>
                 </div>
              </div>
              <div className="p-6 flex flex-col md:flex-row gap-8 z-10 relative">
                <div className="md:w-1/3 flex flex-col justify-center">
                  {hasKeywordTable ? (
                    <div className="space-y-4">
                      <p className="text-sm font-medium text-slate-700 leading-relaxed">
                        利用您提供的数据表格，我们帮您筛选出了最适合首发推广的<strong className="text-emerald-600 font-bold bg-emerald-50 px-1 rounded">低竞争、高转化的长尾跑量词</strong>。
                      </p>
                      <p className="text-xs text-slate-500 border-l-2 border-emerald-300 pl-3 leading-relaxed">这些词已经根据搜索量和竞争激烈度做过交叉比对，照着开手动广告稳赚不赔。</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-sm font-medium text-slate-700 leading-relaxed">
                        由于<strong className="text-amber-600 font-bold bg-amber-50 px-1 rounded">缺少准确的市场数据支撑</strong>，这里只能给您推荐一些泛泛的、AI 常识推荐的品类词语。
                      </p>
                      <p className="text-xs text-slate-500 border-l-2 border-amber-300 pl-3 leading-relaxed">警告：这些短词竞争可能极大（很烧钱），或者搜索量极小，建议先以自动广告为主跑一跑报表再看。</p>
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  {hasKeywordTable ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        {w: '"toddler silicone suction plate"', s: '12,400+', c: '$0.42 / 高转化'},
                        {w: '"spill proof baby bowl set"', s: '8,350+', c: '$0.35 / 竞争小'},
                        {w: '"best plate for 1 yr old"', s: '5,120+', c: '$0.28 / 蓝海长尾'}
                      ].map((kw, i) => (
                        <div key={i} className="flex flex-col justify-between bg-white border border-emerald-100 p-4 rounded-xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
                          <span className="font-mono text-sm font-bold text-slate-800 mb-2 truncate" title={kw.w}>{kw.w}</span>
                          <div className="flex justify-between items-end">
                            <span className="text-[10px] text-slate-500 font-medium">月检索量 <strong className="text-emerald-600">{kw.s}</strong></span>
                            <span className="text-[10px] font-bold text-white bg-emerald-500 px-2.5 py-1 rounded-md shadow-sm">{kw.c}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 opacity-80">
                      {[
                        {w: '"baby plate"', c: '极高'},
                        {w: '"feeding bowl"', c: '偏高'},
                        {w: '"silicone plate"', c: '中等'}
                      ].map((kw, i) => (
                        <div key={i} className="flex justify-between items-center bg-slate-50 border border-slate-200 px-4 py-4 rounded-xl">
                          <span className="font-mono text-xs font-bold text-slate-700">{kw.w}</span>
                          <span className="flex items-center gap-1.5"><span className="text-[10px] text-slate-500">预估竞争度</span><span className="text-[10px] font-bold text-slate-600 bg-slate-200 px-2 py-0.5 rounded">{kw.c}</span></span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
