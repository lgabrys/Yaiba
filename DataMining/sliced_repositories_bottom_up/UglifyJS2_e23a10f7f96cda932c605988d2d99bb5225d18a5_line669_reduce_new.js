var U = require("..");
function is_error(result) {
    return result && typeof result.name == "string" && typeof result.message == "string";
}
