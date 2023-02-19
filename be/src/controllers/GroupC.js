const asyncHandler = require("express-async-handler");
const { Op } = require("sequelize");

const { Group } = require("../models/models");

const getAllGroup = asyncHandler(async (req, res) => {
  try {
    const data = await Group.findAll({
      attributes: [
        ["group_id", "id"],
        ["group_kode", "kode"],
        ["group_nama", "nama"],
        ["group_status", "status"],
      ],
    });
    // r = [];
    // if (data.length > 0) {
    //   data.forEach((e) => {
    //     r.push({
    //       id: e.group_id,
    //       kode: e.group_kode,
    //       nama: e.group_nama,
    //       status: e.group_status,
    //     });
    //   });
    // }
    res.json({ payload: data });
  } catch (error) {
    res.status(500).json(error);
  }
});

const createGroup = asyncHandler(async (req, res) => {
  try {
    const { nama, kode, status } = req.body;

    let message = "";
    if (!nama || !kode || (!status && status != 0)) {
      if (!nama) {
        message += "Nama grup tidak boleh kosong!\n";
      }

      if (!kode) {
        message += "Kode grup tidak boleh kosong!\n";
      }

      if (!status) {
        message += "Status grup tidak boleh kosong!\n";
      }
    }

    const cekKodeGrup = await Group.findAll({
      where: {
        group_kode: kode,
      },
    });

    if (cekKodeGrup.length > 0) {
      message += "Kode grup harus unik!";
    }

    if (message != "") {
      res.status(400).json({ message: message });
      return;
    }

    const data = await Group.create({
      group_nama: nama,
      group_kode: kode,
      group_status: status == "true" ? true : false,
    });

    res.status(201).json({
      payload: {
        id: data.group_id,
        kode: data.group_kode,
        nama: data.group_nama,
        status: data.group_status,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      },
    });
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
    const oldGroup = await Group.findOne({ where: { group_id } });

    if (!oldGroup) {
      res.status(400).json({
        message: "Grup tidak ditemukan!",
      });
      return;
    }

    const { nama, kode, status } = req.body;

    let message = "";
    if (nama && nama.trim() == "") {
      message += "Nama grup tidak boleh kosong!\n";
    }

    if (kode && kode.trim() == "") {
      message += "Kode grup tidak boleh kosong!\n";
    }

    if (status && status.trim() == "") {
      message += "Status grup tidak boleh kosong!\n";
    }

    const cekKode = await Group.findAll({
      where: {
        [Op.and]: [
          { group_kode: kode },
          {
            group_kode: {
              [Op.ne]: oldGroup.group_kode,
            },
          },
        ],
      },
    });

    if (cekKode.length > 0) {
      message += "Kode grup harus unik!";
    }

    if (message != "") {
      res.status(400).json({ message: message });
      return;
    }

    let newGroup = {
      group_nama: oldGroup.group_nama,
      group_kode: oldGroup.group_kode,
      group_status: oldGroup.group_status,
    };

    if (nama) {
      newGroup.group_nama = nama;
    }

    if (kode) {
      newGroup.group_kode = kode;
    }

    if (status) {
      newGroup.group_status = status == "true" ? true : false;
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
