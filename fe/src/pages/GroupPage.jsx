import React, { useEffect } from "react";
import "jquery/dist/jquery";
import "datatables.net-bs5";
import "datatables.net-buttons-bs5";
import "datatables.net-fixedcolumns-bs5";
import "datatables.net-fixedheader-bs5";
import "datatables.net-responsive-bs5";
import "datatables.net-searchbuilder-bs5";
import "datatables.net-searchpanes-bs5";
import $ from "jquery/dist/jquery";

import { AdminT } from "../templates/templates";

const GroupPage = () => {
  const titlePage = "Master Group";

  return (
    <AdminT title={titlePage}>
      <h1 className="mt-4" id="titlePage">
        Master Group
      </h1>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item active">Master Group</li>
      </ol>
      <div className="card mb-4">
        <div className="card-header">
          <i className="fa fa-user"></i> Form Group
        </div>
        <div className="card-body">
          <form id="formVendor">
            <div className="form-group row">
              <label className="control-label col-sm-3">Nama Grup</label>
              <div className="col-sm-6">
                <input
                  type="text"
                  className="form-control"
                  id="user_nama"
                  name="user_nama"
                />
              </div>
            </div>
          </form>
        </div>
        <div className="card-footer">
          <div className="row text-center">
            <div className="col-sm-12">
              <button className="btn btn-secondary">Batal</button>
              &nbsp;
              <button className="btn btn-primary" id="btnSimpan">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="card mb-4">
        <div className="card-header">
          <i className="fa fa-user"></i> Data Grup
        </div>
        <div className="card-body">
          <table
            className="table table-striped table-bordered table-hover"
            id="tableVendor"
          >
            <thead>
              <tr>
                <th className="text-center">No</th>
                <th className="text-center">Username</th>
                <th className="text-center">Hak Akses</th>
                <th className="text-center">User Status</th>
                <th className="text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center">No</td>
                <td className="text-center">User Nama</td>
                <td className="text-center">Hak Akses</td>
                <td className="text-center">User Status</td>
                <td className="text-center">Aksi</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </AdminT>
  );
};

export default GroupPage;
