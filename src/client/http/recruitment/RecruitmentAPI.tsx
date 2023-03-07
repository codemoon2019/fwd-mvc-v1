import axios from 'axios';
import { RecruitmentFormData } from '../../interface/Recruitment/RecruitmentApplication';
import Swal from 'sweetalert2'

export const postApplication = async (recruitData: RecruitmentFormData) => {
    Swal.fire({
        text: 'Please wait while processing your request...',
        didOpen: () => {
            Swal.showLoading()
        }
    })

    return axios
        .post(`/smart-recruitment/api/recruitment`, recruitData)
        .then((response) => {
            const data = response.data;
            recruitData["id"] = data
            return response
        })
        .catch((error) => {
            Swal.fire({
                text: error.response.data.message,
                icon: 'error',
            })
        });

} 

export const assignAgent = (id: number, agent: string) => {
    axios
        .put(`/smart-recruitment/api/recruitment/assign-agent/${id}`, {recruiter: agent})
        .then((response) => {
            const data = response.data;
            return response
        })
        .catch((error) => {
            Swal.fire({
                text: error.response.data.message,
                icon: 'error',
            })
        });
} 

export const markPresent = async (id: number) => {
    return axios
        .put(`/smart-recruitment/api/recruitment/mark-present/${id}`)
        .then((response) => {
            const data = response.data;
            return response
        })
        .catch((error) => {
            Swal.fire({
                text: error.response.data.message,
                icon: 'error',
            })
        });
} 


export const getRecruits = () => {
    axios
    .post(`/smart-recruitment/api/recruitment/list`)
    .then((response) => {
      const data = response.data;
      localStorage.removeItem('recruitList');
      localStorage.setItem('recruitList', JSON.stringify(data.data));
      console.log(data.data)
      return data.data;
    })
    .catch((error) => {
        Swal.fire({
            text: error.response.data.message,
            icon: 'error',
        })
    });
} 

export const getAssignedRecruits = () => {
    axios
    .post(`/smart-recruitment/api/recruitment/assigned-list`)
    .then((response) => {
      const data = response.data;
      localStorage.removeItem('recruitAssignedList');
      localStorage.setItem('recruitAssignedList', JSON.stringify(data.data));
      console.log(data.data)
      return data.data;
    })
    .catch((error) => {
        Swal.fire({
            text: error.response.data.message,
            icon: 'error',
        })
    });
} 