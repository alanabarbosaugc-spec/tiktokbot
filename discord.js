const axios = require("axios");

const webhook = "https://discord.com/api/webhooks/1541610296580513853/4Rx7GG46Qlaq8RbJlEvNwHSYHkeF2NGqwIIy-obxCBFhlSC-TR6-10CkvokDuFpCn_H1";

axios.post(webhook, {
  content: "@everyone",
  embeds: [
    {
      title: "🔴 Ohandle está AO VIVO!",
      description: "Venha acompanhar a live agora!",
      color: 16711680,

      image: {
        url: "https://media.discordapp.net/attachments/1520107551708942512/1541945882272993290/Notificacao_de_live.jpeg?ex=6a8f7082&is=6a8e1f02&hm=7c2dcf2bd02cf16a722cdfe4937a3cd8071ad30a3ac8f25504ec70f94934c4da&=&format=webp&width=1024&height=1024"
      }
    }
  ]
})
.then(() => {
  console.log("Mensagem enviada!");
})
.catch((erro) => {
  console.log(erro);
});