$(document).ready(function() {

      var config = {
        apiKey: "AIzaSyApofsbsaXfXtAYIBXbzEcfo1BIEBdMDPw",
        authDomain: "train-787e7.firebaseapp.com",
        databaseURL: "https://train-787e7.firebaseio.com",
        projectId: "train-787e7",
        storageBucket: "train-787e7.appspot.com",
        messagingSenderId: "48175977301"
      };

firebase.initializeApp(config);

var charizardData = firebase.database();


	$("#addCharizardBtn").on("click", function(event){
        event.preventDefault();


		var charizardName = $("#charizardNameInput").val().trim();
		var destination = $("#destinationInput").val().trim();
		var charizardTimeInput = moment($("#charizardTimeInput").val().trim(), "HH:mm").subtract(10, "years").format("X");;
		var frequencyInput = $("#frequencyInput").val().trim();

		var newCharizard = {
			name: charizardName,
			destination: destination,
			charizardTime: charizardTimeInput,
			frequency: frequencyInput,
		}

	
		charizardData.push(newCharizard);

		
		$("#charizardNameInput").val("");
		$("#destinationInput").val("");
		$("#charizardInput").val("");
		$("#frequencyInput").val("");

		return false;
	});

	charizardData.on("child_added", function(childSnapshot, prevChildKey){


	
		var firebaseName = childSnapshot.val().name;
		var firebaseDestination = childSnapshot.val().destination;
		var firebaseCharizardTimeInput = childSnapshot.val().charizardTime;
		var firebaseFrequency = childSnapshot.val().frequency;
		
		var diffTime = moment().diff(moment.unix(firebaseCharizardTimeInput), "minutes");
		var timeRemainder = moment().diff(moment.unix(firebaseCharizardTimeInput), "minutes") % firebaseFrequency ;
		var minutes = firebaseFrequency - timeRemainder;

		var nextCharizardArrival = moment().add(minutes, "m").format("hh:mm A"); 
		


		$("#charizardTable > tbody").append("<tr><td>" + firebaseName + "</td><td>" + firebaseDestination + "</td><td>" + firebaseFrequency + " mins" + "</td><td>" + nextCharizardArrival + "</td><td>" + minutes + "</td></tr>");

	});
});