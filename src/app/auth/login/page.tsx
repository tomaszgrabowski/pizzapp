"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";

const REQUIRED_FIELD = "To pole jest wymagane";

interface IFormValues {
  email: string;
  password: string;
}

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>();

  const signin = async (data: IFormValues) => {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl: "/",
    });
  };

  return (
    <form
      onSubmit={handleSubmit(signin)}
      className="-mt-24 flex h-screen flex-col items-center justify-center"
    >
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="text"
          placeholder="janusz.kowalski@polska.pl"
          className="input input-bordered w-full max-w-xs"
          {...register("email", {
            required: {
              value: true,
              message: REQUIRED_FIELD,
            },
          })}
        />
        {errors.email?.message && (
          <small className="text-red-600">{errors.email?.message}</small>
        )}
      </div>
      <div className="form-control mb-6 w-full max-w-xs">
        <label className="label">
          <span className="label-text">Hasło</span>
        </label>
        <input
          type="password"
          className="input input-bordered w-full max-w-xs"
          {...register("password", {
            required: {
              value: true,
              message: REQUIRED_FIELD,
            },
          })}
        />
        {errors.password?.message && (
          <small className="text-red-600">{errors.password?.message}</small>
        )}
      </div>
      <br />
      <button type="submit" className={"btn btn-primary"}>
        Zaloguj
      </button>
    </form>
  );
};

export default Page;
