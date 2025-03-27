import readline from "readline";
import loadEnvVariables from "./utils/loadEnv.js";
import fetchYoutubeAPI from "./utils/fetchYoutube.js";

const input = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const loadEnv = () => {
  const env = loadEnvVariables();
  if (!env) {
    console.error("Environment variables not loaded!");
    process.exit(1);
  }
  return env;
};

const getUserInput = () => {
  return new Promise((resolve) => {
    input.question("Please Enter the search keyword: ", (searchQuery) => {
      input.close();
      resolve(searchQuery);
    });
  });
};

const main = async () => {
  const env = loadEnv();

  try {
    const searchQuery = await getUserInput();
    if (!searchQuery.trim()) {
      console.error("Search query cannot be empty!");
      return;
    }

    console.log(`Searching for: ${searchQuery}`);
    await fetchYoutubeAPI(searchQuery, env);
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

main();
