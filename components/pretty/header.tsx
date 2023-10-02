import { FC } from "react";
import Link from "next/link";
import css from "./header.module.scss";

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
        <div className={css.unauthenticated}>
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
        </div>
      )}
    </div>
  );
};

export default Header;
