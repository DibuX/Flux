import Link from "next/link"
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import LoginForm from "@/components/auth/login-form"
import "../login-styles.css"

export const metadata = {
  title: "Iniciar Sesión",
  description: "Accede a tu cuenta de Flux",
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { redirect?: string; error?: string }
}) {
  let session

  try {
    session = await getServerSession(authOptions)
  } catch (error) {
    console.error("Error al obtener la sesión:", error)
    // En caso de error, no redirigir y mostrar un mensaje
    session = null
  }

  if (session) {
    redirect(searchParams.redirect || "/")
  }

  return (
    <div className="container">
      <div className="form-container">
        <h1>Flux</h1>
        <div className="text-center mb-4">
          <h2 className="text-xl mb-2">Iniciar Sesión</h2>
          <p className="text-muted">Ingresa tus credenciales para acceder a tu cuenta</p>
          {searchParams.error && <p className="text-red-500 mt-2">Error: {searchParams.error}</p>}
        </div>

        <div className="form">
          <LoginForm redirectUrl={searchParams.redirect} />
        </div>

        <div className="register-link mt-6">
          <p className="text-sm">
            ¿No tienes una cuenta?{" "}
            <Link
              href={`/registro${searchParams.redirect ? `?redirect=${searchParams.redirect}` : ""}`}
              className="link"
            >
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
