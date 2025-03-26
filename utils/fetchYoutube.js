const sendDataToSlackChannel = require("./sendDataToSlackChannel");

const fetchYoutubeAPI = async (searchQuery, env) => {
  if (searchQuery.trim() !== "") {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
      searchQuery
    )}&type=video&key=${env.YOUTUBE_API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      sendDataToSlackChannel(data, env, searchQuery);
      console.log(
        `These are the keyword: ${searchQuery} search results from YouTube:`,
        data.items
          .map((item, index) => {
            return `${index + 1}. [${
              item.snippet.title
            }](https://www.youtube.com/watch?v=${item.id.videoId})`;
          })
          .join("\n")
      );
    } catch (error) {
      console.error("Error fetching YouTube data:", error);
    }
  } else {
    console.log("Please enter a valid search keyword.");
  }
};

module.exports = fetchYoutubeAPI;
