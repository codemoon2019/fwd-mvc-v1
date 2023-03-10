import axios from 'axios';
import { RecruitmentFormData } from '../../interface/Recruitment/RecruitmentApplication';
import Swal from 'sweetalert2'
import { GetAgentDetailsFormData, AgentDetail } from '../../interface/Agent'

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

export const assignAgent = async (id: number, agent: string) => {
    const agentObject = agent.split(' - ');

    const getAgentDetailsFormData: GetAgentDetailsFormData = {
        AGENTID: id.toString()
    }
    return axios.post(
        '/smart-recruitment/api/agent/agentDetails', 
        getAgentDetailsFormData
        )
        .then((response) => {
            const agentDetail: AgentDetail = response.data[0]
            
            axios.put(
                `/smart-recruitment/api/recruitment/assign-agent/${id}`, 
                {
                    recruiter: agentObject[0], 
                    agentDetail
                })
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
        .post(`/smart-recruitment/api/recruitment/mark-present`, {id: id})
        .then((response) => {
            const data = response.data;
            return data
        })
        .catch((error) => {
            Swal.fire({
                text: error.response.data.message,
                icon: 'error',
            })
        });
} 

export const getRecruits = async (bop: string) => {
    try {
        const response = await axios.post(`/smart-recruitment/api/recruitment/list`, {bop: bop})
        return response.data.data
    } catch (error) {
        return error
    }
}


export const getAssignedRecruits = async (from: any, to: any) => {
    try {
        const response = await axios.post(`/smart-recruitment/api/recruitment/assigned-list`, {from: from, to: to})
        return response.data.data
    } catch (error) {
        return error
    }
}
