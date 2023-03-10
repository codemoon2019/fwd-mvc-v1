import axios from 'axios';
import Swal from 'sweetalert2';
import { SrpBranchListResponse } from '../../interface/SrpBranchList'

export const getSrpBranchList = (): Promise<SrpBranchListResponse> => {
    return new Promise((resolve, reject) => {
        axios.post(`/smart-recruitment/api/srpBranchList`)
            .then((response) => {
                const { data } = response.data;
                resolve(data) 
                //   localStorage.removeItem('srpBranchList');
                //   localStorage.setItem('srpBranchList', JSON.stringify(data.data));
                //   console.log(data.data)
                //   return data.data;
                })
            .catch((error) => {
                reject(error)
                // Swal.fire({
                //     text: error.response.data.message,
                //     icon: 'error',
                // })
            });
    })
    
}