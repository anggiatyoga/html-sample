const logger = (req, res, next) => {
  const start = Date.now();
  console.log(`--> ${req.method} ${req.url}`, req.body && Object.keys(req.body).length ? req.body : '');

  res.on('finish', () => {
    console.log(`<-- ${req.method} ${req.url} ${res.statusCode} (${Date.now() - start}ms)`);
  });

  next();
};

module.exports = logger;
