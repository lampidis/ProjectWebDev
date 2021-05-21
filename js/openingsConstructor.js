
const openings_div=document.querySelector(".open_end_show");

for (var i = 0; i < 3; i++) {
    let div1=document.createElement("div");
    div1.innerHTML = '<img src="source/chessboard.png" alt="">';
    let paragraph = document.createElement("p");
    paragraph.innerHTML = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus praesentium similique in voluptas nemo aut eveniet hic optio alias expedita voluptatum ipsum sunt illum, possimus nostrum accusantium, tenetur qui placeat';
    div1.appendChild(paragraph);
    openings_div.appendChild(div1);
 }

