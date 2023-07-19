import dotenv from 'dotenv';
dotenv.config();
const config = {
    SERVER_PORT : process.env.SERVER_PORT as string,
    SOCKET_PORT :process.env.SOCKET_PORT as string
}

export default config