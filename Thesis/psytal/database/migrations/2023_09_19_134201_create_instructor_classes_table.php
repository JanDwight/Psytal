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
        Schema::create('instructor_classes', function (Blueprint $table) {
            $table->id('instructor_class_id');
            $table->foreignId(\App\Models\instructor_profile::class, 'instructor_id');
            $table->foreignId(\App\Models\classes::class, 'class_id');
            $table->string('class_year');
            $table->string('semester');
            $table->string('class_code');
            $table->string('course_code');
            $table->string('course_title');
            $table->string('course_type');
            $table->string('class_section');
            $table->string('instructor_name');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('instructor_classes');
    }
};
