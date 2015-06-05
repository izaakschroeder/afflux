
import path from 'path';
import fs from 'fs';
import serveStatic from 'serve-static';
import { assign } from 'lodash';
import collect from './collect';

import config from '../../../webpack.config';

const statsFile = path.join(config.output.path, 'stats.json')

if (!fs.existsSync(statsFile)) {
	throw new Error();
}

const stats = JSON.parse(fs.readFileSync(statsFile));
const assets = collect(config.publicPath, stats);
const router = serveStatic(config.output.path);

assign(router, assets);

export default router;
