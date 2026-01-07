import React, { useState, useEffect, useRef } from 'react';
import IconAuthenticate from './icons/IconAuthenticate';
import IconData from './icons/IconData';
import IconListing from './icons/IconListing';

const features = [
  {
    icon: <IconAuthenticate />,
    title: '专家鉴定，放心交易',
    description: '我们的专家团队和先进技术为每件商品提供权威鉴定，确保您购买的都是正品。',
  },
  {
    icon: <IconData />,
    title: '数据洞察，精准估值',
    description: '通过实时市场数据和历史价格走势，洞察藏品价值，做出更明智的买卖决策。',
  },
  {
    icon: <IconListing />,
    title: '轻松发售，快速成交',
    description: '简洁流畅的上传流程，让您的珍藏在几分钟内就能展示给全球的爱好者和收藏家。',
  },
];

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, index }) => {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (cardRef.current) {
                        observer.unobserve(cardRef.current);
                    }
                }
            },
            {
                threshold: 0.3, // Animate when 30% of the element is visible
            }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, []);

    return (
        <div ref={cardRef} className={`bg-neutral-100/50 backdrop-blur-lg p-8 rounded-2xl transition-all duration-700 text-center border border-neutral-200/80 shadow-lg shadow-neutral-500/10 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
             <div 
                className={`inline-block bg-slate-900/5 text-slate-700 p-4 rounded-full mb-6 transform transition-all duration-500 ease-out ${
                    isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
            >
                {icon}
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-3">{title}</h3>
            <p className="text-slate-600 leading-relaxed">{description}</p>
        </div>
    );
};

const Features: React.FC = () => {
  return (
    <section className="py-20 bg-transparent">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">一个值得信赖的平台</h2>
            <p className="text-slate-600 mt-4 max-w-2xl mx-auto text-lg">我们提供一站式解决方案，助力您的亚文化资产交易与管理。</p>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <FeatureCard 
                key={feature.title} 
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;