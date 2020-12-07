const fs = require('fs')

const input = fs.readFileSync('./inputs/day-seven.txt').toString()

function parseInput(inputStr) {
    return inputStr
        .split(/\n/)
        .map(x => x.split(/\s/))
}

const parsedInput = parseInput(input)

const checkedBags = new Set()
checkedBags.add('shiny gold')

// function genRules(rule) {
//     const ruleName = rule.slice(0, rule.findIndex(w => w === 'bags'))
//     const containsBags = []
//     const ruleStart = rule.findIndex(w => w === 'contain') + 1
//     function ruleTest(bagType) {
//         if (ruleStart[0] === 'no') return false
//     }
//     return rule.slice(ruleStart).join(' ')
// }

function checkBagRule(rule) {
    checkedBags.forEach(bag => {
        const joinedRule = rule.join(' ') 
        if(joinedRule.includes('no other')) return
        if(joinedRule.includes(bag)) {
            const bagName = rule.slice(0, rule.findIndex(w => w === 'bags')).join(' ')
            checkedBags.add(bagName)
        }
    })
}

let oldSetSize = 0
while (oldSetSize !== checkedBags.size) {
    oldSetSize = checkedBags.size
    parsedInput.map(checkBagRule)
}

console.dir(checkedBags)
console.dir(checkedBags.size)
