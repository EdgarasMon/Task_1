import readline from "readline";
import loadEnvVariables from "./utils/loadEnv.js";
import fetchYoutubeAPI from "./utils/fetchYoutube.js";

const input = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const env = loadEnvVariables();

if (!env) {
  console.error("Environment variables not loaded!");
  process.exit(1);
}

input.question("Please Enter the search keyword: ", (searchQuery) => {
  input.close();
  fetchYoutubeAPI(searchQuery, env);
});
