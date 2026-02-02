import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { useDemoStore } from "@/contexts/DemoStoreContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Cart = () => {
  const { cart, user, updateQuantity, removeFromCart, clearCart } = useDemoStore();
  const { toast } = useToast();

  const handleCheckout = () => {
    toast({
      title: "Order Placed! 🎉",
      description: "This is a demo - no real order was placed.",
    });
    clearCart();
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Layout>
      <div className="pt-24 pb-16 min-h-screen">
        <section className="bg-primary text-primary-foreground py-12">
          <div className="max-w-6xl mx-auto text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Cart</h1>
            <p className="text-lg opacity-90">
              {cart.length} {cart.length === 1 ? "item" : "items"} in your cart
            </p>
          </div>
        </section>

        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            {cart.length === 0 ? (
              <div className="text-center py-16">
                <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground/30 mb-6" />
                <h2 className="text-2xl font-semibold text-foreground mb-2">
                  Your cart is empty
                </h2>
                <p className="text-muted-foreground mb-6">
                  Looks like you haven't added anything yet.
                </p>
                <Button asChild size="lg">
                  <Link to="/shop">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Continue Shopping
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Cart Items */}
                <div className="space-y-4">
                  {cart.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground">
                              {item.name}
                            </h3>
                            <p className="text-primary font-bold text-lg">
                              ${item.price.toFixed(2)}
                            </p>
                            <div className="flex items-center gap-3 mt-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="font-medium w-8 text-center">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                disabled={user && item.price > user.funds}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive hover:text-destructive"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-foreground">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Summary */}
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="flex justify-between text-muted-foreground">
                        <span>Subtotal</span>
                        <span>${cartTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Shipping</span>
                        <span className="text-green-600">Free</span>
                      </div>
                      <div className="border-t pt-3">
                        <div className="flex justify-between text-lg font-bold text-foreground">
                          <span>Total</span>
                          <span>${cartTotal.toFixed(2)}</span>
                        </div>
                      </div>
                      {user && (
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>Remaining Funds</span>
                          <span className="text-primary font-medium">
                            ${user.funds.toFixed(2)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="mt-6 space-y-3">
                      <Button className="w-full" size="lg" onClick={handleCheckout}>
                        Checkout (Demo)
                      </Button>
                      <Button variant="outline" className="w-full" asChild>
                        <Link to="/shop">Continue Shopping</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Cart;
