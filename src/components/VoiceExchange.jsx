import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeftRight, Mic, Copy, Play, Trash2 } from 'lucide-react';
import { Card } from './ui/card';
import { H3, Muted, Large } from './ui/typography';
import { ScrollArea } from './ui/scroll-area';
import { toast } from 'sonner'; // For showing toast notifications (optional, can be replaced)

// Simulated speech-to-text and translation function with delay
const simulateSpeechAndTranslation = (inputLang, outputLang, setMessages, isInputTurn) => {
    const dummyData = {
        en: { transcription: "Where are your parents?", translation: { fr: "Où sont tes parents?", es: "¿Dónde están tus padres?", de: "Wo sind deine Eltern?", it: "Dove sono i tuoi genitori?", zh: "你的父母在哪里？", ar: "أين والديك؟", ru: "Где твои родители?" } },
        fr: { transcription: "Je viens d'Haïti", translation: { en: "I come from Haiti", es: "Vengo de Haití", de: "Ich komme aus Haiti", it: "Vengo da Haiti", zh: "我来自海地", ar: "أنا من هايتي", ru: "Я из Гаити" } },
        es: { transcription: "Estoy muy cansado", translation: { en: "I am very tired", fr: "Je suis très fatigué", de: "Ich bin sehr müde", it: "Sono molto stanco", zh: "我很累", ar: "أنا متعب جدًا", ru: "Я очень устал" } },
        de: { transcription: "Wie geht es dir?", translation: { en: "How are you?", fr: "Comment vas-tu ?", es: "¿Cómo estás?", it: "Come stai?", zh: "你好吗？", ar: "كيف حالك؟", ru: "Как дела?" } },
        it: { transcription: "Mi piace la pizza", translation: { en: "I like pizza", fr: "J'aime la pizza", es: "Me gusta la pizza", de: "Ich mag Pizza", zh: "我喜欢披萨", ar: "أحب البيتزا", ru: "Мне нравится пицца" } },
        zh: { transcription: "你好，世界", translation: { en: "Hello, world", fr: "Bonjour, monde", es: "Hola, mundo", de: "Hallo, Welt", it: "Ciao, mondo", ar: "مرحباً، العالم", ru: "Привет, мир" } },
        ar: { transcription: "مرحباً، كيف حالك؟", translation: { en: "Hello, how are you?", fr: "Bonjour, comment vas-tu ?", es: "Hola, ¿cómo estás?", de: "Hallo, wie geht es dir?", it: "Ciao, come stai?", zh: "你好，你好吗？", ru: "Привет, как дела?" } },
        ru: { transcription: "Я люблю путешествовать", translation: { en: "I love to travel", fr: "J'adore voyager", es: "Me encanta viajar", de: "Ich liebe es zu reisen", it: "Amo viaggiare", zh: "我爱旅行", ar: "أحب السفر" } },
    };

    setTimeout(() => {
        const newMessage = {
            id: Date.now(),
            transcription: dummyData[inputLang]?.transcription || "Speech not recognized",
            translation: dummyData[inputLang]?.translation[outputLang] || "Translation not available",
            inputLang,
            outputLang,
            isInputTurn // Track which language turn it is
        };
        setMessages((prev) => [...prev, newMessage]);
    }, 2000);
};

const VoiceExchange = () => {
    const [inputLang, setInputLang] = useState('fr');
    const [outputLang, setOutputLang] = useState('en');
    const [messages, setMessages] = useState([]);
    const [isRecording, setIsRecording] = useState(false);
    const [isInputTurn, setIsInputTurn] = useState(true); // Track conversation turn
    const scrollAreaRef = useRef(null);

    const languages = [
        { value: 'en', label: 'English', flag: '🇺🇸' },
        { value: 'fr', label: 'French', flag: '🇫🇷' },
        { value: 'es', label: 'Spanish', flag: '🇪🇸' },
        { value: 'de', label: 'German', flag: '🇩🇪' },
        { value: 'it', label: 'Italian', flag: '🇮🇹' },
        { value: 'zh', label: 'Chinese', flag: '🇨🇳' },
        { value: 'ar', label: 'Arabic', flag: '🇸🇦' },
        { value: 'ru', label: 'Russian', flag: '🇷🇺' },
    ];

    const handleRecord = () => {
        setIsRecording(true);
        const currentInput = isInputTurn ? inputLang : outputLang;
        const currentOutput = isInputTurn ? outputLang : inputLang;

        simulateSpeechAndTranslation(currentInput, currentOutput, setMessages, isInputTurn);
        setTimeout(() => {
            setIsRecording(false);
            setIsInputTurn(prev => !prev); // Switch turns
        }, 2000);
    };

    const handleSwitchLanguages = () => {
        setInputLang(outputLang);
        setOutputLang(inputLang);
        setIsInputTurn(true); // Reset to input language turn
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text).then(() => toast.success("Text copied!"));
    };

    const handlePlay = (text, lang) => {
        console.log(`Playing: "${text}" in ${lang}`);
        toast.info(`Simulating playback: "${text}"`);
    };

    const handleDelete = (id) => {
        setMessages((prev) => prev.filter((msg) => msg.id !== id));
    };

    const getLanguageInfo = (langValue) => {
        return languages.find((lang) => lang.value === langValue) || { label: 'Unknown', flag: '' };
    };

    useEffect(() => {
        if (scrollAreaRef.current) {
            const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
            if (scrollElement) {
                scrollElement.scrollTo({
                    top: scrollElement.scrollHeight,
                    behavior: 'smooth'
                });
            }
        }
    }, [messages]);

    return (
        <div className="max-w-4xl mx-auto h-[calc(100vh-5.5rem)] flex flex-col space-y-4 p-4">
            <H3 className="text-primary text-center">Voice Translator</H3>

            <ScrollArea className="flex-1" ref={scrollAreaRef}>
                <div className="space-y-4 p-4">
                    {messages.length === 0 ? (
                        <p className="text-center text-gray-500 mt-10">Tap the microphone to start speaking!</p>
                    ) : (
                        messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.isInputTurn ? 'justify-start' : 'justify-end'}`}>
                                <div className="max-w-[70%] space-y-1">
                                    {/* Transcription */}
                                    {/* <Muted className={msg.isInputTurn ? 'text-left' : 'text-right'}>
                                        {getLanguageInfo(msg.inputLang).label}
                                    </Muted> */}
                                    <Muted className="font-semibold">{msg.transcription}</Muted>

                                    {/* Translation below */}
                                    <div className="border-l-2 pl-2">
                                        {/* <Muted className={msg.isInputTurn ? 'text-left' : 'text-right'}>
                                            {getLanguageInfo(msg.outputLang).label}
                                        </Muted> */}
                                        <Large>{msg.translation}</Large>
                                    </div>

                                    {/* Controls */}
                                    <div className={`flex gap-2 ${msg.isInputTurn ? 'justify-start' : 'justify-end'}`}>
                                        <Button variant="ghost" size="icon" onClick={() => handleCopy(msg.transcription)}>
                                            <Copy className="w-4 h-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => handlePlay(msg.transcription, msg.inputLang)}>
                                            <Play className="w-4 h-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleDelete(msg.id)}>
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </ScrollArea>

            <Card className="flex items-center justify-between p-4 bg-white border-t border-gray-200">
                <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                        <span className="text-sm">{getLanguageInfo(inputLang).flag}</span>
                        <select
                            value={inputLang}
                            onChange={(e) => setInputLang(e.target.value)}
                            className="text-sm bg-transparent border-none focus:outline-none font-medium"
                        >
                            {languages.map((lang) => (
                                <option key={lang.value} value={lang.value}>
                                    {lang.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <Button variant="ghost" size="icon" onClick={handleSwitchLanguages}>
                        <ArrowLeftRight className="w-5 h-5" />
                    </Button>
                    <div className="flex items-center space-x-1">
                        <span className="text-sm">{getLanguageInfo(outputLang).flag}</span>
                        <select
                            value={outputLang}
                            onChange={(e) => setOutputLang(e.target.value)}
                            className="text-sm bg-transparent border-none focus:outline-none font-medium"
                        >
                            {languages.map((lang) => (
                                <option key={lang.value} value={lang.value}>
                                    {lang.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <Button
                    size="icon"
                    onClick={handleRecord}
                    disabled={isRecording}
                    className={`rounded-full w-12 h-12 flex items-center justify-center ${isRecording ? 'bg-red-500' : 'bg-purple-500'} text-white`}
                >
                    <Mic className="w-6 h-6" />
                </Button>
            </Card>
        </div>
    );
};

export default VoiceExchange;