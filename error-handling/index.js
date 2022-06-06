module.exports = (app) => {
  app.use((req, res, next) => {
    // this middleware runs whenever requested resource is not available
    res.status(404).json({ message: 'Resource not found' })
  })

  app.use((err, req, res, next) => {
    // whenever you call next(err), this middleware will handle the error
    // always logs the error
    console.error('ERROR', req.method, req.path, err)

    // only send response if the response has not yet been sent
    if (!res.headersSent) {
      res.status(500).json({ message: 'Internal server error' })
    }
  })
}
