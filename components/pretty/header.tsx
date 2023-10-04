import { FC, useEffect, useState } from "react";
import Link from "next/link";
import css from "./header.module.scss";
import VerticalDivider from "./verticalDivider";
import Router, { useRouter } from "next/router";

type Props = {
  username: string;
};

const getIsHtml = () => {
  if (typeof document !== "undefined") {
    return Router.pathname.startsWith("/html");
  }

  return true;
};

const Header: FC<Props> = ({ username }) => {
  const router = useRouter();

  const [isHtml, setIsHtml] = useState(false);

  useEffect(() => {
    setIsHtml(getIsHtml());
  }, [router]);

  return (
    <div className={css.root}>
      <div className={css.links}>
        <Link href={isHtml ? "/html" : "/"}>SecretNotePad</Link>
        {!username && (
          <>
            <VerticalDivider />
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
        <VerticalDivider />
        <a
          href="https://github.com/ZeroByter/snpad"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        <a
          href="https://trello.com/b/tOaT1Q6z/secret-notepad"
          target="_blank"
          rel="noreferrer"
        >
          Trello
        </a>
        {username && (
          <>
            <VerticalDivider />
            <Link href="/api/logout">Logout</Link>
          </>
        )}
        <VerticalDivider />
        {!isHtml && (
          <Link href="/html" shallow>
            Bare-HTML
          </Link>
        )}
        {isHtml && (
          <Link href="/" shallow>
            Pretty
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
