const Joi = require("joi");
const ServiceTester = require("./runner/service-tester");
const t = new ServiceTester({
  id: "dotnetstatus",
  title: "dotnet-status"
});
module.exports = t;

t
  .create("get nuget package status")
  .get("/gh/jaredcnance/dotnet-status/API.json")
  .expectJSONTypes(
    Joi.object().keys({
      name: "dependencies",
      value: Joi.equal("up to date", "out of date", "processing")
    })
  );
