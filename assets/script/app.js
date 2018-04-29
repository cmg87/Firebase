// Initialize Firebase
var config = {
    apiKey: "AIzaSyD8WJWiKsnEKhmezMMV_a2cieB8fEgp-PA",
    authDomain: "week-7-8baf9.firebaseapp.com",
    databaseURL: "https://week-7-8baf9.firebaseio.com",
    projectId: "week-7-8baf9",
    storageBucket: "week-7-8baf9.appspot.com",
    messagingSenderId: "127575218637"
};
firebase.initializeApp(config);
// Assign the reference to the database to a variable named 'database'
var database = firebase.database();
var name = '';
var destination = '';
var first = '';
var next = 0;
var frequency = 0;
var minutes = 0;



$("#submit").on("click", function (event) {
    event.preventDefault();


    name = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    frequency = $("#frequency").val().trim();
    first = $("#first").val().trim();
    // var now = moment(new Date());
    // var end = moment(arrival);
    // var duration = moment.duration(now.diff(end));
    // next = Math.floor(duration.asMinutes());
    // console.log(next);
    
    // Code for the push
    database.ref().push({
        name: name,
        destination: destination,
        first: first,
        frequency: frequency,
    });
    $("#train-name").val('');
    $("#destination").val('');
    $("#frequency").val('');
    $("#first").val('');
});

database.ref().on("child_added", function (childSnapshot) {

    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().frequency);
    console.log(childSnapshot.val().first);
   
   
    // converts FIRST TRAIN TIME to unix
    var first = moment(childSnapshot.val().first, 'HH:mm').format('X');
    // stores the frequency in a variable
    var frequency = childSnapshot.val().frequency;
    // calculates the difference between the first train and the current time
    var difference = moment().diff(moment.unix(first), "minutes");
    // calculates the times the train has arrived from first to now
    var timeLeft = moment().diff(moment.unix(first), 'minutes') % frequency;
    // calculates the amount of minutes left
    var minutes = moment(frequency - timeLeft, "mm").format('mm');
    // addes minutes to last arrival for next arrival
    var next = moment().add(minutes, "m").format("hh:mm A");




    $('thead').append('<tr><td>' + childSnapshot.val().name + '</td><td>' + childSnapshot.val().destination + '</td><td>' + childSnapshot.val().frequency + '</td><td>'+ next + '</td><td>'+ minutes +'</td>' );




    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});