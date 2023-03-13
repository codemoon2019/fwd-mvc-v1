export interface GetAgentDetailsFormData {
    AGENTID: string;
}

export interface AgentDetail {
    BRANCH: string;
    FWD: string;
    DESIGNATION: string;
    ADM: string;
    CHANNELCD: string;
    FWM: string;
    AGENTID: string;
}

export type GetAgentDetailsResponse = AgentDetail[]