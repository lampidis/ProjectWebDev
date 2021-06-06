function intervalFunc() {
    fetch("/lobby/users").then(response => response.json()).then(
        data=>{
            console.log(data);
            console.log("playername ", data.playername)
            console.log("opponentname ", data.opponentname)
            if(data.playername){
                console.log("q =", q)
                q = true;
            }
    });
    console.log('waiting for 2nd player...')
    console.log("q =", q)
    if (q) {
        clearInterval(intervalId);
        console.log("now pop_up")
        document.getElementById("pop_up").style.display = "block";
        document.getElementById("createGame").style.display = "none";
        document.getElementById("myBtn").style.display = "none";
    }
}
let q = false;
var intervalId
function searchUsers() {
    document.getElementById("createGame").disabled = true
    document.getElementById("myBtn").disabled = true
    document.getElementById("myBtn").innerHTML = "Searching..."
    fetch("/lobby/findGame")

    intervalId = setInterval(intervalFunc, 5000)

}
