import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  RotateCcw, 
  Download, 
  X, 
  Zap, 
  FileText,
  PhoneCall,
  Activity
} from 'lucide-react';
import { diagnosticQuestions } from '../../data/aiKnowledgeBase';

export default function AiRiskScanner({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isOpen) return null;

  const currentQ = diagnosticQuestions[currentStep];

  const handleSelectOption = (option) => {
    const updatedAnswers = {
      ...answers,
      [currentQ.id]: option
    };
    setAnswers(updatedAnswers);

    if (currentStep < diagnosticQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Finished
      setIsCompleted(true);
      // Trigger subtle celebration confetti if high score
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  };

  // Calculate final score
  const calculateTotalScore = () => {
    let total = 0;
    Object.values(answers).forEach((opt) => {
      total += opt.score || 0;
    });
    return Math.min(100, Math.max(0, total));
  };

  const score = calculateTotalScore();

  const getRiskStatus = () => {
    if (score >= 80) {
      return {
        level: "Low Risk • Proactive Compliance",
        color: "text-emerald-600 bg-emerald-50 border-emerald-200",
        summary: "Your firm demonstrates high adherence to MLR 2017 & statutory standards.",
        icon: ShieldCheck
      };
    } else if (score >= 50) {
      return {
        level: "Moderate Risk • Action Recommended",
        color: "text-amber-600 bg-amber-50 border-amber-200",
        summary: "Notable compliance gaps identified in either FWRA currency, training logs, or automated screening.",
        icon: AlertTriangle
      };
    } else {
      return {
        level: "Critical Regulatory Vulnerability",
        color: "text-rose-600 bg-rose-50 border-rose-200",
        summary: "Severe exposure to statutory fines and supervisory audit sanctions under MLR 2017.",
        icon: ShieldAlert
      };
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setIsCompleted(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const status = getRiskStatus();
  const StatusIcon = status.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Progress / Gradient */}
        <div className="h-2 w-full bg-slate-100">
          <div 
            className="h-full bg-gradient-tech transition-all duration-300"
            style={{ width: `${((currentStep + 1) / diagnosticQuestions.length) * 100}%` }}
          />
        </div>

        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-purple-50 text-purple-700 border border-purple-100">
                <Zap className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-slate-900">
                  AI MLR 2017 Risk Diagnostic Scanner
                </h3>
                <p className="text-xs text-slate-500">
                  Step {currentStep + 1} of {diagnosticQuestions.length} • ReTRRAC Compliance Engine
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {!isCompleted ? (
            /* Question Body */
            <div className="mt-6 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Assessment Question
                </span>
                <h4 className="text-xl font-bold text-slate-800 mt-1">
                  {currentQ.question}
                </h4>
              </div>

              <div className="space-y-3">
                {currentQ.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(option)}
                    className="w-full text-left p-4 rounded-2xl border border-slate-200 hover:border-indigo-500 hover:bg-purple-50/40 transition-all flex items-start justify-between group shadow-sm"
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-800 group-hover:text-indigo-900">
                        {option.label}
                      </p>
                      {option.tip && (
                        <p className="text-xs text-slate-500 mt-1">{option.tip}</p>
                      )}
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all shrink-0 ml-3 mt-1" />
                  </button>
                ))}
              </div>

              {currentStep > 0 && (
                <div className="flex justify-between items-center pt-2">
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-800"
                  >
                    ← Previous Question
                  </button>
                  <button
                    onClick={handleReset}
                    className="text-xs text-slate-400 hover:text-slate-600 flex items-center space-x-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Results Screen */
            <div className="mt-6 space-y-6 text-center">
              
              {/* Score Meter */}
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="inline-flex p-3 rounded-2xl bg-white shadow-md text-indigo-600">
                  <StatusIcon className="w-8 h-8" />
                </div>
                
                <div>
                  <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
                    {score}<span className="text-2xl font-bold text-slate-400">/100</span>
                  </span>
                  <p className="text-xs text-slate-500 font-medium mt-1">Compliance Health Index</p>
                </div>

                <div className={`inline-block px-3.5 py-1.5 rounded-full text-xs font-bold border ${status.color}`}>
                  {status.level}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  {status.summary}
                </p>
              </div>

              {/* Recommended Remediation Roadmap */}
              <div className="text-left space-y-3">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Recommended Remediation Action Plan:
                </h5>
                <div className="space-y-2 text-xs text-slate-700">
                  {score < 80 && (
                    <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-100 flex items-start space-x-2.5">
                      <CheckCircle2 className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-purple-900">Execute Firm-wide Risk Assessment (FWRA/PWRA):</strong> ReTRRAC consultants can conduct a full supervisory gap-audit within 10 days.
                      </div>
                    </div>
                  )}

                  <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-100 flex items-start space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-indigo-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-indigo-900">Deploy ReTRRAC CLM Continuous Screening:</strong> Automate PEP, Sanctions and adverse media across 237 jurisdictions to eliminate human omission.
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-cyan-50/70 border border-cyan-100 flex items-start space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-cyan-900">Enroll Team in CPD-Certified AML Training:</strong> Provide verifiable audit logs and certificates through ReTRRAC Academy.
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3 border-t border-slate-100">
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors flex items-center justify-center space-x-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Audit</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 text-slate-800 font-semibold text-xs hover:bg-slate-200 transition-colors flex items-center justify-center space-x-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Print Audit Summary</span>
                </button>

                <a
                  href="#contact"
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-tech text-white font-bold text-xs shadow-md shadow-indigo-500/20 hover:opacity-95 transition-all flex items-center justify-center space-x-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Book Consultation Call</span>
                </a>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
