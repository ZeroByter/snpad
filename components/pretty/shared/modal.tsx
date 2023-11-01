import { FC, MouseEvent, ReactElement } from "react";
import css from "./modal.module.scss"
import Container from "./container";

type Props = {
  children: ReactElement;
  onBackdropClick: VoidFunction;
}

const Modal: FC<Props> = ({ children, onBackdropClick }) => {
  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target == e.currentTarget) {
      onBackdropClick()
    }
  }

  return (
    <div className={css.root} onClick={handleBackdropClick}>
      <Container className={css.container} unclickable>
        {children}
      </Container>
    </div>
  )
}

export default Modal;