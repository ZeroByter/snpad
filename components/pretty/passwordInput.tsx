import { FC, useState } from "react";
import Input from "./shared/input";
import css from "./passwordInput.module.scss";
import Button from "./shared/button";
import { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  register: UseFormRegisterReturn;
};

const PasswordInput: FC<Props> = ({ register }) => {
  const [hidePassword, setHidePassword] = useState(true);

  const handleToggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  return (
    <div className={css.root}>
      <Input
        {...register}
        required
        className={css.input}
        placeholder="Password"
        type={hidePassword ? "password" : "text"}
      />
      <Button onClick={handleToggleHidePassword} type="button">
        {hidePassword ? "Show password" : "Hide password"}
      </Button>
    </div>
  );
};

export default PasswordInput;
