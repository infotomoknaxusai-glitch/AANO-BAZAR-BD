import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.js';
import { Footer } from './components/Footer.js';
import { HomeView } from './components/HomeView.js';
import { CategoriesView } from './components/CategoriesView.js';
import { ProductListView } from './components/ProductListView.js';
import { DealsView } from './components/DealsView.js';
import { FlashSaleView } from './components/FlashSaleView.js';
import { CashbackView } from './components/CashbackView.js';
import { SellerPortalView } from './components/SellerPortalView.js';
import { DealerPortalView } from './components/DealerPortalView.js';
import { AboutUsView } from './components/AboutUsView.js';
import { ContactUsView } from './components/ContactUsView.js';
import { FAQView } from './components/FAQView.js';
import { PoliciesView } from './components/PoliciesView.js';
import { WishlistView } from './components/WishlistView.js';
import { ProductDetailsModal } from './components/ProductDetailsModal.js';
import { CartDrawer } from './components/CartDrawer.js';
import { CheckoutModal } from './components/CheckoutModal.js';
import { OrderTrackModal } from './components/OrderTrackModal.js';
import { AiAssistantModal } from './components/AiAssistantModal.js';

import { PRODUCTS, CURRENCIES, CATEGORIES, DEALS_OFFERS } from './data.js';
import { Product, CartItem, Currency, CategoryId, ActiveView } from './types.js';

export default function App() {
  // Navigation State
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Currency State
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(CURRENCIES[0]); // Default USD

  // Products & User Collections
  const [products] = useState<Product[]>(PRODUCTS);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['p3', 'p7']);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'cart-1',
      product: PRODUCTS[0], // Organic Wildflower Honey
      quantity: 2,
      selectedVariants: { 'Size / Weight': '500g Jar' }
    },
    {
      id: 'cart-2',
      product: PRODUCTS[2], // SonicPro ANC Headphones
      quantity: 1,
      selectedVariants: { 'Color': 'Matte Midnight Black' }
    }
  ]);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>('AANO20');

  // Modals & Drawers State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderTrackOpen, setIsOrderTrackOpen] = useState(false);
  const [trackOrderId, setTrackOrderId] = useState<string>('AB-89241');
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Toast Notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Scroll to top upon page navigation
  const handleNavigate = (view: ActiveView, categoryId?: CategoryId) => {
    setActiveView(view);
    if (categoryId) {
      setSelectedCategory(categoryId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query);
    setActiveView('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Wishlist Actions
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds(prev => {
      const exists = prev.includes(product.id);
      if (exists) {
        showToast(`Removed "${product.name}" from Wishlist`);
        return prev.filter(id => id !== product.id);
      } else {
        showToast(`Added "${product.name}" to your Wishlist ❤️`);
        return [...prev, product.id];
      }
    });
  };

  const handleClearWishlist = () => {
    setWishlistIds([]);
    showToast('Wishlist cleared');
  };

  // Cart Actions
  const handleAddToCart = (product: Product, quantity = 1, variants?: Record<string, string>) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        const newItem: CartItem = {
          id: `item-${Date.now()}-${Math.random().toString(36).substring(7)}`,
          product,
          quantity,
          selectedVariants: variants || {}
        };
        return [...prev, newItem];
      }
    });
    showToast(`Added ${quantity}x "${product.name}" to cart 🛒`);
  };

  const handleUpdateCartQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveCartItem(id);
    } else {
      setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: qty } : item));
    }
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    showToast('Item removed from cart');
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Coupon Action
  const handleApplyCoupon = (code: string): boolean => {
    const valid = DEALS_OFFERS.some(d => d.code.toLowerCase() === code.toLowerCase());
    if (valid) {
      setAppliedCoupon(code.toUpperCase());
      showToast(`Promo voucher "${code.toUpperCase()}" applied successfully! 🎉`);
      return true;
    }
    return false;
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed');
  };

  // Buy Now Action
  const handleBuyNow = (product: Product, quantity = 1, variants?: Record<string, string>) => {
    handleAddToCart(product, quantity, variants);
    setIsCheckoutOpen(true);
  };

  // Order Completed
  const handleOrderCompleted = (orderId: string) => {
    setTrackOrderId(orderId);
    showToast(`Order #${orderId} placed successfully!`);
  };

  const wishlistProducts = products.filter(p => wishlistIds.includes(p.id));

  return (
    <div className="min-h-screen bg-slate-100/60 font-sans text-slate-900 flex flex-col antialiased">
      
      {/* Top Banner & Header */}
      <Header
        activeView={activeView}
        selectedCategory={selectedCategory}
        onNavigate={handleNavigate}
        onSearch={handleSearchSubmit}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => handleNavigate('wishlist')}
        onOpenOrderTrack={() => setIsOrderTrackOpen(true)}
        onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
        currency={selectedCurrency}
        onSelectCurrency={setSelectedCurrency}
        currencies={CURRENCIES}
        products={products}
        onSelectProduct={(p) => setQuickViewProduct(p)}
      />

      {/* Main Dynamic View Area */}
      <main className="flex-1">
        {activeView === 'home' && (
          <HomeView
            products={products}
            currency={selectedCurrency}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onQuickView={(p) => setQuickViewProduct(p)}
            onSelectProduct={(p) => setQuickViewProduct(p)}
            onNavigate={handleNavigate}
            onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
          />
        )}

        {(activeView === 'all-categories' || activeView === 'category') && (
          <CategoriesView
            selectedCategory={activeView === 'category' ? selectedCategory : null}
            products={products}
            currency={selectedCurrency}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onQuickView={(p) => setQuickViewProduct(p)}
            onSelectProduct={(p) => setQuickViewProduct(p)}
            onNavigate={handleNavigate}
          />
        )}

        {activeView === 'products' && (
          <ProductListView
            title={searchQuery ? `Search Results for "${searchQuery}"` : "All Products Catalog"}
            subtitle="Filter by department, price, verified rating, stock availability, and instant cashback"
            products={products}
            initialSearchQuery={searchQuery}
            currency={selectedCurrency}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onQuickView={(p) => setQuickViewProduct(p)}
            onSelectProduct={(p) => setQuickViewProduct(p)}
            onNavigate={handleNavigate}
          />
        )}

        {activeView === 'deals' && (
          <DealsView
            products={products}
            currency={selectedCurrency}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onQuickView={(p) => setQuickViewProduct(p)}
            onSelectProduct={(p) => setQuickViewProduct(p)}
            onNavigate={handleNavigate}
          />
        )}

        {activeView === 'flash-sale' && (
          <FlashSaleView
            products={products}
            currency={selectedCurrency}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onQuickView={(p) => setQuickViewProduct(p)}
            onSelectProduct={(p) => setQuickViewProduct(p)}
            onNavigate={handleNavigate}
          />
        )}

        {activeView === 'cashback' && (
          <CashbackView
            products={products}
            currency={selectedCurrency}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onQuickView={(p) => setQuickViewProduct(p)}
            onSelectProduct={(p) => setQuickViewProduct(p)}
            onNavigate={handleNavigate}
          />
        )}

        {activeView === 'new-arrivals' && (
          <ProductListView
            title="Fresh Drops & New Arrivals"
            subtitle="Explore newly released editions, organic harvest drops, and high-performance gadgets"
            products={products.filter(p => p.isNewArrival)}
            currency={selectedCurrency}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onQuickView={(p) => setQuickViewProduct(p)}
            onSelectProduct={(p) => setQuickViewProduct(p)}
            onNavigate={handleNavigate}
          />
        )}

        {activeView === 'best-sellers' && (
          <ProductListView
            title="AANO BAZAR Best Sellers"
            subtitle="Most ordered and top-rated products across all 7 superstore departments"
            products={products.filter(p => p.isBestSeller)}
            currency={selectedCurrency}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onQuickView={(p) => setQuickViewProduct(p)}
            onSelectProduct={(p) => setQuickViewProduct(p)}
            onNavigate={handleNavigate}
          />
        )}

        {activeView === 'sell-on-aano' && (
          <SellerPortalView currency={selectedCurrency} />
        )}

        {activeView === 'become-dealer' && (
          <DealerPortalView currency={selectedCurrency} />
        )}

        {activeView === 'about-us' && (
          <AboutUsView onNavigate={handleNavigate} />
        )}

        {activeView === 'contact-us' && (
          <ContactUsView />
        )}

        {activeView === 'faq' && (
          <FAQView
            onNavigate={handleNavigate}
            onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
          />
        )}

        {(activeView === 'terms' || activeView === 'privacy' || activeView === 'return-policy' || activeView === 'delivery-policy') && (
          <PoliciesView
            view={activeView}
            onNavigate={handleNavigate}
          />
        )}

        {activeView === 'wishlist' && (
          <WishlistView
            wishlistProducts={wishlistProducts}
            currency={selectedCurrency}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onQuickView={(p) => setQuickViewProduct(p)}
            onSelectProduct={(p) => setQuickViewProduct(p)}
            onNavigate={handleNavigate}
            onClearWishlist={handleClearWishlist}
          />
        )}
      </main>

      {/* Persistent Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 backdrop-blur-md text-white text-xs font-semibold px-4 py-2.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-2 animate-in slide-in-from-bottom-4">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modals and Slide-over Drawers */}
      <ProductDetailsModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        currency={selectedCurrency}
        isWishlisted={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
        allProducts={products}
        onSelectProduct={(p) => setQuickViewProduct(p)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        currency={selectedCurrency}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={handleApplyCoupon}
        onRemoveCoupon={handleRemoveCoupon}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        currency={selectedCurrency}
        appliedCoupon={appliedCoupon}
        onOrderCompleted={handleOrderCompleted}
        onOpenOrderTrack={(orderId) => {
          setTrackOrderId(orderId);
          setIsOrderTrackOpen(true);
        }}
        onClearCart={handleClearCart}
      />

      <OrderTrackModal
        isOpen={isOrderTrackOpen}
        onClose={() => setIsOrderTrackOpen(false)}
        initialOrderId={trackOrderId}
        currency={selectedCurrency}
      />

      <AiAssistantModal
        isOpen={isAiAssistantOpen}
        onClose={() => setIsAiAssistantOpen(false)}
        currency={selectedCurrency}
        allProducts={products}
        onSelectProduct={(p) => {
          setIsAiAssistantOpen(false);
          setQuickViewProduct(p);
        }}
        onNavigate={handleNavigate}
      />

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenOrderTrack={() => setIsOrderTrackOpen(true)}
        onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
      />
    </div>
  );
}
