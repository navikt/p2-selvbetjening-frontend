require('dotenv').config();

const express = require('express');
const path = require('path');
const axios = require('axios');

const server = express();
server.use('/engangsstonad', express.static(path.resolve(__dirname, 'dist')));
server.set('views', `${__dirname  }/dist`);
server.engine('html', require('ejs').renderFile);

server.set('view engine', 'html');

server.get('/engangsstonad/?*', (req, res) => {
	// res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
	res.render('index.html', {
		REST_API_URL: process.env.FORELDREPENGESOKNAD_API_URL
	});
});

// server.get('/rest/**', (req, res) => {
// 	axios.get(process.env.FORELDREPENGESOKNAD_API_URL + req.originalUrl).then(
// 		(response) => {
// 			res.send(JSON.stringify(response.data));
// 		},
// 		(error) => {
// 			console.log(error.data);
// 			res.sendStatus(error.response.data.status);
// 		}
// 	);
// });

server.get('/health/isAlive', (req, res) => res.sendStatus(200));
server.get('/health/isReady', (req, res) => res.sendStatus(200));

server.listen(8080, () => {
	console.log('App listening on port 8080');
});
