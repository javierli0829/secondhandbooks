function postRequest(postData){
  var httpReq = new XMLHttpRequest();
  httpReq.open( "POST", "http://127.0.0.1:8000/book/", true);
  httpReq.setRequestHeader('content-type', 'application/json');
  httpReq.onreadystatechange = function(){
    if (httpReq.readyState == 4) {
      console.log(httpReq.responseText);
        if(httpReq.getResponseHeader('content-type')==='application/json'){
            var result = JSON.parse(httpReq.responseText);	          
        }
        chrome.tabs.create({url: "http://127.0.0.1:8000/book/"}, function(tab) {});
     }
    };
    httpReq.send(JSON.stringify(postData));
}

chrome.runtime.onInstalled.addListener(function() {


    chrome.contextMenus.create({
      title: 'Upload to Second-Hand-Book-Exchange',
      type: 'normal',
    });

    chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {

   /*     postData = {
          name: request.bookTitle,
          author: request.bookAuthors,
          category: request.category,
          description: request.description,
          owner: 4
        };
          postRequest(postData);*/

        var formData = new FormData();
        formData.append("name", request.bookTitle);
        formData.append("author", request.bookAuthors);
        formData.append("category", request.category);
        formData.append("description", request.description);
        formData.append("owner", 5);
         
        var imgReq = new XMLHttpRequest();
        imgReq.open("POST", "http://127.0.0.1:8000/book/",true);

        let xhr = new XMLHttpRequest();
        xhr.open("GET", request.image, true);
        xhr.responseType = "blob";
        xhr.onload = function (res) {
          if (this.status == 200) {
            var blob = this.response;
            var file = new File([blob], "img.jpg");
            formData.append("image", file);
            imgReq.send(formData);
          }
        };
        xhr.send();
    
  });
});

chrome.contextMenus.onClicked.addListener(function(item, tab) {
  chrome.tabs.executeScript(tab.id, {file: "scripts/UploadToSite.js"}, function() {});
});








