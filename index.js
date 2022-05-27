// Your code here
function createEmployeeRecord (arr = [firstName, lastName, title, hourlyRate]) {
    let employeeRecord =  {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [ ],
        timeOutEvents: [ ]
    }
    return employeeRecord
}

function createEmployeeRecords (arr) {
    let employeeRecords = []
        arr.forEach(employeeRec => {
            employeeRecords.push(createEmployeeRecord(employeeRec))
        })

    
    return employeeRecords
}

function createTimeInEvent (employeeRec, timeStamp) {
    let dateNhour = timeStamp.split(' ')
    employeeRec.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(dateNhour[1], 10),
        date: `${dateNhour[0]}`
    })
    return employeeRec
}

function createTimeOutEvent (employeeRec, timeStamp) {
    let dateNhour = timeStamp.split(' ')
    let hourIn = parseInt(dateNhour[1], 10)
    employeeRec.timeOutEvents.push(
        {
            type: 'TimeOut',
            hour: hourIn,
            date: `${dateNhour[0]}`
        }
    )
    return employeeRec

}

function hoursWorkedOnDate (employeeObj, date) {
    if (employeeObj.timeInEvents[0].date === date) {
        return (employeeObj.timeOutEvents[0].hour - employeeObj.timeInEvents[0].hour) / 100
    }
}

function wagesEarnedOnDate (employeeObj, date) {
    const hoursWorked = hoursWorkedOnDate(employeeObj, date)
    return hoursWorked * employeeObj.payPerHour
}

function allWagesFor (employeeObj) {
    let pay = 0;
    for (let days in employeeObj.timeInEvents) {
        pay += wagesEarnedOnDate(employeeObj, employeeObj.timeInEvents[days].date)
    }
    return pay
}

function calculatePayroll (arrOfemployees) {
    let totalPay = 0;
    for (let person of arrOfemployees) {
        totalPay += allWagesFor(arrOfemployees[person])
    }
    return totalPay
}