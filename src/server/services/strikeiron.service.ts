import { HttpException } from '../exceptions/HttpException';
import {
  StrikeIronFormData,
  StrikeIronResponse,
} from '../interfaces/strikeiron.interface';
import { isEmpty } from '../utils/util';
import createStrikeIronInstance from '../utils/createStrikeIronInstance';

class StrikeIronService {

  public async callStrikeIron(strikeIronData: StrikeIronFormData): Promise<StrikeIronResponse> {
    
    if (isEmpty(strikeIronData)) throw new HttpException(400, "StrikeIronData is empty");

    const strikeIronApi = createStrikeIronInstance();

    return new Promise((resolve, reject) => {
      strikeIronApi.post('/', strikeIronData)
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