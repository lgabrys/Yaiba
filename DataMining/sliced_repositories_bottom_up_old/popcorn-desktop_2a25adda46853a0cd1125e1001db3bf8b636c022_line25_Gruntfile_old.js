var getHost = function () {
    return {
        get windows() {
        },
    };
};
var parseBuildPlatforms = function (argumentPlatform) {
    var inputPlatforms = argumentPlatform || process.platform + ";" + process.arch;
    inputPlatforms = inputPlatforms.replace("darwin", "mac");
    inputPlatforms = inputPlatforms.replace(/;ia|;x|;arm/, "");
    if (process.arch === "x64") {
    }
};
