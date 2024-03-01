export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const users = await import("./users.json");
  const user = users.default.find((u) => u.id == query.id);

  if (!user) {
    throw createError({
      statusCode: 400,
      statusMessage: "Could not locate user.",
    });
  }

  const { settings } = user;

  // Simulating a network request with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(settings);
    }, 1000); // delay of 1 second
  });
});
