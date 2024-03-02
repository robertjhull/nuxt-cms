const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const postId = getQuery(event);
  try {
    const posts = await $fetch(`${config.functionsBaseUrl}post/getPreview`, {
      method: "GET",
      query: { userId: config.defaultUserId, postId: postId },
      headers: {
        Authorization: `Bearer ${config.functionsAuthToken}`,
      },
    });

    if (!posts) {
      return createError({
        statusCode: 404,
        message: "Failed to get posts",
      });
    }

    return posts;
  } catch (error) {
    console.error(error);
    return createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    });
  }
});
