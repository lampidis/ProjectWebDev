const navbar=document.querySelector(".header");

const login=document.createElement("a");
login.setAttribute("href","signin.html");
login.innerHTML="Log in";

const vr=document.createElement("div");
vr.classList.add("verticalRuler");

const signup =document.createElement("a");
signup.setAttribute("href","signup.html");
signup.innerHTML="Register";

navbar.appendChild(login);
navbar.appendChild(vr);
navbar.appendChild(signup);