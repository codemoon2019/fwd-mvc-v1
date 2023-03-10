import { Router } from 'express';
import AgentController from '../controllers/agent.controller';
import { Routes } from '../interfaces/routes.interface';

class AgentRoute implements Routes {
  public path = '/smart-recruitment/api/agent';
  public router = Router();
  public agentController = new AgentController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/list`, this.agentController.getAgentList);
    this.router.post(`${this.path}/agentDetails`, this.agentController.getAgentDetails)
  }
}

export default AgentRoute;
