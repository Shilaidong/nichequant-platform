import React from 'react';

const steps = [
    {
        number: '01',
        title: '发布您的单品',
        description: '拍摄照片，填写信息，设定价格。我们的智能工具会帮助您快速完成发布。'
    },
    {
        number: '02',
        title: '平台鉴定与担保',
        description: '商品售出后，先寄送至我们中心进行鉴定。通过后，我们会将其发给买家。'
    },
    {
        number: '03',
        title: '安全收款',
        description: '买家确认收货后，款项将安全转入您的账户。交易完成，简单快捷。'
    }
]

const HowItWorks: React.FC = () => {
  return (
    <section className="py-20 bg-transparent">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">交易流程</h2>
          <p className="text-slate-600 mt-4 max-w-2xl mx-auto text-lg">我们为您提供简单、安全、透明的交易体验。</p>
        </div>
        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {steps.map((step) => (
            <div key={step.title} className="relative bg-neutral-100/50 backdrop-blur-lg p-8 rounded-2xl border border-neutral-200/80 shadow-lg shadow-neutral-500/10 overflow-hidden">
                <span className="text-8xl font-black text-slate-900/5 absolute -top-2 right-4 select-none">{step.number}</span>
                <div className="relative z-10">
                    <h3 className="text-2xl font-semibold text-slate-800 mb-4 mt-8">{step.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{step.description}</p>
                </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;