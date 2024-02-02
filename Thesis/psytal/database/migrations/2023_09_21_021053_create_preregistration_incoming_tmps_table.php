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
        Schema::create('preregistration_incoming_tmps', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id');
            $table->integer('start_of_school_year');
            $table->integer('end_of_school_year');
            $table->bigInteger('student_school_id')->nullable();
            $table->bigInteger('learners_reference_number')->nullable();
            $table->string('last_name');
            $table->string('first_name');
            $table->string('middle_name');
            $table->string('maiden_name')->nullable();
            $table->string('type_of_student')->nullable();
            $table->string('year_level')->nullable();
            $table->string('academic_classification')->nullable();
            $table->string('last_school_attended')->nullable();
            $table->string('address_of_school_attended')->nullable();
            $table->string('degree');
            $table->string('major')->nullable();
            $table->string('candidate_for_graduation')->nullable();
            $table->string('end_of_term_to_finnish_degree')->nullable();
            $table->string('last_of_term_to_finnish_degree')->nullable();
            $table->date('date_of_birth');
            $table->string('citizenship');
            $table->string('ethnicity');
            $table->bigInteger('contact_number');
            $table->string('place_of_birth');
            $table->string('sex_at_birth');
            $table->string('special_needs')->nullable();
            $table->string('email_address');
            $table->string('home_address');
            $table->string('address_while_studying');
            $table->string('contact_person_name');
            $table->bigInteger('contact_person_number');
            $table->string('contact_person_address');
            $table->string('contact_person_relationship');
            $table->string("health_facility_registered");
            $table->string('parent_health_facility_dependent');
            $table->string('vaccination_status');
            $table->string('technology_level');
            $table->string('digital_literacy');
            $table->string('avail_free_higher_education');
            $table->string('voluntary_contribution');
            $table->string('contribution_amount');
            $table->string('complied_to_admission_policy');
            $table->string('section')->nullable();
            $table->timestamps();
            $table->string('pre_reg_status')->nullable();
            $table->string('student_status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('preregistration_incoming_tmps');
    }
};
