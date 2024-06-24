import { ANIME, MediaFormat, type ITitle } from "../resources";

const zoro = new ANIME.Zoro();

export interface HomeComponentInterface {
  id: string;
  title: string | ITitle;
  image: string | undefined;
  type: MediaFormat | undefined;
  episodes: string;
}

export async function fetchTrending() {
  const { results } = await zoro.fetchTopAiring();
  const result = results.slice(0, 12);

  const response: HomeComponentInterface[] = result.map((item) => {
    return {
      id: item.id,
      title: item.title,
      image: item.image,
      type: item.type,
      episodes: item.sub,
    };
  });

  return response;
}

export async function fetchRecentlyUpdated() {
  const { results } = await zoro.fetchRecentlyUpdated();
  const result = results.slice(0, 12);

  const response: HomeComponentInterface[] = result.map((item) => {
    return {
      id: item.id,
      title: item.title,
      image: item.image,
      type: item.type,
      episodes: item.sub,
    };
  });

  return response;
}

export async function fetchMostFavorite() {
  const { results } = await zoro.fetchMostFavorite();
  const result = results.slice(0, 12);

  const response: HomeComponentInterface[] = result.map((item) => {
    return {
      id: item.id,
      title: item.title,
      image: item.image,
      type: item.type,
      episodes: item.sub,
    };
  });

  return response;
}

export async function fetchMostPopular() {
  const { results } = await zoro.fetchMostPopular();
  const result = results.slice(0, 12);

  const response: HomeComponentInterface[] = result.map((item) => {
    return {
      id: item.id,
      title: item.title,
      image: item.image,
      type: item.type,
      episodes: item.sub,
    };
  });

  return response;
}

export async function fetchLatestCompleted() {
  const { results } = await zoro.fetchLatestCompleted();
  const result = results.slice(0, 12);

  const response: HomeComponentInterface[] = result.map((item) => {
    return {
      id: item.id,
      title: item.title,
      image: item.image,
      type: item.type,
      episodes: item.sub,
    };
  });

  return response;
}
