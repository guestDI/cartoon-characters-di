import apiClient from "./axios";

export default {
  getEpisode(id: string) {
    return apiClient.get("/episode/" + id);
  },
};
