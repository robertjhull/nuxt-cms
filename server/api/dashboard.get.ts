import { User } from "~/interfaces";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

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

  console.log("payload: " + user);
  return user;
});
