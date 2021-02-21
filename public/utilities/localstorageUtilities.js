export const getUsername = () => {
    return localStorage.getItem('username') || "Username"
}

export const setUsername = (username) => {
    localStorage.setItem('username', username.trim());
}

export const getPayload = () => {
    return localStorage.getItem('payload') || '';
}

export const setPayload = (payload) => {
    localStorage.setItem('payload', JSON.stringify(payload));
}