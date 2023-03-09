import { HttpException } from '../exceptions/HttpException';
import {
  AgentDropdownInfoList,
} from '../interfaces/agent.interface';
import { isEmpty } from '../utils/util';
import createAgentApiInstance from '../utils/createAgentApiInstance';

class StrikeIronService {

  public async getAgentList(): Promise<AgentDropdownInfoList> {

    const agentApi = createAgentApiInstance();

    return new Promise((resolve, reject) => {
        agentApi.post('/', {})
      .then((response) => {
        const serverResponse = response.data
        resolve(serverResponse)
      }).catch(error => {
        reject(error)
      })
    })
  }

}

export default StrikeIronService;