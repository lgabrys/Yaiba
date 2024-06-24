import Boom from 'boom'
export default ({ app }) => {
  app.use((err, req, res, next) => {
    err = Boom.wrap(err)
  })
}
