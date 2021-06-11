
let columns=["a","b","c","d","e","f","g","h"];
const rows=["1","2","3","4","5","6","7","8"].reverse();
const startingposition="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
const testPosition="8/pP6/1K3k2/8/8/8/QQQqqqQQ/8";
const wrongMate="8/8/8/8/8/6K1/7P/7k";
const stalematePosition="7k/7P/6Q1/p7/P7/8/8/K7";
const fastmate="rnbqkbnr/pp3ppp/2pp4/4p3/2B1P3/5Q3/PPPP1PPP/RNB1K1NR";
const bishopCheck="rnbqkbnr/pppp1ppp/5n2/7Q/4p3/";

const boardContainer=document.querySelector(".wrapperBoard");
var selectedPieceDiv;
var continueWaiting = true;


class Board{
    constructor(id){
        this.pieceset=new Pieceset();
        this.moveset=new Moveset();
        this.enpassant="-";
        this.castle="KQkq";
        this.selectedPiece;
        this.colour="white";
        this.id=id;
        this.playercolour;
        
    }
    isPlayersTurn(){
        if(this.id=="selfAnalyzing")return true;
        if(this.colour==this.playercolour){
            return true;
        }
        return false;
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
        let examinePieces=[];
        for(let piece of this.pieceset.set){
            if(!(piece.behaviour=="king"&&piece.colour!=move.piece.colour)){
                examinePieces.push(piece);
            }
        }
        if(beh=="pawn"){
            
            let from=Math.min(row,posRow);
            let to=Math.max(row,posRow);
            if(col==posCol){
                
                
                for (let i = from+1; i < to; i++) {
                    
                    for(let piece of examinePieces){
                        
                         if(piece.pos==`${i}${columns[col-1]}`){
                            
                             return false;
 
                         }
                     }
                }
                for(let piece of this.pieceset.set){
                   
                     if(piece.pos==`${row}${columns[col-1]}`){
                        
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
                
                return false;
            }
            return true;
        }
        if(beh=="rook"){
            if(col==posCol){
               let from=Math.min(row,posRow);
               let to=Math.max(row,posRow);
               
               for (let i = from+1; i < to; i++) {
                   
                   for(let piece of examinePieces){
                   
                        if(piece.pos==`${i}${columns[col-1]}`){
                            
                            return false;

                        }
                    }
               }
               for(let piece of examinePieces){
                   
                    if(piece.pos==`${row}${columns[col-1]}`&&piece.colour==move.piece.colour){
                       
                        return false;

                    }
                }
            }
            if(row==posRow){
                let from=Math.min(col,posCol);
                let to=Math.max(col,posCol);
                for (let i = from+1; i < to; i++) {
                    //let loc=document.getElementById(`${columns[col-1]}${i}`);
                    for(let piece of examinePieces){
                    
                         if(piece.pos==`${row}${columns[i-1]}`){
                            
                             return false;
 
                         }
                     }
                }
                for(let piece of examinePieces){
                   
                    if(piece.pos==`${row}${columns[col-1]}`&&piece.colour==move.piece.colour){
                        
                        return false;

                    }
                }
             }
             return true;
        }
        if(beh=="knight"){

            for(let piece of this.pieceset.set){
                   
                if(piece.pos==`${row}${columns[col-1]}`&&piece.colour==move.piece.colour){
                    
                    return false;

                }
            }
            return true;
        }
        if(beh=="bishop"){
            for(let piece of examinePieces){
                
                if(piece.pos==`${row}${columns[col-1]}`&&piece.colour==move.piece.colour){
                   
                    
                    return false;

                }
            } 
            let counter=1;
            if(row<posRow){
                if(col<posCol){
                    while(row+counter<posRow){
                        for(let piece of examinePieces){
                    
                            if(piece.pos==`${row+counter}${columns[col+counter-1]}`){
                                
                                return false;
    
                            }
                        }
                        counter++;
                    }
                }
                else{
                    while(row+counter<posRow){
                        for(let piece of examinePieces){
                    
                            if(piece.pos==`${row+counter}${columns[col-counter-1]}`){
                               
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
                        for(let piece of examinePieces){
                    
                            if(piece.pos==`${row-counter}${columns[col+counter-1]}`){
                                
                                return false;
    
                            }
                        }
                        counter++;
                    }
                }
                else{
                    while(row-counter>posRow){
                        for(let piece of examinePieces){
                    
                            if(piece.pos==`${row-counter}${columns[col-counter-1]}`){
                               
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
                            
                             return false;
 
                         }
                     }
                }
                for(let piece of examinePieces){
                    
                     if(piece.pos==`${row}${columns[col-1]}`&&piece.colour==move.piece.colour){
                         
                         
                         return false;
 
                     }
                 }
             }
            else if(row==posRow){
                
                 let from=Math.min(col,posCol);
                 let to=Math.max(col,posCol);
                 for (let i = from+1; i < to; i++) {
                     //let loc=document.getElementById(`${columns[col-1]}${i}`);
                     for(let piece of examinePieces){
                     
                          if(piece.pos==`${row}${columns[i-1]}`){
                             
                              return false;
  
                          }
                      }
                 }
                 for(let piece of examinePieces){
                    
                     if(piece.pos==`${row}${columns[col-1]}`&&piece.colour==move.piece.colour){
                         
                         return false;
 
                     }
                 }
              } 
            else{
                let counter=1;
                    
                if(row<posRow){
                    if(col<posCol){
                        while(row+counter<posRow){
                            for(let piece of examinePieces){
                                
                                if(piece.pos==`${row+counter}${columns[col+counter-1]}`){
                                    
                                    return false;
        
                                }
                            }
                            counter++;
                        }
                    }
                    else{
                        while(row+counter<posRow){
                            for(let piece of examinePieces){
                                
                                if(piece.pos==`${row+counter}${columns[col-counter-1]}`){
                                
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
                            for(let piece of examinePieces){
                                
                                if(piece.pos==`${row-counter}${columns[col+counter-1]}`){
                                
                                    return false;
        
                                }
                            }
                            counter++;
                        }
                    }
                    else{
                        while(row-counter>posRow){
                            for(let piece of examinePieces){
                                
                                if(piece.pos==`${row-counter}${columns[col-counter-1]}`){
                                    
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
                    
                   
                    return false;

                }
            } 
            return true; 
        }
        if(beh=="king"){
            for(let piece of this.pieceset.set){
                   
                if(piece.pos==`${row}${columns[col-1]}`&&piece.colour==move.piece.colour){
                   
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
                for(let piece of this   .pieceset.set){
                    if(piece.colour!=this.colour){
                        examinePieces.push(piece);
                    }
                }

                
               for(let position of positionsToBeChecked){
                    for (let piece of examinePieces) {
                        if(piece.move(position)){
                            let moveToBeChecked=new Move(piece,position);
                            if(this.notBlocked(moveToBeChecked)&&piece.pos!=move.pos){
                                
                                return false;
                            }
                        }
                    }
               }
                
            }

            
            return true;
        }
    }
    notBlockedCheck(move){
        let beh=move.piece.behaviour;
        let des=move.pos;
        let row=parseInt(des[0]);
        let col=parseInt(columns.indexOf(des[1])+1);
        let posRow=parseInt(move.piece.pos[0]);
        let posCol=parseInt(columns.indexOf(move.piece.pos[1])+1);
        let pieceColour=move.piece.colour;
        let examinePieces=[];
        let notToBeChecked;
        for(let piece of this.pieceset.set){
            if(piece.pos==move.pos){
                notToBeChecked=piece;
            }
        }
        //console.log("Not to be checked");
        //console.log(notToBeChecked);
        for(let piece of this.pieceset.set){
            if(!(piece.behaviour=="king"&&piece.colour!=move.piece.colour)){
                examinePieces.push(piece);
            }
        }
        if(beh=="pawn"){
            
            let from=Math.min(row,posRow);
            let to=Math.max(row,posRow);
            if(col==posCol){
                
                
                for (let i = from+1; i < to; i++) {
                    
                    for(let piece of examinePieces){
                        
                         if(piece.pos==`${i}${columns[col-1]}`){
                            
                             return false;
 
                         }
                     }
                }
                for(let piece of this.pieceset.set){
                   
                     if(piece.pos==`${row}${columns[col-1]}`){
                        
                         return false;

                     }
                 }
            }
            else{
                return true;
                for(let piece of this.pieceset.set){
                    
                    if(piece.pos==`${row}${columns[col-1]}`&&(piece.colour!=move.piece.colour||piece!=notToBeChecked)){
                        
                        return true;

                    }
                }
                
                return false;
            }
            return true;
        }
        if(beh=="rook"){
            if(col==posCol){
               let from=Math.min(row,posRow);
               let to=Math.max(row,posRow);
               
               for (let i = from+1; i < to; i++) {
                   
                   for(let piece of examinePieces){
                   
                        if(piece.pos==`${i}${columns[col-1]}`){
                            
                            return false;

                        }
                    }
               }
               for(let piece of examinePieces){
                   
                    if(piece.pos==`${row}${columns[col-1]}`&&piece.colour==move.piece.colour&&piece!=notToBeChecked){
                       
                        return false;

                    }
                }
            }
            if(row==posRow){
                let from=Math.min(col,posCol);
                let to=Math.max(col,posCol);
                for (let i = from+1; i < to; i++) {
                    //let loc=document.getElementById(`${columns[col-1]}${i}`);
                    for(let piece of examinePieces){
                    
                         if(piece.pos==`${row}${columns[i-1]}`){
                            
                             return false;
 
                         }
                     }
                }
                for(let piece of examinePieces){
                   
                    if(piece.pos==`${to}${columns[col-1]}`&&piece.colour==move.piece.colour&&piece!=notToBeChecked){
                        
                        return false;

                    }
                }
             }
             return true;
        }
        if(beh=="knight"){

            for(let piece of this.pieceset.set){
                   
                if(piece.pos==`${row}${columns[col-1]}`&&piece.colour==move.piece.colour&&piece!=notToBeChecked){
                    
                    return false;

                }
            }
            return true;
        }
        if(beh=="bishop"){
            for(let piece of examinePieces){
                   
                if(piece.pos==`${row}${columns[col-1]}`&&piece.colour==move.piece.colour&&piece!=notToBeChecked){
                    
                    
                    return false;

                }
            } 
            let counter=1;
            if(row<posRow){
                if(col<posCol){
                    while(row+counter<posRow){
                        for(let piece of examinePieces){
                    
                            if(piece.pos==`${row+counter}${columns[col+counter-1]}`){
                                
                                return false;
    
                            }
                        }
                        counter++;
                    }
                }
                else{
                    while(row+counter<posRow){
                        for(let piece of examinePieces){
                    
                            if(piece.pos==`${row+counter}${columns[col-counter-1]}`){
                               
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
                        for(let piece of examinePieces){
                    
                            if(piece.pos==`${row-counter}${columns[col+counter-1]}`){
                                
                                return false;
    
                            }
                        }
                        counter++;
                    }
                }
                else{
                    while(row-counter>posRow){
                        for(let piece of examinePieces){
                    
                            if(piece.pos==`${row-counter}${columns[col-counter-1]}`){
                               
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
                            
                             return false;
 
                         }
                     }
                }
                for(let piece of examinePieces){
                    
                     if(piece.pos==`${row}${columns[col-1]}`&&piece.colour==move.piece.colour&&piece!=notToBeChecked){
                         
                         
                         return false;
 
                     }
                 }
             }
            else if(row==posRow){
                
                 let from=Math.min(col,posCol);
                 let to=Math.max(col,posCol);
                 for (let i = from+1; i < to; i++) {
                     //let loc=document.getElementById(`${columns[col-1]}${i}`);
                     for(let piece of examinePieces){
                     
                          if(piece.pos==`${row}${columns[i-1]}`){
                             
                              return false;
  
                          }
                      }
                 }
                 for(let piece of examinePieces){
                    
                     if(piece.pos==`${row}${columns[col-1]}`&&piece.colour==move.piece.colour&&piece!=notToBeChecked){
                         
                         return false;
 
                     }
                 }
              } 
            else{
                let counter=1;
                    
                if(row<posRow){
                    if(col<posCol){
                        while(row+counter<posRow){
                            for(let piece of examinePieces){
                                
                                if(piece.pos==`${row+counter}${columns[col+counter-1]}`){
                                    
                                    return false;
        
                                }
                            }
                            counter++;
                        }
                    }
                    else{
                        while(row+counter<posRow){
                            for(let piece of examinePieces){
                                
                                if(piece.pos==`${row+counter}${columns[col-counter-1]}`){
                                
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
                            for(let piece of examinePieces){
                                
                                if(piece.pos==`${row-counter}${columns[col+counter-1]}`){
                                
                                    return false;
        
                                }
                            }
                            counter++;
                        }
                    }
                    else{
                        while(row-counter>posRow){
                            for(let piece of examinePieces){
                                
                                if(piece.pos==`${row-counter}${columns[col-counter-1]}`){
                                    
                                    return false;
        
                                }
                            }
                            counter++;
                        }
                    }  
                }
            }
            for(let piece of this.pieceset.set){
                
                   
                if(piece.pos==`${row}${columns[col-1]}`&&piece.colour==move.piece.colour&&piece!=notToBeChecked){
                    
                   
                    return false;

                }
            } 
            return true; 
        }
        if(beh=="king"){
            for(let piece of this.pieceset.set){
                   
                if(piece.pos==`${row}${columns[col-1]}`&&piece.colour==move.piece.colour&&piece!=notToBeChecked){
                   
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
                for(let piece of this   .pieceset.set){
                    if(piece.colour!=this.colour){
                        examinePieces.push(piece);
                    }
                }

                
               for(let position of positionsToBeChecked){
                    for (let piece of examinePieces) {
                        if(piece.move(position)){
                            let moveToBeChecked=new Move(piece,position);
                            if(this.notBlocked(moveToBeChecked)&&piece.pos!=move.pos){
                                
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
        let examinePieces=[];
        let king;
        for(let piece of this.pieceset.set){
            if(piece.colour!=move.piece.colour && piece.pos!="/"){
                
                examinePieces.push(piece);
            }else if(piece.behaviour=="king" &&piece.colour==this.colour){
                king=piece;
            }
            
        }
       
        //let previousLoc=move.piece.pos;
        if(move.piece.behaviour=="king"){
            //move.piece.pos=move.pos;
            //console.log(examinePieces);
            for (let piece of examinePieces) {
                if(piece.move(move.pos)){
                    
                    
                    let moveToBeChecked=new Move(piece,move.pos);
                    
                    
                        if(this.notBlockedCheck(moveToBeChecked)){
                            //console.log("piece that checks")
                            //console.log(piece)
                            //console.log(move)   
                        //move.piece.pos=previousLoc;
                        return true;
                    }
                }
            }
            //move.piece.pos=previousLoc; 
        }
        else{
            
            let indexedPiece=this.pieceset.set.indexOf(move.piece);
            
            let previousloc=this.pieceset.set[indexedPiece].pos;
            this.pieceset.set[indexedPiece].pos=move.pos;
            for (let piece of examinePieces) {
                if(piece.move(king.pos)){
                    let moveToBeChecked=new Move(piece,king.pos);
                    if(this.notBlocked(moveToBeChecked)&&piece.pos!=move.pos){
                        
                        this.pieceset.set[indexedPiece].pos=previousloc;

                        return true;
                    }
                }
            }
            this.pieceset.set[indexedPiece].pos=previousloc;
        }
        return false;
    }
    draw(){
        let counterOfSufficientPieces=0;
        let pieces=[];
        for(let piece of this.pieceset.set){
            if(piece.pos=="/")continue;
            if(piece.behaviour=="rook"||piece.behaviour=="queen"||piece.behaviour=="pawn")return false;
            if(piece.behaviour=="knight"||piece.behaviour=="bishop"){
                counterOfSufficientPieces++;
                pieces.push(piece);

            }
        }
        if(counter<2)return true;
        if(counter==2){
            if(pieces[0].colour==pieces[1].colour)return false;
            return true
        }
        return false;

    }
    stalemate(){
       
        let examinePieces=[];
        for(let piece of this.pieceset.set){
            if(piece.colour==this.colour){
                examinePieces.push(piece);
            }
            
        }
        //console.log("Examine Pieces")
        //console.log(examinePieces);
        for(let piece of examinePieces){
            
            for(let i=1;i<9;i++){
                for(let j=0;j<8;j++){
                    let move=new Move(piece,`${i}${columns[j]}`)
                    if(move.pos==piece.pos)continue;
                    
                    if(piece.move(move.pos)){
                    
                        if(this.notBlocked(move)){
                             
                            if(!this.isUnderCheck(move)){
                                //console.log(move);
                                return false;
                            }
                       
                        }
                    }
                }
            }
        }
        return true;
    }
    checkMate(){
        let counter=0;
        let examinePieces=[];
        let allyPieces=[];
        let king;
        let checkingPieces=[];
        for(let piece of this.pieceset.set){
            if(piece.colour!=this.colour && piece.pos!="/"){
                
                examinePieces.push(piece);
            }else{
                allyPieces.push(piece)
                if(piece.behaviour=="king" &&piece.colour==this.colour){
                    king=piece;
                }
            } 
            
        }//gather enemy pieces and ally pieces in two arrays
        for(let piece of examinePieces){
            if(piece.move(king.pos)){
               
                let moveToBeChecked=new Move(piece,king.pos);
                if(this.notBlocked(moveToBeChecked)){
                    
                   checkingPieces.push(piece);
                   counter++;
                }
            }
        }
        console.log(this.colour);
        if(counter==0)return false;
        if(counter==1){
            for(let piece of allyPieces){
                let move=new Move(piece,checkingPieces[0].pos)
                if(piece.move(move.pos)){
                    //console.log("legal");
                    if(this.notBlocked(move)){
                        
                        if(!this.isUnderCheck(move)){
                            
                            return false;
                        }
                       
                    }
                }
                               
            }
            let beh=checkingPieces[0].behaviour;
            let des=king.pos;
            let row=parseInt(des[0]);
            let col=parseInt(columns.indexOf(des[1])+1);
            let posRow=parseInt(checkingPieces[0].pos[0]);
            let posCol=parseInt(columns.indexOf(checkingPieces[0].pos[1])+1);
            //let pieceColour=move.piece.colour;
            
            let examineSpaces=[];
            
            if(beh=="rook"){
                if(col==posCol){
                let from=Math.min(row,posRow);
                let to=Math.max(row,posRow);
                
                    for (let i = from+1; i < to; i++) {
                    
                        for(let piece of allyPieces){
                            let move=new Move(piece,`${i}${columns[col-1]}`)
                            if(piece.move(move.pos)){
                                   
                                if(this.notBlocked(move)){
                      
                                    if(!this.isUnderCheck(move)){
                                        
                                        return false;
                                    }
                                     
                                }
                            } 
   
                        }
                    }
                }      
                if(row==posRow){
                    let from=Math.min(col,posCol);
                    let to=Math.max(col,posCol);
                    for (let i = from+1; i < to; i++) {
                        //let loc=document.getElementById(`${columns[col-1]}${i}`);
                        for(let piece of allyPieces){
                        
                            
                            let move=new Move(piece,`${row}${columns[i-1]}`)
                            if(piece.move(move.pos)){
                                   
                                if(this.notBlocked(move)){
                      
                                    if(!this.isUnderCheck(move)){
                                        
                                        return false;
                                    }
                                     
                                }
                            } 
   
                        }
                    }
                    
                }
               
            }
            if(beh=="bishop"){
                
                let counter=1;
                if(row<posRow){
                    if(col<=posCol){
                        while(row+counter<posRow){
                            for(let piece of allyPieces){
                        
                                
                                let move=new Move(piece,`${row+counter}${columns[col+counter-1]}`)
                                if(piece.move(move.pos)){
                                       
                                    if(this.notBlocked(move)){
                          
                                        if(!this.isUnderCheck(move)){
                                            return false;
                                        }
                                         
                                    }
                                } 
                            }
                            counter++;
                        }
                    }
                    else{
                        while(row+counter<=posRow){
                            for(let piece of allyPieces){
                        
                                
                                let move=new Move(piece,`${row+counter}${columns[col-counter-1]}`)
                                if(piece.move(move.pos)){
                                       
                                    if(this.notBlocked(move)){
                          
                                        if(!this.isUnderCheck(move)){
                                            return false;
                                        }
                                         
                                    }
                                } 
                            }
                            counter++;
                        }
                    }
                }
                else{
                    if(col<posCol){
                        while(row-counter>=posRow){
                            for(let piece of allyPieces){
                        
                                
                                 
                                let move=new Move(piece,`${row-counter}${columns[col+counter-1]}`)
                                if(piece.move(move.pos)){
                                       
                                    if(this.notBlocked(move)){
                          
                                        if(!this.isUnderCheck(move)){
                                            return false;
                                        }
                                         
                                    }
                                } 
                            }
                            counter++;
                        }
                    }
                    else{
                        while(row-counter>=posRow){
                            for(let piece of allyPieces){
                        
                                
                                let move=new Move(piece,`${row-counter}${columns[col-counter-1]}`)
                                if(piece.move(move.pos)){
                                       
                                    if(this.notBlocked(move)){
                          
                                        if(!this.isUnderCheck(move)){
                                            return false;
                                        }
                                         
                                    }
                                } 
                            }
                            counter++;
                        }
                    }  
                }
                
                
                
            }
            if(beh=="queen"){
                
                if(col==posCol){
                    let from=Math.min(row,posRow);
                    let to=Math.max(row,posRow);
                    
                        for (let i = from+1; i < to; i++) {
                        
                            for(let piece of allyPieces){
                                let move=new Move(piece,`${i}${columns[col-1]}`)
                                if(piece.move(move.pos)){
                                       
                                    if(this.notBlocked(move)){
                          
                                        if(!this.isUnderCheck(move)){
                                            return false;
                                        }
                                         
                                    }
                                } 
       
                            }
                        }
                    }      
                else if(row==posRow){
                        let from=Math.min(col,posCol);
                        let to=Math.max(col,posCol);
                        for (let i = from+1; i < to; i++) {
                            //let loc=document.getElementById(`${columns[col-1]}${i}`);
                            for(let piece of allyPieces){
                            
                                
                                let move=new Move(piece,`${row}${columns[i-1]}`)
                                if(piece.move(move.pos)){
                                       
                                    if(this.notBlocked(move)){
                          
                                        if(!this.isUnderCheck(move)){
                                            return false;
                                        }
                                         
                                    }
                                } 
       
                            }
                        }
                        
                    }
                   
            else{
                
                    let counter=1;
                if(row<posRow){
                    if(col<posCol){
                        
                        while(row+counter<=posRow){
                            for(let piece of allyPieces){
                        
                                
                                let move=new Move(piece,`${row+counter}${columns[col+counter-1]}`)
                                if(piece.move(move.pos)){
                                       
                                    if(this.notBlocked(move)){
                          
                                        if(!this.isUnderCheck(move)){
                                            return false;
                                        }
                                         
                                    }
                                } 
                            }
                            counter++;
                        }
                    }
                    else{
                        
                        while(row+counter<=posRow){
                            for(let piece of allyPieces){
                        
                                
                                let move=new Move(piece,`${row+counter}${columns[col-counter-1]}`)
                                if(piece.move(move.pos)){
                                       
                                    if(this.notBlocked(move)){
                          
                                        if(!this.isUnderCheck(move)){
                                            return false;
                                        }
                                         
                                    }
                                } 
                            }
                            counter++;
                        }
                    }
                }
                else{
                    if(col<posCol){
                        
                        while(row-counter>=posRow){
                            for(let piece of allyPieces){
                        
                                
                                 
                                let move=new Move(piece,`${row-counter}${columns[col+counter-1]}`)
                                
                                if(piece.move(move.pos)){
                                       
                                    if(this.notBlocked(move)){
                          
                                        if(!this.isUnderCheck(move)){
                                            
                                            return false;
                                        }
                                         
                                    }
                                } 
                            }
                            counter++;
                        }
                    }
                    else{
                        while(row-counter>=posRow){
                            for(let piece of allyPieces){
                        
                                
                                let move=new Move(piece,`${row-counter}${columns[col-counter-1]}`)
                                if(piece.move(move.pos)){
                                       
                                    if(this.notBlocked(move)){
                          
                                        if(!this.isUnderCheck(move)){
                                            return false;
                                        }
                                         
                                    }
                                } 
                            }
                            counter++;
                        }
                    }  
                }
            }
                
                
               
            }
        /****************************************************************************************/    
        }   //check only the king moves
        
            let row=parseInt(king.pos[0]);
            let col=columns.indexOf(king.pos[1]);
            for(let i=-1;i<=1;i++){
                for(let j=-1;j<=1;j++){
                    if(j==0&&i==0)continue;
                    let move=new Move(king,(row+i)+columns[col+j]);
                    if(row+i>8||row+i<1||col+j>7||col+j<0)continue; 
                    if(move.piece.move(move.pos)){
                        
                        if(this.notBlocked(move)){
                           
                            if(!this.isPinned(move)){
                                
                                if(!this.isUnderCheck(move)){
                                    console.log(move)
                                    console.log((row+i)+columns[col+j]);
                                    return false;
                                }
                                
                            }
                        }
                    }
                
                }
            }
        

        return true;
    }
    validate(move){
        
        let validity=false;
        if(this.isPlayersTurn()){
            
            if(this.isColorsTurn(move.piece.colour)){
               
                if(move.piece.move(move.pos)){
                    
                    if(this.notBlocked(move)){
                      
                        if(!this.isPinned(move)){
                            
                            if(!this.isUnderCheck(move)){
                                
                                
                                this.moveset.set.push(move);
                                this.colourChange();
                                return true;
                            }
                            
                            
                        }
                    }
                }
            }
        }
        return false;
    }
    //https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation
    transformToForsythEdwardsNotation(posArray){
        let notation="11111111/11111111/11111111/11111111/11111111/11111111/11111111/11111111";
        let notationAr=notation.split("/");
        
        let symbol;
        for(let piece of posArray){
            if(piece.pos!="/"){
                symbol=piece.abriviation;
            
            let row=parseInt(piece.pos[0])-1;
            let col=columns.indexOf(piece.pos[1]);
            
            notationAr[row]=notationAr[row].slice(0,col)+symbol+notationAr[row].slice(col+1,notationAr[row].length);
            }
        }
        notationAr=notationAr.reverse();
        for(let row of notationAr){
            let start=true;
            let startIndex=0;
            let endIndex=0;
            let counter=0;
            let index=notationAr.indexOf(row);
            for(let i=0;i<row.length;i++){
                if(row[i]=="1" && start==true){
                    startIndex=i;
                    start=false;
                    counter++;
                }
                else if(row[i]=="1"&& start==false&&i!=row.length-1){
                    counter++;
                }
                else if(row[i]!="1"&&start==false){
                    row=row.slice(0,startIndex)+counter+row.slice(i,row.length);
                    
                    i-=counter-1;
                    counter=0;
                    start=true;
                }
                else if(i==row.length-1&&row[i]=="1"){
                    row=row.slice(0,startIndex)+(counter+1);
                    
                    i-=counter-1;
                    counter=0;
                    start=true;
                }
                
            }
            
            notationAr[index]=row;
           
        }
        notation=notationAr.join("/");
        

       return notation;

    }
    extractPosArrayFromForsythEdwardsNotation(ForsythEdwardsNotationString){
        let position=new Pieceset();
        position.set=[];
        let rowArray=ForsythEdwardsNotationString.split("/");
        for(let i=8;i>0;i--){
            let row=rowArray[8-i];
            let column=1;
            for(let j=0;j<row.length;j++){
               
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
       
        return position.set;
    }
    clearBoard(){
        for(let i of rows){
            for(let j of columns){
                let divarray=document.getElementById(this.id).lastChild.childNodes;
            
                divarray.forEach(function(node){
                
                if(node.id==`${i}${j}`){
                    if(node.firstChild!=null){
                        node.removeChild(node.firstChild);
                    }
                    
                }
            })
               
                
            }
        }
    }
    setPosition(ForsythEdwardsNotationString){
        let posArray=this.extractPosArrayFromForsythEdwardsNotation(ForsythEdwardsNotationString);
        this.clearBoard();
        
        this.pieceset.set=posArray;
        for(let piece of posArray){
            
            let pieceImage=document.createElement("img");
            pieceImage.src=piece.img;
            let divarray=document.getElementById(this.id).lastChild.childNodes;
            
            divarray.forEach(function(node){
                
                if(node.id==piece.pos){
                    let targetdiv=node;
                    targetdiv.appendChild(pieceImage);
                    
                }
            })
        }
    }
    setPositionInactive(ForsythEdwardsNotationString,id){
        const boardContainer=document.getElementById(id);
            
            const conteiner=document.createElement("div");
            conteiner.classList.add("conteiner");
            boardContainer.appendChild(conteiner);
            
        for(let i of rows){
            for(let j of columns){
               let currentElement=document.createElement("div");
               currentElement.setAttribute("id",i+j);
               currentElement.classList.add("box");
               conteiner.appendChild(currentElement);
               
            }
        }
        this.setPosition(ForsythEdwardsNotationString);
    }
    promote(piece,PositionBefore,PositionTo,Abriviation){
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
                
                
                div.appendChild(pieceImage);
                document.getElementById(board.id).removeChild(modalD);
                if(board.id!="selfAnalyzing" && continueWaiting){
                    let currentPosition=board.transformToForsythEdwardsNotation(board.pieceset.set);
                    var lastmove = ""+Abriviation+PositionBefore+PositionTo
                    var data = {curPos: currentPosition, lastMove : lastmove}
                    const options = {
                        method: 'POST',
                        body: JSON.stringify(data)
                    }
                    fetch('/newGame/plays', options)
                        .then(response => response.json())
                        .then(data => {
                                console.log(data);
                                document.getElementById("player1").classList.add("playerTurn");
                                document.getElementById("player2").classList.remove("playerTurn");
                        });
    
                    let e = false
                    let first_time= true
                    
                    function waitForChange() {
                        fetch("/newGame/opponentMove").then(response => response.json()).then(
                            data=>{
                                console.log(data);
                                    let newPosition=data.newPos;
                                    let newStatus=data.gameStatus;
                                    console.log("new position ", newPosition)
                                    console.log("game Status ", newStatus)
                                    console.log("first_time ", first_time)
                                    if(newStatus == 'draw' && first_time && newPosition){
                                        first_time = false
                                        continueWaiting = false
                                        e = true
                                        board.setPosition(newPosition)
                                        alert("draw");
                                    }
                                    else if(newStatus == 'lost' && first_time && newPosition){
                                        first_time = false
                                        continueWaiting = false
                                        e = true
                                        board.setPosition(newPosition)
                                        alert("checkmate");
                                    }
                                    else if(newStatus == 'win' && first_time){
                                        first_time = false
                                        continueWaiting = false
                                        e = true
                                    }
                                    else if(newPosition && first_time) {
                                        first_time = false
                                        e = true
                                        console.log("newPos:", newPosition)
                                        board.setPosition(newPosition)
                                        board.colourChange()
                                        document.getElementById("player2").classList.add("playerTurn");
                                        document.getElementById("player1").classList.remove("playerTurn");
                                    }
                            });
                        console.log('waiting for other player to play...')
                        if (e) {
                            clearInterval(intervalIdopp);
                        }
            }
            var intervalIdopp = setInterval(waitForChange, 1000);
                }
                
        //-----------------------------------------------------------------------------------
            });
            
        }
        document.getElementById(board.id).appendChild(modalD);
        //fetch for promoted */---------------------------------------------------------------
        

    }
    initializeSolo(board){
        function constructDOM(id){
            const boardContainer=document.getElementById(id);
            
            const conteiner=document.createElement("div");
            conteiner.classList.add("conteiner");
            boardContainer.appendChild(conteiner);
            
            
            
            
            //--------------------------------------
        for(let i of rows){
            for(let j of columns){
               let currentElement=document.createElement("div");
               currentElement.setAttribute("id",i+j);
               currentElement.classList.add("box");
               currentElement.addEventListener("click",function(){
                   
                   
                if(board.selectedPiece==undefined){//First click
                   
                    let occupancy=false;
                    for(const piece of board.pieceset.set){
                        if(piece.pos==this.getAttribute("id")){
                            occupancy=true;
                            board.selectedPiece=piece;
                            
                        }
                    }
                }
                else{//Second Click+
                    let destination=this.getAttribute("id");
                    let move=new Move(board.selectedPiece,destination);
                    let rookStart;
                    let rookEnd;
                    let stop=false;
                    
                    if(board.validate(move)){//valid move
                        
                        if(move.piece.behaviour=="king"){
                            
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
                        else if(move.piece.behaviour=="pawn"){
                            if(move.pos[0]=="8"||move.pos[0]=="1")stop=true;
                        }
                        let targetdiv=document.getElementById(destination);
                        let transfer=document.getElementById(board.selectedPiece.pos).removeChild(document.getElementById(board.selectedPiece.pos).childNodes[0]);
                        console.log(rookStart!=undefined)
                        console.log(rookEnd!=undefined)
                        if(rookEnd!=undefined&&rookStart!=undefined){
                                for(let piece of board.pieceset.set){
                                    if(piece.pos==rookStart.id)piece.pos=rookEnd.id;
                                }
                        }
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
                        let PositionBefore=board.selectedPiece.pos;
                        let PositionTo=destination;
                        let Abriviation=board.selectedPiece.abriviation;
                        let promote=false;
                        board.selectedPiece.pos=destination;
                        if(move.piece.behaviour=="pawn"&&(move.pos[0]=="8"||move.pos[0]=="1")){
                            
                            board.promote(move.piece,PositionBefore,PositionTo,Abriviation);
                            promote=true;
                        }
                        if(board.checkMate()){
                            board.status="finished";
                            fetch('/newGame/checkmate')
                            alert("Checkmate");
                        }
                        else if(board.draw()||board.stalemate()){
                            board.status="finished";
                            fetch('/newGame/draw')
                            alert("Draw");
                        }
                        
                        board.selectedPiece=undefined;
                        
                        
                        //------------------------------------------------------------------------------------------------------------------------------------------------------------
                        //then this.colour 
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
            
            let targetdiv=document.getElementById(piece.pos);
            targetdiv.appendChild(pieceImage);

        }
        }
        constructDOM(board.id); 
        //fetch request for id and colour
        
            
    }
    
    initialize(board,id="board",pos="newgame",type="ChosenNotation"){
        
        function constructDOM(id){
            const boardContainer=document.getElementById(id);
            
            const conteiner=document.createElement("div");
            conteiner.classList.add("conteiner");
            boardContainer.appendChild(conteiner);
            
            
            
            
            //--------------------------------------
        for(let i of rows){
            for(let j of columns){
               let currentElement=document.createElement("div");
               currentElement.setAttribute("id",i+j);
               if(board.playercolour=="white"){
                currentElement.classList.add("box");
               }
               else currentElement.classList.add("reverseBox");
               currentElement.addEventListener("click",function(){
                   
                   //Band Aid for testing
                if(board.selectedPiece==undefined){//First click
                   
                    let occupancy=false;
                    for(let piece of board.pieceset.set){
                   
                        if(piece.pos==this.getAttribute("id")){
                            occupancy=true;
                            board.selectedPiece=piece;
                            selectedPieceDiv = piece.pos;
                            document.getElementById(selectedPieceDiv).classList.add("selectedPiece");
                            
                        }
                    }
                }
                else{//Second Click+
                    let destination=this.getAttribute("id");
                    let move=new Move(board.selectedPiece,destination);
                    let rookStart;
                    let rookEnd;
                    let stop=false;
                    if(board.validate(move)){//valid move
                        if(move.piece.behaviour=="king"){
                            
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
                        else if(move.piece.behaviour=="pawn"){
                            if(move.pos[0]=="8"||move.pos[0]=="1")stop=true;
                        }
                        let targetdiv=document.getElementById(destination);
                        let transfer=document.getElementById(board.selectedPiece.pos).removeChild(document.getElementById(board.selectedPiece.pos).childNodes[0]);
                        //console.log(rookStart!=undefined)
                        //console.log(rookEnd!=undefined)
                        if(rookEnd!=undefined&&rookStart!=undefined){
                                for(let piece of board.pieceset.set){
                                    if(piece.pos==rookStart.id)piece.pos=rookEnd.id;
                                }
                        }
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
                        let PositionBefore=board.selectedPiece.pos;
                        let PositionTo=destination;
                        let Abriviation=board.selectedPiece.abriviation;
                        let promote=false;
                        board.selectedPiece.pos=destination;
                        if(move.piece.behaviour=="pawn"&&(move.pos[0]=="8"||move.pos[0]=="1")){
                            
                            board.promote(move.piece,PositionBefore,PositionTo,Abriviation);
                            promote=true;
                        }
                        if(board.checkMate()){
                            board.status="finished";
                            fetch('/newGame/checkmate')
                            alert("checkmate");
                        }
                        else if(board.draw()||board.stalemate()){
                            board.status="finished";
                            fetch('/newGame/draw')
                            alert("Draw");
                        }
                        board.selectedPiece=undefined;
                        if(!promote && continueWaiting){
                            let currentPosition=board.transformToForsythEdwardsNotation(board.pieceset.set);
                            
                            
                            //fetch for posting pos and get newPos-------------------------------------------------------------------------------------------------------------------------
                            var lastmove = ""+Abriviation+PositionBefore+PositionTo
                            var data = {curPos: currentPosition, lastMove : lastmove}
                            const options = {
                                method: 'POST',
                                body: JSON.stringify(data)
                            }
                            fetch('/newGame/plays', options)
                                .then(response => response.json())
                                .then(data => {
                                        console.log(data);
                                        document.getElementById("player1").classList.add("playerTurn");
                                        document.getElementById("player2").classList.remove("playerTurn");
                                });

                            let e = false
                            let first_time= true
                            
                            function waitForChange() {
                                fetch("/newGame/opponentMove").then(response => response.json()).then(
                                    data=>{
                                        console.log(data);
                                        let newPosition=data.newPos;
                                        let newStatus=data.gameStatus;
                                        console.log("new position ", newPosition)
                                        console.log("game Status ", newStatus)
                                        console.log("first_time ", first_time)
                                        if(newStatus == 'draw' && first_time && newPosition){
                                            first_time = false
                                            continueWaiting = false
                                            e = true
                                            board.setPosition(newPosition)
                                            alert("draw");
                                        }
                                        else if(newStatus == 'lost' && first_time && newPosition){
                                            first_time = false
                                            continueWaiting = false
                                            e = true
                                            board.setPosition(newPosition)
                                            alert("checkmate");
                                        }
                                        else if(newStatus == 'win' && first_time){
                                            first_time = false
                                            continueWaiting = false
                                            e = true
                                        }
                                        else if(newPosition && first_time) {
                                            first_time = false
                                            e = true
                                            console.log("newPos:", newPosition)
                                            board.setPosition(newPosition)
                                            board.colourChange()
                                            document.getElementById("player2").classList.add("playerTurn");
                                            document.getElementById("player1").classList.remove("playerTurn");
                                        }
                                    });
                                console.log('waiting for other player to play...')
                                if (e) {
                                    clearInterval(intervalIdopp);
                                }
                            }
                            var intervalIdopp = setInterval(waitForChange, 1000);
                        }
                        
                        //------------------------------------------------------------------------------------------------------------------------------------------------------------
                        //then this.colour 
                    }
                    else{//invalid move

                        board.selectedPiece=undefined;
                    }
                    document.getElementById(selectedPieceDiv).classList.remove("selectedPiece");
                }
                
                });
               conteiner.appendChild(currentElement);
            }

        }
        
        for(let piece of board.pieceset.set){
            
            let pieceImage=document.createElement("img");
            pieceImage.src=piece.img;
            
            let targetdiv=document.getElementById(piece.pos);
            targetdiv.appendChild(pieceImage);

        }
        }
        
        //fetch request for id and colour
        let q = false;
        let firstTime = true;
        let firstpass=true;
        function intervalFunc() {
            fetch("/newGame/info").then(response => response.json()).then(
                data=>{
                    console.log(data);
                    //board.id=data.board_id;
                    board.playercolour=data.colour;
                    
                    if(firstpass){
                        firstpass=false;
                        if(board.playercolour=="black")rows.reverse();
                        constructDOM(board.id);  
                    }                  
                    //console.log("board id ", board.id)
                    console.log("player colour ", board.playercolour)
                    //console.log(this);
                    q = true;
                });
            console.log('waiting...')
            if (q) {
                clearInterval(intervalIdcolor);
                if(board.playercolour=="black"){
                    let quit = false;
                    //
                    function waitForChange() {
                        fetch("/newGame/opponentMove").then(response => response.json()).then(
                            data=>{
                                console.log(data);
                                let newPosition=data.newPos;
                                console.log("new position ", newPosition)
                                if(newPosition && firstTime) {
                                    firstTime = false
                                    quit = true;
                                    console.log("colour before:", board.colour)
                                    console.log("newPos:", newPosition)
                                    board.setPosition(newPosition);
                                    board.colourChange();
                                    console.log("colour after:", board.colour)
                                }
                        });
                        console.log('waiting for other player to play...')
                        if (quit) {
                            clearInterval(intervalIdblack);
                        }
                    }
                    var intervalIdblack = setInterval(waitForChange, 1000);
                }
            }
            
        }
        var intervalIdcolor = setInterval(intervalFunc, 1000);
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
            this.abriviation="P";
        }
        if(colour=="black"){
            this.img="source/PawnB.png";
            this.abriviation="p";
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
                   
                    return true;
                }
                return true;
            }
            if(Math.abs(columns.indexOf(location[1]) -columns.indexOf(this.pos[1]))==1&&parseInt(location[0])==parseInt(this.pos[0])+1){
                if(location[0]=="8"){
                    this.promoted=true;
                    
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
                    
                    return true;
                }
                return true;
            }
            if(Math.abs(columns.indexOf(location[1]) -columns.indexOf(this.pos[1]))==1&&parseInt(location[0])==parseInt(this.pos[0])-1){
                if(location[0]=="1"){
                    this.promoted=true;
                   
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
            this.abriviation="R";
        }
        if(colour=="black"){
            this.img="source/RookB.png";
            this.abriviation="r";
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
            this.abriviation="N";
        }
        if(colour=="black"){
            this.img="source/KnightB.png";
            this.abriviation="n";
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
            this.abriviation="B";
            this.img="source/BishopW.png";
        }
        if(colour=="black"){
            this.img="source/BishopB.png";
            this.abriviation="b";
        }
    }
    move(location){
        if(this.pos==location)return false;
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
            this.abriviation="Q";
        }
        if(colour=="black"){
            this.img="source/QueenB.png";
            this.abriviation="q";
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
            this.abriviation="K";
            this.img="source/KingW.png";
        }
        if(colour=="black"){
            this.img="source/KingB.png";
            this.abriviation="k";
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
