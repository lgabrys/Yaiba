function build(_styles) {
	var builder = function () {
		return applyStyle.apply(builder, arguments);
	};
}
