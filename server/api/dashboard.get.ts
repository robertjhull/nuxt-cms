import { User } from "~/interfaces";

const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  try {
    const user: User = await $fetch(
      `${config.functionsBaseUrl}user/getDashboard`,
      {
        method: "GET",
        query: { userId: config.defaultUserId },
        headers: {
          Authorization: `Bearer ${config.functionsAuthToken}`,
        },
      }
    );

    if (!user) {
      return createError({
        statusCode: 404,
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
