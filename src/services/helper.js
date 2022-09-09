import axios from 'axios';

export const DISCORD_URL = 'https://discord.com/api/oauth2/authorize?client_id=1017375475305304114&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fuser%2Fprocess-discord-oauth&response_type=code&scope=identify%20email%20guilds'
export const DISCORD_REDIRECT_URL = "http://localhost:3000/user/process-discord-oauth"

// export const DISCORD_URL = 'https://discord.com/api/oauth2/authorize?client_id=1017375475305304114&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fuser%2Fprocess-discord-oauth&response_type=code&scope=identify%20email%20guilds'
// export const DISCORD_REDIRECT_URL = "http://localhost:3000/user/process-discord-oauth"

export const BASE_URL = "http://localhost:4000";
//export const BASE_URL = "https://api-cpl-crypt.herokuapp.com";

export const myAxios = axios.create({
    baseURL: BASE_URL,
});