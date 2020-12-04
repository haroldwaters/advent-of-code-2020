'use strict'

const fs = require('fs')

const input = fs.readFileSync('./inputs/day-three.txt').toString()

function parseInput(inputStr) {
    return inputStr
        .split(/\n/)
}

const parsedInput = parseInput(input)
const TREE = '#'

function traverse(input, x, y, mvX, mvY, trees) {
    if (input[y][x] === TREE) {
        trees += 1
    }

    const currentPosY = y + mvY
    if (currentPosY >= input.length) {
        console.log('finished!')
        return trees
    }

    let currentPosX = x + mvX
    if (currentPosX >= input[0].length) {
        currentPosX -= input[0].length
    }

    // const splitInput = input[y].split('')
    // splitInput[x] = `\x1b[42m${splitInput[x]}\x1b[0m`
    // const dispArr = splitInput.join('')

    // console.log(dispArr)
    return traverse(input,currentPosX, currentPosY, mvX, mvY, trees)
}

const slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
]

const trees = []
console.time()
for (const slope of slopes) {
    console.log(slope)
    trees.push(traverse(parsedInput, 0, 0, slope[0], slope[1], 0))
}
console.timeEnd()

console.log(trees)
console.log(trees.reduce((acc, num) => acc * num, 1))