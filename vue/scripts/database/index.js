/**
 * @author SteffTek
 * @license Apache-2.0
 * @12.05.2022
 * @summary A default database connector for use with vite & Vue3 to interact with a REST API. JWT refresh request included.
 */

/**
 * Imports
 */
import axios from "axios";

/**
 * Consts
 */
const BASE_URL = import.meta.env.VITE_APP_API_URL;

/**
 * Request Function
 */
const request = async (path = "", data = {}, protocol = "GET", refreshToken = true) => {

    // Clearn Protocol
    protocol = protocol.toUpperCase();

    // Headers
    const headers = {
        "Content-Type": "application/json",
        token: localStorage.getItem("token")
    }

    // Append Token
    if (data instanceof FormData) {
        headers["Content-Type"] = "multipart/form-data";
    }

    // Clean Path
    path = path.trim();
    if (path.startsWith("/")) {
        path = path.substr(1);
    }

    // Create URL
    const URL = `${BASE_URL}/${path}`;

    // Create Options
    const options = {
        method: protocol,
        url: URL,
        data: data,
        params: data,
        headers: headers
    }

    // Remove Options based on Type
    if (protocol !== "GET") {
        delete options.params;
    }

    // Create Promise
    return new Promise((resolve, reject) => {
        // Create Request
        axios(options).then(async response => {
            // Check for new Token
            if (refreshToken)
                checkToken();

            // receive data
            resolve(response.data.data);
        }).catch(async err => {
            // Catch error
            if (err.response) {
                // Check if data from api is accessible
                if (err.response.data.data) {
                    reject(err.response.data.data.error);
                    return;
                }
            }
            reject("The request to the server ran into an error!");
        });
    });
}

/**
 * Check Token
 */
const checkToken = () => {

    // Get Token
    let token = localStorage.getItem("token");

    // Check
    if (!token) {
        return;
    }

    // Split
    token = token.split(".")[1];

    // Check again
    if (!token) {
        return;
    }

    // Encode
    try {
        const json = JSON.parse(atob(token).toString());

        // If only 15 Mins to live, get new token
        const expiration = json.exp * 1000;

        // Time Range Check
        // Check if EXPIRATION OF TOKEN (converted to millis) - NOW <= 15 Minutes in Millis
        if (expiration - Date.now() > 15 * 60 * 1000) {
            return;
        }

        request("/me/token", {}, "GET", false).then(data => {
            // Check data & Set new Token
            localStorage.setItem("token", data.token);
        });
    } catch (e) {
        console.log(e);
    }
}

/**
 * Module
 */
export default request;