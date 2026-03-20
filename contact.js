function sendMail(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;

    let subject = "Contact from " + name;
    let body = "Name: " + name + "%0AEmail: " + email;

    window.location.href = "mailto:subash170107@gmail.com?subject=" 
        + encodeURIComponent(subject) 
        + "&body=" + body;
}