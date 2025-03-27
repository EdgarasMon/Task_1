const sendDataToSlackChannel = async (data, env, searchQuery) => {
  const {
    SLACK_WEBHOOK_URL: slackWebhookURL,
    SLACK_CHANNEL: slackChannel,
    SLACK_ACCESS_TOKEN: slackToken,
  } = env;

  if (!slackWebhookURL || !slackChannel) {
    console.error("Please provide a valid Slack webhook URL and channel name.");
    return;
  }

  // Format the YouTube search results to use for Slack
  const formattedAttachments = formatSlackAttachments(data);

  const payload = {
    channel: slackChannel,
    text: `These are the keyword: ${searchQuery} search results from YouTube:`,
    attachments: formattedAttachments,
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
      const errorText = await response.text();
      console.error(`Error sending message to Slack channel: ${errorText}`);
    }
  } catch (error) {
    console.error(
      "Error sending message to Slack channel:",
      error.message || error
    );
  }
};

const formatSlackAttachments = (data) => {
  return [
    {
      text: data.items
        .map((item, index) => {
          return `${index + 1}. [${
            item.snippet.title
          }](https://www.youtube.com/watch?v=${item.id.videoId})`;
        })
        .join("\n"),
    },
  ];
};

export default sendDataToSlackChannel;
