const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//เพิ่มข้อมูล
const createUser = async (req, res) => {
    const { id, name, email, password, created_at } =
      req.body;

    try {
      // สร้างข้อมูลลูกค้าใหม่
      const cust = await prisma.users.create({
        data: {
          id, name, email, password, created_at
        },
      });
  
      // ส่งการตอบกลับเมื่อสร้างลูกค้าสำเร็จ
      res.status(200).json({
        status: "ok",
        message: `User with ID = ${cust.id} is created`,
      });
    } catch (err) {
      // จัดการข้อผิดพลาด
      res.status(500).json({
        status: "error",
        message: "Failed to create user",
        error: err.message,
      });
    }
};



//เรียกดูข้อมูล
const getUsers = async (req, res) => {
    const custs = await prisma.users.findMany();
    res.json(custs);
  };


//ลบข้อมูล
const deleteUser = async (req, res) => {
    const id = Number(req.params.id); 
  
    try {
      // 1. ตรวจสอบว่า User มีอยู่จริงหรือไม่
      const existingRepair = await prisma.users.findUnique({
        where: { id: id },
      });
  
      if (!existingRepair) {
        return res.status(404).json({ message: `User = ${id} not found` });
      }
  
      // 2. ลบข้อมูลใน repair (ไม่ใช่ customers)
      await prisma.users.delete({
        where: { id: id }, 
      });
  
      res.status(200).json({
        status: "ok",
        message: `User = ${id} is deleted`,
      });
    } catch (err) {
      console.log("Delete User error", err);
      res.status(500).json({ error: err.message });
    }
  };
  

//เรียกข้อมูลตาม ID
const getUserByID = async (req, res) => {
  const id = Number(req.params.id);

  try {
    const user = await prisma.users.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      return res.status(404).json({ message: `User = ${id} not found` });
    }

    res.json(user);
  } catch (err) {
    console.error("Get User error", err);
    res.status(500).json({ error: err.message });
  }
};


//แก้ไข/อัพเดทข้อมูล
const updateUser = async (req, res) => {
  const { name, email, password, created_at } = req.body;
  const { id } = req.params; // รับ ID จาก url

  const data = {};
  if (name) data.name = name;
  if (email) data.email = email;
  if (password) data.password = password;
  if (created_at) data.created_at = created_at;

  // ตรวจสอบว่ามีข้อมูลที่จะอัปเดตหรือไม่
  if (Object.keys(data).length === 0) {
    return res.status(400).json({
      status: "error",
      message: "No data provided to update",
    });
  }
  try {
    // อัปเดตข้อมูลลูกค้า
    const cust = await prisma.users.update({
      data,
      where: { id: Number(id) },
    });
    // ส่งการตอบกลับเมื่ออัปเดตลูกค้าสำเร็จ
    res.status(200).json({
      status: "ok",
      message: `User = ${id} is updated`,
      user: cust,
    });
  } catch (err) {
    // จัดการข้อผิดพลาด
    if (err.code === "P2002") {
      res.status(400).json({
        status: "error",
        message: "Email already exists",
      });
    } else if (err.code === "P2025") {
      // แสดงข้อผิดพลาดเมื่อไม่พบลูกค้า
      res.status(404).json({
        status: "error",
        message: `User = ${id} not found`,
        error: err.message,
      });
    } else {
      // แสดงข้อผิดพลาดในการอัปเดตลูกค้า
      console.log("Update User error", err);
      res.status(500).json({
        status: "error",
        error: "Failed to update User",
      });
    }
  }
};

module.exports = {
    createUser,
    getUsers,
    deleteUser,
    getUserByID,
    updateUser
};
