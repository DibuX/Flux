import Link from "next/link"
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import RegisterForm from "@/components/auth/register-form"
import "./../login-styles.css"

export const metadata = {
  title: "Registro",
  description: "Crea una cuenta en Flux",
}

// Corregimos la definición de tipos para la página
export default async function RegisterPage({
  searchParams,
}: {
  searchParams: { redirect?: string }
}) {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect(searchParams.redirect || "/")
  }

  return (
    <div className="container">
      <div className="form-container">
        <h1>Flux</h1>
        <div className="text-center mb-4">
          <h2 className="text-xl mb-2">Crear Cuenta</h2>
          <p className="text-muted">Regístrate para disfrutar de todos los beneficios</p>
        </div>

        <div className="form">
          <RegisterForm redirectUrl={searchParams.redirect} />
        </div>

        <div className="register-link mt-6">
          <p className="text-sm">
            ¿Ya tienes una cuenta?{" "}
            <Link href={`/login${searchParams.redirect ? `?redirect=${searchParams.redirect}` : ""}`} className="link">
              Iniciar Sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
