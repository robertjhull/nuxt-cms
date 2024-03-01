export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const users = await import("./users.json");
  const user = users.default.find((u) => u.id == body.id);

  if (!user) {
    throw createError({
      statusCode: 400,
      statusMessage: "Could not locate user settings.",
    });
  }

  console.log(body);
  // do something

  // Simulating a network request with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1000); // delay of 1 second
  });
});
