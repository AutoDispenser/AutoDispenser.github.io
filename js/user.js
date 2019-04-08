var config = {
  apiKey: "AIzaSyAcZzq7B-iLvfHCS2EthACEE1tZp-7e-40",
  authDomain: "autodispenser-de64e.firebaseapp.com",
  databaseURL: "https://autodispenser-de64e.firebaseio.com",
  projectId: "autodispenser-de64e",
  storageBucket: "autodispenser-de64e.appspot.com",
  messagingSenderId: "637755215079"
};
firebase.initializeApp(config);

// window.onload = function() {
//   init();
// };

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        // var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var uid = user.uid;
        var phoneNumber = user.phoneNumber;
        var providerData = user.providerData;

        addDataProfileUser(uid,displayName,email,photoURL,phoneNumber)
        // console.log("displayName :" + displayName);
        // console.log("email :" + email);
        // console.log("photoURL :" + photoURL);
        // console.log("uid :" + uid);
       // console.log(providerData);

        $("#user_Name").text(displayName);
        $("#user_Email").text(email);
        if(phoneNumber != null){
            $("#user_Tel").text(phoneNumber);
        }
        else{
          $("#user_Tel").text("-");
        }
        $("#userName").text("Hi : " +  displayName  );
    }
    else{
      ///////////////////////////////////////////////////
        checkFingerlogin();

          // alert("Please Signin !!");
          // window.location.href = "index.html";
      ///////////////////////////////////////////////////
    }

}, function(error) {
    console.log(error);
    alert("Some Thing Worng! please login agian");
});

////////////////////////////////////////////////////////////////////////////////
function checkFingerlogin(){
  var Found_ID;
  var ref = firebase.database().ref("Device/fingerSearch/Found_ID/");
  ref.once("value").then(function(snapshot) {
    Found_ID = snapshot.child("ID").val(); // {first:"Ada",last:"Lovelace"}
    // console.log(Found_ID);
    var query = firebase.database().ref("users/").orderByKey();
      query.once("value").then(function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
              var childData = childSnapshot.val();
              // console.log(childData);
              var user_ID = childData.f_ID;
              var Name = childData.username;
              var Email = childData.email;
              var Tel = childData.phoneNumber;
              var RegistStatus = childData.registStatus;
              if(user_ID == Found_ID){
                if(RegistStatus == "Registered" ){
                  $("#user_Name").text(Name);
                  $("#user_Email").text(Email);
                  $("#user_Tel").text(Tel);
                  $("#userName").text("Hi : " +  Name  );
                }
                else{
                  alert("Please contact admin to regist fingerprint");
                  window.location.href = "index.html";
                }
                  // console.log(user_ID);
                  // console.log(F_name);
                  // console.log(L_name);
              }

          });
      });

    });

    // if(
}
////////////////////////////////////////////////////////////////////////////////

function addDataProfileUser(userId,name,email,imageUrl,phoneNumber){
  if(imageUrl == null){
    imageUrl = "-";
  }
  if(phoneNumber == null){
    phoneNumber = "-";
  }
  firebase.database().ref('users/' + userId).set({
      uid:userId,
      username: name,
      email: email,
      profile_picture : imageUrl,
      phoneNumber:phoneNumber
      // f_ID : ""
  }, function(error) {
      if (error) {
        // The write failed...
        console.log("Data saved failed");
      } else {
        // Data save successfully!
        console.log("Data saved successfully!");
      }
  });
};

function Signout() {
    firebase.auth().signOut().then(function() {
            console.log('Signed Out');
            // alert('Signed Out');
            window.location.href = "index.html";
        },
        function(error) {
            console.error('Sign Out Error', error);
        });

    // firebase.database().ref('LogUser/CodeGen/').child('AuthenCode').set({
    //     Status : parseInt(0)
    // });
    // firebase.database().ref('LogUser/CodeGen/').child('Repush_state').set({
    //     Repush : parseInt(0)
    // });
    // firebase.database().ref('LogUser/').child('Lasted').set({
    //     Uid : Uid,
    //     SBNumber: "SB1",
    //     StatusDevice: parseInt(0)
    // });
}

function reloadPage(){
  location.reload();
}

function gotoHomepage(){
   window.location = 'index.html';
}

var Data = [];
var Drawer = [];
var Str = "";
var CheckOutofOrder = 0;
 $(document).ready(function(){
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
       $('#Lock1').click(function() {
           activeDrawer_Status(1);
             // $('#MED1').addClass("border border-success");
       });
       $('#Lock2').click(function() {
            activeDrawer_Status(2);
       });
       $('#Lock3').click(function() {
            activeDrawer_Status(3);
       });
       $('#Lock4').click(function() {
            activeDrawer_Status(4);
       });
       $('#Lock5').click(function() {
            activeDrawer_Status(5);
       });
       $('#Lock6').click(function() {
            activeDrawer_Status(6);
       });
       $('#Lock7').click(function() {
            activeDrawer_Status(7);
       });
       $('#Lock8').click(function() {
            activeDrawer_Status(8);
       });
       $('#Lock9').click(function() {
            activeDrawer_Status(9);
       });
       $('#Lock10').click(function() {
            activeDrawer_Status(10);
       });
        $('#btnLogout').click(function(){
            Clear_Status();
            var signOut = setTimeout(Signout,1000);
            // var Homepage = setTimeout(gotoHomepage,1000);
        });

        $('#btnChooseDrug').click(function(){
            var updateOpendrug = {};
            updateOpendrug['/Device/openDrawer/Status/'] = 1;
            firebase.database().ref().update(updateOpendrug);
        });
});


function setImageSource(imageId, imageSrc) {
  $('#' + imageId).attr('src', imageSrc);
}


function Clear_Status(){
  var updatedelelteStatus = {};
  var updateenrollStatus = {};
  var updatefingersearchStatus = {};
  var updatefoundIDStatus = {};
  var updateopendrawStatus = {};

  updatedelelteStatus['/Device/deleteFinger/Status/'] = 0;
  updateenrollStatus['/Device/enrollMode/Status/'] = 0;
  updatefingersearchStatus['/Device/fingerSearch/Status/'] = 0;
  // updatefoundIDStatus['/Device/fingerSearch/Found_ID/ID/'] = 0;
  updateopendrawStatus['/Device/openDrawer/Status/'] = 0;

  firebase.database().ref().update(updatedelelteStatus);
  firebase.database().ref().update(updateenrollStatus);
  firebase.database().ref().update(updatefingersearchStatus);
  // firebase.database().ref().update(updatefoundIDStatus);
  firebase.database().ref().update(updateopendrawStatus);

  //Lock all Drug Drawer
  for(var i=1; i<=10; i++){
  var lockAll_State = {};
  lockAll_State['/Device/openDrawer/drugDrawer/' + i.toString() + '/Status/' ] = 1;
     firebase.database().ref().update(lockAll_State);
  }
  // clearTimeout(reload);
  // clearTimeout(Homepage);
  return true;
}

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

function  activeDrawer_Status(numofButton){
   var UnLock_ID = "";
   var Lock_ID = "";
  Lock_ID += "#Lock" + (parseInt(numofButton)).toString();
  UnLock_ID += "#Unlock" + (parseInt(numofButton)).toString();

  var updates = {};
  updates['/Device/openDrawer/drugDrawer/' + numofButton.toString() + '/Status/' ] = 0;
  firebase.database().ref().update(updates);

  $(Lock_ID).hide();
  $(UnLock_ID).show();
};

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
      });
  return true;
}

function submit(){
  if(CheckOutofOrder){
       var updates = {};
       updates['/Device/openDrawer/Status/'] = 0;
       firebase.database().ref().update(updates);
       CheckOutofOrder = 0
  }
  else{
    var updates = {};
    updates['/Device/openDrawer/Status/'] = 1;
    firebase.database().ref().update(updates);
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
