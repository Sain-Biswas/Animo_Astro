import axios from "axios";
import { ANIME } from "../resources";

const zoro = new ANIME.Zoro();

export interface AnimeDataResponse {
  title: string;
  banner: string | undefined;
}

export default async function fetchAnimeData(animeID: string) {
  try {
    const result = await zoro.fetchAnimeInfo(animeID);
    const malData = await axios
      .get(`https://api.jikan.moe/v4/anime/${result.malID}/full`)
      .then((response) => response.data.data);

    const response: AnimeDataResponse = {
      title: malData.title_english,
      banner: result.image,
    };

    return response;
  } catch (error: any) {
    return undefined;
  }
}
