import { NextPage } from "next";
import Link from "next/link";
import css from "./login.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import Router from "next/router";
import crypto from "crypto";
import Input from "@/components/pretty/shared/input";
import Button from "@/components/pretty/shared/button";

type Inputs = {
  username: string;
  password: string;
};

const Login: NextPage = () => {
  const [message, setMessage] = useState<string>();

  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    data.password = crypto
      .createHash("sha256")
      .update(data.password)
      .digest("hex");

    const rawResponse = await fetch("/api/login", {
      headers: {},
      body: JSON.stringify(data),
      method: "POST",
    });
    const response = await rawResponse.text();

    if (response == "success") {
      setMessage("Logged in! Redirecting now...");

      Router.push("/");
    } else {
      setMessage(response);
    }
  };

  return (
    <div className={css.root}>
      <div className={css.title}>Login</div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              {...register("username")}
              autoFocus
              required
              type="username"
              placeholder="Username"
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
            <Button type="submit">Login</Button>
          </div>
        </form>
      </div>
      <div>{message}</div>
      <div className={css.links}>
        <Link href="/">Home</Link>
        <Link href="/register">Register</Link>
      </div>
    </div>
  );
};

export default Login;
