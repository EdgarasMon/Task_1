const sendDataToSlackChannel = async (data, env, searchQuery) => {
  const {
    SLACK_WEBHOOK_URL: slackWebhookURL,
    SLACK_CHANNEL: slackChannel,
    SLACK_ACCESS_TOKEN: slackToken,
  } = env;

  if (slackWebhookURL && slackChannel) {
    const payload = {
      channel: slackChannel,
      text: `These are the keyword: ${searchQuery} search results from YouTube:`,
      attachments: [
        {
          text: data.items
            .map((item, index) => {
              return `${index + 1}. [${
                item.snippet.title
              }](https://www.youtube.com/watch?v=${item.id.videoId})`;
            })
            .join("\n"),
        },
      ],
    };

    try {
      const response = await fetch(slackWebhookURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${slackToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log("Message sent to Slack channel successfully.");
      } else {
        console.error("Error sending message to Slack channel.");
      }
    } catch (error) {
      console.error("Error sending message to Slack channel:", error);
    }
  } else {
    console.error("Please provide a valid Slack webhook URL and channel name.");
  }
};

module.exports = sendDataToSlackChannel;
