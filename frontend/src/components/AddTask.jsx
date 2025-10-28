import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Plus } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import api from "../lib/axios.js";

export default function AddTask({ handleNewTaskAdded }) {
  // 👈 Nhận prop
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const addTask = async () => {
    if (newTaskTitle.trim()) {
      try {
        await api.post("/tasks", {
          title: newTaskTitle,
          status: "active", // 👈 thêm nếu cần mặc định
        });
        toast.success("Thêm nhiệm vụ thành công!");

        setNewTaskTitle(""); // clear input sau khi thêm

        // 👇 Gọi hàm reload danh sách task ở component cha
        if (handleNewTaskAdded) {
          handleNewTaskAdded();
        }
      } catch (error) {
        console.error("Lỗi xảy ra khi thêm nhiệm vụ:", error);
        toast.error("Lỗi xảy ra khi thêm nhiệm vụ.");
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  return (
    <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          type="text"
          placeholder="Cần phải làm gì?"
          className="h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/20"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button
          variant="gradient"
          size="xl"
          className="px-6"
          onClick={addTask}
          disabled={!newTaskTitle.trim()}
        >
          <Plus className="size-5" />
          Thêm
        </Button>
      </div>
    </Card>
  );
}
