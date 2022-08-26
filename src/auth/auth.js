import { Buffer } from "buffer";
Buffer.from("anything", "base64");
window.Buffer = window.Buffer || require("buffer").Buffer;


// isLoggedIn
export const isLoggedIn = () => {
    let data = localStorage.getItem("data");
    //console.log("data: ", data);

    if (data != null) {
        return true;
    } else {
        return false;
    }

}

export const isExpired = () => {
    let data = localStorage.getItem("data");

    const jsonData = JSON.parse(data);
    console.log("data2: ", jsonData.access_token);
    const payloadBase64 = jsonData.access_token.split('.')[1];
    const decodedJson = Buffer.from(payloadBase64, 'base64').toString();
    const decoded = JSON.parse(decodedJson)
    const exp = decoded.exp;
    //console.log(exp);
    if (Date.now() >= exp * 1000) {
        return false;
    } else {
        return true;
    }

}


// doLogin => data => set to loaclStorage

export const doLogin = (data, next) => {
    localStorage.setItem("data", JSON.stringify(data));
    next();
};

// doLogout => remove from loacalstorage

export const doLogout = (next) => {
    localStorage.removeItem("data");
    next();
}

// Get Current user

export const getCurrentUser = async() => {
    if (isLoggedIn()) {
        return await JSON.parse(localStorage.getItem("data"));
    } else {
        return undefined;
    }
}
