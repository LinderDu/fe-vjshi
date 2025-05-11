import { type NextRequest } from "next/server";
import { IReseponseData } from "@/types/reseponseMod";
import { IMusicCart } from "@/types/cartMod";
import { musics } from "@/mock/mockCard";

export async function GET(req: NextRequest) {
  if (req.method === "GET") {
    const data: IReseponseData<IMusicCart[]> = {
      success: true,
      code: 200,
      data: [...musics],
    };
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else {
    return new Response(`Method ${req.method} Not Allowed`, {
      status: 405,
      headers: {
        Allow: "GET",
      },
    });
  }
}
