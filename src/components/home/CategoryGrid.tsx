import React from 'react';
import { 
  PackageCheck, 
  Cpu, 
  Disc, 
  Compass, 
  ShieldAlert, 
  Zap, 
  Workflow, 
  Layers, 
  Filter, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { CATEGORIES } from '../../data/categories';

interface CategoryGridProps {
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ onSelectCategory }) => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'PackageCheck': return <PackageCheck className="w-6 h-6 text-brand-500" />;
      case 'Cpu': return <Cpu className="w-6 h-6 text-brand-500" />;
      case 'Disc': return <Disc className="w-6 h-6 text-brand-500" />;
      case 'Compass': return <Compass className="w-6 h-6 text-brand-500" />;
      case 'ShieldAlert': return <ShieldAlert className="w-6 h-6 text-brand-500" />;
      case 'Zap': return <Zap className="w-6 h-6 text-brand-500" />;
      case 'Workflow': return <Workflow className="w-6 h-6 text-brand-500" />;
      case 'Layers': return <Layers className="w-6 h-6 text-brand-500" />;
      case 'Filter': return <Filter className="w-6 h-6 text-brand-500" />;
      default: return <PackageCheck className="w-6 h-6 text-brand-500" />;
    }
  };

  return (
    <section className="py-16 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-600/10 border border-brand-500/20 text-brand-400 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Navegue pelo Catálogo</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white heading-font uppercase tracking-tight">
              Compre por <span className="text-brand-500">categoria</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Todas as peças organizadas por departamento técnico para sua facilidade.
            </p>
          </div>

          <button
            onClick={() => onSelectCategory('')}
            className="text-xs font-bold text-brand-400 hover:text-brand-300 flex items-center gap-1 group self-start md:self-auto"
          >
            <span>Ver todas as categorias</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Categories Grid (9 items) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="group relative bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-3xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-600/10 cursor-pointer overflow-hidden flex flex-col justify-between"
            >
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-600/5 rounded-full blur-2xl group-hover:bg-brand-600/10 transition-colors" />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center group-hover:border-brand-500/50 group-hover:scale-110 transition-all shadow-inner">
                    {getCategoryIcon(cat.iconName)}
                  </div>
                  <span className="text-[11px] font-bold text-slate-500 group-hover:text-slate-400">
                    {cat.itemCount}+ itens
                  </span>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-brand-400 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>
                </div>

                {/* Subcategories tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {cat.subcategories.slice(0, 3).map((sub) => (
                    <span
                      key={sub.id}
                      className="text-[10px] bg-slate-950 text-slate-300 px-2 py-0.5 rounded-md border border-slate-800/80 group-hover:border-slate-700"
                    >
                      {sub.name.split(' (')[0]}
                    </span>
                  ))}
                  {cat.subcategories.length > 3 && (
                    <span className="text-[10px] text-brand-400 font-bold px-1 py-0.5">
                      +{cat.subcategories.length - 3} mais
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Arrow CTA */}
              <div className="pt-4 mt-4 border-t border-slate-800/60 flex items-center justify-between text-xs font-bold text-slate-300 group-hover:text-brand-400 transition-colors">
                <span>Ver produtos</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
