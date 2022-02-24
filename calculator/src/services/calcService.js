import axios from "axios";

export function getList() {
  axios.get(`http://localhost:3006/rates`).then((res) => res.data);
}

export function selectItem(data) {
  axios.put(`http://localhost:3006/rates`, { data });
}

export function calcTotalPrice() {}
