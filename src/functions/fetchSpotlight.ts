import axios from "axios";
import { ANIME, MediaFormat, type ITitle } from "../resources";

const zoro = new ANIME.Zoro();

export interface SpotLightResponse {
  id: string;
  banner: string;
  title: string | ITitle;
  rank: number;
  type: MediaFormat | undefined;
  releaseDate: string | undefined;
  quality: string;
  description: string;
  episodes: number;
}

export default async function fetchSpotlight() {
  const { results } = await zoro.fetchSpotlight();

  const response: SpotLightResponse[] = results.map((result) => {
    let des: string = result.description;
    des = des.replaceAll("\n", "");
    des = des.replaceAll("\\", "");
    des = des.replaceAll("[Written by MAL Rewrite]", "");

    return {
      id: result.id,
      banner: result.banner,
      title: result.title,
      rank: result.rank,
      type: result.type,
      releaseDate: result.releaseDate,
      quality: result.quality,
      description: des,
      episodes: result.sub,
    };
  });

  return response;
}
