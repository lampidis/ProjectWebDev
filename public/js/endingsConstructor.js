const openings_div=document.querySelector(".open_end_show");

fetch("json/endings.json").then(response => response.json())
.then(data => {
    const myOp=data.endings
    
    for (var i = 0; i < myOp.length; i++) {

        div=document.createElement("div");
        // div1.innerHTML = '<img src="source/chessboard.png" alt="">';
        div.id="a"+i;
        div.classList.add("test");
        header2 = document.createElement("h2");
        t = document.createTextNode(myOp[i].name);
        header2.appendChild(t);
        paragraph = document.createElement("p");
        let hr=document.createElement("hr");
        paragraph.innerHTML = myOp[i].description;
        openings_div.appendChild(header2);
        openings_div.appendChild(paragraph);
        openings_div.appendChild(div);
        openings_div.appendChild(hr)
        console.log(myOp[i])
        board=new Board(div.id);
        board.setPositionInactive(myOp[i].string,div.id);
        console.log(div.id)
        
        
     }
});


