<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\posts; 
use App\Models\PostImage;
use Illuminate\Support\Str;
use App\Http\Requests\CreatePostRequest;
use App\Models\archive;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    public function createPosts(CreatePostRequest $request)
    {
        $data = $request->validated();

        $post = auth()->user()->posts()->create([
            'title' => $data['title'],
            'description' => $data['description'],
        ]);

        if ($request->hasFile('images')) {
            $images = $request->file('images');

            foreach ($images as $image) {
                // Generate a unique filename for each image
                $filename = time() . '_' . $image->getClientOriginalName();

                // Move the image to the 'public' disk under the 'images' directory
                $image->storeAs('public/images', $filename);

                // Save the file path in the 'image_path' field in the 'post_images' table
                $imagePath = 'images/' . $filename;

                $post->images()->create(['image_path' => $imagePath]);
            }
        }

        return response(['post' => $post]);
    }


    public function getPosts()
    {
        $posts = posts::with('images')
            ->join('users', 'posts.user_id', '=', 'users.id')
            ->select('posts.*', 'users.name as author_name')
            ->where('posts.archived', false) 
            ->orderByRaw('GREATEST(posts.created_at, posts.updated_at) DESC')
            ->get();
    
        return response()->json($posts);
    }
    

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'images.*.file' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'images.*.id' => 'nullable|integer|exists:post_images,id',
        ]);
 
        if ($validator->fails()) {
            return response(['errors' => $validator->errors()], 400);
        }
        $post = posts::findOrFail($id);
        \Log::info('Request Data: ' . json_encode($request->all()));
    
        $post->title = $request->input('title');
        $post->description = $request->input('description');
        $post->save();
   
        \Log::info('Image IDs in request: ' . json_encode($request->input('images.*.id')));

       // Update or add images
       if ($request->hasFile('images')) {
        $images = $request->file('images');
        //limit to 3 images only
        $images = array_slice($images, 0, 3);

        foreach ($images as $index => $image) {
            if ($image->isValid()) {
                if ($request->has("imageIds.$index")) {
                    $postImage = PostImage::findOrFail($request->input("imageIds.$index"));
                    $filename = time() . '_' . $image->getClientOriginalName();
                    $imagePath = $image->storeAs('public/images', $filename);
                    $postImage->update(['image_path' => 'images/' . $filename]);
                } else {
                    $filename = time() . '_' . $image->getClientOriginalName();
                    $imagePath = $image->storeAs('public/images', $filename);
                    $postImage = new PostImage(['image_path' => 'images/' . $filename]);
                    $post->images()->save($postImage);
                }
            }
        }
    }

        $post->touch();
        $post->refresh();
        return response(['post' => $post->fresh()]);
    }
    
    
    
    public function archive(Request $request, $postId)
    {
        \Log::info('Archiving post. Post ID: ' . $postId);
        if (!$postId) {
            return response(['error' => 'Invalid post ID'], 400);
        }
    
        try {
            // Find the post to archive
            $post = posts::with('images')->findOrFail($postId);
    
            // Archive the post itself
            $post->archived = true;
            $post->save();
    
            foreach ($post->images as $image) {
                // Archive each associated image
                $image->archived = true;
                $image->save();
            }
    
            $archive = new archive;
            $archive->item_id = $post->id;
            $archive->item_name = $post->title; 
            $archive->item_type = class_basename($post);
            $archive->origin_table = $post->getTable();
            $archive->archiver_id = auth()->user()->id;
            $archive->archiver_name = auth()->user()->name;
            $archive->archiver_role = auth()->user()->role;
            $archive->save();
    
            return response(['message' => 'Post and images archived successfully'], 204);
        } catch (\Exception $e) {
            \Log::error('Error archiving the post: ' . $e->getMessage());
            return response(['error' => 'Error archiving the post'], 500);
        }
    }
    

       //count for dashboard
       public function count_posts()
       {
           $postCount = posts::count();
   
       return $postCount;
       }
}    