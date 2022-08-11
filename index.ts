import Server from "@/externals/express";

const port = 8080;

Server.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

// TODOS
// 1. Fix Memory Repository
// 2. Fix start-dev script
// 3. Apply Prisma
// 4. Create MySQL Repository
// 5. Use MySQL Repository as test repository
