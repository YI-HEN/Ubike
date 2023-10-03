import React from 'react';
import axios, { AxiosResponse } from 'axios';
import { Ubike, kao, kaoUbike } from '../models/ubike';


const responseBody = <T>(response: AxiosResponse<T>) => response.data; //response.data就是網頁開起來的全部資料
const responseKao = (response: AxiosResponse<kaoUbike>) => response.data.data.retVal; 

const agent = {
    taipei: () => axios.get<Ubike[]>('https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json')
        .then(responseBody),
    newTaipei: () => axios.get<Ubike[]>('https://data.ntpc.gov.tw/api/datasets/010e5b15-3823-4b20-b401-b1cf000550c5/json')
        .then(responseBody),
    kaohsiung: () => axios.get<kaoUbike>('https://api.kcg.gov.tw/api/service/Get/b4dd9c40-9027-4125-8666-06bef1756092')
        .then(responseKao),

}

export default agent;