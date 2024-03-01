export default defineEventHandler(async (event) => {
  const newDraft = await readBody(event);

  console.log(newDraft);

  // Simulating a network request with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1000); // delay of 1 second
  });
});
