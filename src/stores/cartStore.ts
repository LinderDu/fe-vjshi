import {
  getBuyerCartFotos,
  getBuyerCartMusics,
  getBuyerCartVideos,
} from "@/lib/actions";
import { IVideoCart, IMusicCart, IFotoCart } from "@/types/cartMod";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartState = {
  cartTotal: number;
  openCartDrawer: boolean;
  videos: IVideoCart[];
  potos: IFotoCart[];
  musics: IMusicCart[];
};

export type CartActions = {
  // 初始化统一购物车数据
  initCart: () => Promise<void>;
  // 分开请求方便后续添加购物车类型后更新
  fetchCartVideos: () => Promise<void>;
  fetchCartFotos: () => Promise<void>;
  fetchCartMusics: () => Promise<void>;
  setCartTotal: () => void;
  setOpenCartDrawer: () => void;
  setCloseCartDrawer: () => void;
  setVideos: (video: IVideoCart) => Promise<void>;
  setPotos: (foto: IFotoCart) => Promise<void>;
  setMusics: (music: IMusicCart) => Promise<void>;
  setDeleteVideoById: (id: number) => void;
  setDeletePotoById: (id: number) => void;
  setDeleteMusicById: (id: number) => void;
};

const initialState: CartState = {
  cartTotal: 0,
  openCartDrawer: false,
  videos: [],
  potos: [],
  musics: [],
};

/**
 *
 * @description 购物车状态管理
 * 通过store管理购物车状态应对以下场景
 * 全局化
 * 打开场景的多样化
 * 购物车数据的多样化处理
 * 核心逻辑管理唯一性
 */

const useCartStore = create<CartState & CartActions>()(
  persist(
    (set, get) => {
      return {
        ...initialState,
        initCart: async () => {
          get().fetchCartVideos();
          get().fetchCartFotos();
          get().fetchCartMusics();
        },
        fetchCartFotos: async () => {
          const potos: IFotoCart[] = await getBuyerCartFotos();
          set({ potos: potos });
          get().setCartTotal();
        },
        fetchCartVideos: async () => {
          const videos: IVideoCart[] = await getBuyerCartVideos();
          set({ videos: videos });
          get().setCartTotal();
        },
        fetchCartMusics: async () => {
          const musics: IMusicCart[] = await getBuyerCartMusics();
          set({ musics: musics });
          get().setCartTotal();
        },
        setCartTotal: () => {
          const videosLength = get().videos.length;
          const potosLength = get().potos.length;
          const musicsLength = get().musics.length;
          set({ cartTotal: videosLength + potosLength + musicsLength });
        },
        setOpenCartDrawer: () => {
          const isOpneStatus = get().openCartDrawer;
          if (isOpneStatus) return;
          set({ openCartDrawer: true });
        },
        setCloseCartDrawer: () => {
          set({ openCartDrawer: false });
        },
        setVideos: async (video) => {
          set({ videos: [...get().videos, video] });
          // TODO update fetch
        },
        setPotos: async (foto) => {
          set({ potos: [...get().potos, foto] });
          // TODO update fetch
        },
        setMusics: async (music) => {
          set({ musics: [...get().musics, music] });
          // TODO update fetch
        },
        setDeleteMusicById: (id: number) => {
          const musics = get().musics;
          const newMusics = musics.filter((item) => item.vid !== id);
          set({ musics: newMusics });
          get().setCartTotal();
        },
        setDeletePotoById: (id: number) => {
          const potos = get().potos;
          const newPotos = potos.filter((item) => item.vid !== id);
          set({ potos: newPotos });
          get().setCartTotal();
        },
        setDeleteVideoById: (id: number) => {
          const videos = get().videos;
          const newVideos = videos.filter((item) => item.vid !== id);
          set({ videos: newVideos });
          get().setCartTotal();
        },
      };
    },
    { name: "cartStore" }
  )
);

export default useCartStore;
