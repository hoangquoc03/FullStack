import { Card } from "@/components/ui/card";
import { Circle } from "lucide-react";

export default function TaskEmptyState({ filter }) {
  return (
    <>
      <Card className="p-8 text-center border-0 bg-gradient-card shadow-cusom-md">
        <div className="space-y-3">
          <Circle className="mx-auto size-12 text-muted-foreground" />
          <div>
            <h3 className="font-medium text-foreground">
              {filter === "active"
                ? " Không có nhiệm vụ hoạt động nào!"
                : filter === "completed"
                ? " Không có nhiệm vụ đã hoàn thành nào!"
                : " Không có nhiệm vụ nào!"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {filter === "all"
                ? "Thêm nhiệm vụ đầu tiên vào để bắt đầu"
                : `Chuyển sang "tất cả" để thấy những nhiệm vụ ${
                    filter === "active"
                  } ? "đã hoàn thành ": "đang làm." `}
            </p>
          </div>
        </div>
      </Card>
    </>
  );
}
