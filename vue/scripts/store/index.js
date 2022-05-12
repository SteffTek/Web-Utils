/**
 * @author SteffTek
 * @license Apache-2.0
 * @12.05.2022
 * @summary VueX User Store with login check (/me on API) and logout (token remove).
 */

/**
 * Imports
 */
import { createStore } from "vuex";
import db from "../database/index";

/**
 * Create VueX Store
 */
const store = createStore({
    state() {
        return {
            user: null
        }
    },
    mutations: {
        async login(state) {
            // Get /me from db
            await db("/me").then(data => {
                state.user = data;
            }).catch(err => {
                state.user = null;
            });
        },
        logout(state) {
            // Remove State User
            state.user = null;
            // Remove LocalStorage Token
            localStorage.removeItem("token");
        }
    }
});

/**
 * Expose Store
 */
export default (app) => {
    // Use Store
    app.use(store);
}