export type IReportArr = Array<{
  code_specification_score: number;
  code_security_score: number;
  codecc_url: string;
  project_name: string;
  owners: string;
}>;

export interface IRequestInfo {
  bgName: string;
  centerName: string;
  groupName: string;
}

export interface ISearchInfo {
  prefix: string
}
