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

    const splitInput = input[y].split('')
    splitInput[x] = `\x1b[42m${splitInput[x]}\x1b[0m`
    const dispArr = splitInput.join('')

    console.log(dispArr)
    return traverse(input,currentPosX, currentPosY, mvX, mvY, trees)
}

const trees = traverse(parsedInput, 0,0,3,1,0)
console.log(trees)
