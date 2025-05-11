import { type NextRequest } from "next/server";

import { IReseponseData } from "@/types/reseponseMod";
import { videos, potos } from "@/mock/mockCard";
import { ICart } from "@/types/cartMod";

export async function GET(
  req: NextRequest,
  { params }: { params: { type: string } }
) {
  const { type } = await params;

  if (req.method === "GET") {
    const data: IReseponseData<ICart[]> = {
      success: true,
      code: 200,
      data: [...(type === "videos" ? videos : potos)],
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
