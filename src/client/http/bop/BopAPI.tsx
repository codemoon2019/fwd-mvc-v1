import axios from 'axios';
import { BOP } from '../../interface/BOP/BOP';
import Swal from 'sweetalert2'
import { Dispatch } from 'redux';
import { FETCH_BOP_REQUEST, FETCH_BOP_SUCCESS, FETCH_BOP_FAILURE } from './type';

export const createBop = (bopData: BOP) => {
    axios
        .post(`/smart-recruitment/api/bop`, bopData)
        .then((response) => {
            const data = response.data;
            return data.data
        })
        .catch((error) => {
            Swal.fire({
                text: error.response.data.message,
                icon: 'error',
            })
        });
}

export const getBops = async () => {
    try {
        const response = await axios.post(`/smart-recruitment/api/bop/list`)
        return response.data.data
    } catch (error) {
        return error
    }
}

export const getBopDataForDropdown = async () => {
    try {
        const response = await axios.post(`/smart-recruitment/api/bop/list-dropdown`)
        return response.data.data
    } catch (error) {
        return error
    }
}

/*export const getBopDataForDropdown = () => {
    axios
        .post(`/smart-recruitment/api/bop/list-dropdown`)
        .then((response) => {
            const initData = response.data;
            const data = initData.data;
            localStorage.removeItem('bopListDropdown');

            let newArray = [];
            if (data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    const item = data[i];
                    newArray.push(item.name)
                }
            }

            localStorage.setItem('bopListDropdown', JSON.stringify(newArray));
            return data;
        })
        .catch((error) => {
            Swal.fire({
                text: error.response.data.message,
                icon: 'error',
            })
        });
}*/