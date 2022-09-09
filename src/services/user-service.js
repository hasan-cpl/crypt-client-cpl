import { myAxios } from "./helper";

export const signUp = (user) => {
    
    return myAxios.post("/api/v1/signup", user)
        .then((response) => response.data);
}

export const loginUser = (loginDetail) => {

    return myAxios.post("/api/v1/signin", loginDetail)
        .then((response) => response.data );

}

export const getCurrentUserInfo = (id) => {

    return myAxios.get(`/api/v1/user/${id}`)
        .then((response) => response.data)
        .catch(err => console.log(err));
    
}

export const addDiscordUserInformation = (id, discordInfo) => {
    
    console.log('id', id);
    console.log('discord',discordInfo);
    
    return myAxios.put(`/api/v1/discord-info/${id}`, discordInfo)
        .then(res => res)
        .catch(err => console.error(err));
}