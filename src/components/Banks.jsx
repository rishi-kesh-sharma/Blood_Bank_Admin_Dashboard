import React, { useState } from "react";
import BanksTable from "./tables/BanksTable";
import { useSelector, useDispatch } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import { SET_BANKS } from "./../actions/bankActions";
import { getAllBanks } from "../apiCalls/banks";
import Pagination from "./Pagination";

const Banks = () => {
  // const [searchQuery, setSearchQuery] = useState("");
  const [searchQuery, currentPage, setCurrentPage] = useOutletContext();
  const dispatch = useDispatch();
  useEffect(() => {
    const getBanksInfo = async () => {
      const banksInfo = await getAllBanks(searchQuery, currentPage);
      console.log(banksInfo);
      dispatch({ type: SET_BANKS, payload: banksInfo });
    };
    getBanksInfo();
  }, [currentPage, searchQuery]);
  return (
    <div>
      <BanksTable currentPage={currentPage} />
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default Banks;
