<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Order::with('user')->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $order= $request->validate([
            'user_id'=>'required|exists:users,id',
            'status'=>'in:pending,paid,shipped,completed,cancelled',
            'total'=>'required|numeric|min:0',
        ]);

        $order = Order::create($validated);

        return response()->json(['message'=>'Ordered Succesfully', 'data'=>$order], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        $order= Order::with(user)->findOrFail($id);
        return response()->json($order);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        $order= Order::findOrFail($id);
        $validated=$request->$validate([
            'status' => 'sometimes|in:pending,paid,shipped,completed,cancelled',
            'total'  => 'sometimes|numeric|min:0',
        ]);

        return response()->json([
            'message' => 'Order updated successfully',
            'data' => $order
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $order = Order::findOrFail($id);
        $order->delete();

        return response()->json(['message' => 'Order deleted successfully']);
    }
}
