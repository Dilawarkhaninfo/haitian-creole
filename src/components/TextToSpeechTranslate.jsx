import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Volume2, ArrowRightLeft, ClipboardCopy } from 'lucide-react';
import { Card } from './ui/card';
import Sample from "@/assets/audio/sample.mp3";
import { toast } from 'sonner';
import { H3 } from './ui/typography';

const TextToSpeechTranslate = () => {
    const [inputLang, setInputLang] = useState('en');
    const [outputLang, setOutputLang] = useState('ht');
    const [inputText, setInputText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [isTranslating, setIsTranslating] = useState(false);

    const handleTranslate = () => {
        if (!inputText.trim()) return;
        
        setIsTranslating(true);
        
        // Simulate API call with timeout
        setTimeout(() => {
            // Mock translation logic - in production this would call your translation API
            if (inputLang === 'en' && outputLang === 'ht') {
                setTranslatedText(`[Haitian Creole translation of: "${inputText}"]`);
            } else if (inputLang === 'ht' && outputLang === 'en') {
                setTranslatedText(`[English translation of: "${inputText}"]`);
            } else {
                setTranslatedText(inputText);
            }
            
            setIsTranslating(false);
        }, 600);
    };

    // Function to swap input and output languages
    const handleSwitchLanguages = () => {
        const tempLang = inputLang;
        setInputLang(outputLang);
        setOutputLang(tempLang);
        
        // Also swap the text if there's already a translation
        if (translatedText) {
            setInputText(translatedText);
            setTranslatedText(inputText);
        }
    };

    // Play audio function
    const playAudio = (type) => {
        const audio = new Audio(Sample);
        audio.play().catch((error) => {
            toast.error(`Error playing ${type} audio`);
            console.error(error);
        });
    };

    // Copy to clipboard function
    const copyToClipboard = () => {
        if (!translatedText) return;
        
        navigator.clipboard.writeText(translatedText)
            .then(() => toast.success("Copied to clipboard"))
            .catch(() => toast.error("Failed to copy"));
    };

    return (
        <div className="max-w-4xl mx-auto space-y-5">
            <H3 className="text-primary">Translate Text</H3>
            
            <div className="flex flex-wrap items-center gap-3">
                <Select value={inputLang} onValueChange={setInputLang}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Input Language" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="ht">Haitian Creole</SelectItem>
                    </SelectContent>
                </Select>
                
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleSwitchLanguages}
                    title="Switch Languages"
                    className="w-10 h-10 rounded-full"
                >
                    <ArrowRightLeft className="w-4 h-4" />
                </Button>
                
                <Select value={outputLang} onValueChange={setOutputLang}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Output Language" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="ht">Haitian Creole</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            
            <Textarea
                placeholder="Enter text to translate"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[120px] resize-none"
            />
            
            <div className="flex justify-end">
                <Button 
                    onClick={handleTranslate}
                    disabled={!inputText.trim() || isTranslating}
                >
                    {isTranslating ? "Translating..." : "Translate"}
                </Button>
            </div>
            
            <Card className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Translated Text</h3>
                    
                    {translatedText && (
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={copyToClipboard}
                            title="Copy to clipboard"
                        >
                            <ClipboardCopy className="w-4 h-4 mr-1" />
                            Copy
                        </Button>
                    )}
                </div>
                
                <div className="min-h-[80px] p-3 bg-muted/30 rounded-md">
                    {translatedText ? (
                        <p>{translatedText}</p>
                    ) : (
                        <p className="italic text-muted-foreground">Translation will appear here</p>
                    )}
                </div>
                
                {translatedText && (
                    <>
                        <div className="mt-4">
                            <h4 className="mb-2 text-sm font-medium">Audio Preview</h4>
                            <audio controls src={Sample} className="w-full">
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                            <Button variant="outline" size="sm" onClick={() => playAudio('original')}>
                                <Volume2 className="w-4 h-4 mr-1" /> Listen Original
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => playAudio('translated')}>
                                <Volume2 className="w-4 h-4 mr-1" /> Listen Translated
                            </Button>
                        </div>
                    </>
                )}
            </Card>
        </div>
    );
};

export default TextToSpeechTranslate;