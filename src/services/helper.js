import axios from 'axios';

export const LOCALHOST_DISCORD_URL = 'https://discord.com/api/oauth2/authorize?client_id=1017375475305304114&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fuser%2Fprocess-discord-oauth&response_type=code&scope=identify%20email%20guilds'


export const DISCORD_URL = 'https://discord.com/api/oauth2/authorize?client_id=1017375475305304114&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fuser%2Fprocess-discord-oauth&response_type=code&scope=identify%20email%20guilds'

//export const DISCORD_URL = 'https://discord.com/api/oauth2/authorize?client_id=1017375475305304114&redirect_uri=http%3A%2F%2Fcrypty-wallet.s3-website-us-east-1.amazonaws.com%2Fuser%2Fprocess-discord-oauth&response_type=code&scope=identify%20email%20guilds'

export const DISCORD_CLIENT_ID = '1017375475305304114';
export const DISCORD_CLIENT_SECRET = 'IOIZwiEa1GigNyYUGRy91foVX1EZbgQ8';
//export const BASE_URL = "http://localhost:4000";
export const BASE_URL = "https://api-cpl-crypt.herokuapp.com";

export const myAxios = axios.create({
    baseURL: BASE_URL,
});