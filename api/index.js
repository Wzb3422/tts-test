const app = require('express')();
const { v4 } = require('uuid');

app.get('/api', (req, res) => {
  const path = `/api/item/${v4()}`;
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

app.get('/api/item/:slug', (req, res) => {
  const { slug } = req.params;
  res.end(`Item: ${slug}`);
});

app.get('/api/audio/:slug', (req, res) => {
  const { slug } = req.params;
  const audios = [
    {
      src: 'https://tts-test-phi.vercel.app/guiltymangofree.mp3',
      duration: 2,
    },
    {
      src: 'https://tts-test-phi.vercel.app/hihowareyoudoingtoday.mp3',
      duration: 4,
    }
  ]

  const index = Number(slug) === 0 ? 0 : 1;
  const fps = 30;
  const { duration, src } = audios[index];

  res.json({
    durationInFrames: duration * fps,
    src,
  })
});

module.exports = app;
