import React from 'react';
import { User, MapPin, Truck, CreditCard, CheckCircle2 } from 'lucide-react';

interface CheckoutStepperProps {
  currentStep: number;
}

export const CheckoutStepper: React.FC<CheckoutStepperProps> = ({ currentStep }) => {
  const steps = [
    { id: 1, label: 'Identificação', icon: User },
    { id: 2, label: 'Endereço', icon: MapPin },
    { id: 3, label: 'Entrega', icon: Truck },
    { id: 4, label: 'Pagamento', icon: CreditCard },
  ];

  return (
    <div className="w-full py-4 mb-8">
      <div className="flex items-center justify-between max-w-2xl mx-auto relative">
        {/* Progress Line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-800 -translate-y-1/2 z-0" />
        <div
          className="absolute top-1/2 left-0 h-0.5 bg-brand-600 -translate-y-1/2 z-0 transition-all duration-500"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step) => {
          const Icon = step.icon;
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                  isCompleted
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                    : isCurrent
                    ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/40 ring-4 ring-brand-600/20'
                    : 'bg-slate-900 border border-slate-700 text-slate-500'
                }`}
              >
                {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
              </div>
              <span
                className={`text-[11px] font-bold mt-2 hidden sm:block ${
                  isCurrent ? 'text-brand-400' : isCompleted ? 'text-white' : 'text-slate-500'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
