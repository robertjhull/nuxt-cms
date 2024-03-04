export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const newAppearanceSettings = await readBody(event);

  try {
    const { body: success, statusCode } = await $fetch<{
      body?: boolean | string;
      statusCode: number;
    }>(
      `${config.functionsBaseUrl}user/updateSettings?blocking=true&result=true`,
      {
        method: "POST",
        body: {
          userId: config.defaultUserId,
          ...newAppearanceSettings,
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
        message: "Failed to update settings",
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
