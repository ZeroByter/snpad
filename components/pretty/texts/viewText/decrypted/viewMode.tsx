import classNames from "classnames";
import { FC } from "react";
import css from "./viewMode.module.scss";
import textAreaCss from "@/components/pretty/shared/container.module.scss";
import Input from "@/components/pretty/shared/input";
import { sanitize } from "isomorphic-dompurify";
import { parse } from "marked";
import { useViewText } from "@/components/contexts/viewText";

type Props = {};

const ViewMode: FC<Props> = ({}) => {
  const { title, text } = useViewText();

  return (
    <>
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
          data-unclickable="true"
          className={classNames(
            css.textInputContainer,
            textAreaCss.rootNoPadding
          )}
        >
          <div
            className={css.markdownPreview}
            dangerouslySetInnerHTML={{
              __html: sanitize(parse(text)),
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default ViewMode;
