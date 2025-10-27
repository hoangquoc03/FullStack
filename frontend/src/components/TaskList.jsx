import TaskCard from "./TaskCard";
import TaskEmptyState from "./TaskEmptyState.jsx";
export default function TaskList() {
  let filter = "all";
  const filterdTasks = [
    {
      _id: "1",
      title: "Task 1",
      status: "active",
      completedAt: null,
      createdAt: new Date(),
    },
    {
      _id: "2",
      title: "Task 2",
      status: "complete",
      completedAt: new Date(),
      createdAt: new Date(),
    },
  ];
  if (!filterdTasks || filterdTasks.length === 0) {
    return <TaskEmptyState filter={filter} />;
  }
  return (
    <div className="space-y-3">
      {filterdTasks.map((task, index) => (
        <TaskCard key={task._id ?? index} task={task} index={index} />
      ))}
    </div>
  );
}
