import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    headers: {
        'API-KEY': '34623cfe-c2a8-47e3-aaaa-b90c74b71a18',
        'Authorization': 'Bearer beb108ad-fe4b-4061-9df4-ad6205064172'
    }
})