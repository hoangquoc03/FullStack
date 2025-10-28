import React from "react";
import { Filter } from "lucide-react";
import { Button } from "./ui/button.jsx";
import { Badge } from "@/components/ui/badge";
import { FilterType } from "@/lib/data.js";

export default function StatsAndFilters({
  completedTaskCount = 0,
  activeTaskCount = 0,
  filter = "all",
}) {
  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <div className="flex gap-3">
        <Badge className="bg-white text-black border border-gray-300">
          {activeTaskCount} {FilterType.active}
        </Badge>
        <Badge className="bg-white text-black border border-gray-300">
          {completedTaskCount} {FilterType.completed}
        </Badge>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        {Object.keys(FilterType).map((key) => (
          <Button
            key={key}
            variant={filter === key ? "default" : "ghost"}
            size="sm"
            className="capitalize flex items-center gap-2"
          >
            <Filter className="size-4" />
            {FilterType[key]}
          </Button>
        ))}
      </div>
    </div>
  );
}
