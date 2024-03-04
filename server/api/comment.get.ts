import { Comment } from "~/interfaces";

const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  try {
    const { body: comments, statusCode } = await $fetch<{
      body?: Comment[] | string;
      statusCode: number;
    }>(`${config.functionsBaseUrl}comment/getAll?blocking=true&result=true`, {
      method: "POST",
      query: { userId: config.defaultUserId },
      headers: {
        ContentType: `application/json`,
        Authorization: `Basic ${config.functionsAuthToken}`,
      },
    });

    if (statusCode !== 200) {
      return createError({
        statusCode: statusCode,
        message: "Failed to get comments",
      });
    }

    return comments;
  } catch (error) {
    console.error(error);
    return createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    });
  }
});
