import axios from "axios";

const SCRYFALL_BASE_URL = "https://api.scryfall.com";

/** 
 * @param {string} query 
 * @param {number} page 
 */
export const searchCards = (query = "order:edhrec", page = 1) => {
    return axios.get(`${SCRYFALL_BASE_URL}/cards/search`, {
        params: {
            q: query,
            page: page,
        },
    });
};

/**
 * @param {string} id - Card ID
 */
export const getCardById = (id) => {
    return axios.get(`${SCRYFALL_BASE_URL}/cards/${id}`);
};
