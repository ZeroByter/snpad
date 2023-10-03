import { FC } from "react";
import Link from "next/link";
import css from "./header.module.scss";
import VerticalDivider from "./verticalDivider";

type Props = {
  username: string;
};

const Header: FC<Props> = ({ username }) => {
  return (
    <div className={css.root}>
      <div>
        <Link href="/">SecretNotePad</Link>
      </div>
      {!username && (
        <div className={css.links}>
          <VerticalDivider />
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
        </div>
      )}
      <div className={css.links}>
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
      </div>
      {username && (
        <div className={css.links}>
          <VerticalDivider />
          <Link href="/api/logout">Logout</Link>
        </div>
      )}
    </div>
  );
};

export default Header;
