"use client";

import Image from "next/image";
import { useActionState, useState } from "react";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { login, type AuthActionState } from "./auth-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initialState: AuthActionState = {};

export function LoginForm({ initialError }: { initialError?: string }) {
  const [state, formAction, isPending] = useActionState(login, initialState);
  const [showPassword, setShowPassword] = useState(false);
  const error = state.error ?? initialError;

  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 px-5 py-10">
      <section className="w-full max-w-md rounded-2xl border bg-white p-7 shadow-[0_20px_60px_rgba(28,36,52,0.10)] sm:p-9">
        <div className="flex flex-col items-center text-center">
          <Image src="/images/oriental-abadi-logo.jpeg" alt="PT Oriental Abadi Indonesia" width={132} height={132} priority className="size-28 object-contain" />
          <p className="mt-4 text-sm font-semibold text-primary">PT Oriental Abadi Indonesia</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">Masuk ke inventaris</h1>
          <p className="mt-2 text-sm text-muted-foreground">Gunakan akun admin Anda untuk melanjutkan.</p>
        </div>

        <form action={formAction} className="mt-8 space-y-5">
          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-800">Email</span>
            <Input name="email" type="email" autoComplete="email" placeholder="nama@perusahaan.com" className="h-11 rounded-xl border-slate-200 bg-white" required />
          </label>
          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-800">Kata sandi</span>
            <span className="relative block">
              <Input name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" placeholder="Masukkan kata sandi" className="h-11 rounded-xl border-slate-200 bg-white pr-11" required />
              <button type="button" onClick={() => setShowPassword((visible) => !visible)} className="absolute top-1/2 right-3 grid size-7 -translate-y-1/2 place-items-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground" aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}>
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </span>
          </label>
          {error && <p role="alert" className="rounded-xl border border-[#ffd5d2] bg-[#fff0ef] px-3 py-2.5 text-sm text-[#c74e4c]">{error}</p>}
          <Button type="submit" className="h-11 w-full rounded-xl" disabled={isPending}>
            {isPending && <LoaderCircle className="size-4 animate-spin" />}
            Masuk
          </Button>
        </form>

        <p className="mt-6 text-center text-xs leading-5 text-muted-foreground">Akses hanya untuk administrator yang terdaftar.</p>
      </section>
    </main>
  );
}
