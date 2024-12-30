const express = require('express');

const app = express();
// Port
const port = 3000;

// Template Engine
app.set('view engine', 'ejs');

// Middlewares
app.use(express.static('public'));
// Ansayfa
app.get('/', (req, res, next) => {
  res.status(200).render('index', {
    page_name: 'index',
  });
});

// About
app.get('/about', (req, res, next) => {
  res.status(200).render('about', {
    page_name: 'about',
  });
});

app.listen(port, () => {
  console.log(`Server ${port} portun'da Çalışıyor `);
});
