import { Router } from 'express';
import RecruitmentController from './../controllers/recruitment.controller';
import { CreateRecruiterApplicationDTO } from './../dtos/recruitment-form.dto';
import { Routes } from './../interfaces/routes.interface';
import validationMiddleware from './../middlewares/validation.middleware';

class RecruitmentRoute implements Routes {
  public path = '/smart-recruitment/api/recruitment';
  public router = Router();
  public recruitmentController = new RecruitmentController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, validationMiddleware(CreateRecruiterApplicationDTO, 'body'), this.recruitmentController.registerRecruit);
    this.router.post(`${this.path}/list`, this.recruitmentController.getAllRecruits);
    this.router.post(`${this.path}/assigned-list`, this.recruitmentController.getAllAssignedRecruits);
    this.router.put(`${this.path}/assign-agent/:id(\\d+)`, this.recruitmentController.assignAgent);
    this.router.post(`${this.path}/mark-present`, this.recruitmentController.markPresent);
  }
}

export default RecruitmentRoute;
