const expl=document.querySelector(".explorer");

const openings=document.createElement("a");
openings.setAttribute("href","openings");
openings.innerHTML="Openings";

const self_analyze=document.createElement("a");
self_analyze.setAttribute("href","selfAnalyzing");
self_analyze.innerHTML="Self-Analyzing";

const endings =document.createElement("a");
endings.setAttribute("href","endings");
endings.innerHTML="Endings";

expl.appendChild(openings);
expl.appendChild(self_analyze);
expl.appendChild(endings);