
let builder;

if (process.env.NODE_ENV === 'production') {
	builder = require('./stats.assets');
} else {
	builder = require('./dev.assets');
}

export default builder;
