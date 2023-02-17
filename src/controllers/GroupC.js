const asyncHandler = require("express-async-handler");

const { Group } = require("../models/models");

const getAllGroup = asyncHandler(async (req, res) => {
  try {
    const data = await Group.findAll();
    res.json({ payload: data });
  } catch (error) {
    res.status(500).json(error);
  }
});

const createGroup = asyncHandler(async (req, res) => {
  try {
    const { group_nama, group_kode, group_status } = req.body;

    if (!group_nama || !group_kode || (!group_status && group_status != 0)) {
      let message = "";
      if (!group_nama) {
        message += "Nama grup tidak boleh kosong!\n";
      }

      if (!group_kode) {
        message += "Kode grup tidak boleh kosong!\n";
      }

      if (!group_status) {
        message += "Status grup tidak boleh kosong!\n";
      }

      res.status(400).json({ message: message });
      return;
    }

    const data = await Group.create({
      group_nama,
      group_kode,
      group_status,
    });

    res.status(201).json({ payload: data });
  } catch (error) {
    res.status(500).json(error);
  }
});

const getGroupById = asyncHandler(async (req, res) => {
  try {
    const group = await Group.findOne({
      where: { group_id: req.params.groupId },
    });
    if (group === null) {
      res.status(400).json({ message: "Grup tidak ditemukan!" });
    } else {
      res.json({
        payload: {
          group_id: group.group_id,
          group_nama: group.group_nama,
          group_kode: group.group_kode,
          group_status: group.group_status,
        },
      });
    }
  } catch (error) {
    res.status(500).json(responseHandler({ status: false, message: error }));
  }
});

const updateGroup = asyncHandler(async (req, res) => {
  try {
    const group_id = req.params.groupId;
    let group = await Group.findOne({ where: { group_id } });

    if (!group) {
      res.status(400).json({
        message: "Grup tidak ditemukan!",
      });
      return;
    }

    const { group_nama, group_kode, group_status } = req.body;

    let message = "";
    if (group_nama && group_nama.trim() == "") {
      message += "Nama grup tidak boleh kosong!\n";
    }

    if (group_kode && group_kode.trim() == "") {
      message += "Kode grup tidak boleh kosong!\n";
    }

    if (group_status && group_status.trim() == "") {
      message += "Status grup tidak boleh kosong!\n";
    }

    if (message != "") {
      res.status(400).json({ message: message });
      return;
    }

    let newGroup = {
      group_nama: group.group_nama,
      group_kode: group.group_kode,
      group_status: group.group_status,
    };

    if (group_nama) {
      newGroup.group_nama = group_nama;
    }

    if (group_kode) {
      newGroup.group_kode = group_kode;
    }

    if (group_status || group_status == 0 || group_status == false) {
      newGroup.group_status = group_status;
    }

    const data = await Group.update(newGroup, {
      where: {
        group_id: group_id,
      },
    });

    res.json({ payload: data });
  } catch (error) {
    res.status(500).json(error);
  }
});

const deleteGroup = asyncHandler(async (req, res) => {
  try {
    const group_id = req.params.groupId;
    let dataGroup = await Group.findOne({ where: { group_id } });

    if (!dataGroup) {
      res.status(400).json({
        message: "Data grup tidak ditemukan!",
      });
      return;
    }

    let data = await Group.destroy({
      where: {
        group_id,
      },
    });

    res.json({ payload: data });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = {
  createGroup,
  deleteGroup,
  getAllGroup,
  getGroupById,
  updateGroup,
};
