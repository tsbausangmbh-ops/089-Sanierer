import { FunnelForm } from "../FunnelForm";

export default function FunnelFormExample() {
  return (
    <FunnelForm
      onSubmit={(data) => console.log("Form submitted:", data)}
    />
  );
}
