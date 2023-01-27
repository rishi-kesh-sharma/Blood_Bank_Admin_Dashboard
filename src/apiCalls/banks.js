import axios from "axios";
import { BASE_URL } from "../constants/constants";
export const getAllBanks = async (keyword, page, rowsPerPage) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/bank/all?keyword=${keyword}&page=${page}`,
      {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
          "rows-per-page": rowsPerPage,
        },
      }
    );
    return response;
  } catch (err) {
    return err.response;
  }
};
export const registerBank = async (data) => {
  try {
    try {
      const response = await axios.post(
        `${BASE_URL}/bank/admin/register`,
        data,
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );

      return response;
    } catch (err) {
      return err.response;
    }
  } catch (err) {
    return err.response;
  }
};
export const updateBank = async (bankId, data) => {
  try {
    const response = await axios.put(`${BASE_URL}/bank/admin/${bankId}`, data, {
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
      },
    });
    return response;
  } catch (err) {
    return err.response;
  }
};
export const deleteBank = async (bankId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/bank/admin/${bankId}`, {
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
      },
    });
    return response;
  } catch (err) {
    return err.response;
  }
};
