let randomNum = Math.floor(Math.random() * 100) + 1
let times = 10
let numInput
let submitbt = document.getElementById('submitbt')
let newgamebt = document.getElementById('newgamebt')
let htext = document.getElementById('htext').innerHTML
let dtext = document.getElementById('dtext').innerHTML
document.querySelector('input').focus()

submitbt.addEventListener('click', function () {
    numInput = document.querySelector('input').value
    document.getElementById('prev').innerHTML += " " + numInput
    times--
    if (times > 0) {
        if (numInput == randomNum) {
            htext = "Congratulations !"
            dtext = "You got it right !"
            document.querySelector('input').disabled = true
            document.getElementById('submitbt').disabled = true
            document.getElementById('noti').className = 'callout callout-success'
        } else if (numInput > randomNum) {
            htext = "Wrong !"
            dtext = "You can guess it in " + times + " turns." + " Last guess was '" + numInput + "' that too high."
            document.getElementById('noti').className = 'callout callout-danger'
        } else {
            htext = "Wrong !"
            dtext = "You can guess it in " + times + " turns." + " Last guess was '" + numInput + "' that too low."
            document.getElementById('noti').className = 'callout callout-danger'
        }
        if (numInput == '' || isNaN(numInput) || Number(numInput) < 0 || Number(numInput) > 100) {
            htext = "Wrong !"
            dtext = "You can guess it in " + times + " turns." + " Last guess was '" +
                (numInput == '' ? "Empty String" : numInput) + "' that won't a number between 1-100."
            document.getElementById('noti').className = 'callout callout-danger'
        }
    } else {
        htext = "Game over !"
        dtext = "Let's start new game."
        document.querySelector('input').disabled = true
        document.getElementById('submitbt').disabled = true

    }
    document.querySelector('input').value = ''
    document.querySelector('input').focus()
    document.getElementById('htext').innerHTML = htext
    document.getElementById('dtext').innerHTML = dtext
})

newgamebt.addEventListener('click', function () {
    times = 10
    randomNum = Math.floor(Math.random() * 100) + 1
    document.getElementById('submitbt').disabled = false
    document.querySelector('input').disabled = false
    document.querySelector('input').focus()
    document.getElementById('htext').innerHTML = "Let's go"
    document.getElementById('dtext').innerHTML = "You can guess it in 10 turns."
    document.getElementById('noti').className = 'callout callout-info'
    document.getElementById('prev').innerHTML = 'Previous gresses :'
})