import SignUpForm from "@/components/common/SignUpForm"
import { AudioWaveform } from "lucide-react"

export default function SignUpPage() {
    return (
        <div className="flex flex-col items-center justify-center pt-20 min-h-svh">
            <div className="flex flex-col w-full max-w-sm gap-6">
                <a href="/" className="flex items-center self-center gap-2 font-medium">
                    <div className="flex items-center justify-center w-6 h-6 rounded-md bg-primary text-primary-foreground">
                        <AudioWaveform className="size-4" />
                    </div>
                    <span className="capitalize">{import.meta.env.VITE_APP_NAME}</span>
                </a>
                <SignUpForm />
            </div>
        </div>
    )
}