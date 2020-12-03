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
    const [minMax, testLetter] = rule.split(/\s/).map(x => x.trim())
    const [min, max] = minMax.split(/-/)

    const letterCount = pw.split('').filter((char) => char === testLetter).length

    return letterCount >= min && letterCount <= max
}

function validatePasswords(pws) {
    return pws.filter(validatePassword).length
}

console.log(validatePasswords(parsedInput))