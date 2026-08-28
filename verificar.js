require("dotenv").config();
const { TikTokLiveConnection } = require("tiktok-live-connector");
const axios = require("axios");

const webhook = process.env.WEBHOOK;

let notificou = false;

console.log("Monitor iniciado...");

setInterval(async () => {

  const tiktokLive = new TikTokLiveConnection(
    "ohandle_",
    {}
  );

  try {

    await tiktokLive.connect();

    console.log("LIVE ENCONTRADA!");

    if (!notificou) {

      notificou = true;

      await axios.post(webhook, {
        content: "@everyone",
        embeds: [
          {
            title: "🔴 Ohandle está AO VIVO!",
            description: "Venha acompanhar a live agora!\n\n🎥 https://www.tiktok.com/@ohandle_",
            color: 16711680,
            image: {
              url: "https://media.discordapp.net/attachments/1520107551708942512/1541945882272993290/Notificacao_de_live.jpeg?ex=6a8f7082&is=6a8e1f02&hm=7c2dcf2bd02cf16a722cdfe4937a3cd8071ad30a3ac8f25504ec70f94934c4da&=&format=webp&width=1024&height=1024"
            }
          }
        ]
      });

      console.log("Notificação enviada!");

    }

  } catch {

    console.log("Offline");

    notificou = false;

  }

}, 60000);