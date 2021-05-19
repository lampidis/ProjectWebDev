const expl=document.querySelector(".explorer");

const openings=document.createElement("a");
openings.setAttribute("href","openings.html");
openings.innerHTML="Openings";

const self_analyze=document.createElement("a");
self_analyze.setAttribute("href","self_analyzing.html");
self_analyze.innerHTML="Self-Analyzing";

const endings =document.createElement("a");
endings.setAttribute("href","endings.html");
endings.innerHTML="Endings";

expl.appendChild(openings);
expl.appendChild(self_analyze);
expl.appendChild(endings);