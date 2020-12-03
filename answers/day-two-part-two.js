'use strict'

const fs = require('fs')

const input = fs.readFileSync('./inputs/day-two.txt').toString()

function parseInput(inputStr) {
    return inputStr
        .split(/\n/)
}

const parsedInput = parseInput(input)

function validatePassword(record) {
    const [rule, pw] = record.split(/:/).map(x => x.trim())  
    const [idxs, testLetter] = rule.split(/\s/).map(x => x.trim())
    // Per the instructions, the password is 1-based indexed
    const [firstIdx, secondIdx] = idxs.split(/-/).map(x => parseInt(x) - 1)

    const letterCount = [pw[firstIdx], pw[secondIdx]].filter(char => char === testLetter).length

    return letterCount === 1
}

function validatePasswords(pws) {
    return pws.filter(validatePassword).length
}

console.log(validatePasswords(parsedInput))