export type IGetWxSignaturePromise = () => Promise<{
  wxappid?: string;
  timestamp?: string;
  noncestr?: string;
  signature?: string;
}>;
