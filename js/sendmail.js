
function sendMail() {
    var arrival = $("#arrival").val();
    var departure = $("#departure").val();
    var persons = $("#persons").val();
    var name = $("#name").val();
    var phone = $("#phone").val();
    var email = $("#email").val();
    var message = $("#message").val();
    
    var link = 
        "mailto:mirc.rezerva@gmail.com"
        + "?subject=" 
        + escape("Vila Selena Reservation: " + name)
        + "&body=" 
        + "arrival: " + escape(arrival) + escape("\r\n")
        + "departure: " + escape(departure) + escape("\r\n")
        + "name: " + escape(name) + escape("\r\n")
        + "phone: " + escape(phone) + escape("\r\n")
        + "email: " + escape(email) + escape("\r\n")
        + "message: " + escape("\r\n")
        + escape(message);

    window.location.href = link;
}

