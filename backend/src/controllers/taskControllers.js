export const getAllTask = (request, response) => {
  response.status(200).send("ban co 10 viec can lam");
};
export const createTask = (req, res) => {
  res.status(200).json({ message: "NHiem vu tao thanh cong" });
};
export const updateTask = (req, res) => {
  res.status(200).json({ message: "NHiem vu sua thanh cong" });
};
export const deleteTask = (req, res) => {
  res.status(200).json({ message: "NHiem vu xoa thanh cong" });
};
