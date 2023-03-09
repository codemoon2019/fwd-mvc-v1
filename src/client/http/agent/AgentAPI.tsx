import axios from 'axios';
import Swal from 'sweetalert2'
import { Dispatch } from 'redux';

export const getAgentList = async () => {
    try {
        const response = await axios.post(`/smart-recruitment/api/agent/list`)
        const serverResponse = response.data.data;
        const newArray = [];
        
        for(let i = 0; i < serverResponse.length; i++){
            newArray.push(`${serverResponse[i]['AGENTID']} - ${serverResponse[i]['RECRUITER']}`)
        }
        
        return newArray;
    } catch (error) {
        return error
    }
}