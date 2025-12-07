import { ConfirmationPage } from "../ConfirmationPage";

export default function ConfirmationPageExample() {
  return <ConfirmationPage onReset={() => console.log("Reset clicked")} />;
}
