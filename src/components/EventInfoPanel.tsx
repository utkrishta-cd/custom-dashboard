import { X, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EventInfoPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EventInfoPanel({ isOpen, onClose }: EventInfoPanelProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute top-16 right-4 w-80 bg-white border rounded-lg shadow-lg z-50 animate-fade-in">
      <div className="p-4 border-b flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-900">App Update</h3>
          <p className="text-sm text-gray-500">Tracked when user updates the App.</p>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="p-4 space-y-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>Yesterday</span>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span>iOS, Android</span>
          </div>
        </div>
        
        <div className="pt-4 border-t">
          <p className="text-xs text-gray-500">
            Select a custom segment to view it's description.
          </p>
        </div>
      </div>
    </div>
  );
}