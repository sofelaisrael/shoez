import { mutation, query } from "./_generated/server";

interface prodObj {
  name: string;
  price: number;
  img: string;
  asin: string;
}

export const getWishlist = query(
  async ({ db }, { userId }: { userId: string }) => {
    return await db
      .query("wishlist")
      .filter((q) => q.eq(q.field("userId"), userId))
      .collect();
  }
);

export const addToWishList = mutation(
  async ({ db }, { userId, product }: { userId: string; product: prodObj }) => {
    const existingItem = await db
      .query("wishlist")
      .filter((q) =>
        q.and(
          q.eq(q.field("userId"), userId),
          q.eq(q.field("asin"), product.asin)
        )
      )
      .first();

    if (existingItem) {
      return;
    } else {
      await db.insert("wishlist", {
        ...product,
        userId,
        createdAt: Date.now(),
      });
    }
  }
);

export const removeItem = mutation(
  async (
    { db },
    { userId, productId }: { userId: string; productId: string }
  ) => {
    const product = await db
      .query("wishlist")
      .filter((q) =>
        q.and(q.eq(q.field("userId"), userId), q.eq(q.field("asin"), productId))
      )
      .first();
      console.log(product)

    if (product) {
      await db.delete(product._id);
    } else {
      throw new Error("Product not found in cart");
    }
  }
);

export const clearList = mutation(
  async ({ db }, { userId }: { userId: string }) => {
    const items = await db
      .query("wishlist")
      .filter((q) => q.eq(q.field("userId"), userId))
      .collect();

    for (const item of items) {
      await db.delete(item._id);
    }
  }
);
