import { useState } from "react";
import { ChevronDown, Plus, X, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { FilterTabs } from "./FilterTabs";

interface FilterCondition {
  id: string;
  type: string;
  property: string;
  operator: string;
  value: string;
}

const eventOptions = [
  "App Update",
  "App/Site Opened", 
  "Push ID Register Android",
  "User Logout",
  "User merged",
  "User Merged"
];

const operators = [
  "Has Executed",
  "Has not executed",
  "Greater than",
  "Less than",
  "Equals",
  "Contains"
];

export function FilterBuilder() {
  const [userFilter, setUserFilter] = useState("filter");
  const [filters, setFilters] = useState<FilterCondition[]>([
    {
      id: "1",
      type: "behavior",
      property: "Has Executed",
      operator: "equals",
      value: "App Update"
    }
  ]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("App Update");

  const addFilter = () => {
    const newFilter: FilterCondition = {
      id: Date.now().toString(),
      type: "behavior",
      property: "Has Executed",
      operator: "equals",
      value: ""
    };
    setFilters([...filters, newFilter]);
  };

  const removeFilter = (id: string) => {
    setFilters(filters.filter(filter => filter.id !== id));
  };

  const resetFilters = () => {
    setFilters([]);
    setSearchValue("");
  };

  const filteredEvents = eventOptions.filter(event =>
    event.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* User Filter Selection */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            id="all-users"
            name="user-filter"
            value="all"
            checked={userFilter === "all"}
            onChange={(e) => setUserFilter(e.target.value)}
            className="w-4 h-4 text-analytics-teal"
          />
          <label htmlFor="all-users" className="text-sm text-gray-700">
            All users
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            id="filter-users"
            name="user-filter"
            value="filter"
            checked={userFilter === "filter"}
            onChange={(e) => setUserFilter(e.target.value)}
            className="w-4 h-4 text-analytics-teal"
          />
          <label htmlFor="filter-users" className="text-sm text-gray-700">
            Filter users by
          </label>
        </div>
      </div>

      {/* Filter Tabs */}
      <FilterTabs />

      {/* Filter Conditions */}
      <div className="space-y-4">
        {filters.map((filter, index) => (
          <div key={filter.id} className="flex items-center space-x-3">
            <Select value={filter.property}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {operators.map((operator) => (
                  <SelectItem key={operator} value={operator}>
                    {operator}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedEvent}>
              <SelectTrigger className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                <div className="p-2">
                  <Input
                    placeholder="Search to select"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="mb-2"
                  />
                </div>
                <div className="space-y-1">
                  <div className="px-2 py-1 text-xs font-semibold text-gray-500 uppercase">
                    Lifecycle
                  </div>
                  {filteredEvents.map((event) => (
                    <SelectItem key={event} value={event}>
                      {event}
                    </SelectItem>
                  ))}
                </div>
              </SelectContent>
            </Select>

            {filters.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFilter(filter.id)}
                className="text-gray-400 hover:text-red-500"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        ))}

        {/* Add Filter Button */}
        <Button
          variant="ghost"
          onClick={addFilter}
          className="text-analytics-teal hover:text-analytics-teal hover:bg-analytics-teal/10"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nested Filter
        </Button>

        {/* Additional Controls */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={addFilter}
            className="text-analytics-teal hover:text-analytics-teal hover:bg-analytics-teal/10"
          >
            <Plus className="w-4 h-4 mr-2" />
            Filter
          </Button>

          <label className="flex items-center space-x-2 text-sm text-gray-600">
            <input type="checkbox" className="w-4 h-4 text-analytics-teal" />
            <span>Exclude Users</span>
          </label>

          <Button
            variant="ghost"
            onClick={resetFilters}
            className="text-analytics-teal hover:text-analytics-teal hover:bg-analytics-teal/10"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset Filters
          </Button>
        </div>
      </div>
    </div>
  );
}