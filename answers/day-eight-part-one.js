const fs = require('fs')

const input = fs.readFileSync('./inputs/day-eight.txt').toString()

function parseInput(inputStr) {
    return inputStr
        .split(/\n/)
        .map(x => x.split(/\s/))
        .map(x => [x[0], (x[1].startsWith('+') ? 1 : -1) * parseInt(x[1].slice(1))])
}

const parsedInput = parseInput(input)

function execCommand(pos, commands, visitedPositions, acc) {
    const command = commands[pos][0]
    const num = commands[pos][1]
    if (visitedPositions.has(pos)) return acc
    visitedPositions.add(pos)
    if(command === 'acc') acc += num
    if(command === 'jmp') return execCommand(pos + num, commands, visitedPositions, acc)
    return execCommand(++pos, commands, visitedPositions, acc)
}


const acc = execCommand(0,parsedInput, new Set(), 0)
console.log(acc)
