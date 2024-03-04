import { User } from "~/interfaces";

const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  try {
    const { body: user, statusCode } = await $fetch<{
      body?: User | string;
      statusCode: number;
    }>(
      `${config.functionsBaseUrl}user/getDashboard?blocking=true&result=true`,
      {
        method: "POST",
        body: { userId: config.defaultUserId },
        headers: {
          ContentType: `application/json`,
          Authorization: `Basic ${config.functionsAuthToken}`,
        },
      }
    );

    if (statusCode !== 200) {
      return createError({
        statusCode: statusCode,
        message: "Failed to get user dashboard",
      });
    }

    return user;
  } catch (error) {
    console.error(error);
    return createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    });
  }
});
