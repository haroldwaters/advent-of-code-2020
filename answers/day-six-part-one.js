const fs = require('fs')

const input = fs.readFileSync('./inputs/day-six.txt').toString()

function parseInput(inputStr) {
    return inputStr
        .split(/\n\n/)
        .map(x => x.split(/\n/).map(y => y.split('')))
}

const parsedInput = parseInput(input)

function countAnswers(answers) {
    const answerSet = new Set()
    answers.forEach(a => a.forEach(answerSet.add, answerSet))
    return answerSet.size
}

function getTotalAnswers(groups) {
    return groups
        .map(countAnswers)
        .reduce((acc, curr) => acc + curr, 0)
}

console.log(getTotalAnswers(parsedInput))