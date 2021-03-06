const fs = require('fs')

const input = fs.readFileSync('./inputs/day-seven.txt').toString()

function parseInput(inputStr) {
    return inputStr
        .split(/\n/)
        .map(x => x.split(/\s/))
}

const parsedInput = parseInput(input)

function getRuleName(bagRule) {
    return `${bagRule[0]} ${bagRule[1]}`
}

function getContainedBags(rule) {
    const containedBags = rule.slice(rule.findIndex(w => w === 'bags') + 2)
        .join(' ')
        .split(',')
    return containedBags.map(bag => {
        const bagRule = bag.trim().split(/\s/)
        if (bagRule[0] === 'no') return false
        return [parseInt(bagRule.shift()), getRuleName(bagRule)]
    })

}

function filterBagRules(bagName) {
    return function (rule) {
        return !getRuleName(rule).includes(bagName)
    }
}

function getContainedBagCount(bagType, bagRuleList) {
    const bagRule = bagRuleList.find(bagRule => bagType === getRuleName(bagRule) )
    const containedBagRules = getContainedBags(bagRule)
    const filteredBagRuleList = bagRuleList.filter(filterBagRules(bagType))
    return containedBagRules
        .reduce((acc, bagRules) => {
            if (!bagRules) return 0
            const bagCount = bagRules[0]
            const containedBagCount = getContainedBagCount(bagRules[1], filteredBagRuleList)
            return acc + bagCount + bagCount * containedBagCount
        }, 0)
}

const SHINY_GOLD = 'shiny gold'
const count = getContainedBagCount(SHINY_GOLD, parsedInput)
console.log(count)
