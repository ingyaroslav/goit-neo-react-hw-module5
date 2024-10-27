import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
const authorization =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NDM4NzkxMTFmYWM5NWZjOWZkYzQxZTFiOTZkNTdiMSIsIm5iZiI6MTcyODMxNzQ1NC45NzI0NzUsInN1YiI6IjY3MDNjNGJlMTc0YTFkNTc3Mzc5NTY5NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hDvyx7SUmNBF7yLYeb7I8pw1ZIbvaUIAAV75XsHWEVM";

export const fetchMovies = async ({
  fetchType = "trending/movie/day",
  params = {},
} = {}) => {
  const defaultParams = {
    language: "en-US",
    include_adult: false,
  };

  const mergedParams = { ...defaultParams, ...params };

  const response = await axios.get(`/${fetchType}`, {
    params: mergedParams,
    headers: {
      Authorization: `Bearer ${authorization}`,
    },
  });

  return response.data;
};