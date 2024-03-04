const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const { commentId, status } = await readBody(event);

  if (!["approved", "pending", "trash"].includes(status)) {
    return createError({
      statusCode: 400,
      statusMessage: "Invalid status provided",
    });
  }

  try {
    const { body: success, statusCode } = await $fetch<{
      body?: boolean | string;
      statusCode: number;
    }>(
      `${config.functionsBaseUrl}comment/updateStatus?blocking=true&result=true`,
      {
        method: "POST",
        body: {
          commentId,
          status,
        },
        headers: {
          ContentType: `application/json`,
          Authorization: `Basic ${config.functionsAuthToken}`,
        },
      }
    );

    if (statusCode !== 200) {
      return createError({
        statusCode: statusCode,
        message: "Failed to get update comment",
      });
    }

    return success;
  } catch (error) {
    console.error(error);
    return createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    });
  }
});
