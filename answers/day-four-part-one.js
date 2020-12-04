
const fs = require('fs')

const input = fs.readFileSync('./inputs/day-four.txt').toString()

function parseInput(inputStr) {
    return inputStr
        .split(/\n\n/)
        .map(x => x.split(/\s/))
        .map(x => x.map( y => y.split(':')))
}

const parsedInput = parseInput(input)

const requiredFields = [
    'byr',
    'iyr',
    'eyr',
    'hgt',
    'hcl',
    'ecl',
    'pid',
]

const optionalFields = [
    'cid'
]

function validatePassport(fields, requiredFields) {
    const keys = fields.map(([k,v]) => k)
    return requiredFields.every(rf => keys.includes(rf))
}

function validPassports(parsedInput, requiredFields) {
    return parsedInput.filter(p => validatePassport(p, requiredFields)).length
}

console.log(validPassports(parsedInput, requiredFields))