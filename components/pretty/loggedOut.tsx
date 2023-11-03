import { FC } from "react";
import css from "./loggedOut.module.scss";

type Props = {
  username: string;
};

const LoggedOut: FC<Props> = ({ username }) => {
  return (
    <div className={css.root}>
      <h2>Welcome to Secret Notepad!</h2>
      <p>
        SNPad (Secret Notepad) is a simple text-only end-to-end encryption
        website for all your secret text needs.
      </p>
      <p>
        Unlike other E2E solutions, SNPad allows you to use different passwords
        for each documents.
        <br />
        It&apos;s up to you to remember the passwords you use for each document.
        <br />
        This also increases security since if one password is compromised, your
        other documents remain safe.
      </p>
      <p>
        SNPad is completely open-source, feel free to contribute or simply
        browse the code to see how SNPad works under the hood.
      </p>
    </div>
  );
};

export default LoggedOut;
