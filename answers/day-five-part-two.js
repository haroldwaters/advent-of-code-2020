
const fs = require('fs')

const input = fs.readFileSync('./inputs/day-five.txt').toString()

function parseInput(inputStr) {
    return inputStr
        .split(/\n/)
}

const LAST_ROW = 127

function finderFactory(frontChar, backChar, min, max) {
    function getFrontHalf(rows) {
        return rows.slice(0, Math.floor(rows.length / 2))
    }
    function getBackHalf(rows) {
        return rows.slice(Math.ceil(rows.length / 2))
    }

    rowArr = []

    for (let i = min; i < max; i++) rowArr.push(i)

    return function finder(code, rows) {
        if (!rows) rows = rowArr
        const nextHalf = code[0]
        if (!nextHalf) return rows[0]
        if (nextHalf === frontChar) return finder(code.slice(1), getFrontHalf(rows))
        if (nextHalf === backChar) return finder(code.slice(1), getBackHalf(rows))
    }
}

function scanCode(code) {
    const rowCode = code.slice(0, 7)
    const findRow = finderFactory('F', 'B', 0, 128)
    const row = findRow(rowCode)

    const seatCode = code.slice(7)
    const findSeat = finderFactory('L', 'R', 0, 8)
    const seat = findSeat(seatCode)

    // console.log(`Row: ${row}, Seat: ${seat}`)
    return (row * 8) + seat
}

const parsedInput = parseInput(input)
const seenIds = []
parsedInput.forEach((code) => {
    seenIds.push(scanCode(code))
})

const sortedIds = seenIds.sort((a, b) => a - b)
const emptySeat = sortedIds.find((seatId, i) => {
    return seatId + 2 === sortedIds[i + 1]

})
console.dir(emptySeat + 1)