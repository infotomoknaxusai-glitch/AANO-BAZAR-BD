export type CategoryId = 
  | 'grocery'
  | 'electronics'
  | 'fashion'
  | 'beauty'
  | 'health-wellness'
  | 'home-kitchen'
  | 'mobile-accessories';

export interface ProductVariant {
  name: string;
  options: string[];
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  avatar?: string;
  helpfulCount?: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: CategoryId;
  categoryName: string;
  subcategory: string;
  brand: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  cashbackPercent: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  isFlashSale?: boolean;
  flashSaleEndsInSeconds?: number;
  flashClaimedPercent?: number;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  badge?: string;
  images: string[];
  description: string;
  shortDesc: string;
  features: string[];
  specs: Record<string, string>;
  tags: string[];
  sku: string;
  variants?: ProductVariant[];
  deliveryEstimate: string;
  returnDays: number;
  warranty: string;
}

export interface Category {
  id: CategoryId;
  name: string;
  shortName: string;
  slug: string;
  tagline: string;
  description: string;
  iconName: string;
  bannerImage: string;
  subcategories: string[];
  popularBrands: string[];
  itemCount: number;
  colorScheme: {
    bg: string;
    text: string;
    badge: string;
    border: string;
  };
}

export interface CartItem {
  id?: string;
  product: Product;
  quantity: number;
  selectedVariants?: Record<string, string>;
}

export interface DealOffer {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  discountText: string;
  discountValue: number;
  discountType: 'percentage' | 'fixed';
  minSpend: number;
  category?: CategoryId | 'all';
  cashbackBonus?: number;
  expiresIn: string;
  badge: string;
  terms: string;
}

export interface DealerTier {
  id: string;
  name: string;
  minMonthlyOrder: string;
  discountRate: string;
  creditPeriod: string;
  dedicatedManager: boolean;
  freeLogistics: boolean;
  priorityDispatch: boolean;
  recommendedFor: string;
}

export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export type ActiveView = 
  | 'home'
  | 'category'
  | 'all-categories'
  | 'product-details'
  | 'deals'
  | 'flash-sale'
  | 'cashback'
  | 'new-arrivals'
  | 'best-sellers'
  | 'sell-on-aano'
  | 'become-dealer'
  | 'about-us'
  | 'contact-us'
  | 'faq'
  | 'terms'
  | 'privacy'
  | 'return-policy'
  | 'delivery-policy'
  | 'wishlist'
  | 'search-results'
  | 'track-order';

export interface Currency {
  code: string;
  symbol: string;
  rate: number; // relative to USD (1.0)
  name: string;
}

export interface FilterState {
  searchQuery: string;
  category: CategoryId | 'all';
  subcategory: string | 'all';
  brand: string | 'all';
  minPrice: number;
  maxPrice: number;
  minRating: number;
  inStockOnly: boolean;
  onSaleOnly: boolean;
  hasCashbackOnly: boolean;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest' | 'discount';
}
