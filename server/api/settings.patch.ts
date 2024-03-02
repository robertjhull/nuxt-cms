const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const { newAppearanceSettings } = await readBody(event);

  try {
    const updated: boolean = await $fetch(
      `${config.functionsBaseUrl}user/updateSettings`,
      {
        method: "PATCH",
        body: {
          userId: config.defaultUserId,
          ...newAppearanceSettings,
        },
      }
    );

    if (!updated) {
      return createError({
        statusCode: 404,
        message: "Failed to update settings",
      });
    }

    return updated;
  } catch (error) {
    console.error(error);
    return createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    });
  }
});
