import Server from "@/externals/express";

const port = 8080;

Server.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

// TODOS
// 4. Create MySQL Repository
// 5. Use MySQL Repository as test repository

// 1. Fix Memory Repository
