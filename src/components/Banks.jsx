import React from "react";
import BanksTable from "./tables/BanksTable";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { SET_BANKS } from "./../actions/bankActions";
import { getAllBanks } from "../apiCalls/banks";

const Banks = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getBanksInfo = async () => {
      const banksInfo = await getAllBanks();
      dispatch({ type: SET_BANKS, payload: banksInfo });
    };
    getBanksInfo();
  }, []);
  return (
    <div>
      <BanksTable />
    </div>
  );
};

export default Banks;
