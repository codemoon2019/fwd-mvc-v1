import { HttpException } from '../exceptions/HttpException';
import {
  CheckEmailAlexSrtFormData,
  CheckEmailAlexSrtResponse,
} from '../interfaces/checkEmailAlexSrt.interface';
import { isEmpty } from '../utils/util';
import createGenApiInstance from '../utils/createGenericApi2Instance';

class CheckEmailAlexSrtService {

  public async checkEmailAlexSrt(checkEmailAlexSrtData: CheckEmailAlexSrtFormData): Promise<CheckEmailAlexSrtResponse> {

    if (isEmpty(checkEmailAlexSrtData)) throw new HttpException(400, "StrikeIronData is empty");
    
    const checkEmailAlexSrtApi = createGenApiInstance();

    return new Promise((resolve, reject) => {
      checkEmailAlexSrtApi.post('/srp-validate-email-exist', checkEmailAlexSrtData)
      .then((response) => {
        const serverResponse = response.data
        resolve(serverResponse)
      }).catch(error => {
        reject(error)
      })
    })
  }

}

export default CheckEmailAlexSrtService;