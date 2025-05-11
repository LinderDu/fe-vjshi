export type ILlicType = "NP" | "LP" | "LPPLUS"; // 加入购物车时选的授权类型：“个人授权” ｜ “企业授权” ｜ “企业PLUS”

export const LIIC_TYPE = {
  NP: "NP",
  LP: "LP",
  LPPLUS: "LPPLUS",
}; // 购物车类型

export const LIIC_TYPE_LABEL = {
  NP: "个人授权",
  LP: "企业授权",
  LPPLUS: "企业PLUS",
}; // 购物车类型对应的中文名称
