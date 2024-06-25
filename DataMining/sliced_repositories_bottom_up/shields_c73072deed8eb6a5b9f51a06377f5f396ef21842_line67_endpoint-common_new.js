import Joi from 'joi'
function validateEndpointData(
) {
const anySchema = Joi.any()
async function fetchEndpointData(
  serviceInstance,
  { url, errorMessages, validationPrettyErrorMessage, includeKeys }
) {
  const json = await serviceInstance._requestJson({
    schema: anySchema,
    url,
    errorMessages,
    options: { decompress: true },
  })
}
