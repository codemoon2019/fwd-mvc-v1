import { NextFunction, Request, Response } from 'express';
import { CreateRecruiterApplicationDTO } from './../dtos/recruitment-form.dto';
import recruitmentService from './../services/recruitment.service';
import StrikeIronService from '../services/strikeiron.service';
import { StrikeIronFormData } from '../interfaces/strikeiron.interface';

class RecruitmentController {
  public recruitmentService = new recruitmentService();
  public strikeIronService = new StrikeIronService();

  public registerRecruit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const recruitData: CreateRecruiterApplicationDTO = req.body;
    const strikeIronData: StrikeIronFormData = {
      "contactInfo": {
        "emailAddress": recruitData.email,
        "mobileNumber": recruitData.mobile_number
      }
    }

    try {
      const strikeIronResponse = await this.strikeIronService.callStrikeIron(strikeIronData)
      if (strikeIronResponse.responseCode !== "000") {
        throw new Error('Invalid email/mobile number')
      }

      const registeredRecruitData = await this.recruitmentService.registerRecruitInfo(recruitData);

      res.status(201).json({ data: registeredRecruitData, message: 'registered' });
    } catch (error) {
      next(error);
    }
  };

  
  public getAllRecruits = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllRecruits = await this.recruitmentService.findAllRecruits();

      res.status(200).json({ data: findAllRecruits, message: 'findAllRecruits' });
    } catch (error) {
      next(error);
    }
  };

  public getAllAssignedRecruits = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllAssignedRecruits = await this.recruitmentService.findAllAssignedRecruits();

      res.status(200).json({ data: findAllAssignedRecruits, message: 'findAllAssignedRecruits' });
    } catch (error) {
      next(error);
    }
  };

  public assignAgent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const recruitId = Number(req.params.id);
      const assignAgent = await this.recruitmentService.assignAgent(recruitId, req.body.recruiter);

      res.status(200).json({ data: assignAgent, message: 'assignAgent' });
    } catch (error) {
      next(error);
    }
  };

  public markPresent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const recruitId = Number(req.params.id);
      const assignAgent = await this.recruitmentService.markPresent(recruitId);

      res.status(200).json({ data: assignAgent, message: 'markPresent' });
    } catch (error) {
      next(error);
    }
  };

}

export default RecruitmentController;