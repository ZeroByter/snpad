import { FC } from "react";
import textAreaCss from "@/components/pretty/shared/container.module.scss";
import css from "./decrypted.module.scss";
import Container from "../../shared/container";
import Input from "../../shared/input";
import classNames from "classnames";
import { sanitize } from "isomorphic-dompurify";
import { parse } from "marked";

type Props = {
  readOnly: boolean;
  id: string;
  text: string;
  title: string;
  titleHint: string;
  titleEncrypted: boolean;
  password: string;
};

const Decrypted: FC<Props> = ({
  readOnly,
  id,
  text,
  title,
  titleHint,
  titleEncrypted,
  password,
}) => {
  const username = "";

  return (
    <div className={css.root}>
      <div className={css.container}>
        <Container>switch to edit view</Container>
        <div className={css.titleContainer}>
          <Input
            className={css.input}
            placeholder="Title"
            readOnly
            value={title}
          />
        </div>
        <div className={css.textInputsContainer}>
          <div
            data-unclickable="false"
            className={classNames(
              css.textInputContainer,
              textAreaCss.rootNoPadding
            )}
          >
            <div
              className={css.markdownPreview}
              dangerouslySetInnerHTML={{
                __html: sanitize(parse("hello world")),
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Decrypted;
