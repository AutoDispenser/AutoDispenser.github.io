var config = {
   apiKey: "AIzaSyD-ifIrL1PDVNXXUc18xYRyUJkWpOWjdrg",
   authDomain: "wintaniadev-1e328.firebaseapp.com",
   databaseURL: "https://wintaniadev-1e328.firebaseio.com",
   projectId: "wintaniadev-1e328",
   storageBucket: "wintaniadev-1e328.appspot.com",
   messagingSenderId: "857552933365"
 };
 firebase.initializeApp(config);


//Admin Name


var ref = firebase.database().ref("/User/LastID/");
ref.once("value").then(function(snapshot) {
    var last_id = snapshot.child("ID").val();
     // {first:"Ada",last:"Lovelace"}
      $("#lastID").text("Last enroll ID is " + last_id.toString() );
      // $("#id").text(last_id.toString());
      document.getElementById("#id").value = last_id.toString();
});


function reloadPage(){
    location.reload();
}

$(document).ready(function(){
        $("#registForm")[0].reset();
        $("#adminName").text("Hi Admin : Sarawut");
        $('#addUser').click(function() {
              addUsertoDB();
              setTimeout(reloadPage(),2000);
        });

});

function addUsertoDB(){
       var  First_Name = $('#firstName').val();
       var  Last_Name = $('#lastName').val();
       var  Email =  $('#inputEmail').val();
       var  Tel =  $('#Tel').val();
       var  User_ID = $('#id').val();


       console.log(User_ID);
       if(First_Name == ""  || Last_Name == "" || Email == "" || Tel == "" || User_ID == "" ){
           alert("Please complete the information.");
       }
       else{
         firebase.database().ref('/User/ID/').push({
               user_ID : User_ID,
               First_Name : First_Name.toString(),
               Last_Name : Last_Name.toString(),
               Email:Email.toString(),
               Tel : Tel.toString()
          });

          firebase.database().ref('/User/LastID/').set({
                ID : parseInt(User_ID)
           });

        var updates = {};
        updates['/Device/enrollMode/Status'] = 1;
        firebase.database().ref().update(updates);
        return true;
       }

}
