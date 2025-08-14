import { useState } from "react";
import { cn } from "@/lib/utils";

interface TabProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function Tab({ label, isActive, onClick }: TabProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 text-sm font-medium rounded-md transition-colors",
        isActive
          ? "bg-analytics-teal text-white"
          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
      )}
    >
      {label}
    </button>
  );
}

const tabs = [
  { id: "user-property", label: "User property" },
  { id: "user-behavior", label: "User behavior" },
  { id: "user-affinity", label: "User affinity" },
  { id: "custom-segment", label: "Custom segment" },
];

export function FilterTabs() {
  const [activeTab, setActiveTab] = useState("user-behavior");

  return (
    <div className="flex space-x-2 p-1 bg-gray-100 rounded-lg">
      {tabs.map((tab) => (
        <Tab
          key={tab.id}
          label={tab.label}
          isActive={activeTab === tab.id}
          onClick={() => setActiveTab(tab.id)}
        />
      ))}
    </div>
  );
}