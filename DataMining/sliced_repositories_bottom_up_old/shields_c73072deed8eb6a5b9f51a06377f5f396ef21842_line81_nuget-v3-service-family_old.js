import RouteBuilder from '../route-builder.js'
async function fetch(
  serviceInstance,
) {
  return serviceInstance._requestJson({
    options: {
      qs: {
      },
    },
  })
}
