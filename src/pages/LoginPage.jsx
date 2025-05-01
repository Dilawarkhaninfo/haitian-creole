import { LoginForm } from "@/components/common/LoginForm"
import { AudioWaveform } from "lucide-react"



export default function LoginPage() {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center pt-20">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <a href="#" className="flex items-center gap-2 self-center font-medium">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                        <AudioWaveform className="size-4" />
                    </div>
                    <span className="capitalize">{import.meta.env.VITE_APP_NAME}</span>
                </a>
                <LoginForm />
            </div>
        </div>
    )
}
