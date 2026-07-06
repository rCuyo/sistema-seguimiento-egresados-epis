import type { Metadata } from "next"
import { RegistroForm } from "./registro-form"

export const metadata: Metadata = { title: "Registro de Egresado" }

export default function RegistroPage() {
  return <RegistroForm />
}
