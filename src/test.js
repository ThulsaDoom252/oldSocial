let a
let b = "string"


function copier(copyData, name, job, mood, mind) {
    let object = {
        nave: !name ? "Vladimir" : name,
        job: job,
        mood: mood,
        whatIsOnYourMind: mind
    }
    copyData = {...object}
    console.log(copyData)
    return copyData
}

let c = copier(a, null, "no", "shitty", "girl that i miss")

console.log(c);
console.log(a);






