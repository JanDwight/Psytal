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
        Schema::create('student_profiles', function (Blueprint $table) {
            $table->id('student_profile_id');
            //$table->id('studentprofile_id');
            $table->foreignId('user_id')->onDelete('cascade');
            $table->integer('start_of_school_year')->nullable();
            $table->integer('end_of_school_year')->nullable();
            $table->bigInteger('student_school_id')->nullable();
            $table->bigInteger('learners_reference_number')->nullable();
            $table->string('last_name')->nullable();
            $table->string('first_name')->nullable();
            $table->string('middle_name')->nullable();
            $table->string('maiden_name')->nullable();
            $table->string('type_of_student')->nullable();
            $table->string('year_level')->nullable();
            $table->string('academic_classification')->nullable();
            $table->string('last_school_attended')->nullable();
            $table->string('address_of_school_attended')->nullable();
            $table->string('degree')->nullable();
            $table->string('major')->nullable();
            $table->string('candidate_for_graduation')->nullable();
            $table->string('end_of_term_to_finnish_degree')->nullable();
            $table->string('last_of_term_to_finnish_degree')->nullable();
            $table->date('date_of_birth')->nullable();
            $table->string('citizenship')->nullable();
            $table->string('ethnicity')->nullable();
            $table->bigInteger('contact_number')->nullable();
            $table->string('place_of_birth')->nullable();
            $table->string('sex_at_birth')->nullable();
            $table->string('special_needs')->nullable();
            $table->string('email_address')->nullable();
            $table->string('home_address')->nullable();
            $table->string('address_while_studying')->nullable();
            $table->string('contact_person_name')->nullable();
            $table->bigInteger('contact_person_number')->nullable();
            $table->string('contact_person_address')->nullable();
            $table->string('contact_person_relationship')->nullable();
            $table->string('section')->nullable();
            $table->timestamps();
            $table->string('pre_reg_status')->nullable();
            $table->integer('archived');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_profiles');
    }
};
