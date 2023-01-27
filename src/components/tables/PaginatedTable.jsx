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
import { TablePagination } from "@mui/material";
import SearchBar from "./../SearchBar";
import { IoMdAddCircleOutline } from "react-icons/io";
import AddBankForm from "../forms/AddBankForm";

export default function PaginatedTable({
  openAddModal,
  setOpenAddModal,
  rows,
  columns,
  page,
  setPage,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  rowsPerPageOptions,
  count,
  searchQuery,
  setSearchQuery,
}) {
  const handleAddClick = () => {
    setOpenAddModal(true);
  };
  return (
    <Paper
      sx={{
        width: "80vw",
        maxWidth: "3000px",
        overflow: "hidden",
        marginTop: "3rem",
        marginLeft: "18vw",
        // padding: "0 2rem",
        overflow: "hidden",
      }}
    >
      <div className="flex items-end justify-end pr-[1rem] ">
        <IoMdAddCircleOutline
          onClick={handleAddClick}
          className="text-[3rem] bg-red-600 text-white p-[0.5rem] rounded-full cursor-pointer"
        />{" "}
      </div>
      <div className="flex items-end justify-end p-[0.7rem]">
        {" "}
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          currentPage={page}
          setCurrentPage={setPage}
        />
      </div>
      <TableContainer sx={{ maxHeight: 430, overflow: "auto" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows &&
              rows?.map((row, index) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={page * rowsPerPage + index + 1}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align="left">
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
      <></>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
