This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


# 项目说明

购物车功能

### 已实现功能清单

* React + Typescript
* 动画打开购物车抽屉
* 购车分类 音乐、视频、图片
* node 实现模拟上面定义的6个接口
* mock 数据
* 点击遮照层、关闭按钮、键盘esc可以关闭购物车
* 打开关闭购物车时需要有开关动画
* 按钮点击后，需要打印：业务线、id、总价格


## 设计与思考

### 技术栈
* Next（一套代码完成前后端开发）
* React
* Typescript
* zustand (轻量化 + 社区成熟 + 健全的文档 + 用户体量)
* tailwind (可扩展性好、 小体积、社区庞大、 避免 CSS 冗余和命名冲突、开发效率高（明命、原子化无需在组合写css）)

#### store
* 通过 zustand 实现购物车核心数据、状态管理思考如下：
* 核心逻辑处理的唯一性
* 购物车全局性
* 打开场景的多样化
* 数据多样化的处理
* 后续可扩展性


### 项目文件描述
```shell
├── app
│   ├── api   #模拟实现接口
├── components
│   ├── CartDrawer # 购物车抽屉
│   ├── CartFixedPopup # 购物车浮层
│   ├── CartListItem # 购物车列表卡片
│   ├── CheckBox # 基础Checkbook
│   ├── Drawer # 基础抽屉
│   ├── HomeTypeTabs
│   ├── Mask #基础Mask
│   ├── Show # 组件显示控制
│   └── Tabs # 基础Tabs
├── constants
│   └── cart.ts # 常量配置
├── hooks
│   └── useLockBodyScroll.ts # 锁定body滚动hook
├── lib
│   └── actions.ts # server action 接口处理
├── mock
│   └── mockCard.ts # mock 数据
├── stores
│   └── cartStore.ts # 购物车状态管理
└── types #全局type管理
    ├── cartMod.ts
    ├── commonMod.ts
    ├── downloadLicTypesBoughtMod.ts
    └── reseponseMod.ts
```


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
