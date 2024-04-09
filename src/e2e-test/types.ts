export type IBrowser = any;
export type IPage = any;
export type ITestList = Array<{
  fail: number;
  title: string;
  err: {
    estack?: string;
  };
}>;
