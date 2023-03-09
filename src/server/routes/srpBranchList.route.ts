import { Router } from 'express';
import SrpBranchListController from '../controllers/srpBranchList.controller';
import { Routes } from '../interfaces/routes.interface';

class SrpBranchListRoute implements Routes {
  public path = '/smart-recruitment/api/srpBranchList';
  public router = Router();
  public recruitmentController = new SrpBranchListController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, this.recruitmentController.getSrpBranchList);
  }
}

export default SrpBranchListRoute;
