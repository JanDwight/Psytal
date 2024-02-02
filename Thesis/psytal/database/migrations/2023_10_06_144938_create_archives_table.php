<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('archives', function (Blueprint $table) {
            //mostly for testing, redo migration later
            $table->id();
            $table->string('item_id');  //
            $table->string('item_name'); // Add 'item_name' column
            $table->string('item_type');
            $table->string('origin_table');
            $table->unsignedBigInteger('archiver_id'); // Use 'unsignedBigInteger' for foreign keys
            $table->string('archiver_name'); // for user_name
            $table->string('archiver_role'); // Add 'user_role' column
            $table->timestamps();

            // Define the foreign key constraint
            $table->foreign('archiver_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('archives');
    }
};
