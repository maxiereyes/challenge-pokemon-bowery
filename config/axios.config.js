import Axios from "axios";

export const pokeApi = Axios.create({
  baseURL: "https://pokeapi.co/api/v2",
  headers: {
    "Content-Type": "application/json",
  },
});

export const reqresApi = Axios.create({
  baseURL: "https://reqres.in/api",
  headers: {
    "Content-Type": "application/json",
  },
});
