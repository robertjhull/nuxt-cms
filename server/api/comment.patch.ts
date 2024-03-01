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
    const updatedComment: boolean = await $fetch(
      `${config.functionsBaseUrl}comment/updateStatus`,
      {
        method: "PATCH",
        body: {
          commentId,
          status,
        },
      }
    );

    if (!updatedComment) {
      return createError({
        statusCode: 404,
        message: "Failed to update comment status",
      });
    }

    return updatedComment;
  } catch (error) {
    console.error(error);
    return createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    });
  }
});
