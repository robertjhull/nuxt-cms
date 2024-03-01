export default defineEventHandler(async (event) => {
  const { id } = getQuery(event);
  const posts = await import("./posts.json");

  if (id) {
    const post = posts.default.find((p) => p.id == id);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([post]);
      }, 1000); // delay of 1 second
    });
  }
  // Simulating a network request with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(posts.default);
    }, 1000); // delay of 1 second
  });
});
