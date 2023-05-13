"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { api } from "@/utils/api";

const REQUIRED_FIELD = "To pole jest wymagane";

interface IFormValues {
  email: string;
  password: string;
  confirm: string;
  name: string;
}

const Page = () => {
  const [error, setError] = useState("");

  const router = useRouter();
  const mutation = api.users.register.useMutation();

  const registerUser = (data: IFormValues) => {
    mutation.mutate(data);
  };

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IFormValues>();
  const onSubmit = async (data: IFormValues) => {
    try {
      registerUser(data);
      router.push("/");
    } catch (e: any) {
      setError(e.response.data.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Nieprawidłowy email...",
            },
          })}
        />
        {errors.email?.message && (
          <small className="text-red-600">{errors.email?.message}</small>
        )}
      </div>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Nazwa uzytkownika</span>
        </label>
        <input
          type="text"
          placeholder="jkowalski"
          className="input input-bordered w-full max-w-xs"
          {...register("name", {
            required: {
              value: true,
              message: REQUIRED_FIELD,
            },
          })}
        />
        {errors.name?.message && (
          <small className="text-red-600">{errors.name?.message}</small>
        )}
      </div>
      <div className="form-control w-full max-w-xs">
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
            minLength: {
              value: 6,
              message: "Hasło jest za krótkie...",
            },
          })}
        />
        {errors.password?.message && (
          <small className="text-red-600">{errors.password?.message}</small>
        )}
      </div>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Potwierdź hasło</span>
        </label>
        <input
          type="password"
          className="input input-bordered w-full max-w-xs"
          {...register("confirm", {
            required: {
              value: true,
              message: REQUIRED_FIELD,
            },
            validate: {
              check: (value) =>
                value === getValues().password ? true : "Hasła nie pasują...",
            },
          })}
        />
        {errors.confirm?.message && (
          <small className="text-red-600">{errors.confirm?.message}</small>
        )}
      </div>
      <br />
      <button type="submit" className={"btn btn-primary"}>
        Zarejestruj
      </button>
      {error !== "" && <small className="text-red-600">{error}</small>}
    </form>
  );
};

export default Page;
