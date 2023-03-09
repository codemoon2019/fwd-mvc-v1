import { NextFunction, Request, Response } from 'express';
import AgentService from '../services/agent.service';

class AgentController {
  public agentService = new AgentService();

  public getAgentList = async (req: Request, res: Response, next: NextFunction): Promise<any> => {

    try {
      const getAgentList = await this.agentService.getAgentList();
      res.status(201).json({ data: getAgentList, message: 'findAllSrpBranches' });
    } catch (error) {
      next(error);
    }
  };
}

export default AgentController;