export interface AgentDropdownInfoList {
    RECRUITER: string;
    BRANCH?: any;
    DESIGNATION: string;
    RECRUITEDBY?: any;
    AGENTID: string;
}

export interface GetAgentDetailsFormData {
    AGENTID: string;
}
interface AgentDetail {
    BRANCH: string;
    FWD: string;
    DESIGNATION: string;
    ADM: string;
    CHANNELCD: string;
    FWM: string;
    AGENTID: string;
}

export type GetAgentDetailsResponse = AgentDetail[]

