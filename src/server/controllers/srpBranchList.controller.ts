import { NextFunction, Request, Response } from 'express';
import SrpBranchListService from '../services/srpBranchList.service';
import { SrpBranchListFormData } from '../interfaces/srpBranchList.interface';

class SrpBranchListController {
  public srpBranchListService = new SrpBranchListService();

  public getSrpBranchList = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const srpBranchListData: SrpBranchListFormData = req.body;

    try {
      const findAllSrpBranches = await this.srpBranchListService.callSrpBranchList(srpBranchListData);
      res.status(201).json({ data: findAllSrpBranches, message: 'findAllSrpBranches' });
    } catch (error) {
      next(error);
    }
  };
}

export default SrpBranchListController;