function build(_styles) {
	var builder = function builder() {
		return applyStyle.apply(builder, arguments);
	};
}
