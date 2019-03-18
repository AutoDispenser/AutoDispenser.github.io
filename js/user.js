var config = {
   apiKey: "AIzaSyD-ifIrL1PDVNXXUc18xYRyUJkWpOWjdrg",
   authDomain: "wintaniadev-1e328.firebaseapp.com",
   databaseURL: "https://wintaniadev-1e328.firebaseio.com",
   projectId: "wintaniadev-1e328",
   storageBucket: "wintaniadev-1e328.appspot.com",
   messagingSenderId: "857552933365"
 };
 firebase.initializeApp(config);

var Found_ID;
var ref = firebase.database().ref("Device/fingerSearch/Found_ID/");
ref.once("value").then(function(snapshot) {
  Found_ID= snapshot.child("ID").val(); // {first:"Ada",last:"Lovelace"}
  // console.log(Found_ID);
  var query = firebase.database().ref("User/ID/").orderByKey();
    query.once("value").then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var childData = childSnapshot.val();
            var user_ID = childData.user_ID;
            var F_name = childData.First_Name;
            var L_name = childData.Last_Name;
            var Email = childData.Email;
            var Tel = childData.Tel;
            if(user_ID == Found_ID){
                // console.log(user_ID);
                // console.log(F_name);
                // console.log(L_name);
                $("#user_Name").text(F_name + "  " + L_name   );
                $("#user_Email").text(Email);
                $("#user_Tel").text(Tel);
                $("#userName").text("Hi : " +  F_name  );
            }
        });
    });
  });
// function activeDrawer(){
//  var updates = {};
//  updates['/Device/openDrawer/Status/'] = 1;
//  return firebase.database().ref().update(updates);
// }



function reloadPage(){
    location.reload();
}


var Data = [];
var Drawer = [];
var Str = "";
var CheckOutofOrder = 0;
 $(document).ready(function(){

  // $('body').fadeIn();
  $('#Unlock1').hide();
  $('#Unlock2').hide();
  $('#Unlock3').hide();
  $('#Unlock4').hide();
  $('#Unlock5').hide();
  $('#Unlock6').hide();
  $('#Unlock7').hide();
  $('#Unlock8').hide();
  $('#Unlock9').hide();
  $('#Unlock10').hide();
  // $('#btnSubmit').hide();

        $('#Checkout').click(function() {
             Drugchoose();
             // Str =  "";
             // setTimeout(show_btnSubmit(),10000);
        });
        $('#btnSubmit').click(function() {
             submit();
             setTimeout(reloadPage(),10000);
        });
        $('#btnCancle').click(function() {
             // setTimeout(reloadPage(),1000);
             reloadPage();
        });
        $('#btnLockall').on('click',function() {
             // setTimeout(reloadPage(),1000);
             // reloadPage();
              LockAlldrawer();
              // LockAll_Status();
              setTimeout(LockAll_Status(),1000);
              // setTimeout(LockAll_Status(),3000);
             // setTimeout(reloadPage(),12000);

        });
});


function LockAll_Status(){
  var updateStatus = {};
  updateStatus['/Device/openDrawer/Status/'] = 0;
  firebase.database().ref().update(updateStatus);
  return true;
}

var Drawchoose = [];

// function reloadStatus(){
  var ref = firebase.database().ref("/Device/openDrawer/drugDrawer/");
     ref.once("value").then(function(snapshot) {
         snapshot.forEach(function(childSnapshot) {
             var childKey = childSnapshot.key;
             var childData = childSnapshot.val();
              Drawchoose.push(childData);
           });
            // console.log(Drawchoose);
          StatusDrawer();
     });
// }

var btnLock_ID;
var btnUnLock_ID;

function StatusDrawer(){
   for(i in Drawchoose){
       // console.log("Draw" + (parseInt(i)+1) + " status is : " + Drawchoose[i].Status);
        if(Drawchoose[i].Status === 0){
          btnUnLock_ID = "";
          btnLock_ID = "";
          btnLock_ID += "#Lock" + (parseInt(i)+1).toString();
          btnUnLock_ID += "#Unlock" + (parseInt(i)+1).toString();
          // console.log(btnLock_ID);
          // console.log(btnUnLock_ID);
          $(btnLock_ID).hide();
          $(btnUnLock_ID).show();
        }
   }
};

function Drugchoose(){
    var Draw1 = document.getElementById("selectPieces1").value;
    var Draw2 = document.getElementById("selectPieces2").value;
    var Draw3 = document.getElementById("selectPieces3").value;
    var Draw4 = document.getElementById("selectPieces4").value;
    var Draw5 = document.getElementById("selectPieces5").value;
    var Draw6 = document.getElementById("selectPieces6").value;
    var Draw7 = document.getElementById("selectPieces7").value;
    var Draw8 = document.getElementById("selectPieces8").value;
    var Draw9 = document.getElementById("selectPieces9").value;
    var Draw10 = document.getElementById("selectPieces10").value;

    var Arr = [];
    Arr = new Array (
      Draw1,
      Draw2,
      Draw3,
      Draw4,
      Draw5,
      Draw6,
      Draw7,
      Draw8,
      Draw9,
      Draw10
  );
     // console.log(Arr);
     // Str = "";
      var query = firebase.database().ref("DrugStock/").orderByKey();
         query.once("value").then(function(snapshot) {
             snapshot.forEach(function(childSnapshot) {
                 var childKey = childSnapshot.key;
                 var childData = childSnapshot.val();
                 var Key = childKey;
                 var Name = childData.Name;
                 var Stock = childData.Stock;
                 var Dosage = childData.Dosage;
                 Data.push(childData);
              //   console.log( Key + " " + Name + " "+ Stock + " " + Dosage);
                     // $("#userName").text("Hi : " +  F_name  );
          });
              for(i in Data){
               if(Arr[i] != 0){
                   Str += Data[i].Name.toString() + "     " +Data[i].Dosage.toString() + "   (ml/cc) "  + Arr[i] + "   Pieces" + "</br>";
                   Drawer.push(Data[i].Name);
                }
              }

              if(Str === ""){
                   Str = "You are not should Drug" + "</br>" + "Please should Drug again!!";
                   $('#btnSubmit').hide();
                   CheckOutofOrder = 1;
              }

              // console.log(Drawer);
              // console.log(drawChoose);
              document.getElementById("ShowList").innerHTML  = Str;
              // Str = "";
              // delete(Str);
         });

    document.getElementById("selectPieces1").value = "";
    document.getElementById("selectPieces2").value = "";
    document.getElementById("selectPieces3").value = "";
    document.getElementById("selectPieces4").value = "";
    document.getElementById("selectPieces5").value = "";
    document.getElementById("selectPieces6").value = "";
    document.getElementById("selectPieces7").value = "";
    document.getElementById("selectPieces8").value = "";
    document.getElementById("selectPieces9").value = "";
    document.getElementById("selectPieces10").value = "";

    Draw1  = 0;
    Draw2  = 0;
    Draw3  = 0;
    Draw4  = 0;
    Draw5  = 0;
    Draw6  = 0;
    Draw7  = 0;
    Draw8  = 0;
    Draw9  = 0;
    Draw10 = 0;

  return true;
}

function submit(){
  if(CheckOutofOrder){
       var updates = {};
       updates['/Device/openDrawer/Status/'] = 0;
       firebase.database().ref().update(updates);
       CheckOutofOrder = 0
       // Str.clear();

  }
  else{
    var updates = {};
    updates['/Device/openDrawer/Status/'] = 1;
    firebase.database().ref().update(updates);
    // Str.clear();
  }

  for(i in Data){
    for(j in Drawer){
      if(Data[i].Name == Drawer[j] ){
        // console.log(Data[i].Name);
        updates['/Device/openDrawer/drugDrawer/' + (parseInt(i)+1) + '/Status/'] = 0;
        firebase.database().ref().update(updates);
      }
    }
  }
  return true;
};

function LockAlldrawer(){
    for(var i=1;i<=10;i++){
      var updateStatusDrawer = {};
      updateStatusDrawer['/Device/openDrawer/drugDrawer/' + (parseInt(i)) + '/Status/'] = 1;
      firebase.database().ref().update(updateStatusDrawer);
    }
     return true;
};
