const { TikTokLiveConnection } = require("tiktok-live-connector");

const tiktokLive = new TikTokLiveConnection(
  "ohandle_",
  {}
);

tiktokLive.connect()
  .then((state) => {
    console.log("Conectado!");
    console.log(state);
  })
  .catch((err) => {
    console.log("Erro:");
    console.log(err);
  });