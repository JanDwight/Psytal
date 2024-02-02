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
        Schema::create('curricula', function (Blueprint $table) {
            $table->id();
            $table->string('class_year');
            $table->string('semester');
            $table->string('course_code');
            $table->string('course_title');
            $table->smallInteger('units');
            $table->integer('hoursperWeek');
            $table->string('course_type');
            $table->string('preReq'); //potentially na nullable
            $table->tinyInteger('archived')->default(0); // Add the 'archived' column <><>><>
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('curricula');
    }
};
