# 1.

readData(idx) {
for (let i = 0; i < 100; i++) {
idx++;
控制台日誌（idx）；
}
if (idx < 500) {
readData(idx);
}
}

readData(0);
console.log("after");

- A: 500

# 2

function readData(idx) {
for (let i = 0; i < 100; i++) {
idx++;
console.log(idx);
}
if (idx < 500) {
setTimeout(function () {
readData(idx);
}, 0);
}
}

readData(0);
console.log("after");

- A: 100
