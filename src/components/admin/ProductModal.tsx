import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Check, Sparkles } from 'lucide-react';
import { Product, ProductCompatibility } from '../../types';
import { CATEGORIES } from '../../data/categories';
import { useStore } from '../../context/StoreContext';
import { useToast } from '../../context/ToastContext';
import { validateSafeUrl } from '../../utils/validators';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  productToEdit?: Product | null;
}

export const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, productToEdit }) => {
  const { addProduct, updateProduct } = useStore();
  const { error } = useToast();

  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [partNumber, setPartNumber] = useState('');
  const [categoryId, setCategoryId] = useState(CATEGORIES[0].id);
  const [price, setPrice] = useState<number>(99.90);
  const [originalPrice, setOriginalPrice] = useState<number>(129.90);
  const [stockQuantity, setStockQuantity] = useState<number>(10);
  const [minStockThreshold, setMinStockThreshold] = useState<number>(5);
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [compatibilities, setCompatibilities] = useState<ProductCompatibility[]>([
    { brand: 'Honda', model: 'CG 160 Fan', yearRange: '2016 a 2026' }
  ]);

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setBrand(productToEdit.brand);
      setPartNumber(productToEdit.partNumber);
      setCategoryId(productToEdit.categoryId);
      setPrice(productToEdit.price);
      setOriginalPrice(productToEdit.originalPrice || productToEdit.price * 1.2);
      setStockQuantity(productToEdit.stockQuantity);
      setMinStockThreshold(productToEdit.minStockThreshold || 5);
      setImageUrl(productToEdit.images[0] || '');
      setDescription(productToEdit.description);
      setCompatibilities(productToEdit.compatibilities.length > 0 ? productToEdit.compatibilities : [
        { brand: 'Honda', model: 'CG 160 Fan', yearRange: '2016 a 2026' }
      ]);
    } else {
      setName('');
      setBrand('GM Peças');
      setPartNumber(`SKU-${Math.floor(1000 + Math.random() * 9000)}`);
      setCategoryId(CATEGORIES[0].id);
      setPrice(89.90);
      setOriginalPrice(119.90);
      setStockQuantity(15);
      setMinStockThreshold(5);
      setImageUrl('https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80');
      setDescription('Peça de reposição de alta durabilidade e acabamento premium para sua motocicleta.');
      setCompatibilities([
        { brand: 'Honda', model: 'CG 160 Fan', yearRange: '2016 a 2026' },
        { brand: 'Honda', model: 'CG 160 Titan', yearRange: '2016 a 2026' }
      ]);
    }
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  const handleAddCompatibility = () => {
    setCompatibilities((prev) => [
      ...prev,
      { brand: 'Honda', model: 'CG 160 Titan', yearRange: '2016 a 2026' }
    ]);
  };

  const handleUpdateComp = (index: number, field: keyof ProductCompatibility, val: string) => {
    setCompatibilities((prev) =>
      prev.map((c, i) => (i === index ? { ...c, [field]: val } : c))
    );
  };

  const handleRemoveComp = (index: number) => {
    if (compatibilities.length > 1) {
      setCompatibilities((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      error('Nome obrigatório', 'Informe o nome do produto.');
      return;
    }

    if (!partNumber.trim()) {
      error('Código obrigatório', 'Informe o código SKU/OEM da peça.');
      return;
    }

    const slug = name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const defaultImage = 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80';
    let safeImageUrl = defaultImage;
    if (imageUrl.trim()) {
      if (!validateSafeUrl(imageUrl)) {
        error('URL de Imagem Inválida', 'A imagem deve utilizar protocolo https:// ou caminho relativo válido.');
        return;
      }
      safeImageUrl = imageUrl.trim();
    }

    const discountPercent = originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

    const productPayload = {
      name: name.trim(),
      slug: productToEdit ? productToEdit.slug : `${slug}-${Date.now().toString().slice(-4)}`,
      brand: brand.trim() || 'GM Parts',
      partNumber: partNumber.trim(),
      categoryId,
      price: Math.max(0.01, Number(price)),
      originalPrice: Math.max(0.01, Number(originalPrice)),
      discountPercent,
      installmentsCount: 3,
      inStock: stockQuantity > 0,
      stockQuantity: Math.max(0, Math.floor(Number(stockQuantity))),
      minStockThreshold: Math.max(0, Math.floor(Number(minStockThreshold))),
      isFeatured: true,
      isBestSeller: false,
      isWeeklyOffer: discountPercent > 15,
      rating: productToEdit ? productToEdit.rating : 5.0,
      reviewsCount: productToEdit ? productToEdit.reviewsCount : 1,
      images: [safeImageUrl],
      description: description.trim(),
      specifications: productToEdit ? productToEdit.specifications : {
        'Aplicação': 'Conforme tabela de compatibilidade',
        'Garantia': 'Garantia oficial GM Moto Peças'
      },
      compatibilities,
      warrantyMonths: 6,
    };

    if (productToEdit) {
      updateProduct({ ...productPayload, id: productToEdit.id });
    } else {
      addProduct(productPayload);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 relative text-slate-100 my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1 mb-6 border-b border-slate-800 pb-4">
          <h3 className="text-xl font-bold text-white">
            {productToEdit ? 'Editar Produto' : 'Cadastrar Novo Produto'}
          </h3>
          <p className="text-xs text-slate-400">
            Cadastre peças com compatibilidade inteligente e controle de estoque.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Nome do Produto</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Kit Relação Honda CG 160 D.I.D c/ Retentor"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Marca da Peça</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Ex: D.I.D, Cobreq, Vaz"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Código / SKU / OEM</label>
              <input
                type="text"
                value={partNumber}
                onChange={(e) => setPartNumber(e.target.value.toUpperCase())}
                placeholder="Ex: KTR-160-DID"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono uppercase focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Categoria</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500 cursor-pointer"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id} className="bg-slate-900">
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Preço Venda (R$)</label>
              <input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white font-bold focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Preço Original (R$)</label>
              <input
                type="number"
                step="0.01"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Estoque Atual</label>
              <input
                type="number"
                value={stockQuantity}
                onChange={(e) => setStockQuantity(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white font-bold focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Estoque Mínimo</label>
              <input
                type="number"
                value={minStockThreshold}
                onChange={(e) => setMinStockThreshold(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">URL da Imagem</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Descrição Detalhada</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva as qualidades, materiais e benefícios da peça..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
            />
          </div>

          {/* Compatibilities multi-bike */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-white uppercase tracking-wider">
                Motos Compatíveis ({compatibilities.length})
              </label>
              <button
                type="button"
                onClick={handleAddCompatibility}
                className="text-xs font-bold text-brand-400 hover:text-brand-300 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Adicionar Moto
              </button>
            </div>

            <div className="space-y-2">
              {compatibilities.map((comp, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <input
                    type="text"
                    value={comp.brand}
                    onChange={(e) => handleUpdateComp(idx, 'brand', e.target.value)}
                    placeholder="Marca (Ex: Honda)"
                    className="w-24 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-white"
                  />
                  <input
                    type="text"
                    value={comp.model}
                    onChange={(e) => handleUpdateComp(idx, 'model', e.target.value)}
                    placeholder="Modelo (Ex: CG 160 Fan)"
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-white"
                  />
                  <input
                    type="text"
                    value={comp.yearRange}
                    onChange={(e) => handleUpdateComp(idx, 'yearRange', e.target.value)}
                    placeholder="Anos (Ex: 2016 a 2026)"
                    className="w-32 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveComp(idx)}
                    className="p-1.5 text-slate-500 hover:text-rose-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-brand-600/30 transition-all flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>{productToEdit ? 'Salvar Alterações' : 'Cadastrar Produto'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
