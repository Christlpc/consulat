import { Check } from 'lucide-react';

interface Step {
  id: number;
  name: string;
}

interface FormStepperProps {
  steps: Step[];
  currentStep: number;
}

export default function FormStepper({ steps, currentStep }: FormStepperProps) {
  return (
    <div className="w-full py-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex-1 relative">
            <div className="flex items-center">
              {/* Step Circle */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  currentStep > step.id
                    ? 'bg-congo-500 text-white'
                    : currentStep === step.id
                    ? 'bg-congo-500 text-white ring-4 ring-congo-200'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {currentStep > step.id ? (
                  <Check className="h-5 w-5" />
                ) : (
                  step.id
                )}
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 transition-all duration-300 ${
                    currentStep > step.id ? 'bg-congo-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>

            {/* Step Label */}
            <div className="absolute top-12 left-0 transform -translate-x-1/4">
              <p
                className={`text-sm font-medium whitespace-nowrap ${
                  currentStep >= step.id ? 'text-congo-600' : 'text-gray-500'
                }`}
              >
                {step.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


