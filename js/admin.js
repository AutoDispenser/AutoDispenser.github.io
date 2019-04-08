var config = {
  apiKey: "AIzaSyAcZzq7B-iLvfHCS2EthACEE1tZp-7e-40",
  authDomain: "autodispenser-de64e.firebaseapp.com",
  databaseURL: "https://autodispenser-de64e.firebaseio.com",
  projectId: "autodispenser-de64e",
  storageBucket: "autodispenser-de64e.appspot.com",
  messagingSenderId: "637755215079"
};
firebase.initializeApp(config);



//Admin Name

//
// var ref = firebase.database().ref("/User/LastID/");
// ref.once("value").then(function(snapshot) {
//     var last_id = snapshot.child("ID").val();
//      // {first:"Ada",last:"Lovelace"}
//       $("#lastID").text("Last enroll ID is " + last_id.toString() );
//       $("#id").text(last_id.toString());
//       // document.getElementById("#id").value = last_id.toString();
// });


function reloadPage(){
    location.reload();
}

$(document).ready(function(){
  $('#Register').hide();
  $('#notRegister').show();
        // $("#registForm")[0].reset();
        $("#adminName").text("Hi Admin : Sarawut");
        // $('#addUser').click(function() {
        //       addUsertoDB();
        //       setTimeout(reloadPage(),2000);
        // });

});
//
// function addUsertoDB(){
//        var  First_Name = $('#firstName').val();
//        var  Last_Name = $('#lastName').val();
//        var  Email =  $('#inputEmail').val();
//        var  Tel =  $('#Tel').val();
//        var  User_ID = $('#id').val();
//
//
//        console.log(User_ID);
//        if(First_Name == ""  || Last_Name == "" || Email == "" || Tel == "" || User_ID == "" ){
//            alert("Please complete the information.");
//        }
//        else{
//          firebase.database().ref('/User/ID/').push({
//                user_ID : User_ID,
//                First_Name : First_Name.toString(),
//                Last_Name : Last_Name.toString(),
//                Email:Email.toString(),
//                Tel : Tel.toString()
//
//           });
//
//           firebase.database().ref('/User/LastID/').set({
//                 ID : parseInt(User_ID)
//            });
//
//         var updates = {};
//         updates['/Device/enrollMode/Status'] = 1;
//         firebase.database().ref().update(updates);
//         return true;
//        }
//
// }


var NumID = 0;
var ref = firebase.database().ref('users/');
ref.on("value", function(snapshot) {
    var Val = snapshot.val();
    var num = 0;

    Object.keys(Val).map(function (key) {
       if(Val[key].registStatus !== "Registered"){

        $('.U_Table_Noregist').append('<tr style="justify-content:center;">' +
            '<td style="text-align: center;">' + ++num +'</td>' +
            '<td style="text-align: center">' + Val[key].username +'</td>' +
            '<td style="text-align: center">' + Val[key].email + '</td>' +
            '<td style="text-align: center">' + key.toString()+ '</td>' +
            '<td style="text-align: center">' + '<button class="btn btn-primary" style="margin: 10px" onclick="registFinger(\''+ key +'\' ,  \'' + num + '\')">Register</button>'+'</td>' +
            // '<td style="text-align: center">' + '<button class="btn btn-danger" style="margin: 10px" >Not Register</button>'+ '</td>' +
            '</tr>')
          }
    });
});


ref.on("value", function(snapshot) {
    var Val = snapshot.val();
    var num = 0;
         Object.keys(Val).map(function (key) {
            if(Val[key].registStatus == "Registered"){
              // console.log("Success!!!");
              // NumID =  Object.keys(Val).length ;
              NumID += 1;

            $('.U_Table_regist').append('<tr style="justify-content:center;">' +
                '<td style="text-align: center;">' + ++num +'</td>' +
                '<td style="text-align: center">' + Val[key].username +'</td>' +
                '<td style="text-align: center">' + Val[key].email + '</td>' +
                '<td style="text-align: center">' + Val[key].f_ID + '</td>' +
                // '<td style="text-align: center">' + '<button class="btn btn-primary" style="margin: 10px" onclick="registFinger(\''+ key +'\' ,  \'' + num + '\')">Register</button>'+'</td>' +
                // '<td style="text-align: center">' + Val[key].f_ID + '</td>' +
                '</tr>')
        }
      });

console.log(NumID);
});


function registFinger(UID,ID){
  // firebase.database().ref('users/'+ UID.toString() +'/').push({
  //       f_ID : ID
  //  });
  //
  //  firebase.database().ref('/User/LastID/').set({
  //        ID : parseInt(User_ID)
  //   });


  // console.log("ID : " + ID + "    UID : " + UID);
  var updates = {};
  var updateID = {};
  var updateF_ID = {};
  var updateUID = {};
  updates['/Device/enrollMode/Status'] = 1;
  updateID['/User/LastID/ID'] = NumID+1;
  updateUID['/User/LastUID/UID'] = UID;
  updateF_ID['/users/' + UID.toString() + '/f_ID/'] = NumID+1;
  firebase.database().ref().update(updates);
  firebase.database().ref().update(updateID);
  firebase.database().ref().update(updateUID);
  firebase.database().ref().update(updateF_ID);

  var updateRegistStatus = {};
  updateRegistStatus['/users/'+ UID + '/registStatus/'] = "Registered";
  firebase.database().ref().update(updateRegistStatus);
  NumID = 0;
    var reload = setTimeout(reloadPage(),500);
  return true;
};
