import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VoiceExchange from './VoiceExchange';
import NativeMode from './NativeMode';
import TextToSpeechTranslate from './TextToSpeechTranslate';
import Aurora from './Aurora';
import { H1, Muted, P } from './ui/typography';
import { Card } from './ui/card';
import { AnimatedShinyText } from './magicui/animated-shiny-text';
import { ArrowRightIcon, Mic } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import Orb from './Orb';
import Threads from './Threads';

const LandingPage = () => {
    const [mode, setMode] = useState('voice-exchange');

    return (
        <>
            <div className='relative h-svh '>
                <div className='w-full h-4/6 relative'>
                    <Threads
                        color={[136, 1, 238]}
                        amplitude={2}
                        distance={0.5}
                        enableMouseInteraction={true}
                    />
                </div>
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full space-y-6 px-3'>
                    <div className="z-10 flex items-center justify-center">
                        <div
                            className="group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800">
                            <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                                <span className='capitalize'>✨ Introducing {import.meta.env.VITE_APP_NAME}</span>
                            </AnimatedShinyText>
                        </div>
                    </div>
                    <div className='flex justify-center items-center'>
                        <H1 className="max-w-5xl  text-zinc-800">Break language barriers with ease.</H1>
                    </div>
                    <div className='flex justify-center items-center'>
                        <Muted className="max-w-2xl text-center  font-semibold">
                            Our Translate AI offers real-time voice and text translation, personalized language tutoring, and seamless conversation history tracking—all in one platform. Speak, type, or learn your way to fluency, anytime, anywhere.
                        </Muted>
                    </div>
                    <div className='flex justify-center items-center gap-3'>
                        <Link to="/login">
                            <Button>
                                Get Started
                                <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                            </Button>
                        </Link>
                    </div>
                    <div className='relative '>
                        <Orb

                            hoverIntensity={0.5}
                            rotateOnHover={true}
                            hue={0}
                            forceHoverState={false}
                        />
                        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                            <Mic
                                size={48}
                                color='#884DEE'
                            />
                        </div>
                    </div>
                </div>
            </div>

            <Card className='max-w-4xl mx-auto my-20 p-6 space-y-6'>
                {/* <Tabs value={mode} onValueChange={setMode}>
                    <TabsList>
                        <TabsTrigger value="voice-exchange">Voice Exchange</TabsTrigger>
                        <TabsTrigger value="native-mode">Native-Mode</TabsTrigger>
                        <TabsTrigger value="text-to-speech">Text to Speech</TabsTrigger>
                    </TabsList> */}
                {/* <TabsContent value="voice-exchange"> */}
                {/* <VoiceExchange /> */}
                {/* </TabsContent> */}
                {/* <TabsContent value="native-mode"> */}
                {/* <NativeMode /> */}
                {/* </TabsContent> */}
                {/* <TabsContent value="text-to-speech"> */}
                <TextToSpeechTranslate />
                {/* </TabsContent> */}
                {/* </Tabs> */}
            </Card>
        </>
    );
};

export default LandingPage;