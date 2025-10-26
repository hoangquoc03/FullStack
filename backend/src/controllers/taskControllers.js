import Task from "../models/Task.js";

export const getAllTask = async (req, res) => {
  // async de doi ket qua tu CSDL
  try {
    const tasks = await Task.find().sort({ createdAt: "desc" }); // Lay tat ca nhiem vu va sap xep theo createdAt giam dan
    res.status(200).json(tasks); // status 200: thanh cong
  } catch (error) {
    console.error("Loi khi lay danh sach nhiem vu:", error);
    res.status(500).json({ message: "Loi server" }); // status 500: loi server
  }
};

export const createTask = async (req, res) => {
  try {
    const { title } = req.body; // Lay title tu req.body va req.body la mot doi tuong
    const task = new Task({ title }); // Tao mot nhiem vu moi voi title
    const newTask = await task.save(); // Luu nhiem vu moi vao CSDL
    res.status(201).json(newTask); // status 201: da tao thanh cong
  } catch (error) {
    console.error("Loi khi tao nhiem vu:", error);
    res.status(500).json({ message: "Loi server" });
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
