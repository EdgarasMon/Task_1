const fs = require("fs");

const loadEnvVariables = () => {
  const envFile = "./.env";
  const envVariables = {};

  if (fs.existsSync(envFile)) {
    const envData = fs.readFileSync(envFile, "utf-8");
    const lines = envData.split("\n");

    lines.forEach((line) => {
      const [key, value] = line.split("=");
      if (key && value) {
        envVariables[key.trim()] = value.trim();
      }
    });

    return envVariables;
  } else {
    console.error(".env file not found!");
    return null;
  }
};

module.exports = loadEnvVariables;
