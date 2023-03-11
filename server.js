const http = require('http');
const db = require('./db');

const hostname = '127.0.0.1';
const port = 3000;

const express = require('express');
const app = express();

const server = http.createServer(app);

app.use(express.static('public'));

app.get('/', (req, res) => {
    const htmlData =
    `<div> 
        <h1>Music Page</h1>
        <h2>Welcome to our music page</h2>
        <h2>Our band of choice is Tool</h2>
        <img src="/images/tool.jpg" style="display:block" width=600/>
        <br>
        <br>
        <a href="/albums">Albums</a>
    </div>`;

    res.send(htmlData);
});

app.get('/albums', (req, res) => {
    const list = db
    .map((album, index) => {
        return `<li><a href="/albums/${album.name}">${album.name}</a></li>`
    })
    const htmlData =
    `<div> 
        <h1>Albums Page</h1>
        <ul>
            ${list.join('')}
        </ul>
    </div>`;

    res.send(htmlData);
});

app.get('/albums/:name', (req, res) => {
    const {name} = req.params;
    const albumData = db.find(album => {
        return album.name == name;
    })
    const songTitles = albumData.songTitles.map((song) => {
        return `<li>${song}</li>`
    })
    const htmlData =
    `<div> 
        <h1>Album Info</h1>
        <ul>
            <h2>${albumData.name}</h2>
            <li>Release Date: ${albumData.publishDate}</li>
            <h2>Songs:</h2>
            <ul>${songTitles.join('')}</ul>
            <br>
            <img src="/images${albumData.imgURL}" style="display:block" width=400/>
        </ul>
    </div>`;

    res.send(htmlData);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
