<?php

namespace App\Http\Controllers;

use App\Models\OrderItem;
use Illuminate\Http\Request;

class OrderItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(OrderItem::with(['order', 'product'])->get());
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'order_id'   => 'required|exists:orders,id',
            'product_id' => 'required|exists:products,id',
            'quantity'   => 'required|integer|min:1',
            'price'      => 'required|numeric|min:0',
        ]);

        $item = OrderItem::create($validated);

        return response()->json(['message' => 'Item added to order', 'data' => $item], 201);

    }

    /**
     * Display the specified resource.
     */
    public function show(OrderItem $orderItem)
    {
        return response()->json($orderItem->load(['order', 'product']));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, OrderItem $orderItem)
    {
        $validated = $request->validate([
            'quantity' => 'sometimes|integer|min:1',
            'price'    => 'sometimes|numeric|min:0',
        ]);

        $orderItem->update($validated);

        return response()->json(['message' => 'Item updated', 'data' => $orderItem]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(OrderItem $orderItem)
    {
        $orderItem->delete();
        return response()->json(['message' => 'Item deleted']);
    }
}
