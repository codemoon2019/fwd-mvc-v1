import { NextFunction, Request, Response } from 'express';
import AgentService from '../services/agent.service';
import { GetAgentDetailsFormData } from '../interfaces/agent.interface';
class AgentController {
  public agentService = new AgentService();

  public getAgentList = async (req: Request, res: Response, next: NextFunction): Promise<any> => {

    try {
      const getAgentList = await this.agentService.getAgentList();
      res.status(201).json({ data: getAgentList, message: 'findAllAgents' });
    } catch (error) {
      next(error);
    }
  };

  public getAgentDetails = async (req: Request, res: Response, next: NextFunction): Promise<any> => {

    const getAgentDetailsData: GetAgentDetailsFormData = req.body;

    try {
      const getAgentDetails = await this.agentService.getAgentDetails(getAgentDetailsData);
      res.status(201).json({ data: getAgentDetails, message: 'getAgentDetails' });
    } catch (error) {
      next(error);
    }
  };
}

export default AgentController;