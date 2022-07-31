import {Consts} from '../../config/Consts';
import axios from 'axios';

export const defaultOptions = {
    baseURL: Consts.API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
};

export const api = axios.create(defaultOptions)
