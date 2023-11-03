import { FC, MouseEvent, ReactElement } from "react";
import { createPortal } from "react-dom";
import css from "./modal.module.scss";
import Container from "./container";

type Props = {
  children: ReactElement;
  onBackdropClick: VoidFunction;
};

const Modal: FC<Props> = ({ children, onBackdropClick }) => {
  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    // Stopping ALL mouse click propagations inside modal, even not just backdrop clicks
    e.stopPropagation();

    if (e.target == e.currentTarget) {
      onBackdropClick();
    }
  };

  return createPortal(
    <div className={css.root} onClick={handleBackdropClick}>
      <Container className={css.container} unclickable>
        {children}
      </Container>
    </div>,
    document.body
  );
};

export default Modal;
