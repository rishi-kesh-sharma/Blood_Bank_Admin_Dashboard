import axios from "axios";
import { BASE_URL } from "../constants/constants";
export const getAllBanks = async (keyword, page) => {
  console.log(keyword, page);
  const response = await axios.get(
    `${BASE_URL}/bank/all?keyword=${keyword}&page=${page}`,
    {
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
      },
    }
  );
  return response.data;
};
export const updateBank = async (bankId, data) => {
  const response = await axios.put(`${BASE_URL}/bank/admin/${bankId}`, data, {
    headers: {
      "auth-token": localStorage.getItem("auth-token"),
    },
  });
  return response.data;
};
export const deleteBank = async (bankId) => {
  const response = await axios.delete(`${BASE_URL}/bank/admin/${bankId}`, {
    headers: {
      "auth-token": localStorage.getItem("auth-token"),
    },
  });
  return response.data;
};
