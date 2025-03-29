export type JSErrorFile = Record<string, any>;
export type SCSSErrorFile = Record<string, any>;

export type FileMap = {
  [k: string]: {
    reg: RegExp;
    lintKeyword: string;
    outputFileName: string;

    outputFile?: string;
    isStyle?: boolean;
    isVue?: boolean;

    total?: number;
    errorFiles?: JSErrorFile[];
  }
};
