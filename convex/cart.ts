import { mutation, query } from "./_generated/server";


interface prodObj {
  name: string;
  price: number;
  img: string;
  asin: string;
  amount: number;
  totalPrice: number;
}

export const getCart = query(async ({ db }, { userId }: { userId: string }) => {
  return await db
    .query("cart")
    .filter((q) => q.eq(q.field("userId"), userId))
    .collect();
});

export const addToCart = mutation(
  async ({ db }, { userId, product }: { userId: string; product: prodObj }) => {

    product.price = parseFloat(product.price as unknown as string);

    const existingItem = await db
      .query("cart")
      .filter((q) =>
        q.and(
          q.eq(q.field("userId"), userId),
          q.eq(q.field("asin"), product.asin)
        )
      )
      .first();

    if (existingItem) {
      await db.patch(existingItem._id, {
        amount: existingItem.amount + product.amount,
        totalPrice: existingItem.totalPrice + product.price * product.amount,
      });
    } else {
      await db.insert("cart", {
        ...product,
        userId,
        totalPrice: product.price * product.amount,
        createdAt: Date.now(),
      });
    }
  }
);

export const removeOneFromCart = mutation(
  async (
    { db },
    { userId, productId }: { userId: string; productId: string }
  ) => {
    const product = await db
      .query("cart")
      .filter((q) =>
        q.and(q.eq(q.field("userId"), userId), q.eq(q.field("asin"), productId))
      )
      .first();

    if (product) {
      if (product.amount > 1) {
        await db.patch(product._id, {
          amount: product.amount - 1,
          totalPrice: product.totalPrice - product.price,
        });
      } else {
        await db.delete(product._id);
      }
    } else {
      throw new Error("Product not found in cart");
    }
  }
);

export const removeItem = mutation(
  async (
    { db },
    { userId, productId }: { userId: string; productId: string }
  ) => {
    const product = await db
      .query("cart")
      .filter((q) =>
        q.and(q.eq(q.field("userId"), userId), q.eq(q.field("asin"), productId))
      )
      .first();

    if (product) {
      await db.delete(product._id);
    } else {
      throw new Error("Product not found in cart");
    }
  }
);

export const clearCart = mutation(
  async ({ db }, { userId }: { userId: string }) => {
    const items = await db
      .query("cart")
      .filter((q) => q.eq(q.field("userId"), userId))
      .collect();

    for (const item of items) {
      await db.delete(item._id); 
    }
  }
);
