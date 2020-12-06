const fs = require('fs')

const input = fs.readFileSync('./inputs/day-six.txt').toString()

function parseInput(inputStr) {
    return inputStr
        .split(/\n\n/)
        .map(x => x.split(/\n/).map(y => y.split('')))
}

const parsedInput = parseInput(input)

function countAnswers(groupAnswers) {
    let total  = 0;
    const answerMap = new Map()
    groupAnswers.forEach((answer,i) => {
        answer.forEach(a => answerMap.set(a,(answerMap.get(a) || 0) + 1))
    })

    answerMap.forEach((v,k) => v >= groupAnswers.length ? ++total : false )
    return total
}

function getTotalAnswers(groups) {
    return groups
        .map(countAnswers)
        .reduce((acc, curr) => acc + curr, 0)
}

console.log(getTotalAnswers(parsedInput))