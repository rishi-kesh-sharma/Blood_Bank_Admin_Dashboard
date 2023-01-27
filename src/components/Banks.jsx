import React, { useState } from "react";
import BanksTable from "./tables/BanksTable";
import { useSelector, useDispatch } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import { SET_BANKS } from "./../actions/bankActions";
import { getAllBanks } from "../apiCalls/banks";
import Pagination from "./Pagination";
import KeepMountedModal from "./Modal";
import BankUpdateForm from "./forms/BankUpdateForm";
import { IoMdAddCircle } from "react-icons/io";
import AddBankForm from "./forms/AddBankForm";

const Banks = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);

  return (
    <div>
      <BanksTable
        openUpdateModal={openUpdateModal}
        setOpenAddModal={setOpenAddModal}
        openAddModal={openAddModal}
        setOpenUpdateModal={setOpenUpdateModal}
        setEditingUserId={setEditingUserId}
      />
      <>
        <KeepMountedModal open={openUpdateModal} setOpen={setOpenUpdateModal}>
          <BankUpdateForm
            editingUserId={editingUserId}
            setOpen={setOpenUpdateModal}
          />
        </KeepMountedModal>
      </>
      <>
        <KeepMountedModal open={openAddModal} setOpen={setOpenAddModal}>
          <AddBankForm setOpen={setOpenAddModal} />
        </KeepMountedModal>
      </>
    </div>
  );
};

export default Banks;
