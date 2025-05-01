import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Volume2, ArrowRightLeft } from 'lucide-react'; // Added ArrowRightLeft icon
import { Card } from './ui/card';
import Sample from "@/assets/audio/sample.mp3"
import { toast } from 'sonner';
import { H3 } from './ui/typography';

const TextToSpeechTranslate = () => {
    const [inputLang, setInputLang] = useState('en');
    const [outputLang, setOutputLang] = useState('es');
    const [inputText, setInputText] = useState('');
    const [translatedText, setTranslatedText] = useState('');

    const handleTranslate = () => {
        // Mock translation logic
        setTranslatedText(`${inputText}`);
    };

    // Function to swap input and output languages
    const handleSwitchLanguages = () => {
        setInputLang(outputLang);
        setOutputLang(inputLang);
    };

    const audio = new Audio(Sample);

    const playAudio = () => {
        audio.play().catch((error) => {
            toast.error("Error playing audio:", error);
        });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <H3 className="text-primary">Text-to-speech</H3>
            <div className="flex flex-shrink-0 space-x-4 items-center">
                <Select value={inputLang} onValueChange={setInputLang}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Input Language" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                    </SelectContent>
                </Select>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleSwitchLanguages}
                    title="Switch Languages"
                >
                    <ArrowRightLeft />
                </Button>
                <Select value={outputLang} onValueChange={setOutputLang}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Output Language" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Textarea
                placeholder="Enter text to translate"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[100px]"
            />
            <div className="flex space-x-4">
                <Button onClick={handleTranslate}>Translate</Button>
            </div>
            <Card className="p-4">
                <h3 className="font-semibold">Translated Text</h3>
                <p>{translatedText || 'No translation yet'}</p>
                <div className="mt-4">
                    <h4 className="text-sm font-medium">Audio Preview</h4>
                    <audio controls src={Sample} className="w-full mt-2">
                        Your browser does not support the audio element.
                    </audio>
                </div>
                <div className="flex space-x-2 mt-2">
                    <Button variant="outline" size="sm" onClick={playAudio}>
                        <Volume2 /> Play Original
                    </Button>
                    <Button variant="outline" size="sm" onClick={playAudio}>
                        <Volume2 /> Play Translated
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default TextToSpeechTranslate;