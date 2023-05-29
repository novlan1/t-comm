export type Get<T, K> =
  // 是属性
  K extends keyof T
    ? // 直接返回
    T[K]
    : // 分割字符
    K extends `${infer F}.${infer R}`
      ? // 判断是否是 属性
      F extends keyof T
        ? // 是，则递归处理剩余的参数
        Get<T[F], R>
        : // 否则 返回 never
        never
      : // 属性为空，必然是匹配到空字符串的场景，此时返回 never
      never;

export type Data = { [key: string]: unknown };

export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

// Conditional returns can enforce identical types.
// See here: https://github.com/Microsoft/TypeScript/issues/27024#issuecomment-421529650
type Equal<Left, Right> =
  (<T>() => T extends Left ? 1 : 0) extends
  (<T>() => T extends Right ? 1 : 0) ? true : false;

export type HasDefined<T> = Equal<T, unknown> extends true ? false : true;

// If the type T accepts type "any", output type Y, otherwise output type N.
// https://stackoverflow.com/questions/49927523/disallow-call-with-any/49928360#49928360
export type IfAny<T, Y, N> = 0 extends 1 & T ? Y : N;

export type LooseRequired<T> = { [P in string & keyof T]: T[P] };

export type EnumValues<T> = T[keyof T];

export type EnumKeys<T> = keyof T;
