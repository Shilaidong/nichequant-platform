import React, { useState } from 'react';
import { api } from '../src/services/api';
import IconSparkles from './icons/IconSparkles';

const PhotoVerification: React.FC = () => {
    const [imageUrl, setImageUrl] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [aiResponse, setAiResponse] = useState('');
    const [error, setError] = useState('');

    const handleAnalyzeImage = async () => {
        if (!imageUrl) {
            setError('请输入图片链接');
            return;
        }

        setIsLoading(true);
        setAiResponse('');
        setError('');

        try {
            // Call backend API instead of frontend direct call
            // Backend will fetch image and send to Gemini
            const data = await api.ai.verify({
                imageUrl,
                description
            });
            
            setAiResponse(data.verification);

        } catch (err: any) {
            console.error("Error analyzing image: ", err);
            setError(err.message || "AI分析失败，请检查链接是否有效。");
        } finally {
            setIsLoading(false);
        }
    };

    const resetState = () => {
        setImageUrl('');
        setDescription('');
        setAiResponse('');
        setError('');
        setIsLoading(false);
    };
    
    return (
        <section id="ai-verify" className="py-20 bg-transparent">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">AI 即刻鉴定</h2>
                    <p className="text-slate-600 mt-4 max-w-2xl mx-auto text-lg">输入图片链接，即时获取您藏品的专业鉴定意见。</p>
                </div>

                <div className="max-w-3xl mx-auto bg-neutral-100/50 backdrop-blur-lg p-8 rounded-2xl border border-neutral-200/80 shadow-lg shadow-neutral-500/10">
                    
                    <div className="space-y-4 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">图片链接 (URL)</label>
                            <input 
                                type="url" 
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                placeholder="https://example.com/image.jpg"
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 outline-none"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">补充描述 (可选)</label>
                            <textarea 
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="例如：这是我在二手店买的 90 年代 Nike T恤..."
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 outline-none h-24 resize-none"
                            />
                        </div>
                    </div>

                    {imageUrl && (
                        <div className="mb-6 aspect-video bg-neutral-200 rounded-lg overflow-hidden border border-neutral-300">
                             <img src={imageUrl} alt="Preview" className="w-full h-full object-contain" onError={() => setError('无法加载图片，请检查链接')} />
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {!isLoading && !aiResponse && (
                            <button onClick={handleAnalyzeImage} className="w-full sm:w-auto bg-slate-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-slate-800 transition-all duration-300 shadow-md flex items-center justify-center gap-2">
                                <IconSparkles className="h-5 w-5" /> 开始鉴定
                            </button>
                        )}
                        
                        {(aiResponse || error) && !isLoading && (
                            <button onClick={resetState} className="w-full sm:w-auto bg-white border border-neutral-300 text-slate-900 hover:bg-neutral-100 px-8 py-3 rounded-full font-semibold transition-all duration-300">
                                重置
                            </button>
                        )}
                    </div>
                    
                    {isLoading && (
                        <div className="text-center mt-8">
                            <div className="inline-flex items-center gap-3 text-slate-600">
                                <svg className="animate-spin h-6 w-6 text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span className="font-semibold">AI正在分析图片链接...</span>
                            </div>
                        </div>
                    )}

                    {error && <div className="mt-8 bg-red-100 border border-red-300 text-red-800 p-4 rounded-lg text-center">{error}</div>}

                    {aiResponse && (
                        <div className="mt-8 border-t border-neutral-200/80 pt-6">
                            <h3 className="text-2xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                <IconSparkles className="h-6 w-6 text-slate-800"/>
                                AI 鉴定结果
                            </h3>
                            <div className="bg-neutral-200/50 p-6 rounded-lg border border-neutral-300 text-slate-800 whitespace-pre-wrap leading-relaxed">
                                {aiResponse}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default PhotoVerification;