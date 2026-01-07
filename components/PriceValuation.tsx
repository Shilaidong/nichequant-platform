import React, { useState, useRef, useEffect } from 'react';
import IconCamera from './icons/IconCamera';
import IconUpload from './icons/IconUpload';
import IconSparkles from './icons/IconSparkles';
import { api } from '../src/services/api';

// Utility to convert file to base64
const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve((reader.result as string).split(',')[1]);
        reader.onerror = error => reject(error);
    });
};

const PriceValuation: React.FC = () => {
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [aiResponse, setAiResponse] = useState('');
    const [error, setError] = useState('');
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

    useEffect(() => {
        if (stream && videoRef.current) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
    };
    
    // Cleanup on unmount
    useEffect(() => {
        return () => {
            stopCamera();
        };
    }, [stream]);


    const handleStartCamera = async () => {
        resetState();
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
            setStream(mediaStream);
        } catch (err) {
            console.error("Error accessing camera: ", err);
            setError("无法访问摄像头。请检查您的权限设置。");
        }
    };

    const handleTakePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');
            context?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
            const dataUrl = canvas.toDataURL('image/jpeg');
            setCapturedImage(dataUrl);
            stopCamera();
        }
    };
    
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            resetState();
            try {
                 const base64Image = await fileToBase64(file);
                 const dataUrl = `data:${file.type};base64,${base64Image}`;
                 setCapturedImage(dataUrl);
            } catch (err) {
                console.error("Error reading file:", err);
                setError("无法读取图片文件。");
            }
        }
    };

    const handleAnalyzeImage = async () => {
        if (!capturedImage) return;

        setIsLoading(true);
        setAiResponse('');
        setError('');

        try {
            const ai = getAIInstance();
            // Remove data:image/jpeg;base64, prefix if present
            const base64Data = capturedImage.includes(',') 
                ? capturedImage.split(',')[1] 
                : capturedImage;
                
            const imagePart = {
                inlineData: {
                    mimeType: 'image/jpeg',
                    data: base64Data,
                },
            };
            const textPart = {
                text: "You are an expert appraiser specializing in vintage clothing, rare sneakers, and subculture collectibles. Analyze the following image and provide an estimated market value for the item. Identify the item, its key value-driving characteristics (like brand, era, condition, rarity), and provide a price range in USD. Justify your valuation. Keep your analysis concise and easy to understand for a collector, in Chinese."
            };
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: { parts: [imagePart, textPart] },
            });

            setAiResponse(response.text);

        } catch (err) {
            console.error("Error analyzing image: ", err);
            setError("AI估价失败，请稍后再试。");
        } finally {
            setIsLoading(false);
        }
    };

    const resetState = () => {
        stopCamera();
        setCapturedImage(null);
        setAiResponse('');
        setError('');
        setIsLoading(false);
        if(fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };
    
    return (
        <section id="ai-appraisal" className="py-20 bg-transparent">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">AI 智能估价</h2>
                    <p className="text-slate-600 mt-4 max-w-2xl mx-auto text-lg">上传您藏品的照片，AI将根据市场数据提供专业估价参考。</p>
                </div>

                <div className="max-w-3xl mx-auto bg-neutral-100/50 backdrop-blur-lg p-8 rounded-2xl border border-neutral-200/80 shadow-lg shadow-neutral-500/10">
                    <div className="aspect-video bg-neutral-200 rounded-lg mb-6 flex items-center justify-center overflow-hidden border border-neutral-300">
                        {capturedImage && !stream && <img src={capturedImage} alt="Captured" className="w-full h-full object-contain" />}
                        {stream && <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />}
                        {!capturedImage && !stream && (
                            <div className="text-center text-slate-500">
                                <IconCamera className="mx-auto h-12 w-12 mb-2" />
                                <p>摄像头预览将显示在此处</p>
                            </div>
                        )}
                    </div>
                    <canvas ref={canvasRef} className="hidden"></canvas>
                    <input type="file" ref={fileInputRef} accept="image/*" className="hidden" onChange={handleFileChange} />

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {!stream && !capturedImage && (
                             <>
                                <button onClick={handleStartCamera} className="flex-1 bg-slate-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-slate-800 transition-all duration-300 transform hover:scale-105 shadow-md flex items-center justify-center gap-2">
                                    <IconCamera className="h-5 w-5" /> 开始拍照
                                </button>
                                 <button onClick={() => fileInputRef.current?.click()} className="flex-1 bg-white border border-neutral-300 text-slate-900 px-6 py-3 rounded-full font-semibold hover:bg-neutral-100 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                                    <IconUpload className="h-5 w-5" /> 上传图片
                                </button>
                            </>
                        )}
                         {stream && <button onClick={handleTakePhoto} className="bg-red-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg mx-auto">拍照</button>}
                         {capturedImage && !aiResponse && !isLoading && (
                            <>
                                <button onClick={handleAnalyzeImage} className="flex-1 bg-slate-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-slate-800 transition-all duration-300 transform hover:scale-105 shadow-md flex items-center justify-center gap-2">
                                    <IconSparkles className="h-5 w-5" /> 获取估价
                                </button>
                                <button onClick={resetState} className="flex-1 bg-white border border-neutral-300 text-slate-900 hover:bg-neutral-100 transition-all duration-300 transform hover:scale-105 px-6 py-3 rounded-full font-semibold">重置</button>
                            </>
                         )}
                    </div>
                    
                    {isLoading && (
                        <div className="text-center mt-8">
                            <div className="inline-flex items-center gap-3 text-slate-600">
                                <svg className="animate-spin h-6 w-6 text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span className="font-semibold">AI估价中，请稍候...</span>
                            </div>
                        </div>
                    )}

                    {error && <div className="mt-8 bg-red-100 border border-red-300 text-red-800 p-4 rounded-lg text-center">{error}</div>}

                    {aiResponse && (
                        <div className="mt-8 border-t border-neutral-200/80 pt-6">
                            <h3 className="text-2xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                <IconSparkles className="h-6 w-6 text-slate-800"/>
                                AI 估价结果
                            </h3>
                            <div className="bg-neutral-200/50 p-6 rounded-lg border border-neutral-300 text-slate-800 whitespace-pre-wrap leading-relaxed">
                                {aiResponse}
                            </div>
                            <div className="text-center mt-6">
                                <button onClick={resetState} className="bg-white border border-neutral-300 text-slate-900 hover:bg-neutral-100 px-6 py-2 rounded-full font-semibold transition-all duration-300">
                                    再试一次
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default PriceValuation;