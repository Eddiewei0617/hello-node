// 一般版: 1, 5, 2, 4, 6, 3
// await/async 版: 1, 5, 2, 6, 3, 4

console.log(1);

async function doWork() {
  console.log(2);

  // 暫停（不是阻塞）
  let result = await new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(3);
      resolve("完成"); // 解除暫停狀態，還把結果傳給 await
    }, 3000);
  });
  console.log("result", result);

  console.log(4);
}

console.log(5);
doWork();
console.log(6);