export default function Footer({
  completedTasksCount = 0,
  activeTasksCount = 0,
}) {
  return (
    <>
      {completedTasksCount + activeTasksCount > 0 && (
        <div className="text-sm text-center text-muted-foreground">
          {activeTasksCount} nhiệm vụ hoạt động, {completedTasksCount} nhiệm vụ
          đã hoàn thành
        </div>
      )}
      {completedTasksCount + activeTasksCount === 0 && (
        <div className="text-sm text-center text-muted-foreground">
          Chưa có nhiệm vụ nào. Hãy thêm nhiệm vụ để bắt đầu!
        </div>
      )}
    </>
  );
}
