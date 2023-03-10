import { Router } from 'express';
import BOPController from './../controllers/bop.controller';
import { CreateBOPDTO } from './../dtos/bop.dto';
import { Routes } from './../interfaces/routes.interface';
import validationMiddleware from './../middlewares/validation.middleware';

class BOPRoute implements Routes {
  public path = '/smart-recruitment/api/bop';
  public router = Router();
  public bopController = new BOPController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, validationMiddleware(CreateBOPDTO, 'body'), this.bopController.createNewBOP);
    this.router.post(`${this.path}/list`, this.bopController.getAllBops);
    this.router.post(`${this.path}/list-dropdown`, this.bopController.getAllBopFilterByCurrentDate);
  }
}

export default BOPRoute;
