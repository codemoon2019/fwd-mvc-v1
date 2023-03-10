import { NextFunction, Request, Response } from 'express';
import { CreateRecruiterApplicationDTO } from './../dtos/recruitment-form.dto';
import recruitmentService from './../services/recruitment.service';
import StrikeIronService from '../services/strikeiron.service';
import CheckEmailAlexSrtService from '../services/checkEmailAlexSrt';
import { StrikeIronFormData } from '../interfaces/strikeiron.interface';
import { CheckEmailAlexSrtFormData } from '../interfaces/checkEmailAlexSrt.interface';
import { HttpException } from '../exceptions/HttpException';

class RecruitmentController {
  public recruitmentService = new recruitmentService();
  public strikeIronService = new StrikeIronService();
  public checkEmailAlexSrtService = new CheckEmailAlexSrtService();

  public registerRecruit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const recruitData: CreateRecruiterApplicationDTO = req.body;

    try {
      const checkEmailAlexSrtFormData : CheckEmailAlexSrtFormData = {
        "recEmail": recruitData.email
      }

      const checkEmailAlexSrtResponse = await this.checkEmailAlexSrtService.checkEmailAlexSrt(checkEmailAlexSrtFormData);
      if (checkEmailAlexSrtResponse.length === 0) {
        throw new HttpException(400, 'Email is already registered to another user')
      }

      const strikeIronData: StrikeIronFormData = {
        "contactInfo": {
          "emailAddress": recruitData.email,
          "mobileNumber": recruitData.mobile_number
        }
      }

      const strikeIronResponse = await this.strikeIronService.callStrikeIron(strikeIronData)
      if (strikeIronResponse.responseCode !== "000") {
        throw new HttpException(400, 'Invalid email/mobile number')
      }

      const registeredRecruitData = await this.recruitmentService.registerRecruitInfo(recruitData);

      res.status(201).json({ data: registeredRecruitData, message: 'registered' });
    } catch (error) {
      next(error);
    }
  };

  
  public getAllRecruits = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllRecruits = await this.recruitmentService.findAllRecruits(req.body.bop);

      res.status(200).json({ data: findAllRecruits, message: 'findAllRecruits' });
    } catch (error) {
      next(error);
    }
  };

  public getAllAssignedRecruits = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllAssignedRecruits = await this.recruitmentService.findAllAssignedRecruits(req.body.from, req.body.to);

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
      const recruitId = Number(req.body.id);
      const assignAgent = await this.recruitmentService.markPresent(recruitId);

      res.status(200).json({ data: assignAgent, message: 'markPresent' });
    } catch (error) {
      next(error);
    }
  };

}

export default RecruitmentController;