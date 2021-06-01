let columns=["a","b","c","d","e","f","g","h"];
const rows=["1","2","3","4","5","6","7","8"].reverse();
const startingposition="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
const testPosition="8/pP6/1K3k2/8/8/8/QQQqqqQQ/8";

const boardContainer=document.querySelector(".wrapperBoard");
class Board{
    constructor(){
        this.pieceset=new Pieceset();
        this.moveset=new Moveset();
        this.enpassant="-";
        this.castle="KQkq";
        this.selectedPiece;
        this.colour="white";

        
    }
    colourChange(){
        if(this.colour=="white"){
            this.colour="black";
        }
        else{
            this.colour="white";
        }
    }
    isColorsTurn(colour){
        if(this.colour==colour){
            return true;
        }
        return false;
    }
    notBlocked(move){
        let beh=move.piece.behaviour;
        let des=move.pos;
        let row=parseInt(des[0]);
        let col=parseInt(columns.indexOf(des[1])+1);
        let posRow=parseInt(move.piece.pos[0]);
        let posCol=parseInt(columns.indexOf(move.piece.pos[1])+1);
        let pieceColour=move.piece.colour;
        if(beh=="pawn"){
            
            let from=Math.min(row,posRow);
            let to=Math.max(row,posRow);
            if(col==posCol){
                
                
                for (let i = from+1; i < to; i++) {
                    
                    for(let piece of this.pieceset.set){
                        
                         if(piece.pos==`${i}${columns[col-1]}`){
                             //console.log("Blocked");
                             return false;
 
                         }
                     }
                }
                for(let piece of this.pieceset.set){
                   
                     if(piece.pos==`${row}${columns[col-1]}`){
                         //console.log("Blocked");
                         return false;

                     }
                 }
            }
            else{
                for(let piece of this.pieceset.set){
                   
                    if(piece.pos==`${row}${columns[col-1]}`&&piece.colour!=move.piece.colour){
                        
                        return true;

                    }
                }
                //console.log("Attack invalid"); 
                return false;
            }
            return true;
        }
        if(beh=="rook"){
            if(col==posCol){
               let from=Math.min(row,posRow);
               let to=Math.max(row,posRow);
               
               for (let i = from+1; i < to; i++) {
                   
                   for(let piece of this.pieceset.set){
                   
                        if(piece.pos==`${i}${columns[col-1]}`){
                            //console.log("Blocked "+piece);
                            return false;

                        }
                    }
               }
               for(let piece of this.pieceset.set){
                   
                    if(piece.pos==`${row}${columns[col-1]}`&&piece.colour==move.piece.colour){
                        //console.log("Blocked"+piece.behaviour);
                        return false;

                    }
                }
            }
            if(row==posRow){
                let from=Math.min(col,posCol);
                let to=Math.max(col,posCol);
                for (let i = from+1; i < to; i++) {
                    //let loc=document.getElementById(`${columns[col-1]}${i}`);
                    for(let piece of this.pieceset.set){
                    
                         if(piece.pos==`${row}${columns[i-1]}`){
                             //console.log("Blocked");
                             return false;
 
                         }
                     }
                }
                for(let piece of this.pieceset.set){
                   
                    if(piece.pos==`${to}${columns[col-1]}`&&piece.colour==move.piece.colour){
                        //console.log("Blocked");
                        return false;

                    }
                }
             }
             return true;
        }
        if(beh=="knight"){

            for(let piece of this.pieceset.set){
                   
                if(piece.pos==`${row}${columns[col-1]}`&&piece.colour==move.piece.colour){
                    //console.log("Blocked");
                    return false;

                }
            }
            return true;
        }
        if(beh=="bishop"){
            for(let piece of this.pieceset.set){
                   
                if(piece.pos==`${row}${columns[col-1]}`&&piece.colour==move.piece.colour){
                    
                    //console.log("Blocked");
                    return false;

                }
            } 
            let counter=1;
            if(row<posRow){
                if(col<posCol){
                    while(row+counter<posRow){
                        for(let piece of this.pieceset.set){
                    
                            if(piece.pos==`${row+counter}${columns[col+counter-1]}`){
                                //console.log("Blockedi1");
                                return false;
    
                            }
                        }
                        counter++;
                    }
                }
                else{
                    while(row+counter<posRow){
                        for(let piece of this.pieceset.set){
                    
                            if(piece.pos==`${row+counter}${columns[col-counter-1]}`){
                                //console.log("Blockedi2");
                                return false;
    
                            }
                        }
                        counter++;
                    }
                }
            }
            else{
                if(col<posCol){
                    while(row-counter>posRow){
                        for(let piece of this.pieceset.set){
                    
                            if(piece.pos==`${row-counter}${columns[col+counter-1]}`){
                                //console.log("BlockedE1");
                                return false;
    
                            }
                        }
                        counter++;
                    }
                }
                else{
                    while(row-counter>posRow){
                        for(let piece of this.pieceset.set){
                    
                            if(piece.pos==`${row-counter}${columns[col-counter-1]}`){
                                //console.log("Blockede2");
                                return false;
    
                            }
                        }
                        counter++;
                    }
                }  
            }
            
            
            return true;
        }
        if(beh=="queen"){
            
            if(col==posCol){
                let from=Math.min(row,posRow);
                let to=Math.max(row,posRow);
                
                for (let i = from+1; i < to; i++) {
                    
                    for(let piece of this.pieceset.set){
                    
                         if(piece.pos==`${i}${columns[col-1]}`){
                             //console.log("Blocked");
                             return false;
 
                         }
                     }
                }
                for(let piece of this.pieceset.set){
                    
                     if(piece.pos==`${row}${columns[col-1]}`&&piece.colour==move.piece.colour){
                         
                         //console.log("Blocked"); 
                         return false;
 
                     }
                 }
             }
            else if(row==posRow){
                 let from=Math.min(col,posCol);
                 let to=Math.max(col,posCol);
                 for (let i = from+1; i < to; i++) {
                     //let loc=document.getElementById(`${columns[col-1]}${i}`);
                     for(let piece of this.pieceset.set){
                     
                          if(piece.pos==`${row}${columns[i-1]}`){
                              //console.log("Blocked");
                              return false;
  
                          }
                      }
                 }
                 for(let piece of this.pieceset.set){
                    
                     if(piece.pos==`${row}${columns[col-1]}`&&piece.colour==move.piece.colour){
                         //console.log("Blocked");
                        
                         return false;
 
                     }
                 }
              } 
            else{
                let counter=1;
            if(row<posRow){
                if(col<posCol){
                    while(row+counter<posRow){
                        for(let piece of this.pieceset.set){
                    
                            if(piece.pos==`${row+counter}${columns[col+counter-1]}`){
                                //console.log("Blockedi1");
                                return false;
    
                            }
                        }
                        counter++;
                    }
                }
                else{
                    while(row+counter<posRow){
                        for(let piece of this.pieceset.set){
                    
                            if(piece.pos==`${row+counter}${columns[col-counter-1]}`){
                               // console.log("Blockedi2");
                                return false;
    
                            }
                        }
                        counter++;
                    }
                }
            }
            else{
                if(col<posCol){
                    while(row-counter>posRow){
                        for(let piece of this.pieceset.set){
                    
                            if(piece.pos==`${row-counter}${columns[col+counter-1]}`){
                                //console.log("BlockedE1");
                                return false;
    
                            }
                        }
                        counter++;
                    }
                }
                else{
                    while(row-counter>posRow){
                        for(let piece of this.pieceset.set){
                    
                            if(piece.pos==`${row-counter}${columns[col-counter-1]}`){
                                //console.log("Blockede2");
                                return false;
    
                            }
                        }
                        counter++;
                    }
                }  
            }
            }
            for(let piece of this.pieceset.set){
                   
                if(piece.pos==`${row}${columns[col-1]}`&&piece.colour==move.piece.colour){
                    
                    //console.log("Blocked");
                    return false;

                }
            } 
            return true; 
        }
        if(beh=="king"){
            for(let piece of this.pieceset.set){
                   
                if(piece.pos==`${row}${columns[col-1]}`&&piece.colour==move.piece.colour){
                    //console.log("Blocked");
                    return false;

                } 
                let positionsToBeChecked=[];
                if(move.piece.colour=="white"){//castle moves
                    if(move.piece.pos=="1e"&&location=="1c"&&this.castle[1]=="Q"){//white queen side can be done
                        positionsToBeChecked=["1d","1c","1b"];
                    }
                    else if(move.piece.pos=="1e"&&location=="1g"&&this.castle[0]=="K"){//white king side can be done
                        positionsToBeChecked=["1f","1g"];
                    }
                }
                else{
                    if(move.piece.pos=="8e"&&location=="8c"&&this.castle[3]=="q"){//black queen side can be done
                        positionsToBeChecked=["8d","8c","8b"];
                    }
                    else if(move.piece.pos=="1e"&&location=="1g"&&this.castle[2]=="k"){//black king side can be done
                        positionsToBeChecked=["8f","8g"];
                    }
                }
                let examinePieces=[];
                if(this.colour=="white"){
                    examinePieces=this.pieceset.set.slice(16,31);
                    
               }
               else{
                    examinePieces=this.pieceset.set.slice(0,15);
                    
               }
               for(let position of positionsToBeChecked){
                    for (let piece of examinePieces) {
                        if(piece.move(position)){
                            let moveToBeChecked=new Move(piece,position);
                            if(this.notBlocked(moveToBeChecked)&&piece.pos!=move.pos){
                                //console.log(piece);
                                return false;
                            }
                        }
                    }
               }
                
            }

            
            return true;
        }
    }
    isPinned(move){
        return false;
    }
    isUnderCheck(move){
        let examinePieces
        let king;
        if(this.colour=="white"){
             examinePieces=this.pieceset.set.slice(16,31);
             king=this.pieceset.set[this.pieceset.K[0]];
        }
        else{
             examinePieces=this.pieceset.set.slice(0,15);
             king=this.pieceset.set[this.pieceset.k[0]];
        }
        
        if(move.piece.behaviour=="king"){
            //check after move
            for (let piece of examinePieces) {
                if(piece.move(move.pos)){
                    let moveToBeChecked=new Move(piece,move.pos);
                    if(this.notBlocked(moveToBeChecked)){
                        //console.log(piece);
                        return true;
                    }
                }
            }

        }
        else{
            //check without move
            let indexedPiece=this.pieceset.set.indexOf(move.piece);
            console.log(indexedPiece);
            let previousloc=this.pieceset.set[indexedPiece].pos;
            this.pieceset.set[indexedPiece].pos=move.pos;
            for (let piece of examinePieces) {
                if(piece.move(king.pos)){
                    let moveToBeChecked=new Move(piece,king.pos);
                    if(this.notBlocked(moveToBeChecked)&&piece.pos!=move.pos){
                        //console.log(piece);
                        this.pieceset.set[indexedPiece].pos=previousloc;

                        return true;
                    }
                }
            }
            this.pieceset.set[indexedPiece].pos=previousloc;
        }
        return false;
    }
    validate(move){
        let validity=false;
        if(this.isColorsTurn(move.piece.colour)){
            console.log("It is this colors turn");
            if(move.piece.move(move.pos)){
                console.log("The move is legal");
                if(this.notBlocked(move)){
                    console.log("The move is not blocked");
                    if(!this.isPinned(move)){
                        console.log("Not pinned");
                        if(!this.isUnderCheck(move)){
                            console.log("Not under check");
                            //make move
                            this.moveset.set.push(move);
                            this.colourChange();
                            return true;
                        }
                        
                    }
                }
            }
        }
        return false;
    }
    //https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation
    extractPosArrayFromForsythEdwardsNotation(ForsythEdwardsNotationString){
        let position=new Pieceset();
        position.set=[];
        let rowArray=ForsythEdwardsNotationString.split("/");
        for(let i=8;i>0;i--){
            let row=rowArray[i-1];
            let column=1;
            for(let j=0;j<row.length;j++){
                //console.log(row[j]);
                if(row[j]>'0'&&row[j]<'9'){
                    //is number change column
                    column+=parseInt(row[j]-1);
                }
                else if(row[j]==="R"){
                    position.set[position.set.length]=new Rook(i+columns[column-1],"white");
                    
                }
                else if(row[j]==="N"){
                    position.set[position.set.length]=new Knight(i+columns[column-1],"white");
                }
                else if(row[j]==="B"){
                    position.set[position.set.length]=new Bishop(i+columns[column-1],"white");
                }
                else if(row[j]==="Q"){
                    position.set[position.set.length]=new Queen(i+columns[column-1],"white");
                }
                else if(row[j]==="K"){
                    position.set[position.set.length]=new King(i+columns[column-1],"white");
                }
                else if(row[j]==="P"){
                    position.set[position.set.length]=new Pawn(i+columns[column-1],"white");
                }
                else if(row[j]==="r"){
                    position.set[position.set.length]=new Rook(i+columns[column-1],"black");
                }
                else if(row[j]==="n"){
                    position.set[position.set.length]=new Knight(i+columns[column-1],"black");
                }
                else if(row[j]==="b"){
                    position.set[position.set.length]=new Bishop(i+columns[column-1],"black");
                }
                else if(row[j]==="q"){
                    position.set[position.set.length]=new Queen(i+columns[column-1],"black");
                }
                else if(row[j]==="k"){
                    position.set[position.set.length]=new King(i+columns[column-1],"black");
                }
                else if(row[j]==="p"){
                    position.set[position.set.length]=new Pawn(i+columns[column-1],"black");
                }



                column++;
            }
        }
        //console.log(position);
        return position.set;
    }
    setPosition(posArray){
        for(let piece of posArray){
            
            let pieceImage=document.createElement("img");
            pieceImage.src=piece.img;
            //console.log(piece.pos);
            let targetdiv=document.getElementById(piece.pos);
            targetdiv.appendChild(pieceImage);

        }
    }
    promote(piece){
        let index=this.pieceset.set.indexOf(piece);
        let board=this;
        let modalD=document.createElement("div");
        modalD.id="promoteD";
        modalD.classList.add("modal");
        let divAr=[];
        let b=["Q","R","B","K"];
        let ImArW=["source/QueenW.png","source/RookW.png","source/BishopW.png","source/KnightW.png"];
        let ImArB=["source/QueenB.png","source/RookB.png","source/BishopB.png","source/KnightB.png"];
        for (let i = 0; i < 4; i++) {
            divAr[i]=document.createElement("div");
            let img=document.createElement("img");
            if(piece.colour=="white"){
                img.src=ImArW[i];
            }else{
                img.src=ImArB[i];
            }
            divAr[i].appendChild(img);
            divAr[i].id=b[i];
            modalD.appendChild(divAr[i]);
            divAr[i].addEventListener("click",function(){
                //console.log(this.id)
                if(this.id==b[0]){
                    board.pieceset.set[index]=new Queen(piece.pos,piece.colour);
                }else 
                if(this.id==b[1]){
                    board.pieceset.set[index]=new Rook(piece.pos,piece.colour);
                }else 
                if(this.id==b[2]){
                    board.pieceset.set[index]=new Bishop(piece.pos,piece.colour);
                }else {
                    board.pieceset.set[index]=new Knight(piece.pos,piece.colour);
                }
                
                let div=document.getElementById(piece.pos);

                div.removeChild(div.firstChild);
                let pieceImage=document.createElement("img");
                pieceImage.src=board.pieceset.set[index].img;
                //console.log(piece.pos);
                
                div.appendChild(pieceImage);
                boardContainer.removeChild(modalD);
            });
            
        }
        boardContainer.appendChild(modalD);


    }
    initialize(board,id="board",pos="newgame",type="ChosenNotation"){
        function constructDOM(id){
            const boardContainer=document.getElementById(id);
            //console.los(boardContainer);
            const conteiner=document.createElement("div");
            conteiner.classList.add("conteiner");
            boardContainer.appendChild(conteiner);
        
        for(let i of rows){
            for(let j of columns){
               let currentElement=document.createElement("div");
               currentElement.setAttribute("id",i+j);
               currentElement.classList.add("box");
               currentElement.addEventListener("click",function(){
                   
                   //Band Aid for testing
                if(board.selectedPiece==undefined){//First click
                    //check if div occupied.
                    //console.log("First Click");
                    let occupancy=false;
                    for(let piece of board.pieceset.set){
                   
                        if(piece.pos==this.getAttribute("id")){
                            occupancy=true;
                            board.selectedPiece=piece;
                            
                        }
                    }
                }
                else{//Second Click+
                    let destination=this.getAttribute("id");
                    let move=new Move(board.selectedPiece,destination);
                    //board.validate(move);
                    //console.log("Second Click");
                    
                    //console.log(board.selectedPiece.move(destination)+" , "+destination+" , "+board.selectedPiece.pos);
                    if(board.validate(move)){//valid move
                        if(move.piece.behaviour=="king"){
                            let rookStart;
                            let rookEnd;
                            if(move.piece.colour=="white"){
                                board.castle="--"+board.castle.slice(2);
                                if(move.pos=="1c"){//white queen side castle
                                     rookStart=document.getElementById("1a");
                                     rookEnd=document.getElementById("1d");
                                }else if(move.pos=="1g"){//white king side castle
                                     rookStart=document.getElementById("1h");
                                     rookEnd=document.getElementById("1f");
                                }
                            }else{
                                board.castle=board.castle.slice(0,2)+"--";
                                if(move.pos=="8c"){//black queen side castle
                                     rookStart=document.getElementById("8a");
                                     rookEnd=document.getElementById("8d");
                                }else if(move.pos=="8g"){//black king side castle
                                     rookStart=document.getElementById("8h");
                                     rookEnd=document.getElementById("8f");
                                }
                            }
                            if(move.piece.pos=="1e"&&(move.pos=="1c"||move.pos=="1g")||move.piece.pos=="8e"&&(move.pos=="8c"||move.pos=="8g")){
                                let transfer=rookStart.removeChild(rookStart.childNodes[0]);
                                rookEnd.appendChild(transfer);
                            }
                            
                        }
                        else if(move.piece.behaviour=="rook"){
                            if(move.piece.colour=="white"){
                                if(move.piece.pos=="1a"){
                                    board.castle=board.castle.replace("Q","-");
                                }
                                else if(move.piece.pos=="1h"){
                                    board.castle=board.castle.replace("K","-");
                                }
                                
                            }else{
                                if(move.piece.pos=="8a"){
                                    board.castle=board.castle.replace("q","-");
                                }
                                else if(move.piece.pos=="8h"){
                                    board.castle=board.castle.replace("k","-");
                                }
                            }
                        }
                        let targetdiv=document.getElementById(destination);
                        let transfer=document.getElementById(board.selectedPiece.pos).removeChild(document.getElementById(board.selectedPiece.pos).childNodes[0]);
                        targetdiv.appendChild(transfer);
                        for(let piece of board.pieceset.set){
                            
                            if(piece.pos==destination){//destination is occupied
                                
                                let targetdiv=document.getElementById(piece.pos);
                                targetdiv.removeChild(targetdiv.childNodes[0]);
                                piece.pos="/";
                                let transfer=currentElement.removeChild(currentElement.childNodes[0]);
                                targetdiv.appendChild(transfer);
                            } 
                        }
                        board.selectedPiece.pos=destination;
                        if(move.piece.behaviour=="pawn"&&move.piece.promoted==true){
                            //console.log("promote");
                            board.promote(move.piece);
                        }
                        board.selectedPiece=undefined;
                    }
                    else{//invalid move
                        board.selectedPiece=undefined;
                    }
                }
                
                });
               conteiner.appendChild(currentElement);
            }

        }
        
        for(let piece of board.pieceset.set){
            
            let pieceImage=document.createElement("img");
            pieceImage.src=piece.img;
            //console.log(piece.pos);
            let targetdiv=document.getElementById(piece.pos);
            targetdiv.appendChild(pieceImage);

        }
        }
        constructDOM(id)
        
    }
}
class Pieceset{
    constructor(){
        this.set=[];
        
        this.whitepawns=[0,1,2,3,4,5,6,7];
        this.blackpawns=[16,17,18,19,20,21,22,23];
        this.R=[8,15];
        this.Kn=[9,14];
        this.B=[10,13];
        this.Q=[11];
        this.K=[12];
        this.r=[24,31];
        this.kn=[25,20];
        this.b=[26,29];
        this.q=[27];
        this.k=[28];
        
        
        for (let i of columns) {
            this.set.push(new Pawn("2"+i,"white"));
        }
        this.set.push(new Rook("1a","white"));
        this.set.push(new Knight("1b","white"));
        this.set.push(new Bishop("1c","white"));
        this.set.push(new Queen("1d","white"));
        this.set.push(new King("1e","white"));
        this.set.push(new Bishop("1f","white"));
        this.set.push(new Knight("1g","white"));
        this.set.push(new Rook("1h","white"));

        for (let i of columns) {
            this.set.push(new Pawn("7"+i,"black"));
        }
        this.set.push(new Rook("8a","black"));
        this.set.push(new Knight("8b","black"));
        this.set.push(new Bishop("8c","black"));
        this.set.push(new Queen("8d","black"));
        this.set.push(new King("8e","black"));
        this.set.push(new Bishop("8f","black"));
        this.set.push(new Knight("8g","black"));
        this.set.push(new Rook("8h","black"));
    }
}
class Piece{
    constructor(pos,colour){
        this.pos=pos;
        this.colour=colour;
    }
    move(){

    }
    
}
class Pawn extends Piece{
    constructor(pos,colour){
        super(pos,colour);
        this.promoted=false;
        this.pinned=false;
        this.behaviour="pawn";
        if(colour=="white"){
            this.img="source/PawnW.png";
        }
        if(colour=="black"){
            this.img="source/PawnB.png";
        }    
    }
    move(location){
        
        if(this.colour=="white"){
            
            if(this.pos[0]=='2'){
                //can move 2
                if(location[1]==this.pos[1]&&(parseInt(location[0])==parseInt(this.pos[0])+1||parseInt(location[0])==parseInt(this.pos[0])+2)){
                    return true;
                }
            }
            
            if(location[1]==this.pos[1]&&parseInt(location[0])==parseInt(this.pos[0])+1){
                if(location[0]=="8"){
                    this.promoted=true;
                   //console.log("promotes");
                    return true;
                }
                return true;
            }
            if(Math.abs(columns.indexOf(location[1]) -columns.indexOf(this.pos[1]))==1&&parseInt(location[0])==parseInt(this.pos[0])+1){
                if(location[0]=="8"){
                    this.promoted=true;
                    //console.log("promotes");
                    return true;
                }
                return true;
            }
        }
        if(this.colour=="black"){
            
            if(this.pos[0]=='7'){
                //can move 2
                if(location[1]==this.pos[1]&&(parseInt(location[0])==parseInt(this.pos[0])-1||parseInt(location[0])==parseInt(this.pos[0])-2)){
                    return true;
                }
            }
            
            if(location[1]==this.pos[1]&&parseInt(location[0])==parseInt(this.pos[0])-1){
                
                if(location[0]=="1"){
                    this.promoted=true;
                    //console.log("promotes");
                    return true;
                }
                return true;
            }
            if(Math.abs(columns.indexOf(location[1]) -columns.indexOf(this.pos[1]))==1&&parseInt(location[0])==parseInt(this.pos[0])-1){
                if(location[0]=="1"){
                    this.promoted=true;
                   // console.log("promotes");
                    return true;
                }
                return true;
            }
        }
        return false;
    }
}
class Rook extends Piece{
    constructor(pos,colour){
        super(pos,colour);
        this.pinned=false;
        this.behaviour="rook";
        if(colour=="white"){
            this.img="source/RookW.png";
        }
        if(colour=="black"){
            this.img="source/RookB.png";
        }
    }
    move(location){
        if((location[0]==this.pos[0]&&location[1]!=this.pos[1])||(location[0]!=this.pos[0]&&location[1]==this.pos[1])){
            return true;
        }
        return false;
    }
    
}
class Knight extends Piece{
    constructor(pos,colour){
        super(pos,colour);
        this.pinned=false;
        this.behaviour="knight";
        if(colour=="white"){
            this.img="source/KnightW.png";
        }
        if(colour=="black"){
            this.img="source/KnightB.png";
        }
    }
    move(location){
        let firstPosition=columns.indexOf(location[1])+1;
        let secondPosition=parseInt(location[0]);
        if((firstPosition==parseInt(columns.indexOf(this.pos[1])+1)+2||firstPosition==parseInt(columns.indexOf(this.pos[1])+1)-2)&&(secondPosition==parseInt(this.pos[0])+1||secondPosition== parseInt(this.pos[0])-1)){
            return true;
        }
        if((firstPosition==parseInt(columns.indexOf(this.pos[1])+1)+1||firstPosition==parseInt(columns.indexOf(this.pos[1])+1)-1)&&(secondPosition==parseInt( this.pos[0])+2||secondPosition==parseInt( this.pos[0])-2)){
            return true;
        }
        return false;
    }
}
class Bishop extends Piece{
    constructor(pos,colour){
        super(pos,colour);
        this.pinned=false;
        this.behaviour="bishop";
        if(colour=="white"){
            this.img="source/BishopW.png";
        }
        if(colour=="black"){
            this.img="source/BishopB.png";
        }
    }
    move(location){
        let firstPosition=parseInt(columns.indexOf(location[1]))+1;
        let secondPosition=parseInt(location[0]);
        
        if(Math.abs(firstPosition-parseInt(columns.indexOf(this.pos[1])+1))==Math.abs(secondPosition-parseInt(this.pos[0]))){
            return true;
        }
        return false;
    }
}
class Queen extends Piece{
    constructor(pos,colour){
        super(pos,colour);
        this.pinned=false;
        this.behaviour="queen";
        if(colour=="white"){
            this.img="source/QueenW.png";
        }
        if(colour=="black"){
            this.img="source/QueenB.png";
        }
    }
    move(location){
        let firstPosition=parseInt(columns.indexOf(location[1]))+1;
        let secondPosition=parseInt(location[0]);
        if(Math.abs(firstPosition-parseInt(columns.indexOf(this.pos[1])+1))==Math.abs(secondPosition-parseInt(this.pos[0]))){
            return true;
        }
        if((location[0]==this.pos[0]&&location[1]!=this.pos[1])||(location[0]!=this.pos[0]&&location[1]==this.pos[1])){
            return true;
        }

        return false;
    }
}
class King extends Piece{
    constructor(pos,colour){
        super(pos,colour);
        this.threatened=false;
        this.behaviour="king";
        if(colour=="white"){
            this.img="source/KingW.png";
        }
        if(colour=="black"){
            this.img="source/KingB.png";
        }
    }
    move(location){
        let firstPosition=columns.indexOf(location[1])+1;
        
        let secondPosition=parseInt(location[0]);
        
        if(Math.abs(firstPosition-columns.indexOf(this.pos[1])-1)<=1&&Math.abs(secondPosition-parseInt(this.pos[0]))<=1){
            return true;
        }
        else {
            if(this.colour=="white"){//castle moves
                if(this.pos=="1e"&&(location=="1c"||location=="1g")){
                    return true;
                }
            }
            else{
                if(this.pos=="8e"&&(location=="8c"||location=="8g")){
                    return true;
                }
            }
        }
        return false;
    }
}
class Moveset{
    constructor() {
        this.set=[];
    }
    //array that gets "push(Move)" when Move is valid
}
class Move{
    constructor(piece,targetPos){
        this.pos=targetPos;
        this.piece=piece;
    }
}

const newGameBoard=new Board()
newGameBoard.initialize(newGameBoard);