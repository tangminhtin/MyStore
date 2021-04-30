export const ACTIONS = {
  NOTIFY: "NOTIFY",
  AUTH: "AUTH",
  ADD_CART: "ADD_CART",
  ADD_MODAL: "ADD_MODAL",
  ADD_ORDERS: "ADD_ORDERS",
  ADD_USERS: "ADD_USERS",
  ADD_CATEGORIES: "ADD_CATEGORIES",
};

export const addToCart = (product, cart) => {
  if (product.inStock === 0)
    return { type: "NOTIFY", payload: { error: "Sản phẩm này đã hết hàng." } };

  const check = cart.every((item) => item._id !== product._id);
  if (!check)
    return {
      type: "NOTIFY",
      payload: { error: "Sản phẩm đã được thêm vào giỏ hàng." },
    };

  return { type: "ADD_CART", payload: [...cart, { ...product, quantity: 1 }] };
};
