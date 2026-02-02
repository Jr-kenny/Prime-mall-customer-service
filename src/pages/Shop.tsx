import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingCart, Star, Lock, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useDemoStore } from "@/contexts/DemoStoreContext";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
  category: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 199.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    category: "Electronics",
  },
  {
    id: 2,
    name: "Smart Watch Pro",
    price: 349.99,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    category: "Electronics",
  },
  {
    id: 3,
    name: "Designer Leather Bag",
    price: 129.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
    category: "Fashion",
  },
  {
    id: 4,
    name: "Running Shoes Elite",
    price: 159.99,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    category: "Sports",
  },
  {
    id: 5,
    name: "Minimalist Desk Lamp",
    price: 79.99,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop",
    category: "Home",
  },
  {
    id: 6,
    name: "Premium Coffee Maker",
    price: 249.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=400&fit=crop",
    category: "Home",
  },
  {
    id: 7,
    name: "Vintage Sunglasses",
    price: 89.99,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
    category: "Fashion",
  },
  {
    id: 8,
    name: "Bluetooth Speaker",
    price: 119.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
    category: "Electronics",
  },
];

const categories = ["All", "Electronics", "Fashion", "Sports", "Home"];

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { toast } = useToast();
  const { isAuthenticated, user, addToCart } = useDemoStore();

  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const handleAddToCart = (product: Product) => {
    if (!isAuthenticated) {
      toast({
        title: "Please Sign In",
        description: "You need to sign in to add items to your cart.",
        variant: "destructive",
      });
      return;
    }

    const success = addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });

    if (success) {
      toast({
        title: "Added to Cart! 🛒",
        description: `${product.name} has been added. Funds remaining: $${(user!.funds - product.price).toFixed(2)}`,
      });
    } else {
      toast({
        title: "Insufficient Funds",
        description: "You don't have enough demo funds for this item.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="pt-24 pb-16">
        {/* Header */}
        <section className="bg-primary text-primary-foreground py-12">
          <div className="max-w-6xl mx-auto text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Shop</h1>
            <p className="text-lg opacity-90">Discover amazing products at great prices</p>
            {isAuthenticated && user && (
              <div className="mt-4 inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <span className="text-sm">Available Funds:</span>
                <span className="font-bold">${user.funds.toFixed(2)}</span>
              </div>
            )}
          </div>
        </section>

        {/* Not logged in alert */}
        {!isAuthenticated && (
          <div className="max-w-6xl mx-auto px-4 mt-6">
            <Alert>
              <Lock className="h-4 w-4" />
              <AlertDescription className="flex items-center justify-between">
                <span>Sign in to start shopping with $1,000 in demo funds!</span>
                <Button size="sm" asChild className="ml-4">
                  <Link to="/signup">Get Started</Link>
                </Button>
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Category Filter */}
        <section className="py-8 px-4 border-b">
          <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => {
                const canAfford = !user || product.price <= user.funds;
                
                return (
                  <Card key={product.id} className="group overflow-hidden">
                    <div className="aspect-square overflow-hidden relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {isAuthenticated && !canAfford && (
                        <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                          <div className="text-center">
                            <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                            <p className="text-sm text-muted-foreground">Insufficient funds</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                        {product.category}
                      </p>
                      <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="text-sm text-muted-foreground">{product.rating}</span>
                      </div>
                      <p className="text-xl font-bold text-foreground">
                        ${product.price.toFixed(2)}
                      </p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button 
                        className="w-full gap-2" 
                        onClick={() => handleAddToCart(product)}
                        disabled={isAuthenticated && !canAfford}
                      >
                        <ShoppingCart className="h-4 w-4" />
                        {isAuthenticated ? "Add to Cart" : "Sign in to Buy"}
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Shop;
