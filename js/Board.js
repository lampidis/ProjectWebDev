let columns=["a","b","c","d","e","f","g","h"];
const rows=["1","2","3","4","5","6","7","8"].reverse();
const startingposition="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";

const boardContainer=document.querySelector(".wrapperBoard");
class Board{
    constructor(){
        this.pieceset=new Pieceset();
        this.moveset=new Moveset();
        this.enpassant="-";
        this.castle="KQkq";
        this.selectedPiece;
        

        
    }
    //https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation
    extractPosArrayFromForsythEdwardsNotation(ForsythEdwardsNotationString){
        let position=new Pieceset();
        let rowArray=ForsythEdwardsNotationString.split("/");
        for(let i=7;i>0;i--){
            let row=rowArray[i];
            let column=1;
            for(let i=0;i<row.length;i++){
                if(row[i]>'0'&&row[i]<'9'){
                    //is number change column
                    column+=parseInt(row[i]-1);
                }
                else if(row[i]=="R"){

                }
                else if(row[i]=="K"){

                }
                else if(row[i]=="B"){

                }
                else if(row[i]=="Q"){

                }
                else if(row[i]=="K"){

                }
                else if(row[i]=="P"){

                }
                else if(row[i]=="r"){

                }
                else if(row[i]=="k"){

                }
                else if(row[i]=="b"){

                }
                else if(row[i]=="q"){

                }
                else if(row[i]=="k"){

                }
                else if(row[i]=="p"){

                }



                column++;
            }
        }
        return rowArray;
    }
    setPosition(posArray){
        
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
                if(board.selectedPiece==undefined){//First click
                    //check if div occupied.
                    console.log("First Click");
                    let occupancy=false;
                    for(let piece of board.pieceset.set){
                   
                        if(piece.pos==this.getAttribute("id")){
                            occupancy=true;
                            board.selectedPiece=piece;
                            
                        }
                    }
                }
                else{//Second Click+
                    console.log("Second Click");
                    let destination=this.getAttribute("id");
                    console.log(board.selectedPiece.move(destination)+" , "+destination+" , "+board.selectedPiece.pos);
                    if(board.selectedPiece.move(destination)){//valid move
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
        this.K=[9,14];
        this.B=[10,13];
        this.Q=[11];
        this.K=[12];
        this.r=[24,31];
        this.k=[25,20];
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
        
        if(this.colour="white"){
            if(this.pos[0]=='2'){
                //can move 2
                if(location[1]==this.pos[1]&&(parseInt(location[0])==parseInt(this.pos[0])+1||parseInt(location[0])==parseInt(this.pos[0])+2)){
                    return true;
                }
            }
            
            if(location[1]==this.pos[1]&&parseInt(location[0])==parseInt(this.pos[0])+1){
                if(location[0]=="8"){
                    this.promoted=true;
                    //this.promote();
                    return true;
                }
                return true;
            }
        }
        if(this.colour="black"){
            if(this.pos[0]=='7'){
                //can move 2
                if(location[1]==this.pos[1]&&(parseInt(location[0])==parseInt(this.pos[0])-1||parseInt(location[0])==parseInt(this.pos[0])-2)){
                    return true;
                }
            }
            
            if(location[1]==this.pos[1]&&parseInt(location[0])==parseInt(this.pos[0])-1){
                if(location[0]=="1"){
                    this.promoted=true;
                    //this.promote();
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
        //validate?
    }
}

const newGameBoard=new Board()
newGameBoard.initialize(newGameBoard);