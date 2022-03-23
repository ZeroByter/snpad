--
-- PostgreSQL database dump
--

-- Dumped from database version 13.4
-- Dumped by pg_dump version 13.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: texts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.texts (
    id character varying(16) NOT NULL,
    folderid character varying(16),
    userid character varying(16) NOT NULL,
    data text NOT NULL,
    timecreated numeric NOT NULL,
    title text NOT NULL,
    titleencrypted boolean NOT NULL,
    titlehint text
);


ALTER TABLE public.texts OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id character varying(16) NOT NULL,
    username character varying(64) NOT NULL,
    password character varying(128) NOT NULL,
    timecreated numeric NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Data for Name: texts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.texts (id, folderid, userid, data, timecreated, title, titleencrypted, titlehint) FROM stdin;
n7izv49sv9h8ihpz	\N	ca4qw46nyb4rt588	U2FsdGVkX19krlrbsLDjTS7ay9vPieUqZ0LCLwTPrx8=	1643044434647	U2FsdGVkX191qOn6NTHYrBxuFPDPf3PINh/4gEV4QKw=	t	title hint here (test23)
u3uxt3lezw7n24rt	\N	ca4qw46nyb4rt588	U2FsdGVkX182QMWM1aTuqZmt9JBR/lB09vzpezrsq1A=	1643139183609	testasdasd	f	\N
uzg6rk6e29ljauzb	\N	ca4qw46nyb4rt588	U2FsdGVkX19X0eCg4xWjRCA03D2vTLqGh2ve8+bC1og=	1643982853636	test	f	\N
by26z0nrz6huv5l4	\N	ca4qw46nyb4rt588	U2FsdGVkX1/BcdtdZbq47egei5KMs6XZfyNHyJDg1kc=	1643044407753	test	f	\N
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, password, timecreated) FROM stdin;
ca4qw46nyb4rt588	test	27lyjerqb4te4i6kp9m2ptdas4og7x7t9r5tg26qjlobtwyha8i5tb4inauzinha62e856dfe2c7d5d02286a84ed36f3faabacb8aa0c7c7320838480053650e5e41	1642971221628
nuuno9h0x7gjwhdg	test2	8km3mo9d5bckjkeev05zcw1x28t7wkq59wedwn6hjz3bs2tlqhhl5if2zelkpviv6398cc43bd7ca83ffdc1e66fd11f43d0d495a695ea693e3620b8c75eb6c4ac20	1643139570268
\.


--
-- Name: texts texts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.texts
    ADD CONSTRAINT texts_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: texts FK_texts_users; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.texts
    ADD CONSTRAINT "FK_texts_users" FOREIGN KEY (userid) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

