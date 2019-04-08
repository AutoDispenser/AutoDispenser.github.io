var config = {
  apiKey: "AIzaSyAcZzq7B-iLvfHCS2EthACEE1tZp-7e-40",
  authDomain: "autodispenser-de64e.firebaseapp.com",
  databaseURL: "https://autodispenser-de64e.firebaseio.com",
  projectId: "autodispenser-de64e",
  storageBucket: "autodispenser-de64e.appspot.com",
  messagingSenderId: "637755215079"
};
firebase.initializeApp(config);

 var uiConfig = {
   callbacks: {
     signInSuccessWithAuthResult: function(authResult, redirectUrl) {
       return true;
     },
     uiShown: function() {
       // The widget is rendered.
       // Hide the loader.
       // document.getElementById('loader').style.display = 'none';
     }
   },
   // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
   signInFlow: 'popup',
   signInSuccessUrl: 'Profile.html',
   signInOptions: [
     // Leave the lines as is for the providers you want to offer your users.
     // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
     // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
     // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
     // firebase.auth.GithubAuthProvider.PROVIDER_ID,
     firebase.auth.EmailAuthProvider.PROVIDER_ID,
     // firebase.auth.PhoneAuthProvider.PROVIDER_ID
   ],
   // Terms of service url.
   // tosUrl: '<your-tos-url>',
   // Privacy policy url.
   // privacyPolicyUrl: '<your-privacy-policy-url>'
 };
var ui = new firebaseui.auth.AuthUI(firebase.auth());
 ui.start('#firebaseui-auth-container', uiConfig);

 function activeStatus(status) {
   var updates = {};
   updates['/Device/fingerSearch/Status/'] = status;
   return firebase.database().ref().update(updates);
 }

 $(document).ready(function(){
    $("#load").hide();
    $("#btnGTS").hide();
    // $("#signIn").sg();
    $("#signIn").show();
    $("#signinWithEmil").hide();
    $("#signinWithFingerprint").hide();

    $("#btnFPScan").click(function(){
     // console.log("On Click!!!");
      $("#load").show();
      $("#btnFPScan").hide();
      activeStatus(1);

      setInterval(function(){
        var Status;
        var ID;
        var Match;
        var ref = firebase.database().ref("Device/fingerSearch/");
        var ref1 = firebase.database().ref("Device/fingerSearch/Found_ID/");
        var ref2 = firebase.database().ref("/Device/fingerSearch/StatusSearch/");




        ref1.once("value").then(function(snapshot) {
           ID = snapshot.child("ID").val(); // {first:"Ada",last:"Lovelace"}
           // console.log(ID);
         });

        ref.once("value").then(function(snapshot) {
           Status= snapshot.child("Status").val(); // {first:"Ada",last:"Lovelace"}
           // console.log(Status);


                 if(Status == 0){
                   ref2.once("value").then(function(snapshot) {
                        Match = snapshot.child("Status").val(); // {first:"Ada",last:"Lovelace"}
                              // console.log(Status);
                        if(Match == 1){
                            if(ID == 0){
                                alert("You are not log in!!");
                                var myvar = setTimeout(location.reload(),2000);
                            }
                            else{
                                     window.location = 'Profile.html';
                                }
                         }
                        if(Match == 0){
                             alert("Please Log in again!!");
                             window.location = 'index.html';
                        }
                   });

               }

         });
      },1000);
    });

  $("#btnSigninEmail").click(function(){
    $("#signIn").hide();
    $("#signinWithEmil").show();
    $("#signinWithFingerprint").hide();
    // $("#signinWithFingerprint").hide();
  });

  $("#btnSigninFingerprint").click(function(){
    $("#signIn").hide();
    $("#signinWithEmil").hide();
    $("#signinWithFingerprint").show();
  });

});
