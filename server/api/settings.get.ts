import { Settings } from "~/interfaces";

const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  try {
    const { body: settings, statusCode } = await $fetch<{
      body?: Settings | string;
      statusCode: number;
    }>(`${config.functionsBaseUrl}user/getSettings?blocking=true&result=true`, {
      method: "POST",
      body: { userId: config.defaultUserId },
      headers: {
        ContentType: `application/json`,
        Authorization: `Basic ${config.functionsAuthToken}`,
      },
    });

    if (statusCode !== 200) {
      return createError({
        statusCode: statusCode,
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
