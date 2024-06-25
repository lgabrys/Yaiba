  express = require("express"),
  app = express();
describe("request.get().set()", () => {
  it("should set host header after get()", done => {
    app.get("/", (req, res) => {
      req.host.should.equal('example.com');
    });
  });
});
