import apiClient from "./axios";

export default {
  getCharacters(page: number) {
    return apiClient.get("/character?page=" + page);
  },
  getCharacter(id: number) {
    return apiClient.get("/character/" + id);
  },
};
