var config = {
   apiKey: "AIzaSyD-ifIrL1PDVNXXUc18xYRyUJkWpOWjdrg",
   authDomain: "wintaniadev-1e328.firebaseapp.com",
   databaseURL: "https://wintaniadev-1e328.firebaseio.com",
   projectId: "wintaniadev-1e328",
   storageBucket: "wintaniadev-1e328.appspot.com",
   messagingSenderId: "857552933365"
 };
 firebase.initializeApp(config);



 var uiConfig = {
   callbacks: {
     signInSuccessWithAuthResult: function(authResult, redirectUrl) {
       // User successfully signed in.
       // Return type determines whether we continue the redirect automatically
       // or whether we leave that to developer to handle.
       return true;
     },
     uiShown: function() {
       // The widget is rendered.
       // Hide the loader.
       document.getElementById('loader').style.display = 'none';
     }
   },
   // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
   signInFlow: 'popup',
   signInSuccessUrl: 'User.html',
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
   tosUrl: '<your-tos-url>',
   // Privacy policy url.
   privacyPolicyUrl: '<your-privacy-policy-url>'
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

    $("#btnFPScan").click(function(){
     console.log("On Click!!!");
      $("#load").show();
      $("#btnFPScan").hide();
      activeStatus(1);

      setInterval(function(){
        var Status;
        var ref = firebase.database().ref("Device/fingerSearch/");
        ref.once("value")
         .then(function(snapshot) {
           Status= snapshot.child("Status").val(); // {first:"Ada",last:"Lovelace"}
           console.log(Status);
                 if(Status == 0){
                     window.location = 'Profile.html'
                     // $("#btnGTS").show();
                     // $("#load").hide();
                     // $("#btnFPScan").hide();
               }
         })
      },1000);
    });
});
