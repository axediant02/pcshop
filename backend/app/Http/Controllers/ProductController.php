<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;


class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::latest()->get();
        return response()->json($products);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'=>'required|string|max:128',
            'category'=>'nullable|in:gpu,cpu,ram,motherboard,storage,case,psu,peripherals',
            // 'slug'=>'unique'
            'description'=>'required|string|nullable',
            'price'=>'required|numeric|min:0',
            'stock'=>'required|numeric|min:0',
            'seller_id'=>'sometimes|exists:users,id',
            'image_url'=>'nullable|url|max:2048',
        ]);
        $product = Product::create($validated);
        return response()->json($product, 201);    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
            $products = Product::findOrFail($id);
            return response()->json($products);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $product = Product::findOrFail($id);
        $validated = $request->validate([
            'name'        => 'sometimes|string|max:128',
            'category'    => 'sometimes|in:gpu,cpu,ram,motherboard,storage,case,psu,peripherals',
            'description' => 'nullable|string',
            'price'       => 'sometimes|numeric|min:0',
            'stock'       => 'sometimes|numeric|min:0',
            'seller_id'   => 'sometimes|exists:users,id',
            'image_url'   => 'nullable|url|max:2048',
        ]);
        $product->update($validated);
        return response()->json([
            'message' => 'Product updated successfully',
            'data' => $product
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return response()->json(['message'=>'Product deleted']);
    }
}
