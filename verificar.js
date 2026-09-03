require("dotenv").config();

const { TikTokLiveConnection } = require("tiktok-live-connector");
const axios = require("axios");

const webhook = process.env.WEBHOOK;

if (!webhook) {
  console.error("WEBHOOK não configurado!");
  process.exit(1);
}

let ultimaNotificacao = 0;
let deteccoes = 0;

console.log("Monitor iniciado...");

setInterval(async () => {

  console.log("Verificando live...");

  const tiktokLive = new TikTokLiveConnection(
    "ohandle_",
    {}
  );

  try {

  const state = await tiktokLive.connect();

  console.log("STATE:");
  console.log(state);

  deteccoes++;

    console.log(`LIVE ENCONTRADA! (${deteccoes})`);

    const agora = Date.now();

    if (
      deteccoes >= 2 &&
      agora - ultimaNotificacao > 4 * 60 * 60 * 1000
    ) {

      ultimaNotificacao = agora;

      await axios.post(webhook, {
        content: "@everyone",
        embeds: [
          {
            title: "🔴 Ohandle está AO VIVO!",
            description: "🔥 A live acabou de começar!\n\n🎥 Assista agora:\nhttps://www.tiktok.com/@ohandle_",
            color: 16711680,
            image: {
              url: "https://media.discordapp.net/attachments/1520107551708942512/1541945882272993290/Notificacao_de_live.jpeg?ex=6a8f7082&is=6a8e1f02&hm=7c2dcf2bd02cf16a722cdfe4937a3cd8071ad30a3ac8f25504ec70f94934c4da&format=webp&width=1024&height=1024"
            }
          }
        ]
      });

      console.log("Notificação enviada!");
    }

  } catch (erro) {

  deteccoes = 0;

  console.log("Offline");
  console.log("ERRO:", erro.message);
}

}, 60000);