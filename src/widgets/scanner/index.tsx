"use client"
import { useState } from "react"
import styles from "./index.module.css"
import { Scanner as QrReader } from "@yudiel/react-qr-scanner"
import { toast } from "sonner"
import { Fetch } from "@/shared/api/use-fetch"
import { useRouter } from "next/navigation"
export const Scanner = () => {
  const router = useRouter()
  const [qrcode, setQrcode] = useState<string>("")
  const handleScan = async (result: any) => {
    const clientId = result.at(0).rawValue
    localStorage.setItem("clientId-for-scanner", clientId);
    const { data, error } = await Fetch({
      endpoint: `/partner/scan/${clientId}`,
    })
    console.log(data)
    router.push("/partner/scanner/info")
  }
  const handleError = (error: any) => {
    toast.error("Ошибка сканирования")
  }
  return (
    <QrReader
      onScan={handleScan}
      onError={handleError}
      classNames={{
        container: styles.container,
        video: styles.scanner,
      }}
      allowMultiple
      scanDelay={500}
    />
  )
}
