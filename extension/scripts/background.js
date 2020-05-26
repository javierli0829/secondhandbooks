
chrome.runtime.onInstalled.addListener(function() {


    chrome.contextMenus.create({
      title: 'Upload to Green Book',
      type: 'normal',
    });

    chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        
        chrome.storage.sync.get(['uid'], function(result) {
          var uid=parseInt(result.uid, 10);
          console.log(uid);

        var formData = new FormData();
        formData.append("name", request.bookTitle);
        formData.append("author", request.bookAuthors);
        formData.append("category", request.category);
        formData.append("description", request.description);
        formData.append("owner", uid);
         
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
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
          var alertWindow = "alert('Your book has been successfully uploaded!')";
          chrome.tabs.executeScript(tabs[0].id, {code : alertWindow});
        });
    
  });
});

chrome.contextMenus.onClicked.addListener(function(item, tab) {
  chrome.tabs.executeScript(tab.id, {file: "scripts/UploadToSite.js"}, function() {});
});








