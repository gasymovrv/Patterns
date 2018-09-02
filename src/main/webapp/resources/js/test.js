function* generateSequence() {
    yield 1;
    yield 2;
    return 3;
}
let generator = generateSequence();
for(let value of generator) {
    alert(value); // 1, затем 2
}