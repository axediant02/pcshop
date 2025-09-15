<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;


class ProductCOntroller extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Product::all();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'=>'required|string|max:128',
            'category'=>'required|in:gpu,cpu,ram,motherboard,storage,case,psu,peripherals|nullable',
            // 'slug'=>'unique'
            'description'=>'required|string|nullable',
            'price'=>'required|numerical|min:0',
            'stock'=>'required|numneric|min:0',
            'seller_id'=>'required|exists:users,id',
            'image_url'=>'nullable|url|max:2048',
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
