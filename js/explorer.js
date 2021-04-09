const expl=document.querySelector(".explorer");

const openings=document.createElement("a");
openings.setAttribute("href","openings.html");
openings.innerHTML="Openings";

const self_analyze=document.createElement("a");
self_analyze.setAttribute("href","openings.html");
self_analyze.innerHTML="Self-Analyzing";

const lessons =document.createElement("a");
lessons.setAttribute("href","openings.html");
lessons.innerHTML="Lessons";

expl.appendChild(openings);
expl.appendChild(self_analyze);
expl.appendChild(lessons);