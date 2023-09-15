import React from 'react';
import axios, { AxiosResponse } from 'axios';
import { Ubike } from '../models/ubike';

axios.defaults.baseURL = 'https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json';

const responseBody = <T>(response: AxiosResponse<T>) => response.data; 

const agent = {
    list: () => axios.get<Ubike[]>('').then(responseBody),
}

export default agent;