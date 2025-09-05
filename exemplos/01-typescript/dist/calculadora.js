"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.somar = somar;
exports.subtrair = subtrair;
exports.multiplicar = multiplicar;
exports.dividir = dividir;
function somar(a, b) {
    return a + b;
}
function subtrair(a, b) {
    return a - b;
}
function multiplicar(a, b) {
    return a * b;
}
function dividir(a, b) {
    if (b === 0)
        throw new Error('Divisão por zero não é permitida.');
    return a / b;
}
