/**
 * 游戏人生通用gid
 * @ignore
 */
const GAME_LIFE = 100;

/**
 * 王者荣耀的 gid
 * @ignore
 */
const GAME_PVP = 331;

/**
 * 和平精英的 gid
 * @ignore
 */
const GAME_GP = 411;

/**
 * 欢乐斗地主的 gid
 * @ignore
 */
const GAME_HLDDZ = 323;

/**
 * 欢乐麻将的 gid
 * @ignore
 */
const GAME_MAJIANG = 304;

/**
 * 英雄联盟手游的 gid
 * @ignore
 */
const GAME_LOLM = 425;

/**
 * 最强 NBA的 gid
 * @ignore
 */
const GAME_NBA = 406;

/**
 * 神角技巧的 gid
 * @ignore
 */
const GAME_SJJQ = 460;

/**
 * 黎明觉醒的 gid
 * @ignore
 */
const GAME_LMJX = 428;

/**
 * 天涯明月刀手游的 gid
 * @ignore
 */
const GAME_TY = 281;

/**
 * 天龙八部手游的 gid
 * @ignore
 */
const GAME_TLBB = 396;

/**
 * 穿越火线的 gid
 * @ignore
 */
const GAME_CF = 2;

/**
 * 英雄联盟的 gid
 * @ignore
 */
const GAME_LOL = 26;

/**
 * 穿越火线-枪战王者的 gid
 * @ignore
 */
const GAME_CFM = 333;

/**
 * QQ炫舞手游的 gid
 * @ignore
 */
const GAME_X5M = 507;

/**
 * 腾讯掼蛋的 gid
 * @ignore
 */
const GAME_TXGD = 508;

/**
 * 妄想山海的 gid
 * @ignore
 */
const GAME_SHANHAI = 429;

/**
 * 金铲铲之战的 gid
 * @ignore
 */
const GAME_JCC = 461;

/**
 *
 * GID 映射表
 *
 * |  名称  |  游戏  |
 * |  ---  |  ---  |
 * |  GAME_LIFE  |  游戏人生  |
 * |  GAME_PVP  |  王者荣耀  |
 * |  GAME_GP  |  和平精英  |
 * |  GAME_HLDDZ  |  欢乐斗地主  |
 * |  GAME_MAJIANG  |  欢乐麻将  |
 * |  GAME_LOLM  |  英雄联盟手游  |
 * |  GAME_NBA  |  最强 NBA  |
 * |  GAME_SJJQ  |    神角技巧  |
 * |  GAME_LMJX  |  黎明觉醒  |
 * |  GAME_TY  |  天涯明月刀手游  |
 * |  GAME_TLBB  |  天龙八部手游  |
 * |  GAME_CF  |  穿越火线  |
 * |  GAME_LOL  |  英雄联盟  |
 * |  GAME_CFM  |  穿越火线-枪战王者  |
 * |  GAME_X5M  |  QQ炫舞手游  |
 * |  GAME_TXGD  |  腾讯掼蛋  |
 * |  GAME_SHANHAI  |  妄想山海  |
 * |  GAME_JCC  |  金铲铲之战  |
 */
export const GID_MAP = {
  GAME_LIFE,
  GAME_PVP,
  GAME_GP,
  GAME_HLDDZ,
  GAME_MAJIANG,
  GAME_LOLM,
  GAME_NBA,
  GAME_SJJQ,
  GAME_LMJX,
  GAME_TY,
  GAME_TLBB,
  GAME_CF,
  GAME_LOL,
  GAME_CFM,
  GAME_X5M,
  GAME_TXGD,
  GAME_SHANHAI,
  GAME_JCC,
} as const;
