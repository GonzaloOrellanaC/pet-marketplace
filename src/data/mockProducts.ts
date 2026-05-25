import { Product } from '../types/index.ts';

const CATEGORIES = [
  'Comida', 'Ropa', 'Collares', 'Arnés', 'Snacks', 
  'Higiene', 'Juguetes', 'Camas', 'Salud', 'Viaje'
];

const STORES = [
  { id: 'store-1', name: 'Pet Paradise' },
  { id: 'store-2', name: 'Mundo Animal' },
  { id: 'store-3', name: 'La Casa del Gato' }
];

const IMAGES = [
  'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1541599540903-21b1284cc536?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1591768793355-74d7af236c17?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=400&auto=format&fit=crop',
];

export const MOCK_PRODUCTS: Product[] = Array.from({ length: 100 }).map((_, index) => {
  const category = CATEGORIES[index % CATEGORIES.length];
  const store = STORES[index % STORES.length];
  const numImages = (index % 3) + 1;
  const productImages = Array.from({ length: numImages }).map((_, i) => IMAGES[(index + i) % IMAGES.length]);

  return {
    _id: `product-${index}`,
    name: `${category} de ${index % 2 === 0 ? 'Perro' : 'Gato'} Premium`,
    description: `Este es un producto de alta calidad de la categoría ${category}. Ideal para el bienestar de tu mascota. Fabricado con los mejores materiales y probado por expertos en cuidado animal.`,
    price: Math.floor(Math.random() * (100 - 5 + 1) + 5) + 0.99,
    category: category,
    stock: Math.floor(Math.random() * 50),
    images: productImages,
    tenantId: store.id,
    averageRating: 4.5
  };
});
