<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePostsTable extends Migration
{
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained(); // Assuming a foreign key relationship with the 'users' table
            $table->string('title');
            $table->text('description');
            $table->string('slug')->unique(); // Unique slug for each post
            $table->timestamps();
            $table->boolean('archived')->default(false);
        });

        Schema::create('post_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('post_id')->constrained()->onDelete('cascade');
            $table->string('image_path');
            $table->timestamps();
            $table->boolean('archived')->default(false);
        });
    }

    public function down()
    {
        Schema::dropIfExists('post_images');
        Schema::dropIfExists('posts');
    }
}
