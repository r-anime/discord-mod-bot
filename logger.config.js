// Describes custom log levels for the `another-logger` package.
const config = require('./config');

module.exports = {
	levels: {
		erisError: {style: 'red', text: 'error (eris)'},
		erisWarn: {style: 'yellow', text: 'warning (eris)'},
		hit: {style: 'magenta'},
	},
	ignoredLevels: process.env.NODE_ENV === 'production' ? [] : ['debug'],
};
