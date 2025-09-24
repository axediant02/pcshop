<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cart = Cart::firstOrCreate(['user_id' => auth()->id()]);

        $items = $cart->items()->with('product')->get();

        return response()->json([
            'cart_id' => $cart->id,
            'items'   => $items
        ]);
    }

    /**
     * Add a product to the cart.
     */
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity'   => 'required|integer|min:1',
        ]);

        $cart = Cart::firstOrCreate(['user_id' => auth()->id()]);

        $item = CartItem::where('cart_id', $cart->id)
            ->where('product_id', $request->product_id)
            ->first();

        if ($item) {
            $item->quantity += $request->quantity;
            $item->save();
        } else {
            $item = CartItem::create([
                'cart_id'    => $cart->id,
                'product_id' => $request->product_id,
                'quantity'   => $request->quantity,
                'price'      => Product::findOrFail($request->product_id)->price,
            ]);
        }

        return response()->json(['message' => 'Item added to cart', 'item' => $item], 201);
    }

    /**
     * Update item quantity in cart.
     */
    public function update(Request $request, $itemId)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $item = CartItem::findOrFail($itemId);

        if ($item->cart->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $item->update(['quantity' => $request->quantity]);

        return response()->json(['message' => 'Cart item updated', 'item' => $item]);
    }

    /**
     * Remove an item from the cart.
     */
    public function destroy($itemId)
    {
        $item = CartItem::findOrFail($itemId);

        if ($item->cart->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $item->delete();

        return response()->json(['message' => 'Item removed from cart']);
    }
}
