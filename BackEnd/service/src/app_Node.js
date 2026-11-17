/*
var express = require("express");
var app = express();
var port = 3000;
//spedizione del messaggio alla porta local host
app.use("/", function(req, res) {
    res.sendFile(__dirname + "/form.html");
});
//definizione dello stato visualizzabile da prompt
app.listen(port, ()=> {
console.log("Server in ascolto alla porta " + port);
1});*/

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware per analizzare i dati inviati tramite Form HTML
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../../../frontend/public")))

// Rotta GET principale: invia la pagina con il form HTML
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, "../../../frontend/public/login.html"));
});

// Rotta POST: riceve i dati dal form
app.post('/login', (req, res) => {
    
    const { username, password } = req.body;
   
    if(username === 'admin' && password === '1234'){
        res.send('login effetuato')
    } else {
        res.send('credenziali non valide.<br>Username inserito ${username} <br> Password inserita: ${password}')
    }

    
});
app.get('/weather', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../frontend/public/weather.html'));
});

app.post('/weather', async (req, res) => {
    const city = req.body.city;
    console.log(city);
    //res.send(`Hai richiesto il meteo per: ${city}`);
    /*occorre registrarsi sul sito https://openweathermap.org/ per opttenere una api key
    alla voce apikey, viene nfornito il codice di accesso per l'account, nel mio caso 446e332294950ade2b0883908d551808*/
    const apiKey = "235d5392761854188d6c0e57bde233fe";
    try {
        // Chiamata API meteo
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=it`
        );

        const data = await response.json();

        // Se la città non esiste
        if (data.cod != 200) {
            return res.json({
                error: true,
                message: "Città non trovata"
            });
        }

        // Risposta JSON pulita
        res.json({
            city: data.name,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            temperature: data.main.temp,
            humidity: data.main.humidity,
            wind: data.wind.speed
        });

    } catch (err) {
        console.error(err);
        res.json({
            error: true,
            message: "Errore nel server"
        });
    }
});
app.get('/About', (req, res) => {
    res.sendFile(path.join(__dirname, "../../../frontend/public/About.html"));
});
    
app.post('/About', (req, res) => {
    

    
});


// Avvio del server
app.listen(PORT, () => {
    console.log(`Server avviato su http://localhost:${PORT}`);
});