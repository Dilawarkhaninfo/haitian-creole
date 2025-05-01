import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Mic, MicOff } from "lucide-react"; // Icons for recording states
import { useState, useEffect } from "react";

export function SpeechToText() {
    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [language, setLanguage] = useState("en-US"); // Default to English (US)
    const [recognition, setRecognition] = useState(null);
    const [isSupported, setIsSupported] = useState(true);

    // Language options for speech recognition
    const languages = [
        { value: "en-US", label: "English (US)" },
        { value: "fr-FR", label: "French" },
        { value: "es-ES", label: "Spanish" },
        { value: "ht-HT", label: "Haitian Creole" }, // Limited support, may vary
        { value: "ja-JP", label: "Japanese" },
    ];

    // Initialize SpeechRecognition
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recog = new SpeechRecognition();
            recog.continuous = true; // Keep listening until stopped
            recog.interimResults = true; // Show interim results
            recog.lang = language; // Set initial language

            recog.onresult = (event) => {
                const current = event.resultIndex;
                const transcriptText = event.results[current][0].transcript;
                setTranscript(transcriptText);
            };

            recog.onerror = (event) => {
                console.error("Speech recognition error:", event.error);
                setTranscript(`Error: ${event.error}`);
                setIsRecording(false);
            };

            recog.onend = () => {
                if (isRecording) recog.start(); // Restart if stopped unintentionally
            };

            setRecognition(recog);
        } else {
            setIsSupported(false);
        }
    }, [language]); // Reinitialize when language changes

    // Start recording
    const startRecording = () => {
        if (recognition && !isRecording) {
            setTranscript("Listening...");
            recognition.lang = language; // Update language before starting
            recognition.start();
            setIsRecording(true);
        }
    };

    // Stop recording
    const stopRecording = () => {
        if (recognition && isRecording) {
            recognition.stop();
            setIsRecording(false);
        }
    };

    return (
        <Card >
            <CardHeader>
                <CardTitle className="text-xl font-bold text-primary">
                    Speech to Text
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Language Selection */}
                <div className="space-y-2">
                    <label htmlFor="language" className="text-sm font-medium">
                        Input Language
                    </label>
                    <Select value={language} onValueChange={setLanguage} disabled={isRecording}>
                        <SelectTrigger id="language">
                            <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                            {languages.map((lang) => (
                                <SelectItem key={lang.value} value={lang.value}>
                                    {lang.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Recording Controls */}
                {isSupported ? (
                    <div className="flex space-x-4">
                        <Button
                            onClick={startRecording}
                            disabled={isRecording}
                            className="flex-1"
                            variant={isRecording ? "outline" : "default"}
                        >
                            <Mic className="mr-2 h-4 w-4" /> Start Recording
                        </Button>
                        <Button
                            onClick={stopRecording}
                            disabled={!isRecording}
                            className="flex-1"
                            variant="destructive"
                        >
                            <MicOff className="mr-2 h-4 w-4" /> Stop Recording
                        </Button>
                    </div>
                ) : (
                    <p className="text-sm text-destructive">
                        Speech recognition is not supported in this browser. Please use Chrome or Edge.
                    </p>
                )}

                {/* Transcript Display */}
                <div className="space-y-2">
                    <label htmlFor="transcript" className="text-sm font-medium">
                        Transcribed Text
                    </label>
                    <Textarea
                        id="transcript"
                        value={transcript}
                        onChange={(e) => setTranscript(e.target.value)} // Allow manual edits
                        placeholder="Your speech will appear here..."
                        className="w-full min-h-[150px] bg-muted"
                    />
                </div>
            </CardContent>
        </Card>
    );
}