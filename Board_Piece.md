Piece{
    Type:xxxxx(pawn,rook,knight,bishop,Queen,King)
    Status:xxxx(active,dead,pinned)
    Behaviour:xxxxx(pawn,rook,knight,bishop,Queen,King)
    Name:xxxxx(pawn,rook,knight,bishop,Queen,King)
    Side:xxxx(white,black)
}




or


Piece{
    Status:xxxx(active,dead,pinned)
    Name:xxxxx(pawn,rook,knight,bishop,Queen,King)
    Side:xxxx(white,black)
}
Pawn extends Piece{
    Behaviour:xxx
    Promoted:xxx(true/false)
}
Rook extends Piece{
    Behaviour:xxxx
}
Knight extends Piece{
    Behaviour:xxx
}
Bishop extends Piece{
    behaviour:xxx
}
Queen extends Piece{
    behaviour:xxxx
}
King extends Piece{
    behaviour:xxx
    UnderThreat:xxx(true/false)
}
