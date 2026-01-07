import React, { useState, useEffect } from 'react';
import { api } from '../src/services/api';
import type { Testimonial } from '../types';

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
    <div className="group bg-neutral-100/50 backdrop-blur-lg p-8 rounded-2xl border border-neutral-200/80 shadow-lg shadow-neutral-500/10 flex flex-col h-full w-96 flex-shrink-0 snap-center transition-all duration-300 hover:shadow-black/5">
        <div className="flex-grow mb-6">
            <p className="text-slate-700 leading-relaxed text-lg">"{testimonial.quote}"</p>
        </div>
        <div className="flex items-center">
            <img src={testimonial.avatarUrl} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
            <div>
                <p className="font-semibold text-slate-800">{testimonial.name}</p>
                <p className="text-sm text-slate-500 group-hover:text-slate-900 transition-colors">{testimonial.handle}</p>
            </div>
        </div>
    </div>
);


const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await api.testimonials.getAll();
        setTestimonials(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch testimonials');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-transparent overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <p className="text-lg text-slate-600">Loading...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-transparent overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <p className="text-lg text-red-600">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-transparent overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">来自用户的声音</h2>
          <p className="text-slate-600 mt-4 max-w-2xl mx-auto text-lg">看看我们的社区成员如何评价NicheQuant。</p>
        </div>
         <div className="flex overflow-x-auto pb-8 -mx-6 px-6 no-scrollbar snap-x snap-mandatory">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial._id || index} className="flex-shrink-0 w-96 mr-8 snap-center">
                <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
           <div className="flex-shrink-0 w-1"></div> {/* Spacer at the end */}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;