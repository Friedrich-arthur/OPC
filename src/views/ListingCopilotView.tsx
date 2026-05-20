import React, { useState } from "react";
import {
  Sparkles,
  AlertCircle,
  CheckCircle2,
  FileText,
  Target,
  ShieldCheck,
  ArrowRight,
  BrainCircuit,
  Globe,
  Key,
  ListChecks,
  CheckSquare,
} from "lucide-react";
import { cn } from "../lib/utils";

export function ListingCopilotView() {
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [warningMsg, setWarningMsg] = useState("");

  const [inputs, setInputs] = useState({
    productName: "",
    currentSellingPoints: "",
    competitorLinks: "",
    targetMarketplace: "Amazon",
    constraints: "",
    contactPath: "",
  });

  const handleAnalyze = () => {
    let msg = "";

    if (inputs.productName.length < 2) {
      msg = "麻烦写一下商品名称 / Please enter product name";
      setWarningMsg(msg);
      return;
    }
    if (inputs.currentSellingPoints.length < 5) {
      msg = "随便写点卖点吧 / Please describe some selling points";
      setWarningMsg(msg);
      return;
    }
    if (inputs.targetMarketplace === "") {
      msg = "请选择目标平台 / Please select a target marketplace";
      setWarningMsg(msg);
      return;
    }

    setWarningMsg("");
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
    <div className="w-full relative pb-10">
      <div className="space-y-8 w-full max-w-[1100px] mx-auto relative z-10">
        {/* Hero Section (Visible only when not generated yet) */}
        {(step === 0 || step === 1) && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-10 relative animate-in fade-in zoom-in-[0.98] duration-700">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-50/50 rounded-full blur-[100px] pointer-events-none -mt-32 -mr-32"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-50/50 rounded-full blur-[80px] pointer-events-none -mb-20 -ml-20"></div>

            <div className="p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row gap-12 items-center relative z-10">
              {/* Left Content */}
              <div className="flex-1 space-y-8">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-600 uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                  Product Page Launch Copilot
                </div>

                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
                  把零散产品资料 <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                    一键出具可上线方案
                  </span>
                </h1>

                <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-xl font-medium">
                  提交产品资料、竞品和约束条件，OPC 为您快速出具基于 AI 的
                  <strong className="text-slate-800">
                    英文转化文案草案、差异化卖点和上线检查清单。
                  </strong>{" "}
                  并且，
                  <span className="text-slate-900 font-bold border-b-2 border-indigo-200 pb-0.5">
                    所有草案必须经过人工审核才能发布。
                  </span>
                </p>

                <div className="space-y-4 pt-2">
                  {[
                    "AI 起草英文营销文案并评估证据缺口 (Evidence Gaps)",
                    "人工负责审核确认，拒绝全自动发布的风险",
                    "当前为测试演示阶段：不会真实保存数据，也不会产生费用",
                  ].map((point, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-sm text-slate-700 font-medium bg-slate-50 px-4 py-2.5 rounded-lg border border-slate-100"
                    >
                      <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6 items-center">
                  <button
                    onClick={() => {
                      setStep(1);
                      setTimeout(() => {
                        document
                          .getElementById("intake-form")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }, 50);
                    }}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-black transition-all shadow-[0_8px_30px_rgba(79,70,229,0.3)] flex items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0 group"
                  >
                    生成演示预览{" "}
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </button>
                  <button
                    onClick={() => {
                      // Pre-fill some demo data and jump to step 3
                      setInputs({
                        productName: "便携式制冰机 (Portable Ice Cream Maker)",
                        currentSellingPoints:
                          "15分钟极速制冰。\n小巧便携，适合户外。\n内置充电电池，无需插电。",
                        competitorLinks: "https://amazon.com/...",
                        targetMarketplace: "Amazon",
                        constraints:
                          "不能宣称达到商业级制冷标准。注意物流电池航空管制。",
                        contactPath: "demo@example.com",
                      });
                      setStep(3);
                    }}
                    className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center shadow-sm hover:shadow-md"
                  >
                    查看示例输出
                  </button>
                </div>

                <div className="pt-2 text-xs text-slate-500 flex items-start gap-2 max-w-lg">
                  <ShieldCheck className="w-4 h-4 shrink-0 text-indigo-500 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong className="text-slate-700">Demo only.</strong>{" "}
                    当前演示不会连接正式数据库。OPC 坚信 AI 是人类助手的延伸（
                    <strong className="text-slate-700">
                      AI drafts, human review required
                    </strong>
                    ）。
                  </p>
                </div>
              </div>

              {/* Right Preview Card */}
              <div
                className="w-full lg:w-[460px] shrink-0 transform lg:translate-x-6 xl:translate-x-12"
                style={{ perspective: "1000px" }}
              >
                <div
                  className="bg-white text-slate-900 rounded-2xl border border-slate-200/60 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col transition-all duration-700 ease-out origin-right hover:!transform-none hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]"
                  style={{
                    transform: "rotateY(-10deg) rotateZ(2deg) scale(0.96)",
                  }}
                >
                  <div className="bg-slate-50 border-b border-slate-100 flex items-center gap-2 px-4 py-3">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                    </div>
                    <div className="flex-1 text-center text-[10px] font-mono text-slate-500 truncate tracking-wider">
                      OPC-Launch-Protocol_Preview.pdf
                    </div>
                  </div>

                  <div className="p-6 md:p-8 space-y-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-[10px] font-black uppercase tracking-wider bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded">
                        AI Draft
                      </span>
                      <span className="text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-800 px-2.5 py-1 rounded flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> Human Review
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="h-5 w-4/5 bg-slate-200 rounded"></div>
                      <div className="h-5 w-1/2 bg-slate-200 rounded"></div>
                    </div>

                    <div className="space-y-3 pt-4">
                      <div className="flex gap-3">
                        <div className="w-2 h-2 rounded-full bg-indigo-400 mt-1.5"></div>
                        <div className="h-3 w-5/6 bg-slate-100 rounded"></div>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-2 h-2 rounded-full bg-indigo-400 mt-1.5"></div>
                        <div className="h-3 w-full bg-slate-100 rounded"></div>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-2 h-2 rounded-full bg-indigo-400 mt-1.5"></div>
                        <div className="h-3 w-4/6 bg-slate-100 rounded"></div>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-6 border-t border-slate-100">
                      <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
                        <Target className="w-5 h-5 text-indigo-500" />
                      </div>
                      <div className="space-y-2 flex-1 pt-1">
                        <div className="text-xs font-bold text-slate-800">
                          差异化卖点提炼
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded"></div>
                        <div className="h-2 w-2/3 bg-slate-100 rounded"></div>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                        <ListChecks className="w-5 h-5 text-emerald-500" />
                      </div>
                      <div className="space-y-2 flex-1 pt-1">
                        <div className="text-xs font-bold text-slate-800">
                          Launch 上线清单确认
                        </div>
                        <div className="h-2 w-3/4 bg-slate-100 rounded"></div>
                        <div className="h-2 w-5/6 bg-slate-100 rounded"></div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-900 px-6 py-4 flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400/80 uppercase tracking-widest flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4" /> Operator Pending
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step Indicators */}
        {step > 0 && (
          <div className="mb-10 w-full max-w-2xl mx-auto px-4 md:px-0">
            <div className="flex items-start justify-between relative">
              <div className="absolute top-5 left-0 w-full h-0.5 bg-slate-200 -z-10 -translate-y-1/2 rounded-full"></div>
              {/* Step 1 */}
              <div className="flex flex-col items-center gap-2.5 bg-slate-50 px-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${
                    step >= 1
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                      : "bg-white border-2 border-slate-200 text-slate-400"
                  }`}
                >
                  {step > 1 ? <CheckCircle2 className="w-5 h-5" /> : "1"}
                </div>
                <span
                  className={`text-xs md:text-sm font-bold tracking-wide ${
                    step >= 1 ? "text-indigo-900" : "text-slate-400"
                  }`}
                >
                  Step 1: Input
                </span>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center gap-2.5 bg-slate-50 px-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${
                    step >= 2
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                      : "bg-white border-2 border-slate-200 text-slate-400"
                  }`}
                >
                  {step > 2 ? <CheckCircle2 className="w-5 h-5" /> : "2"}
                </div>
                <span
                  className={`text-xs md:text-sm font-bold tracking-wide ${
                    step >= 2 ? "text-indigo-900" : "text-slate-400"
                  }`}
                >
                  Step 2: Assessment
                </span>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center gap-2.5 bg-slate-50 px-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${
                    step >= 3
                      ? "bg-emerald-500 text-white shadow-md shadow-emerald-200"
                      : "bg-white border-2 border-slate-200 text-slate-400"
                  }`}
                >
                  3
                </div>
                <span
                  className={`text-xs md:text-sm font-bold tracking-wide ${
                    step >= 3 ? "text-emerald-600" : "text-slate-400"
                  }`}
                >
                  Step 3: Result
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Step 1: Input */}
        {step === 1 && (
          <div
            id="intake-form"
            className="bg-white rounded-xl border border-slate-200 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden"
          >
            <div className="bg-slate-50/80 px-6 py-4 border-b border-slate-100 flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">
                1
              </div>
              <h3 className="font-bold text-slate-800">
                提交产品原始资料 (Submit Materials)
              </h3>
            </div>
            <div className="p-6 md:p-8 space-y-6">
              {warningMsg && (
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg flex gap-3 text-amber-800 animate-in fade-in slide-in-from-top-2 mb-6">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-amber-600" />
                  <div>
                    <h4 className="font-bold text-sm text-amber-900">
                      提示 / Notice
                    </h4>
                    <p className="text-sm mt-1">{warningMsg}</p>
                  </div>
                </div>
              )}

              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5 text-sm">
                      产品或型号名称 / Product Name
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="例如：便携式制冰机 Portable Ice Cream Maker"
                      className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                      value={inputs.productName}
                      onChange={(e) =>
                        setInputs((prev) => ({
                          ...prev,
                          productName: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5 text-sm">
                      目标发布平台 / Target Marketplace
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <select
                      className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none bg-white"
                      value={inputs.targetMarketplace}
                      onChange={(e) =>
                        setInputs((prev) => ({
                          ...prev,
                          targetMarketplace: e.target.value,
                        }))
                      }
                    >
                      <option value="Amazon">Amazon</option>
                      <option value="Shopify">Shopify (DTC独立站)</option>
                      <option value="Mercado Libre">
                        Mercado Libre (拉美)
                      </option>
                      <option value="Other">其他 (Other)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5 text-sm">
                    当前的卖点、特性或规格 / Bullet Points & Specs
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <textarea
                    placeholder="把从工厂拿到的参数、或者业务员总结的零散卖点直接贴在这里..."
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm h-24 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none resize-none"
                    value={inputs.currentSellingPoints}
                    onChange={(e) =>
                      setInputs((prev) => ({
                        ...prev,
                        currentSellingPoints: e.target.value,
                      }))
                    }
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5 text-sm">
                    参考竞品链接 / Competitor Links
                  </label>
                  <textarea
                    placeholder="一行一个链接，可贴 Amazon ASIN 或独立站页面URL，AI将分析其差异化空间。"
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm h-20 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none resize-none font-mono text-xs"
                    value={inputs.competitorLinks}
                    onChange={(e) =>
                      setInputs((prev) => ({
                        ...prev,
                        competitorLinks: e.target.value,
                      }))
                    }
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5 text-sm">
                    约束与合规条件 / Constraints & Compliance
                  </label>
                  <textarea
                    placeholder="例如：目标人群是老年人、禁止宣称医疗功效、物流对体积有限制、必须强调环保材质..."
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm h-20 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none resize-none"
                    value={inputs.constraints}
                    onChange={(e) =>
                      setInputs((prev) => ({
                        ...prev,
                        constraints: e.target.value,
                      }))
                    }
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5 text-sm">
                    接收报告的联系方式 / Contact for Report
                  </label>
                  <input
                    type="text"
                    placeholder="演示环境不会真实发送邮件"
                    className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none bg-slate-50 text-slate-400"
                    value={inputs.contactPath}
                    disabled
                    onChange={(e) =>
                      setInputs((prev) => ({
                        ...prev,
                        contactPath: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-base py-3.5 rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-70"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      AI 正在诊断资料完备度...
                    </>
                  ) : (
                    <>
                      开始评估资料成熟度 <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Assessment */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div className="bg-slate-50/80 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">
                    2
                  </div>
                  <h3 className="font-bold text-slate-800">
                    资料诊断结果 (Readiness Assessment)
                  </h3>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="text-sm text-slate-500 hover:text-slate-800 font-medium"
                >
                  修改原始资料
                </button>
              </div>

              <div className="p-6 md:p-8 space-y-6">
                <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <BrainCircuit className="w-6 h-6 text-indigo-500 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">
                      AI 诊断完成 (Diagnosis Complete)
                    </h4>
                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                      我们基于您提交的参数对{" "}
                      <strong>{inputs.productName}</strong> 进行了分析。
                      我们将采用适配 <strong>{inputs.targetMarketplace}</strong>{" "}
                      的规则格式为您起草英文产品页结构。
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-emerald-200 bg-emerald-50 rounded-lg p-4">
                    <h4 className="font-bold text-emerald-800 text-sm mb-2 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> 具备生成条件 (Ready
                      to action)
                    </h4>
                    <ul className="text-sm text-emerald-700 space-y-1.5 pl-5 list-disc marker:text-emerald-400">
                      <li>已匹配 {inputs.targetMarketplace} 平台结构标准</li>
                      <li>已成功提取核心功能参数</li>
                      <li>已建立基础的竞品差异化模型</li>
                    </ul>
                  </div>

                  <div className="border border-amber-200 bg-amber-50 rounded-lg p-4">
                    <h4 className="font-bold text-amber-800 text-sm mb-2 flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4" /> 发现审核风险 (Review
                      Required)
                    </h4>
                    <ul className="text-sm text-amber-700 space-y-1.5 pl-5 list-disc marker:text-amber-400">
                      {inputs.competitorLinks ? (
                        <li>需要人工核实 AI 对竞品弱点的推断是否准确</li>
                      ) : (
                        <li>缺少竞品链接，差异化卖点将基于常规大盘推测</li>
                      )}
                      <li>视觉材料 (使用场景证据) 需要在后期补齐</li>
                      <li>所有合规性声明必须经由人工 Checklist 确认</li>
                    </ul>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-end gap-3">
                  <button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="px-6 py-3 rounded-xl font-bold text-white transition-all shadow-sm flex items-center justify-center gap-2 w-full sm:w-auto bg-slate-800 hover:bg-slate-900 disabled:opacity-70"
                  >
                    {isGenerating ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>{" "}
                        正在起草方案草案...
                      </>
                    ) : (
                      "生成产品页方案体验版"
                    )}
                  </button>
                </div>
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
                产品上架方案演示报告包 (Demo Launch-page Package)
              </h2>
              <button
                onClick={() => setStep(1)}
                className="text-sm font-medium text-slate-500 hover:text-slate-800 bg-white border border-slate-200 px-4 py-2 rounded-lg shadow-sm transition-colors hover:bg-slate-50"
              >
                重新测试
              </button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* English Listing Draft */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col xl:col-span-2">
                <div className="bg-slate-50/80 px-5 py-3 border-b border-slate-100 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-indigo-500" />
                  <h3 className="font-bold text-slate-800 flex-1">
                    英文产品文案草案 (English Listing Draft)
                  </h3>
                  <span className="text-xs font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded border border-amber-200">
                    AI 仅生成演示版本，非最终文案。
                  </span>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <p className="text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">
                      Title / 标题
                    </p>
                    <p className="text-base font-medium text-slate-900 leading-relaxed font-serif">
                      {inputs.productName || "便携式制冰机"} - Essential
                      Solution for Everyday Needs, Durable & Easy to Use
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">
                      Hero Copy / 引言
                    </p>
                    <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-100">
                      Discover the perfect balance of form and function.
                      Designed specifically to address the modern challenges you
                      face, the {inputs.productName || "Product"} integrates
                      seamlessly into your life, providing immediate value from
                      day one.
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">
                      Main Bullet Points / 核心特色项
                    </p>
                    <ul className="space-y-3 text-sm text-slate-700 bg-slate-50 p-4 rounded-lg border border-slate-100">
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-500 font-bold mt-0.5">
                          •
                        </span>
                        <span className="leading-relaxed">
                          <strong className="text-slate-800">
                            BUILT FOR EFFICIENCY:
                          </strong>{" "}
                          {inputs.currentSellingPoints
                            ? inputs.currentSellingPoints.split("\n")[0]
                            : "Engineered to save you time and energy."}
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-500 font-bold mt-0.5">
                          •
                        </span>
                        <span className="leading-relaxed">
                          <strong className="text-slate-800">
                            PREMIUM QUALITY:
                          </strong>{" "}
                          Crafted with high-grade materials to ensure longevity
                          and reliability, backed by rigorous quality control.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-500 font-bold mt-0.5">
                          •
                        </span>
                        <span className="leading-relaxed">
                          <strong className="text-slate-800">
                            VERSATILE DESIGN:
                          </strong>{" "}
                          Adapts to multiple use cases, ensuring you get the
                          most out of your investment every single day.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Differentiated Selling Points */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                <div className="bg-slate-50/80 px-5 py-3 border-b border-slate-100 flex items-center gap-2">
                  <Target className="w-5 h-5 text-emerald-500" />
                  <h3 className="font-bold text-slate-800">
                    差异化卖点提炼 (Differentiated Selling Points)
                  </h3>
                </div>
                <div className="p-6 space-y-4">
                  {[
                    {
                      t: "维护成本极低",
                      v: "经测算可减少50%的日常清洁时间",
                      p: "用户普遍痛点：讨厌复杂的拆卸重装",
                      g: "需要：一次完整的拆装清洗实录视频以自证",
                    },
                    {
                      t: "超长耐用性承诺",
                      v: "使用寿命长于同价竞品3倍",
                      p: "用户普遍痛点：竞品经常出现易耗件损坏",
                      g: "需要：实验室压力测试或材质证明报告",
                    },
                  ].map((point, idx) => (
                    <div
                      key={idx}
                      className="border border-slate-200 rounded-lg p-4 bg-white relative"
                    >
                      <h4 className="font-bold text-slate-800 text-sm mb-2">
                        {point.t}
                      </h4>
                      <div className="text-xs space-y-1.5 text-slate-600">
                        <p>
                          <span className="font-medium text-slate-400 w-16 inline-block">
                            用户价值:
                          </span>{" "}
                          {point.v}
                        </p>
                        <p>
                          <span className="font-medium text-slate-400 w-16 inline-block">
                            解决痛点:
                          </span>{" "}
                          {point.p}
                        </p>
                        <p className="text-amber-600 bg-amber-50 px-2 py-1.5 rounded mt-2 inline-block">
                          <span className="font-semibold w-14 inline-block">
                            落地缺口:
                          </span>{" "}
                          {point.g}
                        </p>
                      </div>
                    </div>
                  ))}
                  {inputs.constraints && (
                    <div className="text-xs text-slate-500 mt-2 italic">
                      * 上述卖点已严格遵守您的硬性约束条件："
                      {inputs.constraints.slice(0, 50)}..."
                    </div>
                  )}
                </div>
              </div>

              {/* Launch Checklist & Process Info */}
              <div className="space-y-6">
                {/* Checklist */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                  <div className="bg-slate-50/80 px-5 py-3 border-b border-slate-100 flex items-center gap-2">
                    <ListChecks className="w-5 h-5 text-blue-500" />
                    <h3 className="font-bold text-slate-800">
                      发布前人工检查清单 (Launch Checklist)
                    </h3>
                  </div>
                  <div className="p-5">
                    <ul className="space-y-3">
                      {[
                        "核心参数表与实物最终确认核准",
                        "安全及认证声明已由合规法务通过",
                        "大盘定价策略已与竞品最新活动对齐",
                        "高清主图和视频素材集已备齐",
                        "物流参数及包材符合目的国规避条件",
                        "最终英文文案已经由 Native Speaker/运营人工审核",
                      ].map((check, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <CheckSquare className="w-4 h-4 text-slate-300 mt-0.5 shrink-0" />
                          <span className="text-sm font-medium text-slate-600">
                            {check}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Evidence Gaps */}
                <div className="bg-white rounded-xl border border-amber-200 shadow-sm overflow-hidden flex flex-col relative">
                  <div className="bg-amber-50 px-5 py-3 border-b border-amber-100 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-amber-500" />
                    <h3 className="font-bold text-amber-900">
                      核心证据缺失 (Evidence Gaps)
                    </h3>
                  </div>
                  <div className="p-5 text-sm text-amber-800 space-y-2">
                    <p className="font-medium mb-3">
                      为避免 AI 幻觉和虚假宣传合规风险，请在上线前补齐：
                    </p>
                    <ul className="list-disc pl-5 space-y-1 opacity-90">
                      <li>缺少高清使用场景实拍图</li>
                      <li>缺少关键材质的质检及认证证明文件</li>
                      <li>缺少明确的售后及保修限制声明</li>
                    </ul>
                  </div>
                </div>

                {/* Human Review Status */}
                <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-sm overflow-hidden flex flex-col relative text-white">
                  <div className="p-6 flex items-start gap-4">
                    <Key className="w-8 h-8 text-emerald-400 shrink-0" />
                    <div>
                      <h3 className="font-bold text-lg text-emerald-400 mb-1">
                        上线前必须进行人工审查
                      </h3>
                      <p className="text-sm text-slate-300 leading-relaxed font-medium">
                        AI Drafts. Human Confirms.
                        我们的系统不会自动将这些草案直接推送到前台。这份文案草稿和差异化策略，必须在您的业务团队确认无误后，才可用于{" "}
                        {inputs.targetMarketplace || "Amazon"} 的正式投产。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
