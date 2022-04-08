CREATE TABLE public.users (
    id character varying(16) NOT NULL PRIMARY KEY,
    username character varying(64) NOT NULL,
    password character varying(128) NOT NULL,
    timecreated numeric NOT NULL
);

CREATE TABLE public.texts (
    id character varying(16) NOT NULL PRIMARY KEY,
    folderid character varying(16),
    userid character varying(16) NOT NULL,
    data text NOT NULL,
    timecreated numeric NOT NULL,
    title text NOT NULL,
    titleencrypted boolean NOT NULL,
    titlehint text,
    FOREIGN KEY(userid) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE folders (
    id character varying(16) NOT NULL PRIMARY KEY,
    folderid character varying(16),
    userid character varying(16) NOT NULL,
    title text NOT NULL,
    titleencrypted boolean NOT NULL,
    titlehint text,
    timecreated numeric NOT NULL,
    FOREIGN KEY(userid) REFERENCES users(id) ON DELETE CASCADE
);