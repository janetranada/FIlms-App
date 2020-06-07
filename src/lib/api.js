import axios from 'axios';

export function getFilms(url) {
    return axios.get(url)
}