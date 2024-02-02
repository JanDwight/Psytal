<?php

use App\Models\instructor_profile;
use App\Models\student_profile;
use App\Models\classes;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
// use App\Models\instructor_profile;
// use App\Models\student_profile;
// use App\Models\classes;


return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('student_classes', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(student_profile::class, 'student_profile_id');
            $table->string('instructor_profile');
            $table->foreignIdFor(classes::class, 'class_id');
            $table->string('grade')->nullable();
            $table->tinyInteger('ongoing')->default(2);
            $table->tinyInteger('archived')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_classes');
    }
};
