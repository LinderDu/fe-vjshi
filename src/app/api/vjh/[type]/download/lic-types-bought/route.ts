import { type NextRequest } from "next/server";
import { ILicTypesBought } from "@/types/downloadLicTypesBoughtMod";
import { IReseponseData } from "@/types/reseponseMod";

export async function GET(
  req: NextRequest
  // { params }: { params: { type: string } }
) {
  if (req.method === "GET") {
    const data: IReseponseData<ILicTypesBought[]> = {
      success: true,
      code: 200,
      data: [
        {
          licTypes: "NP",
          mid: 1,
        },
      ],
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

// /vjh/buyer/cart/videos
// /vjh/buyer/cart/fotos
// /vjm/cart/music/musics

// /vjh/video/download/lic-types-bought
// /vjh/foto/download/lic-types-bought
// /vjh/music/download/lic-types-bought
