import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@procamshop.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Vardhu",
    email: "vardhu@procamshop.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Tony",
    email: "tony@procamshop.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
