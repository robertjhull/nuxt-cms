import { User } from "~/interfaces";

export default defineEventHandler(async (event) => {
  const { userId } = getQuery(event);

  const { functionsBaseUrl } = useRuntimeConfig();

  const user: User = await $fetch(`${functionsBaseUrl}user/getDashboard`, {
    method: "POST",
    query: { userId: userId },
  });

  if (!user) {
    throw createError({
      statusCode: 400,
      statusMessage: "Could not locate user.",
    });
  }

  console.log("payload: " + user);
  return user;
});
