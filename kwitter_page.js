//YOUR FIREBASE LINKS
const firebaseConfig = {
      apiKey: "AIzaSyCRQoePP04mXbgS-r0QKri5HmwsaLK1STE",
      authDomain: "practicedb-377da.firebaseapp.com",
      databaseURL: "https://practicedb-377da-default-rtdb.firebaseio.com",
      projectId: "practicedb-377da",
      storageBucket: "practicedb-377da.appspot.com",
      messagingSenderId: "438384557982",
      appId: "1:438384557982:web:6bdce790fd97d30393e08f"
        };
      if(!firebase.apps.length){
        firebase.initializeApp(firebaseConfig);
      }

  room_name=localStorage.getItem("room_name");
  user_name=localStorage.getItem("user_name");

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
Name = message_data['name'];
message=message_data['message'];
like=message_data['like'];
name_with_tag="<h4> "+ Name + "<img class='user_tick' src='tick.png'></h4>";
message_with_tag="<h4 class='message_h4'>" + message + "</h4>";
like_btn="<button class='btn btn-info' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
span_with_tag="<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";

row=name_with_tag + message_with_tag + like_btn + span_with_tag;
document.getElementById("output").innerHTML += row;
//End code
      } });  }); }
getData();

function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location="index.html";
    }

function send()
{
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name: user_name,
            message:msg,
            like:0
      });
      document.getElementById("msg").value="";
}      
function updateLike(message_id)
{
      button_id=message_id;
      likes=document.getElementById(button_id).value;
      updated_likes=Number(likes) + 1;

      firebase.database().ref(room_name).child(message_id).update({
            like : updated_likes
      });
}