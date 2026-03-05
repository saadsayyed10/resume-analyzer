import * as usersService from "../services/users.service.js";

export const registerUserController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const data = { name, email, password };

    if (!data) {
      return res.status(404).json({ error: "All fields are required" });
    }

    if (password < 8) {
      return res
        .status(400)
        .json({ error: "Password should be more than 8 characters" });
    }

    const { token, user } = await usersService.registerUserService(
      name,
      email,
      password,
    );
    res.status(201).json({
      message: `New user - ${user.email} registered successfully`,
      token,
      user,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = { email, password };

    if (!data) {
      return res.status(404).json({ error: "All fields are required" });
    }

    if (password < 8) {
      return res
        .status(400)
        .json({ error: "Password should be more than 8 characters" });
    }

    const { token, user } = await usersService.loginUserService(
      email,
      password,
    );
    res.status(200).json({
      message: `User - ${user.email} logged-in successfully`,
      token,
      user,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const userProfileController = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ error: "Unauthorized: User token not provided" });
    }

    const user = await usersService.userProfileService(req.user.id);
    res.status(200).json({
      user,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
