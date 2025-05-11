export const getBuyerCartVideos = async () => {
  const res = await fetch(`/api/vjh/buyer/cart/videos`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data.data;
};

export const getBuyerCartFotos = async () => {
  const res = await fetch(`/api/vjh/buyer/cart/fotos`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data.data;
};

export const getBuyerCartMusics = async () => {
  const res = await fetch(`/api/vjm/cart/music/musics`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data.data;
};
