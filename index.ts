import Server from "@/externals/express";

const port = 8080;

Server.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

// TODOS
// Clean up test db after all tests
