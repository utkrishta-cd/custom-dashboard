import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { FilterBuilder } from "@/components/FilterBuilder";
import { QueryResults } from "@/components/QueryResults";
import { EventInfoPanel } from "@/components/EventInfoPanel";

const Index = () => {
  const [showEventInfo, setShowEventInfo] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="User Segmentation"
        description="Create and manage user segments based on behavior and properties"
        action={
          <button
            onClick={() => setShowEventInfo(true)}
            className="text-sm text-analytics-teal hover:text-analytics-blue underline"
          >
            View Event Info
          </button>
        }
      />
      {/* Filter Builder */}
      <div className="bg-white rounded-lg border p-6">
        <FilterBuilder />
      </div>
      {/* Query Results */}
      <QueryResults />
      {/* Event Info Panel */}
      <EventInfoPanel 
        isOpen={showEventInfo} 
        onClose={() => setShowEventInfo(false)} 
      />
    </div>
  );
};

export default Index;
