import { StepIndicator } from "../StepIndicator";

export default function StepIndicatorExample() {
  return (
    <StepIndicator
      steps={["Service", "Details", "Kontakt"]}
      currentStep={1}
    />
  );
}
