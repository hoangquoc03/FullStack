import Task from "../models/Task.js";

export const getAllTask = async (req, res) => {
  // async de doi ket qua tu CSDL
  try {
    const result = await Task.aggregate([
      {
        $facet: {
          tasks: [{ $sort: { createdAt: -1 } }],
          activeCount: [{ $match: { status: "active" } }, { $count: "count" }],
          completedCount: [
            { $match: { status: "completed" } },
            { $count: "count" },
          ],
        },
      },
    ]);
    const tasks = result[0].tasks;
    const activeCount = result[0].activeCount[0]?.count || 0; // neu khong co thi tra ve 0
    const completedCount = result[0].completedCount[0]?.count || 0;
    res.status(200).json({ tasks, activeCount, completedCount }); // status 200: thanh cong
  } catch (error) {
    console.error("Loi khi lay danh sach nhiem vu:", error);
    res.status(500).json({ message: "Loi server" }); // status 500: loi server
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, status } = req.body;

    // Nếu không gửi status, mặc định là 'active'
    const task = new Task({
      title,
      status: status || "active",
    });

    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Lỗi khi tạo nhiệm vụ:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, status, completeAt } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      // Tim va cap nhat nhiem vu theo id
      req.params.id, // id lay tu req.params.id va param la mot doi tuong
      { title, status, completeAt }, // Du lieu cap nhat
      { new: true } // Tra ve tai lieu da cap nhat
    );
    if (!updatedTask) {
      return res.status(404).json({ message: "Nhiem vu khong ton tai" }); // status 404: khong tim thay
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Loi khi cap nhat nhiem vu:", error);
    res.status(500).json({ message: "Loi server" });
  }
};
export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id); // Tim va xoa nhiem vu theo id
    if (!deletedTask) {
      return res.status(404).json({ message: "Nhiem vu khong ton tai" });
    }
    res.status(200).json({ message: "Xoa nhiem vu thanh cong" });
  } catch (error) {
    console.error("Loi khi xoa nhiem vu:", error);
    res.status(500).json({ message: "Loi server" });
  }
};
