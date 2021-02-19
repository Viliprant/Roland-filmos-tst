const random = require('string-random');

export const getUsername = () => {
    let username = localStorage.getItem('username') || "Username"
    return username;
}

export const setUsername = (username) => {
    localStorage.setItem('username', username.trim());
}