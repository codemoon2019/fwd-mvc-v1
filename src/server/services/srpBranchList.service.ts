import {
  SrpBranchListFormData,
  SrpBranchListResponse,
} from '../interfaces/srpBranchList.interface';
import createGenApiInstance from '../utils/createGenericApiInstance';

class SrpBranchListService {

  public async callSrpBranchList(srpBranchListData: SrpBranchListFormData): Promise<SrpBranchListResponse> {

    const strikeIronApi = createGenApiInstance();

    return new Promise((resolve, reject) => {
      strikeIronApi.post('/srp-get-brancht-list', srpBranchListData)
      .then((response) => {
        const serverResponse = response.data
        resolve(serverResponse)
      }).catch(error => {
        reject(error)
      })
    })
  }

}

export default SrpBranchListService;