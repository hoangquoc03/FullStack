import { Card } from "./ui/card";
import { cn } from "@/lib/utils.js";
import { Button } from "./ui/button.jsx";
import { CheckCircle, Circle } from "lucide-react";
import { Input } from "./ui/input.jsx";
import { Calendar } from "lucide-react";
import { SquarePen } from "lucide-react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import api from "../lib/axios.js";
import { useState } from "react";

export default function TaskCard({ task, index, handleTaskChanged }) {
  const [isEditting, setIsEditting] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(task.title || "");
  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      toast.success("Xóa nhiệm vụ thành công!");
      // Gọi hàm reload danh sách task ở component cha
      if (handleTaskChanged) {
        handleTaskChanged();
      }
    } catch (error) {
      console.error("Lỗi xảy ra khi xóa nhiệm vụ:", error);
      toast.error("Lỗi xảy ra khi xóa nhiệm vụ.");
    }
  };
  const updatedTask = async () => {
    try {
      setIsEditting(false);
      await api.put(`/tasks/${task._id}`, {
        title: updatedTitle,
      });
      toast.success("Cập nhật nhiệm vụ thành công!");
      handleTaskChanged();
    } catch (error) {
      console.error("Lỗi xảy ra khi cập nhật nhiệm vụ:", error);
      toast.error("Lỗi xảy ra khi cập nhật nhiệm vụ.");
    }
  };
  const toggleTaskStatus = async () => {
    try {
      if (task.status === "active") {
        await api.put(`/tasks/${task._id}`, {
          status: "completed",
          completedAt: new Date().toISOString(),
        });
        toast.success("Nhiệm vụ đã được đánh dấu là hoàn thành!");
      } else {
        await api.put(`/tasks/${task._id}`, {
          status: "active",
          completedAt: null,
        });
        toast.success("Nhiệm vụ đã được chuyển về trạng thái đang hoạt động!");
      }
      handleTaskChanged();
    } catch (error) {
      console.error("Lỗi xảy ra khi chuyển đổi trạng thái nhiệm vụ:", error);
      toast.error("Lỗi xảy ra khi chuyển đổi trạng thái nhiệm vụ.");
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      updatedTask();
    }
  };
  return (
    <Card
      className={cn(
        "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
        task.status === "completed" && "opacity-70"
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "flex-shrink-0 size-8 rounded-full transition-all duration-200",
            task.status === "completed"
              ? "text-success hover:text-success/80"
              : "text-muted-foreground hover:text-primary"
          )}
          onClick={toggleTaskStatus}
        >
          {task.status === "completed" ? (
            <CheckCircle className="size-5" />
          ) : (
            <Circle className="size-5" />
          )}
        </Button>
        <div className=" flex-1 min-w-0">
          {isEditting ? (
            <Input
              placeholder="Chỉnh sửa nhiệm vụ..."
              className="flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20"
              type="text"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
              onKeyPress={handleKeyPress}
              onBlur={() => {
                setIsEditting(false);
                setUpdatedTitle(task.title || "");
              }}
            />
          ) : (
            <p
              className={cn(
                "text-base transition-all duration-200",
                task.status === "complete"
                  ? "line-through text-muted-foreground"
                  : "text-foreground"
              )}
            >
              {task.title}
            </p>
          )}
          <div className="flex items-center gap-2 mt-1">
            <Calendar className="size-3 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {new Date(task.createdAt).toLocaleDateString()}
            </span>
            {task.completedAt && (
              <>
                <span className="mx-1 text-muted-foreground">-</span>
                <Calendar className="size-3 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {new Date(task.completedAt).toLocaleDateString()}
                </span>
              </>
            )}
          </div>
        </div>

        <div className="hidden gap-2 group-hover:inline-flex animate-slide-up">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setIsEditting(true), setUpdatedTitle(task.title || "");
            }}
            className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info"
          >
            <SquarePen className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => deleteTask(task._id)}
            className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
