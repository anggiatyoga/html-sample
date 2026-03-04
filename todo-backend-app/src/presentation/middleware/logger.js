const logger = (req, res, next) => {
  const start = Date.now();
  console.log(`--> ${req.method} ${req.url}`, req.body && Object.keys(req.body).length ? req.body : '');

  const originalJson = res.json.bind(res);
  res.json = (body) => {
    res.locals.body = body;
    return originalJson(body);
  };

  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`<-- ${req.method} ${req.url} ${res.statusCode} (${duration}ms)`, res.locals.body ?? '');
  });

  next();
};

module.exports = logger;
