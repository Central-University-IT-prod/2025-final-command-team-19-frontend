"use client"
import { useState } from "react"
import { Input } from "@/shared/ui/input"
import { Login } from "@/shared/ui/login"
import { Fetch } from "@/shared/api/use-fetch"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

type SignUpResponse = {
  token: string
}

export const SignUp = () => {
  const router = useRouter()
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const handleSubmit = async () => {
    const { data, error } = await Fetch<SignUpResponse>({
      endpoint: "/partner/auth/sign-up",
      method: "post",
      data: {
        name: name,
        email: email,
        password: password,
      },
    })
    if (data) {
      localStorage.setItem("token", data.token)
      toast.success("Вы зарегестрированы!")
      router.push("/partner")
      return
    }
    toast.error(error?.response.data.detail)
  }
  return (
    <Login
      title={"Регистрация"}
      submit={handleSubmit}
      redirectUrl="partner"
      redirectTitle="Вход"
      redirectType="sign-in"
    >
      <Input
        placeholder={"Введите ваше имя"}
        value={name}
        changeValue={setName}
      />
      <Input
        placeholder={"Введите ваш email"}
        value={email}
        changeValue={setEmail}
      />
      <Input
        placeholder={"Введите пароль"}
        value={password}
        changeValue={setPassword}
        type={"password"}
      />
    </Login>
  )
}
