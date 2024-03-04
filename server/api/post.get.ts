import { Post } from "~/interfaces";

const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  console.log("fired post.get.ts");

  const query = getQuery(event);
  try {
    const data = query.postId
      ? { userId: config.defaultUserId, postId: query.postId }
      : { userId: config.defaultUserId };

    const { body: posts, statusCode } = await $fetch<{
      body?: Post[];
      statusCode: number;
    }>(`${config.functionsBaseUrl}post/getPreview?blocking=true&result=true`, {
      method: "POST",
      body: data,
      headers: {
        ContentType: `application/json`,
        Authorization: `Basic ${config.functionsAuthToken}`,
      },
    });

    if (statusCode !== 200) {
      return createError({
        statusCode: statusCode,
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
