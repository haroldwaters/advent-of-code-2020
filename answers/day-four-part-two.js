
const fs = require('fs')

const input = fs.readFileSync('./inputs/day-four.txt').toString()

function parseInput(inputStr) {
    return inputStr
        .split(/\n\n/)
        .map(x => x.split(/\s/))
        .map(x => x.map(y => y.split(':')))
}

const parsedInput = parseInput(input)

function testRange(min, max) {
    return function (val) {
        const parsedVal = parseInt(val)
        return parsedVal <= max && parsedVal >= min
    }
}

function testHeight(val) {
    const test = val.includes('cm') ? testRange(150, 193) : testRange(59, 76)
    return test(val.slice(0,-2))
}

const hexRegex = /^#[a-f0-9]{6}$/
function testHair(val) {
    const matches = val.match(hexRegex)
    return matches != null && matches.length === 1
}

const allowedEyeColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']
function testEye(val) {
    return allowedEyeColors.includes(val)
}

function testPid(val) {
    return val.toString().length === 9
}

const requiredFields = {
    byr: testRange(1920, 2002),
    iyr: testRange(2010, 2020),
    eyr: testRange(2020, 2030),
    hgt: testHeight,
    hcl: testHair,
    ecl: testEye,
    pid: testPid,
}

const optionalFields = [
    'cid'
]

function validatePassport(fields, requiredFields, optionalFields) {
    const filteredFields = fields.filter(k => !optionalFields.includes(k[0]))
    const keys = filteredFields.map(([k, v]) => k)
    const rfKeys = Object.keys(requiredFields)
    return rfKeys.every(rfk => keys.includes(rfk)) &&
        keys.every((k,i) => requiredFields[k](filteredFields[i][1]))
}

function validPassports(parsedInput, requiredFields, optionalFields) {
    return parsedInput.filter(p => validatePassport(p, requiredFields, optionalFields)).length
}

console.log(validPassports(parsedInput, requiredFields, optionalFields))