chrome.runtime.onMessage.addListener(function (req, sender, sendResp) {
    var url = req.url;
    var tp = req.imgType;
    if (url && tp) {
        
    }
    return true;
});


