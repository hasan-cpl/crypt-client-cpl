import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from 'reactstrap';
import { getCurrentUser } from '../../auth/auth';
import { DISCORD_REDIRECT_URL } from '../../services/helper';
import { addDiscordUserInformation } from '../../services/user-service';
import Base from "../Base";

const DiscordOauth2 = require("discord-oauth2");
const oauth = new DiscordOauth2();

const ProcessOauth = () => {

    const navigate = useNavigate();

    //const [successText, setSuccessText] = useState('Failed to Merge with Discord');

    

    getCurrentUser().then((currentUser) => {

        let currentUserId = currentUser.user_id
        console.log(currentUserId);
        const queryParams = new URLSearchParams(window.location.search)
        const code = queryParams.get("code")
        console.log(code);


        oauth.tokenRequest({
            clientId: "1017375475305304114",
            clientSecret: "0LKzPQf5YiL51OtfAJZEE--iMxV3WWCp",
            code: code,
            scope: "identify email guilds",
            grantType: "authorization_code",

            redirectUri: DISCORD_REDIRECT_URL,
        }).then(res => {
            oauth.getUser(res.access_token)
                .then(discordUser => {
                    console.log(discordUser);

                    addDiscordUserInformation(currentUserId, discordUser)
                        .then(res => {
                            //console.log(res);
                        }).catch(err => {
                            console.error(err);
                            toast.success('Successfully Merged With Discord');
                        })
                    /* discordInfo.discordId = discordUser.id;
                    discordInfo.username = discordUser.username;
                    discordInfo.discriminator = discordUser.discriminator;
                    discordInfo.email = discordUser.email;
                    discordInfo.avatar = discordUser.avatar;
                    discordInfo.verified = discordUser.verified;

                    addDiscordUserInformation() */

                })
                .catch(err => console.error('UserErr', err));
        }).catch(err => console.error(err));
    });



    const handleData = () => {

        navigate("/user/dashboard", {
            replace: true
        });

    }




    return (
        <Base>
            <div className='container text-center'>
                <h1>Merged With Discord</h1>
                <Button onClick={handleData}>Back</Button>

            </div>
        </Base>
    );
};

export default ProcessOauth;