import { HttpException } from '../exceptions/HttpException';
import {
  AgentDropdownInfoList,
  GetAgentDetailsFormData,
  GetAgentDetailsResponse,
} from '../interfaces/agent.interface';
import { isEmpty } from '../utils/util';
import createGenericApiInstance from '../utils/createGenericApiInstance';

class AgentService {

  public async getAgentList(): Promise<AgentDropdownInfoList> {

    const agentApi = createGenericApiInstance();

    return new Promise((resolve, reject) => {
        agentApi.post('/srp-get-agent-list', {})
      .then((response) => {
        const serverResponse = response.data
        resolve(serverResponse)
      }).catch(error => {
        reject(error)
      })
    })
  }

  public async getAgentDetails(getAgentDetailsFormData: GetAgentDetailsFormData): Promise<GetAgentDetailsResponse> {
    const agentApi = createGenericApiInstance();

    if (isEmpty(getAgentDetailsFormData)) throw new HttpException(400, "AgentId Data is empty");

    return new Promise((resolve, reject) => {
        agentApi.post('/srp-get-agent-details', getAgentDetailsFormData)
      .then((response) => {
        const serverResponse = response.data
        resolve(serverResponse)
      }).catch(error => {
        reject(error)
      })
    })
  }

}

export default AgentService;