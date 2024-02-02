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
        Schema::create('classes', function (Blueprint $table) {
            $table->id('class_id');
            $table->string('class_code');
            $table->string('class_year');
            $table->string('semester');
            $table->string('course_code');
            $table->string('course_title');
            $table->smallInteger('units');
            $table->string('course_type');
            $table->string('class_section')->nullable();
            $table->string('instructor_name')->nullable();
            $table->boolean('archived')->default(false); // Add the 'archived' column <><>><>
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('classes');
    }
};
