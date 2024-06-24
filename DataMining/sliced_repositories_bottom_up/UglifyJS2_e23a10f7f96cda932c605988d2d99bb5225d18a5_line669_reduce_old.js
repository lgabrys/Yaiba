var U = require("..");
function is_error(result) {
    return typeof result == "object" && typeof result.name == "string" && typeof result.message == "string";
}
