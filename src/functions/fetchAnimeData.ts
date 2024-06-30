import axios from "axios";
import { ANIME } from "../resources";
import type { HomeComponentInterface } from "./homeComponentFetchers";

const zoro = new ANIME.Zoro();

export interface AnimeDataResponse {
  id: string; //
  titleEnglish: string; //
  title: string; //
  banner: string | undefined; //
  score: number; //
  type: string; //
  source: string; //
  status: string; //
  release: string;
  year: number; //
  season: string; //
  description: string | undefined; //
  episodes: AnimeEpisodes[] | undefined;
  alsoSee: HomeComponentInterface[];
  recommendation: HomeComponentInterface[] | undefined;
  charactes: AnimeCharacter[];
  genres: string[];
}

export interface AnimeCharacter {
  name: string;
  role: string;
  image: string;
}

export interface AnimeEpisodes {
  id: string;
  number: number;
  title: string | undefined;
  isFiller: boolean | undefined;
}

export default async function fetchAnimeData(animeID: string) {
  try {
    const result = await zoro.fetchAnimeInfo(animeID);
    const malData = await axios
      .get(`https://api.jikan.moe/v4/anime/${result.malID}/full`)
      .then((response) => response.data.data);

    const malCharacters = await axios
      .get(`https://api.jikan.moe/v4/anime/${result.malID}/characters`)
      .then((response) => response.data.data);

    const charactes: AnimeCharacter[] = malCharacters.map((character: any) => ({
      name: character.character.name,
      role: character.role,
      image:
        character.character.images.webp.image_url ||
        character.character.images.jpg.image_url,
    }));

    const episodes: AnimeEpisodes[] | undefined = result.episodes?.map(
      (episode) => ({
        id: episode.id,
        number: episode.number,
        title: episode.title,
        isFiller: episode.isFiller,
      })
    );

    const alsoSee: HomeComponentInterface[] = result.relatedAnime.map(
      (anime: any) => ({
        id: anime.id,
        title: anime.title,
        image: anime.image,
        type: anime.type,
        episodes: anime.sub,
      })
    );

    const recommendation: HomeComponentInterface[] | undefined =
      result.recommendations?.map((anime: any) => ({
        id: anime.id,
        title: anime.title,
        image: anime.image,
        type: anime.type,
        episodes: anime.sub,
      }));

    let genres: string[] = [];
    malData.genres.map((genre: any) => {
      genres.push(genre.name);
    });
    malData.explicit_genres.map((genre: any) => {
      genres.push(genre.name);
    });
    malData.themes.map((genre: any) => {
      genres.push(genre.name);
    });
    malData.demographics.map((genre: any) => {
      genres.push(genre.name);
    });

    const response: AnimeDataResponse = {
      id: result.id,
      titleEnglish: malData.title_english,
      title: malData.title,
      banner: result.image,
      score: malData.score,
      type: malData.type,
      source: malData.source,
      status: malData.status,
      release: malData.aired.string,
      year: malData.year,
      season: malData.season,
      description: result.description,
      episodes,
      alsoSee,
      recommendation,
      charactes,
      genres,
    };

    return response;
  } catch (error: any) {
    console.log(error);
    return undefined;
  }
}
