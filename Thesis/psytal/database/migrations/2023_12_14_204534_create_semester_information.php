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
        Schema::create('semester_information', function (Blueprint $table) {
            $table->id();
            $table->string('start_of_prereg')->nullable();
            $table->string('end_of_prereg')->nullable();
            $table->string('start_of_semester')->nullable();
            $table->string('end_of_semester')->nullable();
            $table->string('start_of_school_year');
            $table->string('end_of_school_year');
            $table->string('semester')->nullable();
            $table->boolean('open_pre_reg');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('semester_information');
    }
};
