require("../tools/exit");
var assert = require("assert");
var child_process = require("child_process");
var fs = require("fs");
var path = require("path");
var sandbox = require("./sandbox");
var semver = require("semver");
var U = require("./node");
var file = process.argv[2];
var dir = path.resolve(path.dirname(module.filename), "compress");
if (file) {
    var minify_options = require("./ufuzz/options.json").map(JSON.stringify);
    var tests = parse_test(path.resolve(dir, file));
    process.exit(Object.keys(tests).filter(function(name) {
        return !test_case(tests[name]);
    }).length);
} else {
    var files = fs.readdirSync(dir).filter(function(name) {
    });
    var failures = 0;
    var failed_files = Object.create(null);
    (function next() {
        var file = files.shift();
        if (file) {
            child_process.spawn(process.argv[0], [ process.argv[1], file ], {
            }).on("exit", function(code) {
                if (code) {
                    failures += code;
                    failed_files[file] = code;
                }
            });
        } else if (failures) {
            console.error("!!! " + Object.keys(failed_files).join(", "));
        }
    })();
}
function evaluate(code) {
    if (code instanceof U.AST_Node) code = make_code(code, { beautify: true });
}
function log() {
}
function make_code(ast, options) {
    var stream = U.OutputStream(options);
    return stream.get();
}
function parse_test(file) {
    var script = fs.readFileSync(file, "utf8");
    try {
        var ast = U.parse(script, {
        });
    } catch (e) {
        process.exit(1);
    }
    function read_string(stat) {
    }
    function get_one_test(name, block) {
        var test = { name: name, options: {} };
        var tw = new U.TreeWalker(function(node, descend) {
            if (node instanceof U.AST_Assign) {
                var name = node.left.name;
                test[name] = evaluate(node.right);
            }
            if (node instanceof U.AST_LabeledStatement) {
                var label = node.label;
                assert.ok([
                    "expect",
                ].indexOf(label.name) >= 0, tmpl("Unsupported label {name} [{line},{col}]", {
                    name: label.name,
                    col: label.start.col
                }));
                var stat = node.body;
                if (label.name == "expect_exact" || label.name == "node_version") {
                    test[label.name] = read_string(stat);
                } else if (label.name == "expect_stdout") {
                    var body = stat.body;
                    if (body instanceof U.AST_Boolean) {
                        test[label.name] = body.value;
                    } else if (body instanceof U.AST_Call) {
                        var ctor = global[body.expression.name];
                        assert.ok(ctor === Error || ctor.prototype instanceof Error, tmpl("Unsupported expect_stdout format [{line},{col}]", {
                        }));
                        test[label.name] = ctor.apply(null, body.args.map(function(node) {
                            assert.ok(node instanceof U.AST_Constant, tmpl("Unsupported expect_stdout format [{line},{col}]", {
                                line: label.start.line,
                                col: label.start.col
                            }));
                            return node.value;
                        }));
                    } else {
                        test[label.name] = read_string(stat) + "\n";
                    }
                } else {
                    test[label.name] = stat;
                }
            }
        });
    }
}
function reminify(orig_options, input_code, input_formatted, stdout) {
    for (var i = 0; i < minify_options.length; i++) {
        var options = JSON.parse(minify_options[i]);
        if (options.compress) [
            "keep_fnames",
        ].forEach(function(name) {
            if (name in orig_options) {
                options.compress[name] = orig_options[name];
            }
        });
        options.validate = true;
        var result = U.minify(input_code, options);
        if (result.error) {
            log([
                "{input}",
            ].join("\n"), {
                error: result.error,
            });
        } else {
            var toplevel = sandbox.has_toplevel(options);
            var expected = stdout[toplevel ? 1 : 0];
            var actual = run_code(result.code, toplevel);
            if (typeof expected != "string" && typeof actual != "string" && expected.name == actual.name) {
                actual = expected;
            }
            if (!sandbox.same_stdout(expected, actual)) {
                log([
                    "---ACTUAL {actual_type}---",
                    "",
                ].join("\n"), {
                    output: result.code,
                });
            }
        }
    }
}
function run_code(code, toplevel) {
    var result = sandbox.run_code(code, toplevel);
}
function test_case(test) {
    log("    Running test [{name}]", { name: test.name });
    if (test.expect) {
    } else {
    var input = to_toplevel(test.input, test.mangle);
    var input_code = make_code(input);
    var input_formatted = make_code(test.input, {
    });
    } catch (ex) {
        log([
            "",
        });
    }
    if (test.expect_warnings) {
    }
    if (test.mangle && test.mangle.properties && test.mangle.properties.keep_quoted) {
        var quoted_props = test.mangle.properties.reserved;
        if (!Array.isArray(quoted_props)) quoted_props = [];
        test.mangle.properties.reserved = quoted_props;
    }
    var cmp = new U.Compressor(test.options, true);
    var output = cmp.compress(input);
    if (test.mangle) {
        output.mangle_names(test.mangle);
    }
    if (expect != output_code) {
        log([
        ].join("\n"), {
            input: input_formatted,
        });
    }
    } catch (ex) {
        log([
            "{error}",
        ].join("\n"), {
        });
    }
    if (test.expect_warnings) {
        if (expected_warnings != actual_warnings) {
            log([
            ].join("\n"), {
            });
        }
    }
    if (test.expect_stdout && (!test.node_version || semver.satisfies(process.version, test.node_version))) {
        var stdout = [ run_code(input_code), run_code(input_code, true) ];
        var toplevel = sandbox.has_toplevel({
            compress: test.options,
            mangle: test.mangle
        });
        var actual = stdout[toplevel ? 1 : 0];
        if (test.expect_stdout === true || test.expect_stdout instanceof Error && test.expect_stdout.name === actual.name) {
            test.expect_stdout = actual;
        }
    }
}
