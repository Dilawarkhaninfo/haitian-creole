import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import * as pdfjsLib from "pdfjs-dist";

// Set up pdf.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = "//cdn.jsdelivr.net/npm/pdfjs-dist@2.16.105/build/pdf.worker.min.js";

export function DocumentTranslator() {
    const [file, setFile] = useState(null); // Uploaded file
    const [inputText, setInputText] = useState(""); // Extracted text
    const [translatedText, setTranslatedText] = useState(""); // Translated result
    const [inputLang, setInputLang] = useState(""); // Input language
    const [outputLang, setOutputLang] = useState(""); // Output language
    const [pdfUrl, setPdfUrl] = useState(""); // URL for PDF preview

    // Supported text-based formats
    const acceptedFileTypes = {
        "text/plain": [".txt"],
        "application/pdf": [".pdf"],
        "text/markdown": [".md"],
    };

    // Language options
    const languages = [
        { value: "en", label: "English" },
        { value: "fr", label: "French" },
        { value: "es", label: "Spanish" },
        { value: "ht", label: "Haitian Creole" },
        { value: "jam", label: "Jamaican Patois" },
    ];

    // Dropzone configuration
    const onDrop = useCallback((acceptedFiles) => {
        const uploadedFile = acceptedFiles[0];
        if (uploadedFile) {
            setFile(uploadedFile);
            setPdfUrl(""); // Reset PDF preview
            extractTextFromFile(uploadedFile);
            if (uploadedFile.type === "application/pdf") {
                setPdfUrl(URL.createObjectURL(uploadedFile)); // Create URL for PDF preview
            }
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
        onDrop,
        accept: acceptedFileTypes,
        maxFiles: 1,
        multiple: false,
    });

    // Extract text from file
    const extractTextFromFile = async (file) => {
        try {
            if (file.type === "application/pdf") {
                const arrayBuffer = await file.arrayBuffer();
                const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
                let text = "";
                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const textContent = await page.getTextContent();
                    text += textContent.items.map((item) => item.str).join(" ") + "\n";
                }
                setInputText(text.trim() || "No text extracted from PDF.");
            } else {
                // Handle .txt and other text formats
                const reader = new FileReader();
                reader.onload = (e) => setInputText(e.target.result || "No text extracted.");
                reader.onerror = (e) => {
                    console.error("Error reading file:", e);
                    setInputText("Error reading file.");
                };
                reader.readAsText(file);
            }
        } catch (error) {
            console.error("Error extracting text:", error);
            setInputText("Error processing file.");
        }
    };

    // Mock translation (replace with real API)
    const handleTranslate = () => {
        if (!inputText || !inputLang || !outputLang) {
            setTranslatedText("Please upload a file and select both languages.");
            return;
        }
        // Mock: Reverse text
        const mockTranslation = inputText.split("").reverse().join("");
        setTranslatedText(mockTranslation);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl font-bold text-primary">
                    Document Translator
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Dropzone */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Upload Document</label>
                    <div
                        {...getRootProps()}
                        className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer transition-colors ${isDragActive
                            ? "border-primary bg-primary/10"
                            : isDragReject
                                ? "border-destructive bg-destructive/10"
                                : "border-muted hover:border-primary"
                            }`}
                    >
                        <input {...getInputProps()} />
                        <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                        {isDragActive ? (
                            <p className="text-sm">Drop the file here...</p>
                        ) : isDragReject ? (
                            <p className="text-sm text-destructive">Unsupported file type.</p>
                        ) : (
                            <p className="text-sm">
                                Drag & drop a .txt, .pdf, or .md file, or click to select.
                            </p>
                        )}
                    </div>
                    {file && (
                        <p className="text-sm text-muted-foreground">Uploaded: {file.name}</p>
                    )}
                </div>

                {/* Language Selection */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label htmlFor="input-lang" className="text-sm font-medium">
                            Input Language
                        </label>
                        <Select value={inputLang} onValueChange={setInputLang}>
                            <SelectTrigger id="input-lang">
                                <SelectValue placeholder="Select input language" />
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
                    <div className="space-y-2">
                        <label htmlFor="output-lang" className="text-sm font-medium">
                            Output Language
                        </label>
                        <Select value={outputLang} onValueChange={setOutputLang}>
                            <SelectTrigger id="output-lang">
                                <SelectValue placeholder="Select output language" />
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
                </div>

                {/* Translate Button */}
                <Button onClick={handleTranslate} className="w-full" disabled={!file}>
                    Translate Document
                </Button>

                {/* Preview and Translation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Document Preview */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Document Preview</label>
                        {file ? (
                            file.type === "application/pdf" && pdfUrl ? (
                                <iframe
                                    src={pdfUrl}
                                    className="w-full h-64 border rounded-md"
                                    title="PDF Preview"
                                />
                            ) : (
                                <Textarea
                                    value={inputText}
                                    readOnly
                                    placeholder="Document content will appear here..."
                                    className="w-full min-h-[200px] bg-muted"
                                />
                            )
                        ) : (
                            <div className="w-full h-64 bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                                No document uploaded.
                            </div>
                        )}
                    </div>

                    {/* Translated Text */}
                    <div className="space-y-2">
                        <label htmlFor="translated-text" className="text-sm font-medium">
                            Translated Text
                        </label>
                        <Textarea
                            id="translated-text"
                            value={translatedText}
                            readOnly
                            placeholder="Translated text will appear here..."
                            className="w-full min-h-[200px] bg-muted"
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}