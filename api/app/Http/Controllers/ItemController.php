<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    
    public function show_api()
    {
        $items = Item::all();
        return $items;
    }

    public function add_item(Request $request)
    {
        $item = new Item();
        $item->name = $request->name;
        // $item->image = $request->image;
        $item->description = $request->description;
        $item->save();
    }

    public function update_item($id , Request $request)
    {
        $item = Item::find($id);
        $item->name = $request->name;
        $item->image = $request->image;
        $item->description = $request->description;
        $item->save();
    }
    public function delete_item($id )
    {
        $item = Item::find($id);
        $item->delete();
    }
}
