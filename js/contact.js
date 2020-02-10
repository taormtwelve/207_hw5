let firebaseConfig = {
    apiKey: "AIzaSyAyhOffIOST_1G8abMgqKsh8JgGubQMJok",
    authDomain: "hw5-34ad3.firebaseapp.com",
    projectId: "hw5-34ad3",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();
let i = 0
let countMale = 0;
let countFemale = 0;
let countOther = 0;
let id = []

$('#reset').click(() => reset())

$('#save').click((dbUser) => {
    if (!validateText('subject')) $('#subject').focus()
    else if (!validateText('message')) $('#message').focus()
    else if (!validateText('name')) $('#name').focus()
    else if (!validatePhone('phone')) $('#phone').focus()
    else if (!validateEmail('email')) $('#email').focus()
    else {
        db.collection("contact").add({
            subject: $('#subject').val(),
            message: $('#message').val(),
            name: $('#name').val(),
            gender: getGender(),
            phone: $('#phone').val(),
            email: $('#email').val(),
        }).then(function (docRef) {
            reset()
            console.log("Document written with ID: ", docRef.id)
            alert("Message saved !")

        }).catch(function (error) {
            console.error("Error adding document: ", error)
            alert("Error adding document: ", error)
        })
    }
})

function reset() {
    $('#subject').val('')
    removeValidate('subject')
    $('#message').val('')
    removeValidate('message')
    $('#name').val('')
    removeValidate('name')
    $('#phone').val('')
    removeValidate('phone')
    $('#email').val('')
    removeValidate('email')
    $('#gender').val('1')
    $('#subject').focus()

}

function getGender() {
    let radios = document.getElementsByName('gender');
    for (let i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            return i + 1;
        }
    }
}

function validateText(id) {
    if ($("#" + id).val() == null || $("#" + id).val() == "") {
        validateShow(id, false)
        return false;
    }
    else {
        validateShow(id, true)
        return true;
    }

}

function validateEmail(id) {
    var email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    if (!email_regex.test($("#" + id).val())) {
        validateShow(id, false)
        return false;
    }
    else {
        validateShow(id, true)
        return true;
    }
}

function validatePhone(id) {
    var phoneno = /^\d{10}$/;
    if (!$("#" + id).val().match(phoneno)) {
        validateShow(id, false)
        return false;
    }
    else {
        validateShow(id, true)
        return true;
    }
}

function validateShow(id, fact) {
    if (fact) {
        var div = $("#" + id).closest("div");
        div.removeClass("has-error");
        $("#glypcn" + id).remove();
        div.addClass("has-success has-feedback");
        div.append('<span id="glypcn' + id + '" class="glyphicon glyphicon-ok form-control-feedback"></span>');
    } else {
        $("#" + id).val('')
        let div = $("#" + id).closest("div");
        div.removeClass("has-success");
        $("#glypcn" + id).remove();
        div.addClass("has-error has-feedback");
        div.append('<span id="glypcn' + id + '" class="glyphicon glyphicon-remove form-control-feedback"></span>');

    }
}

function removeValidate(id) {
    var div = $("#" + id).closest("div");
    div.removeClass("has-error");
    div.removeClass("has-success");
    $("#glypcn" + id).remove();
}

db.collection('contact').orderBy('name').onSnapshot(doc => {
    let table = $('tbody')[0]
    $('tbody tr').remove()
    i = 0
    countMale = 0;
    countFemale = 0;
    countOther = 0;
    id = []
    doc.forEach(item => {
        id[i] = item.id
        i++
        let row = table.insertRow(-1)
        let firstCell = row.insertCell(0)
        let secondCell = row.insertCell(1)
        let thirdCell = row.insertCell(2)
        let email = item.data().email
        let emailHide = ''
        firstCell.textContent = item.data().name
        switch (Number(item.data().gender)) {
            case 1:
                secondCell.textContent = 'Male'
                countMale++
                break
            case 2:
                secondCell.textContent = 'Female'
                countFemale++
                break
            default:
                secondCell.textContent = 'Other'
                countOther++
        }
        for (let i = 0; i < email.length; i++) {
            if (email[i] != '@' && email[i] != '.') emailHide += 'x'
            else emailHide += email[i]

        }
        thirdCell.textContent = emailHide
        // fourthCell.innerHTML = "<button id='more' type='button' class='btn btn-primary btn-xs' data-toggle='modal' data-target='#detailModel'>more</button>"
        // fourthCell.innerHTML += " "
        // fourthCell.innerHTML += "<button id='delete' type='button' class='btn btn-danger btn-xs'>delete</button>"
        // $('#titleModel').text(item.data().name)

    })
    if (i == 0) {
        let row = table.insertRow(-1)
        let firstCell = row.insertCell(0)
        let secondCell = row.insertCell(1)
        let thirdCell = row.insertCell(2)
        firstCell.textContent = 'Empty'
        secondCell.textContent = 'Empty'
        thirdCell.textContent = 'Empty'
        document.getElementById("gen1").style.width = "0%"
        document.getElementById("gen2").style.width = "0%"
        document.getElementById("gen3").style.width = "0%"
        document.getElementById("t1").innerHTML = "0%"
        document.getElementById("t2").innerHTML = "0%"
        document.getElementById("t3").innerHTML = "0%"
    } else {
        document.getElementById("gen1").style.width = 100 * (countMale / i) + "%";
        document.getElementById("gen2").style.width = 100 * (countFemale / i) + "%";
        document.getElementById("gen3").style.width = 100 * (countOther / i) + "%";
        document.getElementById("t1").innerHTML = 100 * (countMale / i) + "%";
        document.getElementById("t2").innerHTML = 100 * (countFemale / i) + "%";
        document.getElementById("t3").innerHTML = 100 * (countOther / i) + "%";
    }
})
