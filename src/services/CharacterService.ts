import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://rickandmortyapi.com/api/character",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  getCharacters(page: number) {
    return apiClient.get("?page=" + page);
  },
  getCharacter(id: number) {
    return apiClient.get("/" + id);
  },
};
