import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  ratesList: [],
  addedRates: [],
  totalPrice: 0,
  status: null,
  error: null,
  discount: false,
  discountAmount: 0,
};

export const fetchRates = createAsyncThunk(
  "rates/fetchRates",
  async function (_, { rejectWithValue }) {
    try {
      const response = axios.get(`http://localhost:3008/rates`);

      if (response.ok) {
        throw new Error("Server Error!");
      }

      const data = await response;
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const ratesSlice = createSlice({
  name: "rates",
  initialState,
  reducers: {
    addRates: (state, { payload }) => {
      /*const existingCategoryId = state.addedRates?.map((rate) => {
        if (rate.category_name === payload.category_name) {
          return rate.id;
        }
        return -1;
      }); */
      const existingCategoryId = state.addedRates
        ?.filter((rate) => rate.category_name === payload.category_name)
        .map((rate) => rate.id);

      const exist = state.addedRates.some(
        (rate) =>
          rate.category_name === payload.category_name &&
          rate.category_name !== "social" &&
          rate.category_name !== "messenger"
      );

      if (exist) {
        //state.addedRates.splice(existingCategoryId, 1, payload);
        //if (exeptionForSocials) state.addedRates.push(payload);

        state.addedRates[
          state.addedRates.findIndex(
            (el) =>
              el.category_name === payload.category_name || el.id === payload.id
          )
        ] = payload;
      }

      if (!exist) {
        state.addedRates.push(payload);
      }
    },
    updateAddedRates(state, { payload }) {
      state.addedRates[
        state.addedRates.findIndex((el) => el.id === payload.id)
      ] = payload;
    },
    removeSelectedCheckbox(state, { payload }) {
      state.addedRates = state.addedRates.filter((rate) => rate.id !== payload);
    },
    calculateTotalPrice: (state) => {
      const discount = state.addedRates?.some(
        (rate) => rate.category_name === "internet"
      );

      state.discount = discount;

      if (state.addedRates.length === 0) {
        state.totalPrice = 0;
      }
      if (state.addedRates.length === 1) {
        state.totalPrice = state.addedRates[0]?.price;
      }

      if (state.addedRates.length >= 2) {
        let sum = state.addedRates
          ?.map((item) => item?.price)
          .reduce((acc, curr) => acc + curr);

        let discAmount;

        if (discount) {
          const discAmountCheck = state.addedRates
            ?.filter((rate) => rate.category_name === "social")
            ?.map((rate) => rate?.price);

          discAmount =
            discAmountCheck.length >= 2
              ? discAmountCheck?.reduce((acc, curr) => acc + curr, 0)
              : discAmountCheck[0];

          const newSumWithDiscount = sum - discAmount;
          state.discountAmount = discAmount;
          state.totalPrice = newSumWithDiscount;
        }
        state.totalPrice = sum;
      }
    },
  },
  extraReducers: {
    [fetchRates.pending]: (state, action) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchRates.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.ratesList = action.payload;
    },
    [fetchRates.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  },
});

export const { addRates, calculateTotalPrice, removeSelectedCheckbox } =
  ratesSlice.actions;

export default ratesSlice.reducer;
