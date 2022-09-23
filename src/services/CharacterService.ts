import apiClient from "./axios";

export default {
  getCharacters(page: number) {
    return apiClient.get("/character?page=" + page);
  },
  getCharactersByIds(ids: string) {
    return apiClient.get("/character/" + ids);
  },
  getCharacter(id: number) {
    return apiClient.get("/character/" + id);
  },
  filterCharacters(page: number, query = "") {
    return apiClient.get("/character?page=" + page + query);
  },
};
