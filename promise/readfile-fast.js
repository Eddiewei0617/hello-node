
// 用 filesystem 內建的 promise

const fs = require("fs/promises");
// console.log(fs);
// fs.readFile("input.txt", "utf-8").then((data) => {
//   console.log(data);
// });

(async () => {
  let data = await fs.readFile("input.txt", "utf-8");
  console.log("內建promise 的 await版", data);
})();