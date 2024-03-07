"use strict";
const request = require("../support/client");
const express = require("express");
const assert = require("assert");
const app = express();
let http = require("http");
let https = require("https");
const os = require("os");
const fs = require("fs");
const key = fs.readFileSync(`${__dirname}/fixtures/key.pem`);
const cert = fs.readFileSync(`${__dirname}/fixtures/cert.pem`);
const httpSockPath = [os.tmpdir(), "superagent-http.sock"].join("/");
const httpsSockPath = [os.tmpdir(), "superagent-https.sock"].join("/");
let httpServer;
let httpsServer;

if (process.env.HTTP2_TEST) {
  http = https = require('http2');
}

app.get("/", (req, res) => {
  res.send("root ok!");
});

app.get("/request/path", (req, res) => {
  res.send("request path ok!");
});

describe("[unix-sockets] http", () => {
  if (process.platform === "win32") {
    return;
  }

  before(done => {
    if (fs.existsSync(httpSockPath) === true) {
      // try unlink if sock file exists
      fs.unlinkSync(httpSockPath);
    }
    httpServer = http.createServer(app);
    httpServer.listen(httpSockPath, done);
  });

  const base = `http+unix://${httpSockPath.replace(/\//g, "%2F")}`;

  describe("request", () => {
    it("path: / (root)", done => {
      request.get(`${base}/`).end((err, res) => {
        assert(res.ok);
        assert.strictEqual("root ok!", res.text);
        done();
      });
    });

    it("path: /request/path", done => {
      request.get(`${base}/request/path`).end((err, res) => {
        assert(res.ok);
        assert.strictEqual("request path ok!", res.text);
        done();
      });
    });
  });

  after(() => {
    if (typeof httpServer.close === 'function') {
      httpServer.close();
    } else
      httpServer.destroy();
  });
});

describe("[unix-sockets] https", () => {
  if (process.platform === "win32") {
    return;
  }

  before(done => {
    if (fs.existsSync(httpsSockPath) === true) {
      // try unlink if sock file exists
      fs.unlinkSync(httpsSockPath);
    }
    if (process.env.HTTP2_TEST) {
      httpsServer = https.createSecureServer({ key, cert }, app);
    } else {
      httpsServer = https.createServer({ key, cert }, app);
    }
    httpsServer.listen(httpsSockPath, done);
  });

  const base = `https+unix://${httpsSockPath.replace(/\//g, "%2F")}`;

  describe("request", () => {
    it("path: / (root)", done => {
      request
        .get(`${base}/`)
        .ca(cert)
        .end((err, res) => {
          assert(res.ok);
          assert.strictEqual("root ok!", res.text);
          done();
        });
    });

    it("path: /request/path", done => {
      request
        .get(`${base}/request/path`)
        .ca(cert)
        .end((err, res) => {
          assert(res.ok);
          assert.strictEqual("request path ok!", res.text);
          done();
        });
    });
  });

  after(done => {
    httpsServer.close(done);
  });
});
