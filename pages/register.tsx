import { NextPage } from "next";
import Link from "next/link";
import css from "./register.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import Router from "next/router";
import Input from "@/components/pretty/shared/input";
import Button from "@/components/pretty/shared/button";

type Inputs = {
  username: string;
  password: string;
};

const Login: NextPage = () => {
  const [message, setMessage] = useState<string>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const rawResponse = await fetch("/api/register", {
      headers: {},
      body: JSON.stringify({
        username: data.username,
        password: data.password,
      }),
      method: "POST",
    });
    const response = await rawResponse.text();

    if (response == "success") {
      Router.push("/");
    } else {
      setMessage(response);
    }
  };

  return (
    <div className={css.root}>
      <div className={css.title}>Register</div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
          <div>
            <Input
              {...register("username")}
              required
              type="username"
              placeholder="Username"
              autoFocus
            />
          </div>
          <div>
            <Input
              {...register("password")}
              required
              type="password"
              placeholder="Password"
            />
          </div>
          <div>
            <Button type="submit">Register</Button>
          </div>
        </form>
      </div>
      {message && <div>{message}</div>}
      <div className={css.links}>
        <Link href="/">Home</Link>
        <Link href="/login">Login</Link>
      </div>
    </div>
  );
};

export default Login;
