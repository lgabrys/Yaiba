  express = require("express"),
  app = express();
describe("request.get().set()", () => {
  it("should set host header after get()", done => {
    app.get("/", (req, res) => {
      req.hostname.should.equal('example.com');
    });
  });
});
