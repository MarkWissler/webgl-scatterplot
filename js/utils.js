
// Manually defined get request. We can use whatever we want to in a real production setting. It just depends on what framework(s) is/are in use.
var getRequest = function (path, successCallback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      xhr.onload = function (evt) {
        successCallback(JSON.parse(xhr.response));
      };
    }
  }
  

  xhr.open("GET", path, true);
  xhr.responseType = "JSON";
  xhr.send(null);
}
