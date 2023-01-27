import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteBank, getAllBanks, updateBank } from "../../apiCalls/banks";
import { SET_BANKS } from "../../actions/bankActions";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal";
import KeepMountedModal from "../Modal";
import BankUpdateForm from "../forms/BankUpdateForm";
import PaginatedTable from "./PaginatedTable";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import Swal from "sweetalert2";
import { IoMdAddCircleOutline } from "react-icons/io";
import Loading from "./../Loading";
const columns = [
  { id: "sn", label: "SN", minWidth: 60 },
  { id: "avatar", label: "Avatar", minWidth: 80 },
  { id: "name", label: "Name", minWidth: 100 },
  { id: "address", label: "Address", minWidth: 100 },
  { id: "email", label: "Email", minWidth: 100 },
  { id: "contact", label: "contact", minWidth: 100 },
  { id: "category", label: "Category", minWidth: 100 },
  { id: "website", label: "Website", minWidth: 100 },
  { id: "socials", label: "Socials", minWidth: 100 },
  { id: "actions", label: "Actions", minWidth: 100 },
];

function createData(
  sn,
  avatar,
  name,
  address,
  email,
  contact,
  category,
  website,
  socials,
  actions
) {
  return {
    sn,
    avatar,
    name,
    address,
    email,
    contact,
    category,
    website,
    socials,
    actions,
  };
}
export default function BanksTable({
  openUpdateModal,
  setOpenUpdateModal,
  openAddModal,
  setOpenAddModal,
  setEditingUserId,
}) {
  const [loading, setLoading] = useState(false);
  const rowsPerPageOptions = [5, 10, 15];
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const banksInfo = useSelector((state) => state?.bankReducer);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  // rows per page options

  // use effect that run when page and search query is changed
  React.useEffect(() => {
    const getBanksInfo = async () => {
      setLoading(true);
      const response = await getAllBanks(searchQuery, page + 1, rowsPerPage);
      setLoading(false);
      dispatch({ type: SET_BANKS, payload: response.data });
    };
    getBanksInfo();
  }, [page, searchQuery, rowsPerPage]);

  // handle change rows per page
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  };

  // handlle change page
  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  // handle edit
  const handleEdit = async (_id) => {
    setOpenUpdateModal(true);
    setEditingUserId(_id);
  };

  // handle delete
  const handleDelete = async (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await deleteBank(_id);
        if (response.status != 200) {
          return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }

        const banks = banksInfo.banks.filter((bank) => bank._id != _id);
        const allBanksInfo = {
          banks,
          skip: banksInfo.skip,
          prev: banksInfo.prev,
          next: banksInfo.next,
          count: banksInfo.count,
        };
        dispatch({ type: SET_BANKS, payload: allBanksInfo });

        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const rows = banksInfo?.banks?.map((bank, index) => {
    const {
      address,
      bankname,
      category,
      email,
      contact,
      socialMediaHandles,
      website,
      _id,
      profilePic,
    } = bank;
    return createData(
      page * rowsPerPage + index + 1,
      profilePic,
      bankname,
      address,
      email,
      contact,
      category,
      website,
      [
        {
          name: "facebook",
          link: (
            <a
              key={socialMediaHandles?.facebook || "facebook"}
              href={socialMediaHandles?.facebook}
              style={{ margin: "0.1rem", textDecoration: "none" }}
            >
              <FacebookIcon />
            </a>
          ),
        },
        {
          name: "twitter",
          link: (
            <a
              key={socialMediaHandles?.twitter || "twitter"}
              href={socialMediaHandles?.facebook}
              style={{ margin: "0.1rem", textDecoration: "none" }}
            >
              <TwitterIcon />
            </a>
          ),
        },
        {
          name: "instagram",
          link: (
            <a
              key={socialMediaHandles?.instagram || "instagram"}
              href={socialMediaHandles?.facebook}
              style={{ margin: "0.1rem", textDecoration: "none" }}
            >
              <InstagramIcon />
            </a>
          ),
        },
        {
          name: "linkedin",
          link: (
            <a
              key={socialMediaHandles?.linkedin || "linkedin"}
              href={socialMediaHandles?.facebook}
              style={{ margin: "0.1rem", textDecoration: "none" }}
            >
              <LinkedInIcon />
            </a>
          ),
        },
      ],
      [
        {
          name: "edit",
          link: (
            <FaEdit
              className="mx-2 text-lg text-blue-900 cursor-pointer"
              onClick={() => {
                handleEdit(_id);
              }}
            />
          ),
        },
        {
          name: "delete",
          link: (
            <FaTrash
              className="mx-2 text-lg text-red-500 cursor-pointer"
              onClick={() => {
                handleDelete(_id);
              }}
            />
          ),
        },
      ]
    );
  });

  return (
    <Paper
      sx={{
        maxWidth: "3000px",
        overflow: "hidden",
        overflow: "hidden",
      }}
    >
      <PaginatedTable
        openAddModal={openAddModal}
        setOpenAddModal={setOpenAddModal}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        rows={rows}
        columns={columns}
        rowsPerPage={rowsPerPage}
        page={page}
        setPage={setPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        rowsPerPageOptions={rowsPerPageOptions}
        count={banksInfo?.count || rowsPerPage}
      />
    </Paper>
  );
}
