const http = require('http');
const port = process.env.PORT || 3000;
const requestHandler = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  if (req.url && req.url.startsWith('/products')) {
    res.writeHead(200);
    res.end(JSON.stringify([]));
    return;
  }
  res.writeHead(200);
  res.end(JSON.stringify({ message: 'Backend scaffold - replace with your NestJS backend' }));
};
const server = http.createServer(requestHandler);
server.listen(port, () => {
  console.log(`Placeholder backend running on http://localhost:${port}`);
});
