import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mic } from 'lucide-react';
import { Card } from './ui/card';
import { H3 } from './ui/typography';

const NativeMode = () => {
    const [lang, setLang] = useState('creole');
    const [instruction, setInstruction] = useState('Say "Hello" in Creole.');
    const [response, setResponse] = useState('');

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <H3 className="text-primary">Native Mode</H3>
            <Select value={lang} onValueChange={setLang}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="creole">Creole</SelectItem>
                </SelectContent>
            </Select>
            <Card className="p-4">
                <h3 className="font-semibold">Instruction</h3>
                <p>{instruction}</p>
            </Card>
            <Button size="sm">
                <Mic /> Speak Response
            </Button>
            <Card className="p-4">
                <h3 className="font-semibold">AI Tutor Response</h3>
                <p>{response || 'Awaiting your response...'}</p>
            </Card>
        </div>
    );
};

export default NativeMode;