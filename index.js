import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());
app.set('view engine', 'ejs');

const apiKey = 'fb3afb4f';
const url = `http://www.omdbapi.com/?apikey=${apiKey}&t=`;

app.get('/', async (req, res) => {
  res.render('index', { data: null, title: null, error: null});
});

app.post('/search', async (req, res) => {
    const movieName = req.body.movieName;
    const movieUrl = url + movieName;
    http.get(movieUrl, (response) => {
        response.on('data', (data) => {
            const movieData = JSON.parse(data);
            res.render('index', { data: movieData,poster:movieData.Poster ,title: movieData.Title, plot: movieData.Plot,release:movieData.Released,actor:movieData.Actors, director:movieData.Director, writer:movieData.writer, awards:movieData.Awards, imdbRating:movieData.imdbRating, runtime:movieData.Runtime, boxOffice:movieData.BoxOffice ,error: null });
        });
    }).on('error', (error) => {
        res.render('index', { data:null, poster:null ,title: null, plot: null,release:null,actor:null, director:null, writer:null, awards:null, imdbRating:null, runtime:null, boxOffice: null ,error: null });
        console.log('Error: ' + error.message);
    });
});

app.get('/movies', async (req, res) => {
    res.render('movies', { data: null, title: null, error: null});
});

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});