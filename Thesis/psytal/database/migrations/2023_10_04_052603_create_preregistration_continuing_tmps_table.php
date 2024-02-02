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
        Schema::create('preregistration_continuing_tmps', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->integer('start_of_school_year');
            $table->integer('end_of_school_year');
            $table->string('last_name');
            $table->string('first_name');
            $table->string('middle_name');
            $table->string('maiden_name')->nullable();
            $table->string('type_of_student')->nullable();
            $table->string('year_level');
            $table->string('degree');
            $table->string('major');
            $table->string('candidate_for_graduation');
            $table->string('end_of_term_to_finnish_degree');
            $table->string('last_of_term_to_finnish_degree');
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
            $table->string('section')->nullable();
            $table->integer('class_year')->nullable();
            $table->boolean('health_facility_registered')->nullable();
            $table->boolean('depended_on_parents_health_facility')->nullable();
            $table->string('vaccination_status')->nullable();
            $table->string('digital_communication_and_literacy')->nullable();
            $table->string('level_of_digital_literacy')->nullable();
            $table->boolean('avail_free_higher_education')->nullable();
            $table->boolean('voluntarily_contribute')->nullable();
            $table->string('amount')->nullable();
            $table->timestamps();
            $table->string('pre_reg_status')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('preregistration_continuing_tmps');
    }
};
