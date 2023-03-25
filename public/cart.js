document.addEventListener("DOMContentLoaded", function () {
    const parentDiv = document.getElementById("table");
    const inputBox = document.getElementById("tnumber");
        if (inputBox.value === "0") {
            parentDiv.textContent = "No items in cart";
        } else {
            parentDiv.textContent = "";
        }

});
function buy() {
    const inputBox = document.getElementById("tnumber");

        if (inputBox.value === "0") {
            alert("No Item in the Cart!!")
        } else {
            window.location.href="/payment"
            // parentDiv.textContent = "";
        }
}


