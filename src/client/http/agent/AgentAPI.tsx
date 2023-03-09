import axios from 'axios';
import Swal from 'sweetalert2'
import { Dispatch } from 'redux';

export const getAgent = async () => {
    try {
        const response = await axios.post(`/smart-recruitment/api/agent/list`)
        return response.data.data
    } catch (error) {
        return error
    }
}