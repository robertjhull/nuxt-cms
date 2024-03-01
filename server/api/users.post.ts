export default defineEventHandler(async (event) => {
  const { id } = await readBody(event);
  const users = await import("./users.json");

  const user = users.default.find((u) => u.id == id);
  // Simulating a network request with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(user);
    }, 1000); // delay of 1 second
  });
});
