import { FC } from "react";
import textAreaCss from "@/components/pretty/shared/container.module.scss";
import css from "./decrypted.module.scss";
import Header from "../../header";
import Container from "../../shared/container";
import Input from "../../shared/input";
import classNames from "classnames";
import { sanitize } from "isomorphic-dompurify";

const Decrypted: FC = () => {
  const username = "";

  return (
    <div className={css.root}>
      <Header username={username} />
      <div className={css.root}>
        <Container>switch to edit view</Container>
        <div className={css.titleContainer}>
          <Input className={css.input} placeholder="Title" readOnly />
        </div>
        <div className={css.textInputsContainer}>
          <div
            className={classNames(
              css.textInputContainer,
              textAreaCss.rootNoPadding
            )}
          >
            <div
              className={css.markdownPreview}
              dangerouslySetInnerHTML={{
                __html: sanitize("hello world"),
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Decrypted;
