export interface IRequest {
  (): Promise<any>;
  resolve?: (...args: any) => any;
  reject?: (...args: any) => any;
}
