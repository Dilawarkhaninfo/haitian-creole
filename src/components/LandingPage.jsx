import React from 'react';
import TextToSpeechTranslate from './TextToSpeechTranslate';
import { H1, Muted } from './ui/typography';
import { Card } from './ui/card';
import { ArrowRightIcon, Globe } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import Threads from './Threads';

const LandingPage = () => {
    return (
        <div className="flex flex-col pt-20 min-h-svh">
            {/* Hero Section */}
            <div className="relative py-8 md:py-12">
                {/* Background effect */}
                <div className="absolute inset-0 z-0 overflow-hidden opacity-70">
                    <Threads
                        color={[136, 1, 238]}
                        amplitude={1.5}
                        distance={0.5}
                        enableMouseInteraction={true}
                    />
                </div>
                
                {/* Hero content */}
                <div className="container relative z-10 flex flex-col items-center px-4 mx-auto">
                    <div className="flex items-center justify-center mb-4">
                        <div className="flex items-center justify-center w-8 h-8 mr-2 rounded-md bg-primary text-primary-foreground">
                            <Globe className="size-5" />
                        </div>
                        <span className="text-xl font-semibold">HaitianCreole.ai</span>
                    </div>
                    
                    <H1 className="max-w-2xl mb-4 text-center">Bridge The Language Gap Effortlessly</H1>
                    
                    <Muted className="max-w-xl mb-6 text-center">
                        Free Haitian Creole translation at your fingertips. Translate text instantly and listen to perfect pronunciations.
                    </Muted>
                </div>
            </div>
            
            {/* Text-to-Speech Translation Section */}
            <div className="container flex-1 px-4 py-6 mx-auto">
                <div className="max-w-3xl mx-auto">
                    {/* Premium feature CTA */}
                    <div className="mb-6 text-center">
                        <Link to="/signup" className="group inline-flex items-center justify-center gap-1.5 text-primary hover:underline underline-offset-4 font-medium transition-colors">
                            <span>Need a realtime Haitian Creole portable voice translator? Signup Now!</span>
                            <ArrowRightIcon className="size-3.5 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                        </Link>
                    </div>
                    
                    {/* Text to Speech translation box */}
                    <Card className="p-6 border shadow-md border-border/50">
                        <TextToSpeechTranslate />
                    </Card>
                    
                    {/* Footer CTA */}
                    <div className="mt-10 text-center">
                        <Muted className="mb-4">
                            Unlock advanced features with a free account
                        </Muted>
                        <div className="flex justify-center gap-4">
                            <Link to="/login">
                                <Button variant="outline">
                                    Login
                                </Button>
                            </Link>
                            <Link to="/signup">
                                <Button>
                                    Sign up free
                                    <ArrowRightIcon className="ml-1.5 size-3.5" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Simple feature highlights */}
            <div className="container px-4 py-12 mx-auto border-t">
                <div className="grid max-w-4xl grid-cols-1 gap-8 mx-auto md:grid-cols-3">
                    <div className="text-center">
                        <h3 className="mb-2 text-lg font-medium">Fast Translation</h3>
                        <p className="text-sm text-muted-foreground">
                            Get instant translations between English and Haitian Creole
                        </p>
                    </div>
                    <div className="text-center">
                        <h3 className="mb-2 text-lg font-medium">Natural Speech</h3>
                        <p className="text-sm text-muted-foreground">
                            Listen to high-quality audio pronunciations
                        </p>
                    </div>
                    <div className="text-center">
                        <h3 className="mb-2 text-lg font-medium">Voice Exchange</h3>
                        <p className="text-sm text-muted-foreground">
                            Sign up for real-time voice translation and conversation
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;