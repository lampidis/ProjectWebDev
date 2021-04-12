const sidebar=document.querySelector(".sidebar");
let a=document.createElement("a");
a.setAttribute("href","index.html");
a.innerHTML="SplitScreeen";

let newGame=document.createElement("a");
newGame.setAttribute("href","index.html");
newGame.innerHTML="New Game";

let practice=document.createElement("a");
practice.setAttribute("href","index.html");
practice.innerHTML="Puzzles";

let inviteAFreind=document.createElement("a");
inviteAFreind.setAttribute("href","index.html");
inviteAFreind.innerHTML="Invite a freind";

let academy=document.createElement("a");
academy.setAttribute("href","openings.html");
academy.innerHTML="Academy";

sidebar.appendChild(a);
sidebar.appendChild(newGame);
sidebar.appendChild(practice);
sidebar.appendChild(inviteAFreind);
sidebar.appendChild(academy);