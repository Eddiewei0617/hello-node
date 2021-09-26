console.log("start", Date.now());

setTimeout(function () {
  console.log("Timeout", Date.now());
}, 1000); //睡一秒後再執行這句  1000毫秒=1秒  負數的話算0秒

console.log("after", Date.now());
// --> 順序是 start-after-timeout

console.log("--------------------------------");

console.log("start", Date.now());

setTimeout(function () {
  console.log("Timeout", Date.now());
}, 0); //延遲0秒

console.log("after", Date.now());
// --> 順序是 start-after-timeout
