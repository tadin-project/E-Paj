import React, { useEffect, useState } from "react";
import $, { data } from "jquery";
import "datatables.net-bs5";
import "datatables.net-buttons-bs5";
import "datatables.net-fixedcolumns-bs5";
import "datatables.net-fixedheader-bs5";
import "datatables.net-responsive-bs5";
import "datatables.net-searchbuilder-bs5";
import "datatables.net-searchpanes-bs5";
import Swal from "sweetalert2";

import { AdminT } from "../templates/templates";
import axios from "../api/axios";
import { AppApi } from "../constants/constants";
import { nl2br } from "../helpers/helpers";

const GroupPage = () => {
  const titlePage = "Master Grup";
  const tmpFormData = {
    act: "add",
    id: 0,
    kode: "",
    nama: "",
    status: "true",
  };

  const [formData, setFormData] = useState(tmpFormData);
  const [listData, setListData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isGetData, setIsGetData] = useState(false);

  const fnSimpanData = async () => {
    try {
      let response;
      if (formData.act == "add") {
        response = await axios.post(AppApi.GROUPS, JSON.stringify(formData), {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
      } else {
        response = await axios.patch(
          AppApi.GROUPS + "/" + formData.id,
          JSON.stringify(formData),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
      }

      if (response.status == 201 || response.status == 200) {
        Swal.fire({
          title: "Success",
          text: "Data berhasil disimpan!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        fnShowForm(false);
      } else {
        Swal.fire({
          title: "Error",
          text: "Data gagal disimpan! Silahkan hubungi Admin",
          icon: "error",
        });
      }
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode == 400) {
        const { message } = error.response.data;
        Swal.fire("Error", nl2br(message), "error");
      } else {
        let msg = "";
        error.response.data.errors.forEach(function (i) {
          msg += i.message;
        });
        Swal.fire("Error", nl2br(msg), "error");
      }
    }
  };

  const fnResetForm = () => {
    setFormData(() => {
      return tmpFormData;
    });
  };

  const fnShowForm = (isShow = true) => {
    if (!isShow) {
      fnResetForm();
      setIsGetData(() => true);
    }

    setShowForm(() => {
      return isShow;
    });
  };

  const fnChangeFormData = (e) => {
    setFormData((d) => {
      return { ...d, [e.target.name]: e.target.value };
    });
  };

  const fnGetData = async () => {
    try {
      const response = await axios.get(AppApi.GROUPS, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log(response);
      console.log(response.data);
      if (response.data.payload.length > 0) {
        let dataGrup = [];
        response.data.payload.forEach((i) => {
          dataGrup.push({
            id: i.id,
            kode: i.kode,
            nama: i.nama,
            status: i.status,
          });
        });
        console.log(dataGrup);
        setListData(() => dataGrup);
      } else {
        setListData(() => []);
      }
      setIsGetData(() => false);
    } catch (err) {
      console.log(err);
      setIsGetData(() => false);
    }
  };

  const fnHapusData = async (id) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data yang dihapus tidak bisa dikembalikan lagi",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Iya",
      cancelButtonText: "Tidak",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(AppApi.GROUPS + "/" + id, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          });

          if (response.status == 200) {
            Swal.fire({
              title: "Success",
              text: "Data berhasil dihapus!",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
            fnShowForm(false);
          } else {
            Swal.fire({
              title: "Error",
              text: "Data gagal dihapus! Silahkan hubungi Admin",
              icon: "error",
            });
          }
        } catch (error) {
          const statusCode = error.response.status;
          if (statusCode == 400) {
            const { message } = error.response.data;
            Swal.fire("Error", nl2br(message), "error");
          } else {
            let msg = "";
            error.response.data.errors.forEach(function (i) {
              msg += i.message;
            });
            Swal.fire("Error", nl2br(msg), "error");
          }
        }
      } else {
        setIsGetData(true);
      }
    });
  };

  const fnEditData = (d) => {
    setFormData((t) => {
      console.log(t);
      t.act = "edit";
      t.id = d.id;
      t.kode = d.kode;
      t.nama = d.nama;
      t.status = d.status ? "true" : "false";
      return t;
    });

    fnShowForm();
  };

  useEffect(() => {
    setIsGetData(() => true);
  }, []);

  useEffect(() => {
    if (isGetData) {
      console.log("ambil data component did update");
      fnGetData();
    }
  }, [isGetData]);

  return (
    <AdminT title={titlePage}>
      <h1 className="mt-4" id="titlePage">
        {titlePage}
      </h1>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item active">{titlePage}</li>
      </ol>
      <div
        className="card mb-4"
        style={{ display: showForm ? "block" : "none" }}
      >
        <div className="card-header">
          <div className="row">
            <div className="col-7 col-md-8">
              <i className="fa fa-user"></i> Form {titlePage}
            </div>
            <div className="col-5 col-md-4 text-end">
              <button
                className="btn btn-sm btn-danger"
                onClick={() => fnShowForm(false)}
              >
                <i className="fa fa-times"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="card-body">
          <form id="formVendor" onSubmit={fnSimpanData}>
            <input type="hidden" id="act" name="act" value={formData.act} />
            <input type="hidden" id="id" name="id" value={formData.id} />
            <div className="form-group row mb-3">
              <label className="col-sm-3 col-md-2 col-form-label">
                Kode Grup
              </label>
              <div className="col-sm-9 col-md-5">
                <input
                  type="text"
                  className="form-control"
                  id="kode"
                  name="kode"
                  onChange={fnChangeFormData}
                  value={formData.kode}
                />
              </div>
            </div>
            <div className="form-group row mb-3">
              <label className="col-sm-3 col-md-2 col-form-label">
                Nama Grup
              </label>
              <div className="col-sm-9 col-md-5">
                <input
                  type="text"
                  className="form-control"
                  id="nama"
                  name="nama"
                  onChange={fnChangeFormData}
                  value={formData.nama}
                />
              </div>
            </div>
            <div className="form-group row mb-3">
              <label className="col-sm-3 col-md-2 col-form-label">Status</label>
              <div className="col-sm-3 col-md-2">
                <select
                  className="form-control"
                  id="status"
                  name="status"
                  onChange={fnChangeFormData}
                  value={formData.status}
                >
                  <option value={"true"}>Aktif</option>
                  <option value={"false"}>Tidak Aktif</option>
                </select>
              </div>
            </div>
          </form>
        </div>
        <div className="card-footer">
          <div className="row text-center">
            <div className="col-sm-12">
              <button
                className="btn btn-sm btn-secondary"
                onClick={() => fnShowForm(false)}
              >
                Batal
              </button>
              &nbsp;
              <button
                className="btn btn-sm btn-primary"
                id="btnSimpan"
                onClick={fnSimpanData}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="card mb-4"
        style={{ display: !showForm ? "block" : "none" }}
      >
        <div className="card-header">
          <div className="row">
            <div className="col-7 col-md-8">
              <i className="fa fa-user"></i> Data {titlePage}
            </div>
            <div className="col-5 col-md-4 text-end">
              <button
                className="btn btn-sm btn-primary"
                onClick={() => fnShowForm()}
              >
                <i className="fa fa-plus"></i> Tambah
              </button>
            </div>
          </div>
        </div>
        <div className="card-body">
          <table
            className="table table-sm table-striped table-bordered table-hover table-responsive"
            id="tableVendor"
          >
            <thead>
              <tr>
                <th className="text-center">No</th>
                <th className="text-center">Kode Grup</th>
                <th className="text-center">Nama Grup</th>
                <th className="text-center">Status</th>
                <th className="text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {listData.length > 0 ? (
                listData.map((i, index) => (
                  <tr key={i.id}>
                    <td className="text-center">{index + 1}</td>
                    <td className="text-center">{i.kode}</td>
                    <td className="text-center">{i.nama}</td>
                    <td className="text-center">
                      {i.status ? (
                        <span className="badge bg-success">Aktif</span>
                      ) : (
                        <span className="badge bg-danger">Tidak Aktif</span>
                      )}
                    </td>
                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-success mx-1"
                        onClick={() => fnEditData(i)}
                      >
                        <i className="fa fa-pencil"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-danger mx-1"
                        onClick={() => fnHapusData(i.id)}
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center">
                    Data Tidak Ada
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminT>
  );
};

export default GroupPage;
