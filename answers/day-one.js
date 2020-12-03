const fs = require('fs')

const input = fs.readFileSync('./inputs/day-one.txt').toString()

function parseInput(inputArr) {
    return inputArr
        .split(/\s/)
        .map(x => parseInt(x.trim()))
        .sort((a, b) => a >= b ? 1 : -1)
}

const parsedInput = parseInput(input)

function getProducts(num, target, list, split) {
    // If I dips below zero, we've recursed too far - go back!
    if (!num) return

    // Get the difference between our top
    const diff = target - num
    if (diff > 0) {
        // Find the first index _higher_ than our diff
        const x = list.findIndex((num, j) => num > diff)
        
        // If we don't find our index, return
        if (!x) return

        if (!split || split === 0) {
            // If we're not doing any splits, then just return our found index minus 1 
            // along with our highest index
            if (list[x - 1] === diff) {
                return [num, list[x - 1]]
            }
        } else if (split > 0) {
            // If we still have splits to do, then 
            const nextNum = getProducts(list[list.length - 1], diff, list.slice(0, x), split - 1)
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
    return getProducts(list[list.length - 1], target, list.slice(0,-1), split)
}


// The number we want to sum to
const TARGET = 2020

// The amount of numbers to sum
const SPLIT_COUNT = 3 

const result = getProducts(parsedInput.pop(), TARGET, parsedInput, SPLIT_COUNT)

console.log(result)
console.log(result && result.reduce((acc, num) => acc * num))
