import { CreateRecruiterApplicationDTO } from './../dtos/recruitment-form.dto';
import { HttpException } from './../exceptions/HttpException';
import { RecruitmentFormData } from './../interfaces/recruitment.interface';
import { Recruitments } from './../models/recruitment.model';
import { isEmpty } from './../utils/util';

class RecruitmentService {

  public async registerRecruitInfo(recruitmentData: CreateRecruiterApplicationDTO): Promise<CreateRecruiterApplicationDTO> {

    const findRecruitEmail: RecruitmentFormData = await Recruitments.query().select().from('recruits').where('email', '=', recruitmentData.email).first();
    if (findRecruitEmail) throw new HttpException(409, `This email already exists`);

    const findRecruitMobile: RecruitmentFormData = await Recruitments.query().select().from('recruits').where('mobile_number', '=', recruitmentData.mobile_number).first();
    if (findRecruitMobile) throw new HttpException(409, `This phone already exists`);

    if (isEmpty(recruitmentData)) throw new HttpException(400, "recruitmentData is empty");

    const createRecruitmentData: RecruitmentFormData = await Recruitments.query()
      .insert({ ...recruitmentData })
      .into('recruits');

    return createRecruitmentData;
  }

  public async findAllRecruits(bop: string): Promise<CreateRecruiterApplicationDTO[]> {
    let recruits: RecruitmentFormData[] = await Recruitments.query().select().from('recruits').where('recruiter', '=', "");

    if(bop !== ""){
      recruits = await Recruitments.query().select().from('recruits').where('recruiter', '=', "").where('bop', '=', bop);
    }
    return recruits;
  }

  public async findAllAssignedRecruits(from: string, to: string): Promise<CreateRecruiterApplicationDTO[]> {
    const recruits: RecruitmentFormData[] = await Recruitments.query().select().from('recruits').where('recruiter', '!=', "").whereBetween('created_at', [from, to]);;
    return recruits;
  }

  public async assignAgent(recruitId: number, recruiter: string, recruiter_details: string): Promise<RecruitmentFormData> {
    const findRecruit = await Recruitments.query().select().from('recruits').where('id', '=', recruitId);
    if (!findRecruit) throw new HttpException(409, "This recruit does not exist.");

    await Recruitments.query()
      .update({ "recruiter": recruiter, "recruiter_details": recruiter_details })
      .where('id', '=', recruitId)
      .into('recruits');

    const updateRecruitData = await Recruitments.query().select().from('recruits').where('id', '=', recruitId).first();
    return updateRecruitData;
  }

  
  public async markPresent(recruitId: number): Promise<RecruitmentFormData> {
    if (isEmpty(recruitId)) throw new HttpException(400, "provide the id");
    const findRecruit = await Recruitments.query().select().from('recruits').where('id', '=', recruitId);
    if (!findRecruit) throw new HttpException(409, "This recruit does not exist.");

    await Recruitments.query()
      .update({ "isPresent": "Yes" })
      .where('id', '=', recruitId)
      .into('recruits');

    const updateRecruitData = await Recruitments.query().select().from('recruits').where('id', '=', recruitId).first();
    return updateRecruitData;
  }

}

export default RecruitmentService;