import css from "./container.module.scss";

const Container: React.FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = (props) => {
  return (
    <div className={css.root} {...props}>
      {props.children}
    </div>
  );
};

export default Container;
