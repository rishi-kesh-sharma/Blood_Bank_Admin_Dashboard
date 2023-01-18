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
import { interceptor } from "../../utils/utils";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useSelector, useDispatch } from "react-redux";
import { deleteBank, updateBank } from "../../apiCalls/banks";
import { SET_BANKS } from "../../actions/bankActions";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal";
import KeepMountedModal from "../Modal";
import BankUpdateForm from "../forms/BankUpdateForm";

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
  { id: "edit", label: "edit", minWidth: 50 },
  { id: "remove", label: "remove", minWidth: 50 },
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
  edit,
  remove
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
    edit,
    remove,
  };
}
export default function BanksTable({ currentPage }) {
  const [open, setOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const banksInfo = useSelector((state) => state?.bankReducer);

  const handleEdit = async (_id) => {
    setOpen(true);
    setEditingUserId(_id);
  };
  const handleDelete = async (_id) => {
    const response = await deleteBank(_id);

    const banks = banksInfo.banks.filter((bank) => bank._id != _id);
    const allBanksInfo = {
      banks,
      skip: banksInfo.skip,
      prev: banksInfo.prev,
      next: banksInfo.next,
    };
    dispatch({ type: SET_BANKS, payload: allBanksInfo });
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
    const { facebook, instagram, twitter, linkedin } = socialMediaHandles;
    return createData(
      (currentPage - 1) * banksInfo.banks.length + index + 1,
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
              key={facebook}
              href={facebook}
              style={{ margin: "0 0.4rem", textDecoration: "none" }}>
              <FacebookIcon />
            </a>
          ),
        },
        {
          name: "twitter",
          link: (
            <a
              key={twitter}
              href={twitter}
              style={{ margin: "0 0.4rem", textDecoration: "none" }}>
              <TwitterIcon />
            </a>
          ),
        },
        {
          name: "instagram",
          link: (
            <a
              key={instagram}
              href={instagram}
              style={{ margin: "0 0.4rem", textDecoration: "none" }}>
              <InstagramIcon />
            </a>
          ),
        },
        {
          name: "linkedin",
          link: (
            <a
              key={linkedin}
              href={linkedin}
              style={{ margin: "0 0.4rem", textDecoration: "none" }}>
              <LinkedInIcon />
            </a>
          ),
        },
      ],
      <button
        onClick={(e) => {
          handleEdit(_id);
        }}
        style={{
          background: "blue",
          color: "white",
          border: "none",
          padding: "0.2rem 0.5rem",
          cursor: "pointer",
          borderRadius: "0.4rem",
        }}>
        edit
      </button>,
      <button
        onClick={(e) => handleDelete(_id)}
        style={{
          background: "red",
          color: "white",
          border: "none",
          padding: "0.2rem 0.5rem",
          cursor: "pointer",
          borderRadius: "0.4rem",
        }}>
        remove
      </button>
    );
  });

  return (
    <Paper
      sx={{
        width: "80vw",
        maxWidth: "3000px",
        overflow: "hidden",
        marginTop: "2rem",
        marginLeft: "17vw",
        // padding: "0 2rem",
        overflow: "hidden",
      }}>
      <TableContainer sx={{ maxHeight: 450, overflow: "auto" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows &&
              rows?.map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          sx={{ padding: "6px" }}
                          key={column.id}
                          align={column.align}>
                          {typeof value == "object" && Array.isArray(value) ? (
                            <div style={{ display: "flex" }}>
                              {value.map((item) => item.link)}
                            </div>
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <div
        style={{
          margin: " 0.5rem 0 0.5rem 90% ",
          display: "flex",
          gap: "1.5rem",
        }}>
        <ArrowBackIosNewIcon
          sx={{ fontSize: "1.2rem", cursor: "pointer" }}
          onClick={handlePrevClick}
        />
        <ArrowForwardIosIcon
          sx={{ fontSize: "1.2rem", cursor: "pointer" }}
          onClick={handleNextClick}
        />
      </div> */}
      <>
        {/* <Button variant="primary" onClick={() => setModalShow(true)}></Button> */}
        <KeepMountedModal open={open} setOpen={setOpen}>
          <BankUpdateForm editingUserId={editingUserId} setOpen={setOpen} />
        </KeepMountedModal>
      </>
    </Paper>
    // <div>
    //   Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, culpa!
    //   Aperiam, esse perferendis facere quaerat sapiente, aut ipsam ratione iure
    //   fugiat aliquid veniam optio vitae, dolore accusamus similique fuga! Quos.
    // </div>
  );
}
