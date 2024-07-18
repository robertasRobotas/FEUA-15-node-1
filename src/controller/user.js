import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../model/user.js";

const SIGN_UP = async function (req, res) {
  try {
    if (!req.body.name || !req.body.email || !req.body.password) {
      return res.status(400).json({
        message: "you didn't provided necessary data",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const user = {
      name: req.body.name,
      email: req.body.email,
      password: hash,
    };

    const newUser = await new UserModel(user);

    await newUser.save();

    return res.status(200).json({
      user: newUser,
      message: "user was saved successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "server error" });
  }
};

const LOGIN = async function (req, res) {
  const user = await UserModel.findOne({ email: req.body.email });

  if (!user) {
    return res.status(401).json({ message: "Bad auth" });
  }

  const isPasswordMatch = bcrypt.compareSync(req.body.password, user.password);

  if (!isPasswordMatch) {
    return res.status(401).json({ message: "Bad auth" });
  }

  const token = jwt.sign(
    {
      email: user.email,
      userId: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "12H" }
  );

  return res
    .status(200)
    .json({ token: token, message: "login was successfull" });
};

export { SIGN_UP, LOGIN };
