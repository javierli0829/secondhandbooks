function login()
{
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  
  var httpReq = new XMLHttpRequest();
  httpReq.open( "GET", "http://127.0.0.1:8000/user/?username="+username, true);
  httpReq.onreadystatechange = function(){
    if (httpReq.readyState == 4) {
    //  console.log(httpReq.responseText);
        if(httpReq.getResponseHeader('content-type')==='application/json'){
            var result = JSON.parse(httpReq.responseText);
            if(result['password']==password)
            {
                chrome.storage.sync.set({uid: result['id']}, function() {});
                alert('You have successfully logged in as '+username);
            }
            else
                alert("Wrong username or password!");	          
        }
      }
    };
    httpReq.send();
}


var save = document.getElementById("login");
save.addEventListener("click", function(evt){ login(); });
