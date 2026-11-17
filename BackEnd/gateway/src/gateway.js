const express = require("express");
//const { createProxyMiddleware } = require("http-proxy-middleware");
const config = require("../config/env");

const app = express();

// Proxy verso il service
//quello che si ottiene qui è l'api versioning + endpoint hiding --> convenzione
//significa che l'utente vede e digita per il servizio /api/v1/ (es: /api/v1/something)
//in realtà la parte finale è estratta dal servizio proxy per il pathrewrite
//significa nascondere gli endpoint all'utente con l'introduzione di elementi non
//vanno cambiati anche endpoint della pagina statica nav che ridefinisce i percorsi
//weather.js che costituisce il dom js ///// va infine modificato il post taglia

/*quindi questi per esempio sono quelli veri del service: http://localhost:3000/
questi quelli mascheratihttp://localhost:4000/api/v1/signin*/

const authProxy = require("../proxies/authProxy");
const wantedProxy = require("../proxies/wantedProxy");
const serviceProxy = require("../proxies/serviceProxy");

app.use("/api/v1/auth", authProxy);

app.use("/api/v1/wanted", wantedProxy);

app.use("/api/v1", serviceProxy);

app.listen(config.GATEWAY_PORT, () => {
  console.log(`Gateway attivo su http://localhost:${config.GATEWAY_PORT}/api/v1`);
});