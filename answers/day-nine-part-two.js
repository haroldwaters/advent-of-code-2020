const fs = require('fs')

const input = fs.readFileSync('./inputs/day-nine.txt').toString()

function parseInput(inputStr) {
    return inputStr
        .split(/\n/)
        .map(str => parseInt(str))
}

const parsedInput = parseInput(input)

function sortAsc(a, b) {
    return a -b
}


function getTwoNums(num, target, list, split) {
    // If I dips below zero, we've recursed too far - go back!
    if (!num) return

    // Get the difference between our top
    const diff = target - num
    if (diff > 0) {
        // Find the first index _higher_ than our diff
        const x = list.findIndex((num, j) => num > diff)
        
        // If we don't find our index, return
        if (x == null) return

        if (!split || split === 0) {
            // If we're not doing any splits, then just return our found index minus 1 
            // along with our highest index
            if (list[x - 1] === diff) {
                return [num, list[x - 1]]
            }
        } else if (split > 0) {
            // If we still have splits to do, then 
            const nextNum = getTwoNums(list[list.length - 1], diff, list.slice(0, x), split - 1)
            if (nextNum) {
                return [num, ...nextNum]
            }
        }
        // If we're at split one and num equals diff, just return num
    } else if (diff === 0 && split === 1) {
        return [num]
    }

    // If we've reached this point, then we're going to recurse further down the list and do it
    // all again
    return getTwoNums(list[list.length - 1], target, list.slice(0,-1), split)
}

function findInvalid(nums, pos, preambleLength) {
    const sumNums = nums.slice(pos - (preambleLength), pos).sort(sortAsc)
    const twoNums = getTwoNums(sumNums.pop(), nums[pos], sumNums, 2)
    if (twoNums) return findInvalid(nums, pos + 1, preambleLength)
    return nums[pos]
}

function findSet(nums, target) {
    for (let i = 0; i < nums.length; i++) {
        let acc = 0
        let pos = i
        while (acc < target) acc += nums[pos++]
        if (acc === target) return nums.slice(i, pos)
    }
}

function breakCode(parsedInput, PREAMBLE_LENGTH, PREAMBLE_LENGTH) {
    const invalidNum = findInvalid(parsedInput, PREAMBLE_LENGTH, PREAMBLE_LENGTH)
    const set = findSet(parsedInput, invalidNum)
    const lowest = Math.min(...set)
    const highest = Math.max(...set)
    return lowest + highest
}

const PREAMBLE_LENGTH = 25
const codeNum = breakCode(parsedInput, PREAMBLE_LENGTH, PREAMBLE_LENGTH)

// 13826915
console.log(codeNum)