import axios from 'axios';

export const LOCALHOST_DISCORD_URL = 'https://discord.com/api/oauth2/authorize?client_id=1017375475305304114&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fuser%2Fprocess-discord-oauth&response_type=code&scope=identify%20email%20guilds'


//export const DISCORD_URL = 'https://discord.com/api/oauth2/authorize?client_id=1017375475305304114&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fuser%2Fprocess-discord-oauth&response_type=code&scope=identify%20email%20guilds'
export const DISCORD_URL = 'https://discord.com/api/oauth2/authorize?client_id=1017375475305304114&redirect_uri=http%3A%2F%2Fcrypty-wallet.s3-website-us-east-1.amazonaws.com%2Fuser%2Fprocess-discord-oauth&response_type=code&scope=identify%20email%20guilds'

export const DISCORD_CLIENT_ID = '1017375475305304114';
export const DISCORD_CLIENT_SECRET = 'IOIZwiEa1GigNyYUGRy91foVX1EZbgQ8';
// export const BASE_URL = "http://localhost:4000";
export const BASE_URL = "https://crypt-server-cpl.vercel.app/";

export const myAxios = axios.create({
    baseURL: BASE_URL,
});

//export const BOT_BASE_URL = 'https://discord-bot-cpl.herokuapp.com';
//export const BOT_BASE_URL = 'http://localhost:9090';

export const WEB_3_PROVIDER_URL = 'https://goerli.infura.io/v3/81f3882a93c44d1381517241c631230d';