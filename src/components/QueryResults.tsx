import { useState } from "react";
import { ChevronDown, ChevronRight, MoreHorizontal, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface QueryResultData {
  queryTime: string;
  description: string;
  source: string;
  userCount: number;
  reachableUsers: number;
}

const sampleData: QueryResultData[] = [
  {
    queryTime: "04:09 pm\n08 Aug 2025",
    description: "Is Customer Member is in [Yes] (case insensitive)",
    source: "Segmentation",
    userCount: 107,
    reachableUsers: 75
  },
  {
    queryTime: "04:07 pm\n08 Aug 2025", 
    description: "Total Sale Amount is greater than 450",
    source: "Segmentation",
    userCount: 31,
    reachableUsers: 29
  },
  {
    queryTime: "04:24 pm\n07 Aug 2025",
    description: "City ID starts with any of [21, 26] (case insensitive)",
    source: "Segmentation", 
    userCount: 1588,
    reachableUsers: 1493
  },
  {
    queryTime: "04:22 pm\n07 Aug 2025",
    description: "wallet_balance is in [350]",
    source: "Segmentation",
    userCount: 0,
    reachableUsers: 0
  },
  {
    queryTime: "11:55 am\n04 Aug 2025",
    description: "Has executed Login - Customer Sign In atleast 1 time in the last 3 days AND Has executed Mini App Home Screen atleast 1 time in the last 3 days AND Has executed Logout atleast 1 time in the last 3 days",
    source: "Segmentation",
    userCount: 60,
    reachableUsers: 60
  }
];

export function QueryResults() {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const toggleRow = (index: number) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedRows(newExpanded);
  };

  return (
    <div className="bg-white rounded-lg border">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-900">Query results</h2>
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-analytics-teal text-analytics-teal hover:bg-analytics-teal/10">
                <span className="mr-2">Actions</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Export to CSV</DropdownMenuItem>
              <DropdownMenuItem>Save Query</DropdownMenuItem>
              <DropdownMenuItem>Schedule Report</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button className="bg-analytics-teal hover:bg-analytics-teal/90 text-white">
            Show count
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-8"></th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Query Time
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Source
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User Count
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reachable Users
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-8"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sampleData.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-4">
                  <button
                    onClick={() => toggleRow(index)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    {expandedRows.has(index) ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                </td>
                <td className="px-4 py-4 text-sm text-gray-900 whitespace-pre-line">
                  {row.queryTime}
                </td>
                <td className="px-4 py-4 text-sm text-gray-900 max-w-md">
                  <div className="truncate">
                    {row.description}
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-900">
                  {row.source}
                </td>
                <td className="px-4 py-4 text-sm text-gray-900 text-center">
                  {row.userCount.toLocaleString()}
                </td>
                <td className="px-4 py-4 text-sm text-gray-900 text-center">
                  {row.reachableUsers.toLocaleString()}
                  <RefreshCw className="w-3 h-3 inline ml-2 text-gray-400" />
                </td>
                <td className="px-4 py-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Query</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}