import { createConnection } from './connection.db';
import * as repository from './database.repository';

const dbConnection = createConnection();

export { dbConnection, repository };