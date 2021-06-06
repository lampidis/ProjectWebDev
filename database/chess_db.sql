
DROP TABLE IF EXISTS Participates;
DROP TABLE IF EXISTS Solves;
DROP TABLE IF EXISTS Has;
DROP TABLE IF EXISTS Friend;
DROP TABLE IF EXISTS Invites;
DROP TABLE IF EXISTS Challenge;
DROP TABLE IF EXISTS GAME;
DROP TABLE IF EXISTS PLAYER;
DROP TABLE IF EXISTS PUZZLE;
DROP TABLE IF EXISTS RANKING;

CREATE TABLE GAME (
	Board_id serial NOT NULL,
	State varchar(255),
	Position varchar(255),
	MoveSet text[],
	DateTime timestamp NOT NULL,
	CONSTRAINT GAME_pk PRIMARY KEY (Board_id)
) WITH (
  OIDS=FALSE
);



CREATE TABLE PLAYER (
	Player_id serial NOT NULL,
	Username varchar(255) NOT NULL,
	Password varchar(255) NOT NULL,
	Email varchar(255) NOT NULL UNIQUE,
	CONSTRAINT PLAYER_pk PRIMARY KEY (Player_id)
) WITH (
  OIDS=FALSE
);



CREATE TABLE PUZZLE (
	Puzzle_id serial NOT NULL,
	Name varchar(255) NOT NULL,
	Puzzle_ranking integer NOT NULL,
	CONSTRAINT PUZZLE_pk PRIMARY KEY (Puzzle_id)
) WITH (
  OIDS=FALSE
);



CREATE TABLE RANKING (
	Ranking_id serial NOT NULL,
	type varchar(255) NOT NULL,
	ranking integer NOT NULL,
	CONSTRAINT RANKING_pk PRIMARY KEY (Ranking_id)
) WITH (
  OIDS=FALSE
);



CREATE TABLE Participates (
	Board_id serial NOT NULL,
	Player_id1 integer NOT NULL,
	Player_id2 integer,
	CONSTRAINT Participates_pk PRIMARY KEY (Board_id)
) WITH (
  OIDS=FALSE
);



CREATE TABLE Solves (
	Player_id integer NOT NULL,
	Puzzle_id integer NOT NULL,
	CONSTRAINT Solves_pk PRIMARY KEY (Player_id,Puzzle_id)
) WITH (
  OIDS=FALSE
);



CREATE TABLE Has (
	Player_id integer NOT NULL,
	Ranking_id integer NOT NULL,
	CONSTRAINT Has_pk PRIMARY KEY (Player_id,Ranking_id)
) WITH (
  OIDS=FALSE
);



CREATE TABLE Friend (
	Player_id1 integer NOT NULL,
	Player_id2 integer NOT NULL,
	CONSTRAINT Friend_pk PRIMARY KEY (Player_id1,Player_id2)
) WITH (
  OIDS=FALSE
);



CREATE TABLE Invites (
	Player_id1 integer NOT NULL,
	Player_id2 integer NOT NULL,
	CONSTRAINT Invites_pk PRIMARY KEY (Player_id1,Player_id2)
) WITH (
  OIDS=FALSE
);



CREATE TABLE Challenge (
	Player_id integer NOT NULL,
	Password varchar(255),
	CONSTRAINT Challenge_pk PRIMARY KEY (Player_id)
) WITH (
  OIDS=FALSE
);


ALTER TABLE Participates ADD CONSTRAINT Participates_fk0 FOREIGN KEY (Board_id) REFERENCES GAME(Board_id);
ALTER TABLE Participates ADD CONSTRAINT Participates_fk1 FOREIGN KEY (Player_id1) REFERENCES PLAYER(Player_id);
ALTER TABLE Participates ADD CONSTRAINT Participates_fk2 FOREIGN KEY (Player_id2) REFERENCES PLAYER(Player_id);

ALTER TABLE Solves ADD CONSTRAINT Solves_fk0 FOREIGN KEY (Player_id) REFERENCES PLAYER(Player_id);
ALTER TABLE Solves ADD CONSTRAINT Solves_fk1 FOREIGN KEY (Puzzle_id) REFERENCES PUZZLE(Puzzle_id);

ALTER TABLE Has ADD CONSTRAINT Has_fk0 FOREIGN KEY (Player_id) REFERENCES PLAYER(Player_id);
ALTER TABLE Has ADD CONSTRAINT Has_fk1 FOREIGN KEY (Ranking_id) REFERENCES RANKING(Ranking_id);

ALTER TABLE Friend ADD CONSTRAINT Friend_fk0 FOREIGN KEY (Player_id1) REFERENCES PLAYER(Player_id);
ALTER TABLE Friend ADD CONSTRAINT Friend_fk1 FOREIGN KEY (Player_id2) REFERENCES PLAYER(Player_id);

ALTER TABLE Invites ADD CONSTRAINT Invites_fk0 FOREIGN KEY (Player_id1) REFERENCES PLAYER(Player_id);
ALTER TABLE Invites ADD CONSTRAINT Invites_fk1 FOREIGN KEY (Player_id2) REFERENCES PLAYER(Player_id);

ALTER TABLE Challenge ADD CONSTRAINT Challenge_fk0 FOREIGN KEY (Player_id) REFERENCES PLAYER(Player_id);
