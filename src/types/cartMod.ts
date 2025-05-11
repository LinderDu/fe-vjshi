import { ILlicType } from "./commonMod";

export interface ICart {
  auditStatus: "SUCCESS" | "FAIL"; // 分别代表上架下架​8
  coverImage: string; // 封面图​9
  price: number; // 个人授权价格​10
  title: string; // 素材标题​12
  licType: ILlicType;
  vid: number; // 素材唯一id​14
}

export interface IVideoCart extends ICart {
  softwareType: "视频素材" | "AE模板" | "C4D模版"; // 类型​11
}

export interface IFotoCart extends ICart {
  softwareType: "图片素材" | "AI模板" | "PSD模版"; // 类型​11
}

export type IMusicCart = ICart;
