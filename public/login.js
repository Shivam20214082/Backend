const message = new URLSearchParams(window.location.search).get("message");
if (message) {
  alert(message);
}
