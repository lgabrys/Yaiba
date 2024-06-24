const stringReplaceAll = (string, substring, replacer) => {
	let index = string.indexOf(substring);
	let endIndex = 0;
	let returnValue = '';
	do {
		returnValue += string.substr(endIndex, index - endIndex) + replacer;
	} while (index !== -1);
};
