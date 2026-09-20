import { createError, defineEventHandler, getRouterParam } from "h3";

import { content } from "../../utils/content";

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");

  if (!slug) {
    throw createError({
      statusCode: 404,
      statusMessage: "Content page not found",
    });
  }

  if (import.meta.dev) {
    await content.refresh();
  }

  const page = await content.get(`/${slug}`);

  if (!page) {
    throw createError({
      statusCode: 404,
      statusMessage: "Content page not found",
    });
  }

  return page;
});
