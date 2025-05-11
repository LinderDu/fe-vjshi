import Tabs from "@/components/HomeTypeTabs";
import Cart from "@/components/Cart";
import CartDrawer from "@/components/CartDrawer";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <section className="pt-35 w-full px-11 mx-auto text-center">
          <h2 className="text-7xl font-medium text-black">发现更多好素材</h2>
          <Tabs />
        </section>
      </main>
      <Cart />
      <CartDrawer />
    </div>
  );
}
