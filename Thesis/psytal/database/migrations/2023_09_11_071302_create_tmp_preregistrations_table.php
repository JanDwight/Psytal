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
        Schema::create('tmp_preregistrations', function (Blueprint $table) {
            $table->id('student_profile_id');
            $table->string('type_of_student');
            $table->boolean('candidate_for_graduation');
            $table->string('end_of_term_to_finnish_degree')->nullable();
            $table->string('term');
            $table->integer('start_of_school_year');
            $table->integer('end_of_school_year');
            $table->string('year_level');
            $table->integer('student_school_id');
            $table->integer('learners_reference_number');
            $table->string('degree');
            $table->string('major');
            $table->string('status');
            $table->string('family_name');
            $table->string('given_name');
            $table->string('middle_name');
            $table->string('maiden_name')->nullable();
            $table->date('date_of_birth');
            $table->string('nationality');
            $table->string('home_address');
            $table->string('address_while_studying');
            $table->integer('contact_number');
            $table->string('email_address');
            $table->string('contact_person_name');
            $table->integer('contact_person_number');
            $table->string('contact_person_address');
            $table->string('contact_person_relationship');
            $table->string('section')->nullable();
            $table->string('image');
            $table->integer('class_year');
            $table->string('last_school_attended');
            $table->timestamps();
            $table->string('pre_reg_status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tmp_preregistrations');
    }
};
