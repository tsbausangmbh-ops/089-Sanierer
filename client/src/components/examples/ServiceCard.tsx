import { ServiceCard } from "../ServiceCard";
import { Wrench } from "lucide-react";

export default function ServiceCardExample() {
  return (
    <ServiceCard
      icon={Wrench}
      title="Dacharbeiten"
      description="Professionelle Dachreparaturen, Neueindeckungen und Wartungsarbeiten."
      isSelected={false}
      onClick={() => console.log("Service selected")}
    />
  );
}
