
import express from 'express';
import render from './render';
import assets from './assets';
import config from '../../webpack.config';

const app = express();

// Serve webpack assets.
app.use(config.output.publicPath, assets);

// Serve page content.
app.use(render);

// TODO: Error handler and stuff


export default app;
