import sendDataToSlackChannel from "./sendDataToSlackChannel.js";

const formatSearchResults = (data) => {
  return data.items
    .map((item, index) => {
      return `${index + 1}. [${
        item.snippet.title
      }](https://www.youtube.com/watch?v=${item.id.videoId})`;
    })
    .join("\n");
};

const fetchYoutubeAPI = async (searchQuery, env) => {
  if (searchQuery.trim() === "") {
    console.log("Please enter a valid search keyword.");
    return;
  }

  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
    searchQuery
  )}&type=video&key=${env.YOUTUBE_API_KEY}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `YouTube API request failed with status: ${response.status}`
      );
    }

    const data = await response.json();
    await sendDataToSlackChannel(data, env, searchQuery);
    const formattedResults = formatSearchResults(data);

    console.log(
      `These are the keyword: ${searchQuery} search results from YouTube:`
    );
    console.log(formattedResults);
  } catch (error) {
    console.error("Error fetching YouTube data:", error.message || error);
  }
};

export default fetchYoutubeAPI;
