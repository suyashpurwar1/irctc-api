const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const registerUser = async (req, res) => {
  const { username, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await prisma.user.findUnique({
    where: { username },
  });

  //this check if username already exists
  if (existingUser) {
    return res
      .status(400)
      .json({ error: "Username already exists. Please choose another one." });
  }

  //this check mannually that role is either user or admin
  if(role!="user" && role!="admin"){
    return res
      .status(400)
      .json({ error: "Invalid role. Allowed roles: 'user' or 'admin'." });
  }
  const user = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
      role,
    },
  });
  res.json(user);
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );
  res.json({ token });
};

module.exports = { registerUser, loginUser };
