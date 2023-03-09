import React from 'react'

export function convertDate(date) {
    console.log(date)
    let newDate = date.slice(0, 10)
    return newDate
}

export function formatMonth(date) {
    const months = {
        "01": "JAN",
        "02": "FEB",
        "03": "MAR",
        "04": "APR",
        "05": "MAY",
        "06": "JUN",
        "07": "JUL",
        "08": "AUG",
        "09": "SEP",
        "10": "OCT",
        "11": "NOV",
        "12": "DEC"
    }

    let month = date.slice(5, 7)
    let day = date.slice(8, 10)
    return day + " " + months[month]
}

export function formatTime(date) {
    console.log(date)
    let time = date.slice(11, 16)
    console.log(time)
    return time
}

export function convertDuration(duration, units) {
    switch (units) {
        case "h":
            return (duration == 1) ? " hour" : " hours"
            break;
        case "d":
            return (duration == 1) ? " day" : " days"
            break;
        case "w":
            return (duration == 1) ? " week" : " weeks"
            break;
        case "m":
            return (duration == 1) ? " minute" : " minutes"
            break;
        default:
            return "undefined"
    }


}

