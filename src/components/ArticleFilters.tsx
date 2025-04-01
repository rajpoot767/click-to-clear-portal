
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ArticleFiltersProps {
  onSortChange: (value: string) => void;
  onDateRangeChange: (value: string) => void;
}

const ArticleFilters = ({
  onSortChange,
  onDateRangeChange,
}: ArticleFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div>
        <label className="text-sm text-gray-500 mb-1 block">Sort By</label>
        <Select onValueChange={onSortChange} defaultValue="newest">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="popularity">Most Popular</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <label className="text-sm text-gray-500 mb-1 block">Date Range</label>
        <Select onValueChange={onDateRangeChange} defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Date range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ArticleFilters;
