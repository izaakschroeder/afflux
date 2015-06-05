
import http from 'http';
import app from './app';

http.createServer(app).listen(process.env.PORT || 8080);
