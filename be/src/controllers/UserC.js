const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");

const { User, Group } = require("../models/models");

const getAllUser = asyncHandler(async (req, res) => {
  try {
    const data = await User.findAll();
    res.json({ payload: data });
  } catch (error) {
    res.status(500).json(error);
  }
});

const createUser = asyncHandler(async (req, res) => {
  try {
    const { user_nama, user_email, user_pass, user_status, group_id } =
      req.body;

    let message = "";
    if (
      !user_nama ||
      !user_email ||
      !user_pass ||
      (!user_status && user_status != 0) ||
      !group_id
    ) {
      if (!user_nama) {
        message += "Username tidak boleh kosong!\n";
      }

      if (!user_email) {
        message += "Email tidak boleh kosong!\n";
      }

      if (!user_pass) {
        message += "Password tidak boleh kosong!\n";
      }

      if (!user_status) {
        message += "Status tidak boleh kosong!\n";
      }

      if (!group_id) {
        message += "Hak Akses tidak boleh kosong!\n";
      }
    }
    if (!(await Group.findOne({ where: { group_id } }))) {
      message +=
        "Hak Akses tidak dikenal. Silahkan masukkan hak akses yang dikenali!\n";
    }

    if (message != "") {
      res.status(400).json({ message: message });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const newPass = await bcrypt.hash(user_pass, salt);

    const data = await User.create({
      user_nama,
      user_email,
      user_pass: newPass,
      user_status,
      group_id,
    });

    res.status(201).json({
      payload: {
        user_id: data.user_id,
        user_nama: data.user_nama,
        user_email: data.user_email,
        user_status: data.user_status,
        group_id: data.group_id,
        updatedAt: data.updatedAt,
        createdAt: data.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

const getUserById = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ where: { user_id: req.params.userId } });
    if (user === null) {
      res.status(400).json({ message: "User tidak ditemukan!" });
    } else {
      res.status(200).json({
        payload: {
          user_id: user.user_id,
          user_nama: user.user_nama,
          user_email: user.user_email,
          group_id: user.group_id,
        },
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

const updateUser = asyncHandler(async (req, res) => {
  try {
    const user_id = req.params.userId;
    let dataUser = await User.findOne({ where: { user_id } });

    if (!dataUser) {
      res.status(400).json({
        message: "User tidak ditemukan!",
      });
      return;
    }

    const {
      user_nama,
      user_email,
      user_pass,
      is_ganti_pass,
      user_status,
      group_id,
    } = req.body;

    let message = "";
    if (user_nama && user_nama.trim() == "") {
      message += "Username tidak boleh kosong!\n";
    }

    if (user_email && user_email.trim() == "") {
      message += "Email tidak boleh kosong!\n";
    }

    if (user_status && (user_status != true || user_status != false)) {
      message += "Status tidak boleh kosong!\n";
    }

    if (group_id) {
      if (group_id <= 0) {
        message += "Hak Akses tidak boleh kosong!\n";
      }
    }

    if (message != "") {
      res.status(400).json({ message: message });
      return;
    }

    let newUser = {};

    if (user_nama) {
      newUser.user_nama = user_nama;
    }

    if (user_email) {
      newUser.user_email = user_email;
    }

    if (user_status || user_status == false) {
      newUser.user_status = user_status;
    }

    if (group_id) {
      newUser.group_id = group_id;
    }

    if (is_ganti_pass == true) {
      if (!user_pass || user_pass.trim() == "") {
        res.status(400).json({
          message: "Password tidak boleh kosong!",
        });
        return;
      }

      const salt = await bcrypt.genSalt(10);
      const newPass = await bcrypt.hash(user_pass, salt);
      newUser.user_pass = newPass;
    }

    const data = await User.update(newUser, {
      where: {
        user_id: user_id,
      },
    });

    res.json({ payload: data });
  } catch (error) {
    res.status(500).json(error);
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  try {
    const user_id = req.params.userId;
    let dataUser = await User.findOne({ where: { user_id } });

    if (!dataUser) {
      res.status(400).json({
        message: "User tidak ditemukan!",
      });
      return;
    }

    let data = await User.destroy({
      where: {
        user_id,
      },
    });

    res.json({ payload: data });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = {
  createUser,
  deleteUser,
  getAllUser,
  getUserById,
  updateUser,
};
