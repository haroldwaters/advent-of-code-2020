const fs = require('fs')

const input = fs.readFileSync('./inputs/day-eight.txt').toString()

function parseInput(inputStr) {
    return inputStr
        .split(/\n/)
        .map(x => x.split(/\s/))
        .map(x => [x[0], (x[1].startsWith('+') ? 1 : -1) * parseInt(x[1].slice(1))])
}

const parsedInput = parseInput(input)

function execCommand(pos, commands, acc, test, visitedPositions) {
    const isLast = pos === commands.length
    if (isLast) return acc

    // Our command and arg
    const command = commands[pos][0]
    const arg = commands[pos][1]

    // Check if we're looping
    if (visitedPositions.has(pos)) return
    visitedPositions.add(pos)

    // Acc if we it's our cmd

    // We'll have isolated tests for 'nop' and 'jmp' by passing a false (so they don't test
    // themselves) and by passing a new Set()
    if (test) {
        // If this is a 'nop' command, test 'jmp' first
        if (command === 'nop' && arg !== 0) {
            const nopTest = execCommand(pos + arg, commands, acc, false, new Set())
            if (nopTest) return nopTest
        }

        // If this is a 'jmp' command, test 'nop' first
        if (command === 'jmp') {
            const jmpTest = execCommand(pos + 1, commands, acc, false, new Set())
            if (jmpTest) return jmpTest
        }
    }

    // If the tests fail, execute normal flow
    if(command === 'jmp') return execCommand(pos + arg, commands, acc, test, visitedPositions)
    if(command === 'acc') acc += arg
    return execCommand(++pos, commands, acc, test, visitedPositions)
}

// 1703
const acc = execCommand(0, parsedInput, 0, true, new Set())
console.log(acc)
