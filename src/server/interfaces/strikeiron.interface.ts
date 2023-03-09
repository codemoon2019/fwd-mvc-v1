export interface StrikeIronFormData {
  contactInfo: {
    mobileNumber: string;
    emailAddress: string; 
  }
}

type StrikeIronType = {
  type: string;
  validatedValue: null | string;
  statusNumber: string;
  statusMessage: string;
}

export interface StrikeIronResponse {
  responseCode: string;
  responseMessage: string;
  statusList: StrikeIronType[]
}
  