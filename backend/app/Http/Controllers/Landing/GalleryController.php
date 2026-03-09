<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Http\Request;

class GalleryController extends Controller
{
    public function index()
    {
        $result = Cloudinary::adminApi()->assets([
            'type' => 'upload',
            'asset_folder' => 'clubgallery',
            'max_results' => 30
        ]);

        return response()->json($result['resources']);
    }
}
