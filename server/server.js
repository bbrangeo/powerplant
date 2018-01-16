import mongoose from 'mongoose';
import { buildApp } from './app';
import {
	DATABASE_USERNAME,
	DATABASE_PASSWORD,
	DATABASE_PROTOCOLL,
	DATABASE_HOST,
	DATABASE_PORT,
	DATABASE_DB,
	PP_PORT
} from '../secrets.js';

const getDatabaseURL = () => {
	let urlString = DATABASE_PROTOCOLL;
	//Add Username and P
	if (DATABASE_USERNAME.length>0 && DATABASE_PASSWORD.length>0)
		urlString+=DATABASE_USERNAME+':'+DATABASE_PASSWORD+'@';
	urlString+=DATABASE_HOST;
	if (DATABASE_PORT.length>0)
		urlString+=':'+DATABASE_PORT;
	urlString+='/'+DATABASE_DB;
	return urlString;
}


if (process.env.DATABASEURL){
  mongoose.connect( process.env.DATABASEURL, { useMongoClient: true });
} else {
  mongoose.connect( getDatabaseURL(), { useMongoClient: true });
}

mongoose.Promise = global.Promise;

const port = process.env.PORT || PP_PORT;
const localhostArgs = ['127.0.0.1',511];

const serverStarted = (event) => {
	console.log('Server running on port ' + port);
}

const app = buildApp( process.env.NODE_ENV === "development" );
if (process.env.LOCALHOST_ONLY) {
	app.listen(
		port,
		...localhostArgs,
		serverStarted
	);
} else {
	app.listen(
		port,
		serverStarted
	);
}

