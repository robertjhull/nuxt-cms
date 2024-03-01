const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  try {
    const settings = await $fetch(
      `${config.functionsBaseUrl}user/getSettings`,
      {
        method: "GET",
        query: { userId: config.defaultUserId },
        headers: {
          Authorization: `Bearer ${config.functionsAuthToken}`,
        },
      }
    );

    if (!settings) {
      return createError({
        statusCode: 404,
        message: "Failed to get settings",
      });
    }

    return settings;
  } catch (error) {
    console.error(error);
    return createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    });
  }
});
