'use strict'
const fs = require('fs')

let TARGET = 2020

const input = fs.readFileSync('./inputs/day-one.txt').toString()

function parseInput(inputArr) {
    return input
        .split(/\s/)
        .map(x => parseInt(x.trim()))
        .sort((a, b) => a >= b ? 1 : -1)
        .filter(x => x <= TARGET)
}

const parsedInput = parseInput(input)

function getProducts(i, target, list, split) {
    // If I dips below zero, we've recursed too far - go back!
    if (i < 0) return

    // Get the difference between our top
    const diff = target - list[i]
    if (diff > 0) {
        const x = list.findIndex((num, j) => num > diff || j === i - 1)
        if (!x) return

        if (!split || split === 1) {
            if (list[x - 1] === diff) return [list[i], list[x - 1]]
        } else if (split > 0) {
            const a = getProducts(i - 1, diff, list.slice(0, i), split - 1)
            if (a && a.reduce((acc, num) => acc + num, 0)) return [list[i], ...a]
        }
    } else if (diff === 0 && split === 1) {
        return [list[i]]
    }
    return getProducts(i - 1, target, list.slice(0, i), split)
}
const result = getProducts(parsedInput.length - 1, TARGET, parsedInput, 3)
console.log(result)
console.assert(result.reduce((acc, num) => acc + num) === TARGET)
console.log(result.reduce((acc, num) => acc * num))
