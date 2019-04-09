import Server from './classes/server';
import cors from 'cors';
import bodyParser from 'body-parser';
import routerCola from './routes/router';

const server = Server.instance;

// Bodyparser
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());

// Cors
server.app.use(cors({
	origin: true,
	credentials:true
}));

// Las rutas
server.app.use("/colas", routerCola);
// Start the app
server.start(() => {
    console.log("LA aplicacion esta lista");
});