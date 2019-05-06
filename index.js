const server = require("./server.js");

const port = 9999;
server.listen(port, () => {
  console.log(` ********* server is listening to ${port} ************* `);
});
