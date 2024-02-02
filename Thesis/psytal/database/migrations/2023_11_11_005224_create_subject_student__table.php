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
        Schema::create('classes_student_profile', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('student_profile_id')->unsigned()->index()->onDelete('cascade'); // Use the custom foreign key name
            $table->bigInteger('classes_class_id')->unsigned()->index()->onDelete('cascade'); // Use the custom foreign key name
            //add ->onDelete('cascade'); when working
            /*
            $table->bigInteger('student_profile_id')->unsigned()->index(); // Use the custom foreign key name
            $table->bigInteger('classes_class_id')->unsigned()->index(); // Use the custom foreign key name

            $table->foreign('student_profile_id')->references('id')->on('student_profiles')->onDelete('cascade');
            $table->foreign('classes_class_id')->references('id')->on('classes')->onDelete('cascade');
            
            */
            $table->string('class_code')->default('TBA');;
            $table->string('course_code')->default('TBA');;
            $table->string('course_title')->default('TBA');;
            $table->integer('units')->default(0);
            $table->integer('grade')->default(0); // Change data type based on what is needed
            $table->string('course_type')->default('n/a'); // Back course (bc), advanced course (ac) or n/a

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('classes_student_profile');
    }
};
