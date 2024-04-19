<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        //
        $users = [
            [
                'id' => 82,
                'name' => 'Admin',
                'password' => '$2y$10$YOmO1o82p8a05a1lJxxGyeVVfYXEMdKbZQ5Ink9jqIYyYnqJFA2lm', // Hashed password
                'role' => 1,
                'email' => 'admin@gmail.com',
                'archived' => 0,
                'created_at' => null, // Let Laravel handle timestamps
                'updated_at' => null,
            ],
            [
                'id' => 83,
                'name' => 'Staff',
                'password' => '$2y$10$WcYazSdUzVNS8Q1QAyWwUuQi.JgtyGJPKdtT0TTw8dS.K08PtzX2a', // Hashed password
                'role' => 2,
                'email' => 'staff@gmail.com',
                'archived' => 0,
                'created_at' => null,
                'updated_at' => null,
            ],
            [
                'id' => 84,
                'name' => 'Instructor',
                'password' => '$2y$10$vjkDK/szd.NswOtgdIZsIe2nDHlgPlpjerikbvQJfY59p.7XVaEae', // Hashed password
                'role' => 3,
                'email' => 'instructor@gmail.com',
                'archived' => 0,
                'created_at' => null,
                'updated_at' => null,
            ],
            [
                'id' => 85,
                'name' => 'Student',
                'password' => '$2y$10$qB0RQ9oVhyqs5opPSChTCOWPcEwXuaaMzyFhr8zkA62nvbcl2uwp.', // Hashed password
                'role' => 4,
                'email' => 'student@gmail.com',
                'archived' => 0,
                'created_at' => null,
                'updated_at' => null,
            ],
            [
                'id' => 86,
                'name' => 'newstudent',
                'password' => '$2y$10$wt9jHpHkcWLT6PR1W952M.7ByMpORxT6pZo1NxqS1yLLeeUC4hBWi', // Hashed password
                'role' => 4,
                'email' => 'new5@gmail.com',
                'archived' => 0,
                'created_at' => '2023-09-25 01:23:39',
                'updated_at' => '2023-09-25 01:23:39',
            ],
            [
                'id' => 87,
                'name' => 'student555',
                'password' => '$2y$10$/UkIHbgiOeL66M7OdU0ay.QudmaLbjKzIck43t50iofKPAgnC6U9W', // Hashed password
                'role' => 4,
                'email' => 'student5@gmail.com',
                'archived' => 0,
                'created_at' => '2023-09-29 06:31:30',
                'updated_at' => '2023-09-29 07:18:50',
            ],
            [
                'id' => 88,
                'name' => 'Mar T. Leo',
                'password' => '$2y$10$mm6C6glmEToIjeKAjJGOWeSoDkLZBPJRS59gGd7wcuut2BU8cJMxq', // Hashed password
                'role' => 1,
                'email' => 'martleo@gmail.com',
                'archived' => 0,
                'created_at' => '2023-09-29 07:09:32',
                'updated_at' => '2023-09-29 07:09:32',
            ],
            [
                'id' => 89,
                'name' => 'Prof X',
                'password' => '$2y$10$7.ASjd37Vc1WqVvegINNDOVRy/0Zc38Ey1Shuszj06452laoGdSHq', // Hashed password
                'role' => 3,
                'email' => 'profx@abc.com',
                'archived' => 0,
                'created_at' => '2023-11-22 03:41:25',
                'updated_at' => '2023-11-22 03:41:25',
            ],
        ];

        DB::table('users')->insert($users);
  

        $links = [
        [
            'class_code' => 'FB - Department of Psychology',
            'class_description' => 'Official Facebook Page of the Dep. of Psychology	',
            'instructor_name' => 'css.psychology@bsu.edu.ph',
            'url'=>'https://www.facebook.com/psychologybsu',
            'archived' => '0'

        ],
        [

            'class_code' => 'FB - College of Social Sciences',
            'class_description' => 'Official Facebook Page of CSS	',
            'instructor_name' => 'cas.socialsciences@bsu.edu.ph',
            'url'=>'https://www.facebook.com/profile.php?id=100064041580505',
            'archived' => '0'

        ],
        [

            'class_code' => 'University Registrar - BSU La Trinidad',
            'class_description' => 'Official Facebook Page of the University Registrar - BSU',
            'instructor_name' => 'registrar@bsu.edu.ph',
            'url'=>'https://www.facebook.com/ourbsulatrinidadcampus',
            'archived' => '0'

        ],
        [

            'class_code' => 'FB - College of Social Sciences - SG',
            'class_description' => 'Official Facebook Page of CSS - SG',
            'instructor_name' => 'TBA',
            'url'=>'https://www.facebook.com/profile.php?id=100095519648352',
            'archived' => '0'

        ],
        [

            'class_code' => 'BSU Office of Student Services',
            'class_description' => 'FB - Official Facebook page of BSU Office of Student Services',
            'instructor_name' => 'oss.director@bsu.edu.ph',
            'url'=>'https://www.facebook.com/BSU.OSS.LTB',
            'archived' => '0'

        ],
        [

            'class_code' => 'FB - CIS -The Hyperlink',
            'class_description' => 'Official student publication of the College of Information Sciences.',
            'instructor_name' => 'TBA',
            'url'=>'https://www.facebook.com/profile.php?id=61551883948704',
            'archived' => '0'

        ],
        [

            'class_code' => 'Benguet State University',
            'class_description' => 'Official Website of BSU',
            'instructor_name' => 'University President - Comila, Felipe Salaing',
            'url'=>'http://www.bsu.edu.ph/',
            'archived' => '0'

        ],
        ];
        DB::table('links')->insert($links);

        $curriculum = [
        [
            'class_year' => '1st',
            'semester' => '1st',
            'course_code' => 'Psych 101	',
            'course_title' => 'Introduction to Psychology',
            'units' => '3',
            'hoursperWeek' => '3',
            'course_type' => 'Lec',
            'preReq' => 'N/A',
            'curriculum_code' => 'curriculum20192023',
            'validity' => '2024-2025'
        ],

        [
            'class_year' => '1st',
            'semester' => '1st',
            'course_code' => 'SS 21',
            'course_title' => 'Understanding the Self',
            'units' => '3',
            'hoursperWeek' => '3',
            'course_type' => 'Lec',
            'preReq' => 'N/A',
            'curriculum_code' => 'curriculum20192023',
            'validity' => '2024-2025'
        ],

        [
            'class_year' => '1st',
            'semester' => '1st',
            'course_code' => 'Eng 21',
            'course_title' => 'Purposive Communication',
            'units' => '3',
            'hoursperWeek' => '3',
            'course_type' => 'Lec',
            'preReq' => 'N/A',
            'curriculum_code' => 'curriculum20242025',
            'validity' => '2024-2025'
        ],

        [
            'class_year' => '1st',
            'semester' => '1st',
            'course_code' => 'Eng 21',
            'course_title' => 'Contemporary World',
            'units' => '3',
            'hoursperWeek' => '3',
            'course_type' => 'Lec',
            'preReq' => 'N/A',
            'curriculum_code' => 'curriculum20242025',
            'validity' => '2024-2025'
        ],

        [
            'class_year' => '1st',
            'semester' => '1st',
            'course_code' => 'Math 21',
            'course_title' => 'Mathematics in the Modern Word',
            'units' => '3',
            'hoursperWeek' => '3',
            'course_type' => 'Lec',
            'preReq' => 'N/A',
            'curriculum_code' => 'curriculum20242025',
            'validity' => '2024-2025'
        ],

        [
            'class_year' => '1st',
            'semester' => '1st',
            'course_code' => 'SS 24',
            'course_title' => 'Ethics',
            'units' => '3',
            'hoursperWeek' => '3',
            'course_type' => 'Lec',
            'preReq' => 'N/A',
            'curriculum_code' => 'curriculum20242025',
            'validity' => '2024-2025'
        ],

        [
            'class_year' => '1st',
            'semester' => '1st',
            'course_code' => 'PATHFIT 1',
            'course_title' => 'Movement Competency Training',
            'units' => '2',
            'hoursperWeek' => '2',
            'course_type' => 'Lec',
            'preReq' => 'N/A',
            'curriculum_code' => 'curriculum20242025',
            'validity' => '2024-2025'
        ],

        [
            'class_year' => '1st',
            'semester' => '1st',
            'course_code' => 'NSTP 21',
            'course_title' => 'National Service Training Program 1',
            'units' => '3',
            'hoursperWeek' => '3',
            'course_type' => 'Lec',
            'preReq' => 'N/A',
            'curriculum_code' => 'curriculum20242025',
            'validity' => '2024-2025'
        ],

        [
            'class_year' => '1st',
            'semester' => '2nd',
            'course_code' => 'SSP 22',
            'course_title' => 'Philippine Indigenous Communities',
            'units' => '3',
            'hoursperWeek' => '3',
            'course_type' => 'Lec',
            'preReq' => 'N/A',
            'curriculum_code' => 'curriculum20242025',
            'validity' => '2024-2025'
        ],
        [
            'class_year' => '1st',
            'semester' => '2nd',
            'course_code' => 'SS 22',
            'course_title' => 'Readings in Philippine History',
            'units' => '3',
            'hoursperWeek' => '3',
            'course_type' => 'Lec',
            'preReq' => 'N/A',
            'curriculum_code' => 'curriculum20242025',
            'validity' => '2024-2025'
        ],
        [
            'class_year' => '1st',
            'semester' => '2nd',
            'course_code' => 'Psych 102',
            'course_title' => 'Theories of Personality',
            'units' => '3',
            'hoursperWeek' => '3',
            'course_type' => 'Lec',
            'preReq' => 'Psych 101',
            'curriculum_code' => 'curriculum20242025',
            'validity' => '2024-2025'
        ],
        [
            'class_year' => '1st',
            'semester' => '2nd',
            'course_code' => 'Art 21',
            'course_title' => 'Art Appreciation',
            'units' => '3',
            'hoursperWeek' => '3',
            'course_type' => 'Lec',
            'preReq' => 'N/A',
            'curriculum_code' => 'curriculum20242025',
            'validity' => '2024-2025'
        ],
        [
            'class_year' => '1st',
            'semester' => '2nd',
            'course_code' => 'STS 21',
            'course_title' => 'Science Technology and Society',
            'units' => '3',
            'hoursperWeek' => '3',
            'course_type' => 'Lec',
            'preReq' => 'N/A',
            'curriculum_code' => 'curriculum20242025',
            'validity' => '2024-2025'
        ],
        [
            'class_year' => '1st',
            'semester' => '2nd',
            'course_code' => 'Chem 12',
            'course_title' => 'Organic Chemistry (Lecture)',
            'units' => '3',
            'hoursperWeek' => '3',
            'course_type' => 'Lec',
            'preReq' => 'N/A',
            'curriculum_code' => 'curriculum20242025',
            'validity' => '2024-2025'
        ],
        [
            'class_year' => '1st',
            'semester' => '2nd',
            'course_code' => 'Chem 12.1',
            'course_title' => 'Organic Chemistry (Laboratory)',
            'units' => '2',
            'hoursperWeek' => '6',
            'course_type' => 'Lab',
            'preReq' => 'N/A',
            'curriculum_code' => 'curriculum20242025',
            'validity' => '2024-2025'
        ],
        [
            'class_year' => '1st',
            'semester' => '2nd',
            'course_code' => 'PATHFIT 2',
            'course_title' => 'Exercise-based Fitness Activities',
            'units' => '2',
            'hoursperWeek' => '2',
            'course_type' => 'Lec',
            'preReq' => 'N/A',
            'curriculum_code' => 'curriculum20242025',
            'validity' => '2024-2025'
        ],
        [
            'class_year' => '1st',
            'semester' => '2nd',
            'course_code' => 'NSTP 22',
            'course_title' => 'National Service Training Program II',
            'units' => '3',
            'hoursperWeek' => '3',
            'course_type' => 'Lec',
            'preReq' => 'NSTP 21',
            'curriculum_code' => 'curriculum20242025',
            'validity' => '2024-2025'
        ],
        [
            'class_year' => '2nd',
            'semester' => '1st',
            'course_code' => 'Psych 103',
            'course_title' => 'Developmental Psychology',
            'units' => '3',
            'hoursperWeek' => '3',
            'course_type' => 'Lec',
            'preReq' => 'Psych 102',
            'curriculum_code' => 'curriculum20242025',
            'validity' => '2024-2025'
        ],
        [
            'class_year' => '2nd',
            'semester' => '1st',
            'course_code' => 'Psych 104',
            'course_title' => 'Biological Psychology',
            'units' => '3',
            'hoursperWeek' => '3',
            'course_type' => 'Lec',
            'preReq' => 'Psych 102',
            'curriculum_code' => 'curriculum20242025',
            'validity' => '2024-2025'
        ],
        [
            'class_year' => '2nd',
            'semester' => '1st',
            'course_code' => 'Psych 105',
            'course_title' => 'Psychological Statistics',
            'units' => '3',
            'hoursperWeek' => '3',
            'course_type' => 'Lec',
            'preReq' => 'Psych 102',
            'curriculum_code' => 'curriculum20242025',
            'validity' => '2024-2025'
        ],
        [
            'class_year' => '2nd',
            'semester' => '1st',
            'course_code' => 'Psych 105',
            'course_title' => 'Psychological Statistics',
            'units' => '2',
            'hoursperWeek' => '6',
            'course_type' => 'Lab',
            'preReq' => 'Psych 102',
            'curriculum_code' => 'curriculum20242025',
            'validity' => '2024-2025'
        ],
        [
            'class_year' => '2nd',
            'semester' => '1st',
            'course_code' => 'Psych 111',
            'course_title' => 'Social Psychology',
            'units' => '3',
            'hoursperWeek' => '3',
            'course_type' => 'Lec',
            'preReq' => 'Psych 102',
            'curriculum_code' => 'curriculum20242025',
            'validity' => '2024-2025'
        ],
        [
            'class_year' => '2nd',
            'semester' => '1st',
            'course_code' => 'Chem 40',
            'course_title' => 'BioChemistry (Lec)',
            'units' => '3',
            'hoursperWeek' => '3',
            'course_type' => 'Lec',
            'preReq' => 'Chem 12',
            'curriculum_code' => 'curriculum20242025',
            'validity' => '2024-2025'
        ],
        [
            'class_year' => '2nd',
            'semester' => '1st',
            'course_code' => 'Chem 40.1',
            'course_title' => 'BioChemistry (Lab)',
            'units' => '2',
            'hoursperWeek' => '6',
            'course_type' => 'Lab',
            'preReq' => 'Chem 12.1',
            'curriculum_code' => 'curriculum20242025',
            'validity' => '2024-2025'
        ],
        
        [
            'class_year' => '2nd',
            'semester' => '1st',
            'course_code' => 'AH 22',
            'course_title' => 'Philippine Popular Culture',
            'units' => '3',
            'hoursperWeek' => '3',
            'course_type' => 'Lec',
            'preReq' => 'N/A',
            'curriculum_code' => 'curriculum20242025',
            'validity' => '2024-2025'
        ],
        [
            'class_year' => '2nd',
            'semester' => '1st',
            'course_code' => 'PATHFIT 3',
            'course_title' => 'Sports Based Course 1',
            'units' => '2',
            'hoursperWeek' => '2',
            'course_type' => 'Lec',
            'preReq' => 'N/A',
            'curriculum_code' => 'curriculum20242025',
            'validity' => '2024-2025'
        ],
        [
            'class_year' => '2nd',
            'semester' => '2nd',
            'course_code' => 'Psych 106',
            'course_title' => 'Psychological Assessment',
            'units' => '3',
            'hoursperWeek' => '3',
            'course_type' => 'Lec',
            'preReq' => 'Psych 103 , Psych 105',
            'curriculum_code' => 'curriculum20242025',
            'validity' => '2024-2025'
        ],
        [
            'class_year' => '2nd',
            'semester' => '2nd',
            'course_code' => 'Psych 114',
            'course_title' => 'Positive Psychology',
            'units' => '3',
            'hoursperWeek' => '3',
            'course_type' => 'Lec',
            'preReq' => 'Psych 102',
            'curriculum_code' => 'curriculum20242025',
            'validity' => '2024-2025'
        ],
        [
            'class_year' => '2nd',
            'semester' => '2nd',
            'course_code' => 'Psych 109',
            'course_title' => 'Abnormal Psychology',
            'units' => '3',
            'hoursperWeek' => '3',
            'course_type' => 'Lec',
            'preReq' => 'Psych 102',
            'curriculum_code' => 'curriculum20242025',
            'validity' => '2024-2025'
        ],
        [
            'class_year' => '2nd',
            'semester' => '2nd',
            'course_code' => 'Bio 38',
            'course_title' => 'Human Anatomy and Physiology (Lec)',
            'units' => '3',
            'hoursperWeek' => '3',
            'course_type' => 'Lec',
            'preReq' => 'N/A',
            'curriculum_code' => 'curriculum20242025',
            'validity' => '2024-2025'
        ],
        [
            'class_year' => '2nd',
            'semester' => '2nd',
            'course_code' => 'Bio 38.1',
            'course_title' => 'Human Anatomy and Physiology (Lab)',
            'units' => '2',
            'hoursperWeek' => '6',
            'course_type' => 'Lab',
            'preReq' => 'N/A',
            'curriculum_code' => 'curriculum20242025',
            'validity' => '2024-2025'
        ],
        [
            'class_year' => '2nd',
            'semester' => '2nd',
            'course_code' => 'Psych 108',
            'course_title' => 'Industrial/Organizational Psych',
            'units' => '3',
            'hoursperWeek' => '2',
            'course_type' => 'Lec',
            'preReq' => 'Psych 102',
            'curriculum_code' => 'curriculum20242025',
            'validity' => '2024-2025'
        ],
        [
            'class_year' => '2nd',
            'semester' => '2nd',
            'course_code' => 'AH 23',
            'course_title' => 'Indigenous Creative Crafts',
            'units' => '3',
            'hoursperWeek' => '3',
            'course_type' => 'Lec',
            'preReq' => 'N/A',
            'curriculum_code' => 'curriculum20242025',
            'validity' => '2024-2025'
        ],
        [
            'class_year' => '2nd',
            'semester' => '2nd',
            'course_code' => 'PATHFIT 4',
            'course_title' => 'Sports Based Course 2',
            'units' => '2',
            'hoursperWeek' => '2',
            'course_type' => 'Lec',
            'preReq' => 'N/A',
            'curriculum_code' => 'curriculum20242025',
            'validity' => '2024-2025'
        ],
        [
            'class_year' => '2nd',
            'semester' => '2nd',
            'course_code' => 'Psych 114',
            'course_title' => 'Positive Psychology',
            'units' => '3',
            'hoursperWeek' => '3',
            'course_type' => 'Lec',
            'preReq' => 'Psych 102',
            'curriculum_code' => 'curriculum20242025',
            'validity' => '2024-2025'
        ],
        [
            'class_year' => '3rd',
            'semester' => '1st',
            'course_code' => 'Psych 117',
            'course_title' => 'Cordillera Psychology',
            'units' => '3',
            'hoursperWeek' => '3',
            'course_type' => 'Lec',
            'preReq' => 'Psych 102',
            'curriculum_code' => 'curriculum20242025',
            'validity' => '2024-2025'
        ],
        [
            'class_year' => '3rd',
            'semester' => '1st',
            'course_code' => 'Cordi 101',
            'course_title' => 'Cordillera: History and Socio-Cultural Heritage',
            'units' => '3',
            'hoursperWeek' => '3',
            'course_type' => 'Lec',
            'preReq' => 'N/A',
            'curriculum_code' => 'curriculum20242025',
            'validity' => '2024-2025'
        ],
        [
            'class_year' => '3rd',
            'semester' => '1st',
            'course_code' => 'Psych 107',
            'course_title' => 'Sikolohiyang Pilipino',
            'units' => '3',
            'hoursperWeek' => '3',
            'course_type' => 'Lec',
            'preReq' => 'Psych 102',
            'curriculum_code' => 'curriculum20242025',
            'validity' => '2024-2025'
        ],
        [
            'class_year' => '3rd',
            'semester' => '1st',
            'course_code' => 'Psych 119',
            'course_title' => 'Community Health Psychology',
            'units' => '3',
            'hoursperWeek' => '3',
            'course_type' => 'Lec',
            'preReq' => 'Psych 102',
            'curriculum_code' => 'curriculum20242025',
            'validity' => '2024-2025'
        ],
        [
            'class_year' => '3rd',
            'semester' => '1st',
            'course_code' => 'Bio 32',
            'course_title' => 'Fundemantals of Genetics (Lec)',
            'units' => '3',
            'hoursperWeek' => '3',
            'course_type' => 'Lec',
            'preReq' => 'Bio 38 & Bio 38.1',
            'curriculum_code' => 'curriculum20242025',
            'validity' => '2024-2025'
        ],
        [
            'class_year' => '3rd',
            'semester' => '1st',
            'course_code' => 'Bio 32.1',
            'course_title' => 'Fundamentals of Genetics (Lab)',
            'units' => '2',
            'hoursperWeek' => '6',
            'course_type' => 'Lab',
            'preReq' => 'Bio 38 & Bio 38.1',
            'curriculum_code' => 'curriculum20242025',
            'validity' => '2024-2025'
        ],
        [
            'class_year' => '3rd',
            'semester' => '1st',
            'course_code' => 'Pl 21',
            'course_title' => 'Life and Works of Rizal',
            'units' => '3',
            'hoursperWeek' => '3',
            'course_type' => 'Lec',
            'preReq' => 'N/A',
            'curriculum_code' => 'curriculum20242025',
            'validity' => '2024-2025'
        ],
        [
            'class_year' => '3rd',
            'semester' => '2nd',
            'course_code' => 'Psych 110',
            'course_title' => 'Experimental Psychology',
            'units' => '3',
            'hoursperWeek' => '3',
            'course_type' => 'Lec',
            'preReq' => 'Psych 102',
            'curriculum_code' => 'curriculum20242025',
            'validity' => '2024-2025'
        ],
        [
            'class_year' => '3rd',
            'semester' => '2nd',
            'course_code' => 'Psych 110',
            'course_title' => 'Experimental Psychology',
            'units' => '2',
            'hoursperWeek' => '6',
            'course_type' => 'Lab',
            'preReq' => 'Psych 102',
            'curriculum_code' => 'curriculum20242025',
            'validity' => '2024-2025'
        ],
        [
            'class_year' => '3rd',
            'semester' => '2nd',
            'course_code' => 'Psych 108',
            'course_title' => 'Field Methods in Psychology',
            'units' => '3',
            'hoursperWeek' => '3',
            'course_type' => 'Lec',
            'preReq' => 'Psych 102, 105, 106, 107',
            'curriculum_code' => 'curriculum20242025',
            'validity' => '2024-2025'
        ],
        [
            'class_year' => '3rd',
            'semester' => '2nd',
            'course_code' => 'Psych 108',
            'course_title' => 'Field Methods in Psychology',
            'units' => '2',
            'hoursperWeek' => '6',
            'course_type' => 'Lab',
            'preReq' => 'Psych 108, 109',
            'curriculum_code' => 'curriculum20242025',
            'validity' => '2024-2025'
        ],
        [
            'class_year' => '3rd',
            'semester' => '2nd',
            'course_code' => 'Psych 115',
            'course_title' => 'Introduction to Counseling',
            'units' => '3',
            'hoursperWeek' => '3',
            'course_type' => 'Lec',
            'preReq' => 'Psych 108, 109',
            'curriculum_code' => 'curriculum20242025',
            'validity' => '2024-2025'
        ],
        [
            'class_year' => '3rd',
            'semester' => '2nd',
            'course_code' => 'Psych 112',
            'course_title' => 'Cognitive Psychology',
            'units' => '3',
            'hoursperWeek' => '3',
            'course_type' => 'Lec',
            'preReq' => 'Psych 101',
            'curriculum_code' => 'curriculum20242025',
            'validity' => '2024-2025'
        ],
        [
            'class_year' => '3rd',
            'semester' => '2nd',
            'course_code' => 'Psych 118',
            'course_title' => 'Special Topics in Psychology',
            'units' => '3',
            'hoursperWeek' => '3',
            'course_type' => 'Lec',
            'preReq' => 'Psych 102',
            'curriculum_code' => 'curriculum20242025',
            'validity' => '2024-2025'
        ],
        [
            'class_year' => '3rd',
            'semester' => '2nd',
            'course_code' => 'Philo 101',
            'course_title' => 'Philosophy of Science',
            'units' => '3',
            'hoursperWeek' => '3',
            'course_type' => 'Lec',
            'preReq' => 'N/A',
            'curriculum_code' => 'curriculum20242025',
            'validity' => '2024-2025'
        ],
        [
            'class_year' => '3rd',
            'semester' => '2nd',
            'course_code' => 'Local Lang',
            'course_title' => 'Local Language',
            'units' => '3',
            'hoursperWeek' => '3',
            'course_type' => 'Lec',
            'preReq' => 'N/A',
            'curriculum_code' => 'curriculum20242025',
            'validity' => '2024-2025'
        ],
        [
            'class_year' => '3rd',
            'semester' => 'Midyear',
            'course_code' => 'Psych 199',
            'course_title' => 'Practicum in Psychology (160 hours)',
            'units' => '3',
            'hoursperWeek' => '27',
            'course_type' => 'Lec',
            'preReq' => 'N/A',
            'curriculum_code' => 'curriculum20242025',
            'validity' => '2024-2025'
        ],
        [
            'class_year' => '4th',
            'semester' => '1st',
            'course_code' => 'Psych 200 A',
            'course_title' => 'Thesis 1',
            'units' => '3',
            'hoursperWeek' => '3',
            'course_type' => 'Lec',
            'preReq' => 'All Major Courses',
            'curriculum_code' => 'curriculum20242025',
            'validity' => '2024-2025'
        ],
        [
            'class_year' => '4th',
            'semester' => '2nd',
            'course_code' => 'Psych 200 B',
            'course_title' => 'Thesis 2',
            'units' => '3',
            'hoursperWeek' => '3',
            'course_type' => 'Lec',
            'preReq' => 'Psych 200 A',
            'curriculum_code' => 'curriculum20242025',
            'validity' => '2024-2025'
        ]
        ];
        DB::table('curricula')->insert($curriculum);

        $classes = [
            [
                'class_code' => 'TBA',
                'class_year' => '1st',
                'semester' => '1st',
                'course_code' => 'Psych 101	',
                'course_title' => 'Introduction to Psychology',
                'units' => '3',
                'course_type' => 'Lec',
                'class_section' => 'TBA',
                'instructor_name' => 'TBA',
                'curriculum_code' => 'curriculum20192023'
            ],
    
            [
                'class_code' => 'TBA',
                'class_year' => '1st',
                'semester' => '1st',
                'course_code' => 'SS 21',
                'course_title' => 'Understanding the Self',
                'units' => '3',
                'course_type' => 'Lec',
                'class_section' => 'TBA',
                'instructor_name' => 'TBA',
                'curriculum_code' => 'curriculum20192023'
            ],
    
            [
                'class_code' => 'TBA',
                'class_year' => '1st',
                'semester' => '1st',
                'course_code' => 'Eng 21',
                'course_title' => 'Purposive Communication',
                'units' => '3',
                'course_type' => 'Lec',
                'class_section' => 'TBA',
                'instructor_name' => 'TBA',
                'curriculum_code' => 'curriculum20242025'
            ],
    
            [
                'class_code' => 'TBA',
                'class_year' => '1st',
                'semester' => '1st',
                'course_code' => 'Eng 21',
                'course_title' => 'Contemporary World',
                'units' => '3',
                'course_type' => 'Lec',
                'class_section' => 'TBA',
                'instructor_name' => 'TBA',
                'curriculum_code' => 'curriculum20242025'
            ],
    
            [
                'class_code' => 'TBA',
                'class_year' => '1st',
                'semester' => '1st',
                'course_code' => 'Math 21',
                'course_title' => 'Mathematics in the Modern Word',
                'units' => '3',
                'course_type' => 'Lec',
                'class_section' => 'TBA',
                'instructor_name' => 'TBA',
                'curriculum_code' => 'curriculum20242025'
            ],
    
            [
                'class_code' => 'TBA',
                'class_year' => '1st',
                'semester' => '1st',
                'course_code' => 'SS 24',
                'course_title' => 'Ethics',
                'units' => '3',
                'course_type' => 'Lec',
                'class_section' => 'TBA',
                'instructor_name' => 'TBA',
                'curriculum_code' => 'curriculum20242025'
            ],
    
            [
                'class_code' => 'TBA',
                'class_year' => '1st',
                'semester' => '1st',
                'course_code' => 'PATHFIT 1',
                'course_title' => 'Movement Competency Training',
                'units' => '2',
                'course_type' => 'Lec',
                'class_section' => 'TBA',
                'instructor_name' => 'TBA',
                'curriculum_code' => 'curriculum20242025'
            ],
    
            [
                'class_code' => 'TBA',
                'class_year' => '1st',
                'semester' => '1st',
                'course_code' => 'NSTP 21',
                'course_title' => 'National Service Training Program 1',
                'units' => '3',
                'course_type' => 'Lec',
                'class_section' => 'TBA',
                'instructor_name' => 'TBA',
                'curriculum_code' => 'curriculum20242025'
            ],

            [
                'class_code' => 'TBA',
                'class_year' => '1st',
                'semester' => '2nd',
                'course_code' => 'SSP 22',
                'course_title' => 'Philippine Indigenous Communities',
                'units' => '3',
                'course_type' => 'Lec',
                'class_section' => 'TBA',
                'instructor_name' => 'TBA',
                'curriculum_code' => 'curriculum20242025'
            ],
    
            [
                'class_code' => 'TBA',
                'class_year' => '1st',
                'semester' => '2nd',
                'course_code' => 'SS 22',
                'course_title' => 'Readings in Philippine History',
                'units' => '3',
                'course_type' => 'Lec',
                'class_section' => 'TBA',
                'instructor_name' => 'TBA',
                'curriculum_code' => 'curriculum20242025'
            ],
    
            [
                'class_code' => 'TBA',
                'class_year' => '1st',
                'semester' => '2nd',
                'course_code' => 'Psych 102',
                'course_title' => 'Theories of Personality',
                'units' => '3',
                'course_type' => 'Lec',
                'class_section' => 'TBA',
                'instructor_name' => 'TBA',
                'curriculum_code' => 'curriculum20242025'
            ],
    
            [
                'class_code' => 'TBA',
                'class_year' => '1st',
                'semester' => '2nd',
                'course_code' => 'Art 21',
                'course_title' => 'Art Appreciation',
                'units' => '3',
                'course_type' => 'Lec',
                'class_section' => 'TBA',
                'instructor_name' => 'TBA',
                'curriculum_code' => 'curriculum20242025'
            ],
    
            [
                'class_code' => 'TBA',
                'class_year' => '1st',
                'semester' => '2nd',
                'course_code' => 'STS 21',
                'course_title' => 'Science Technology and Society',
                'units' => '3',
                'course_type' => 'Lec',
                'class_section' => 'TBA',
                'instructor_name' => 'TBA',
                'curriculum_code' => 'curriculum20242025'
            ],
    
            [
                'class_code' => 'TBA',
                'class_year' => '1st',
                'semester' => '2nd',
                'course_code' => 'Chem 12',
                'course_title' => 'Organic Chemistry (Lecture)',
                'units' => '3',
                'course_type' => 'Lec',
                'class_section' => 'TBA',
                'instructor_name' => 'TBA',
                'curriculum_code' => 'curriculum20242025'
            ],
    
            [
                'class_code' => 'TBA',
                'class_year' => '1st',
                'semester' => '2nd',
                'course_code' => 'Chem 12.1',
                'course_title' => 'Organic Chemistry (Laboratory)',
                'units' => '2',
                'course_type' => 'Lab',
                'class_section' => 'TBA',
                'instructor_name' => 'TBA',
                'curriculum_code' => 'curriculum20242025'
            ],
    
            [
                'class_code' => 'TBA',
                'class_year' => '1st',
                'semester' => '2nd',
                'course_code' => 'PATHFIT 2',
                'course_title' => 'Exercise-based Fitness Activities',
                'units' => '2',
                'course_type' => 'Lec',
                'class_section' => 'TBA',
                'instructor_name' => 'TBA',
                'curriculum_code' => 'curriculum20242025'
            ],
    
            [
                'class_code' => 'TBA',
                'class_year' => '1st',
                'semester' => '2nd',
                'course_code' => 'NSTP 22',
                'course_title' => 'National Service Training Program II',
                'units' => '3',
                'course_type' => 'Lec',
                'class_section' => 'TBA',
                'instructor_name' => 'TBA',
                'curriculum_code' => 'curriculum20242025'
                
            ],
    
            [
                'class_code' => 'TBA',
                'class_year' => '2nd',
                'semester' => '1st',
                'course_code' => 'Psych 103',
                'course_title' => 'Developmental Psychology',
                'units' => '3',
                'course_type' => 'Lec',
                'class_section' => 'TBA',
                'instructor_name' => 'TBA',
                'curriculum_code' => 'curriculum20242025'
            ],
    
            [
                'class_code' => 'TBA',
                'class_year' => '2nd',
                'semester' => '1st',
                'course_code' => 'Psych 104',
                'course_title' => 'Biological Psychology',
                'units' => '3',
                'course_type' => 'Lec',
                'class_section' => 'TBA',
                'instructor_name' => 'TBA',
                'curriculum_code' => 'curriculum20242025'
            ],
    
            [
                'class_code' => 'TBA',
                'class_year' => '2nd',
                'semester' => '1st',
                'course_code' => 'Psych 105',
                'course_title' => 'Psychological Statistics',
                'units' => '3',
                'course_type' => 'Lec',
                'class_section' => 'TBA',
                'instructor_name' => 'TBA',
                'curriculum_code' => 'curriculum20242025'
            ],
    
            [
                'class_code' => 'TBA',
                'class_year' => '2nd',
                'semester' => '1st',
                'course_code' => 'Psych 105',
                'course_title' => 'Psychological Statistics',
                'units' => '2',
                'course_type' => 'Lab',
                'class_section' => 'TBA',
                'instructor_name' => 'TBA',
                'curriculum_code' => 'curriculum20242025'
            ],
    
            [
                'class_code' => 'TBA',
                'class_year' => '2nd',
                'semester' => '1st',
                'course_code' => 'Psych 111',
                'course_title' => 'Social Psychology',
                'units' => '3',
                'course_type' => 'Lec',
                'class_section' => 'TBA',
                'instructor_name' => 'TBA',
                'curriculum_code' => 'curriculum20242025'
            ],
    
            [
                'class_code' => 'TBA',
                'class_year' => '2nd',
                'semester' => '1st',
                'course_code' => 'Chem 40',
                'course_title' => 'BioChemistry (Lec)',
                'units' => '3',
                'course_type' => 'Lec',
                'class_section' => 'TBA',
                'instructor_name' => 'TBA',
                'curriculum_code' => 'curriculum20242025'
            ],
    
            [
                'class_code' => 'TBA',
                'class_year' => '2nd',
                'semester' => '1st',
                'course_code' => 'Chem 40.1',
                'course_title' => 'BioChemistry (Lab)',
                'units' => '2',
                'course_type' => 'Lab',
                'class_section' => 'TBA',
                'instructor_name' => 'TBA',
                'curriculum_code' => 'curriculum20242025'
            ],
            
            [
                'class_code' => 'TBA',
                'class_year' => '2nd',
                'semester' => '1st',
                'course_code' => 'AH 22',
                'course_title' => 'Philippine Popular Culture',
                'units' => '3',
                'course_type' => 'Lec',
                'class_section' => 'TBA',
                'instructor_name' => 'TBA',
                'curriculum_code' => 'curriculum20242025'
            ],
    
            [
                'class_code' => 'TBA',
                'class_year' => '2nd',
                'semester' => '1st',
                'course_code' => 'PATHFIT 3',
                'course_title' => 'Sports Based Course 1',
                'units' => '2',
                'course_type' => 'Lec',
                'class_section' => 'TBA',
                'instructor_name' => 'TBA',
                'curriculum_code' => 'curriculum20242025'
            ],
    
            [
                'class_code' => 'TBA',
                'class_year' => '2nd',
                'semester' => '2nd',
                'course_code' => 'Psych 106',
                'course_title' => 'Psychological Assessment',
                'units' => '3',
                'course_type' => 'Lec',
                'class_section' => 'TBA',
                'instructor_name' => 'TBA',
                'curriculum_code' => 'curriculum20242025'
            ],
    
            [
                'class_code' => 'TBA',
                'class_year' => '2nd',
                'semester' => '2nd',
                'course_code' => 'Psych 114',
                'course_title' => 'Positive Psychology',
                'units' => '3',
                'course_type' => 'Lec',
                'class_section' => 'TBA',
                'instructor_name' => 'TBA',
                'curriculum_code' => 'curriculum20242025'
            ],
    
            [
                'class_code' => 'TBA',
                'class_year' => '2nd',
                'semester' => '2nd',
                'course_code' => 'Psych 109',
                'course_title' => 'Abnormal Psychology',
                'units' => '3',
                'course_type' => 'Lec',
                'class_section' => 'TBA',
                'instructor_name' => 'TBA',
                'curriculum_code' => 'curriculum20242025'
            ],
    
            [
                'class_code' => 'TBA',
                'class_year' => '2nd',
                'semester' => '2nd',
                'course_code' => 'Bio 38',
                'course_title' => 'Human Anatomy and Physiology (Lec)',
                'units' => '3',
                'course_type' => 'Lec',
                'class_section' => 'TBA',
                'instructor_name' => 'TBA',
                'curriculum_code' => 'curriculum20242025'
            ],
    
            [
                'class_code' => 'TBA',
                'class_year' => '2nd',
                'semester' => '2nd',
                'course_code' => 'Bio 38.1',
                'course_title' => 'Human Anatomy and Physiology (Lab)',
                'units' => '2',
                'course_type' => 'Lab',
                'class_section' => 'TBA',
                'instructor_name' => 'TBA',
                'curriculum_code' => 'curriculum20242025'
            ],
    
            [
                'class_code' => 'TBA',
                'class_year' => '2nd',
                'semester' => '2nd',
                'course_code' => 'Psych 108',
                'course_title' => 'Industrial/Organizational Psych',
                'units' => '3',
                'course_type' => 'Lec',
                'class_section' => 'TBA',
                'instructor_name' => 'TBA',
                'curriculum_code' => 'curriculum20242025'
            ],
    
            [
                'class_code' => 'TBA',
                'class_year' => '2nd',
                'semester' => '2nd',
                'course_code' => 'AH 23',
                'course_title' => 'Indigenous Creative Crafts',
                'units' => '3',
                'course_type' => 'Lec',
                'class_section' => 'TBA',
                'instructor_name' => 'TBA',
                'curriculum_code' => 'curriculum20242025'
            ],
    
            [
                'class_code' => 'TBA',
                'class_year' => '2nd',
                'semester' => '2nd',
                'course_code' => 'PATHFIT 4',
                'course_title' => 'Sports Based Course 2',
                'units' => '2',
                'course_type' => 'Lec',
                'class_section' => 'TBA',
                'instructor_name' => 'TBA',
                'curriculum_code' => 'curriculum20242025'
            ],
    
            [
                'class_code' => 'TBA',
                'class_year' => '2nd',
                'semester' => '2nd',
                'course_code' => 'Psych 114',
                'course_title' => 'Positive Psychology',
                'units' => '3',
                'course_type' => 'Lec',
                'class_section' => 'TBA',
                'instructor_name' => 'TBA',
                'curriculum_code' => 'curriculum20242025'
            ],
    
            [
                'class_code' => 'TBA',
                'class_year' => '3rd',
                'semester' => '1st',
                'course_code' => 'Psych 117',
                'course_title' => 'Cordillera Psychology',
                'units' => '3',
                'course_type' => 'Lec',
                'class_section' => 'TBA',
                'instructor_name' => 'TBA',
                'curriculum_code' => 'curriculum20242025'
            ],
    
            [
                'class_code' => 'TBA',
                'class_year' => '3rd',
                'semester' => '1st',
                'course_code' => 'Cordi 101',
                'course_title' => 'Cordillera: History and Socio-Cultural Heritage',
                'units' => '3',
                'course_type' => 'Lec',
                'class_section' => 'TBA',
                'instructor_name' => 'TBA',
                'curriculum_code' => 'curriculum20242025'
            ],
    
            [
                'class_code' => 'TBA',
                'class_year' => '3rd',
                'semester' => '1st',
                'course_code' => 'Psych 107',
                'course_title' => 'Sikolohiyang Pilipino',
                'units' => '3',
                'course_type' => 'Lec',
                'class_section' => 'TBA',
                'instructor_name' => 'TBA',
                'curriculum_code' => 'curriculum20242025'
            ],
    
            [
                'class_code' => 'TBA',
                'class_year' => '3rd',
                'semester' => '1st',
                'course_code' => 'Psych 119',
                'course_title' => 'Community Health Psychology',
                'units' => '3',
                'course_type' => 'Lec',
                'class_section' => 'TBA',
                'instructor_name' => 'TBA',
                'curriculum_code' => 'curriculum20242025'
            ],
    
            [
                'class_code' => 'TBA',
                'class_year' => '3rd',
                'semester' => '1st',
                'course_code' => 'Bio 32',
                'course_title' => 'Fundemantals of Genetics (Lec)',
                'units' => '3',
                'course_type' => 'Lec',
                'class_section' => 'TBA',
                'instructor_name' => 'TBA',
                'curriculum_code' => 'curriculum20242025'
            ],
    
            [
                'class_code' => 'TBA',
                'class_year' => '3rd',
                'semester' => '1st',
                'course_code' => 'Bio 32.1',
                'course_title' => 'Fundamentals of Genetics (Lab)',
                'units' => '2',
                'course_type' => 'Lab',
                'class_section' => 'TBA',
                'instructor_name' => 'TBA',
                'curriculum_code' => 'curriculum20242025'
            ],
    
            [
                'class_code' => 'TBA',
                'class_year' => '3rd',
                'semester' => '1st',
                'course_code' => 'Pl 21',
                'course_title' => 'Life and Works of Rizal',
                'units' => '3',
                'course_type' => 'Lec',
                'class_section' => 'TBA',
                'instructor_name' => 'TBA',
                'curriculum_code' => 'curriculum20242025'
            ],
    
            [
                'class_code' => 'TBA',
                'class_year' => '3rd',
                'semester' => '2nd',
                'course_code' => 'Psych 110',
                'course_title' => 'Experimental Psychology',
                'units' => '3',
                'course_type' => 'Lec',
                'class_section' => 'TBA',
                'instructor_name' => 'TBA',
                'curriculum_code' => 'curriculum20242025'
            ],
    
            [
                'class_code' => 'TBA',
                'class_year' => '3rd',
                'semester' => '2nd',
                'course_code' => 'Psych 110',
                'course_title' => 'Experimental Psychology',
                'units' => '2',
                'course_type' => 'Lab',
                'class_section' => 'TBA',
                'instructor_name' => 'TBA',
                'curriculum_code' => 'curriculum20242025'
            ],
    
            [
                'class_code' => 'TBA',
                'class_year' => '3rd',
                'semester' => '2nd',
                'course_code' => 'Psych 108',
                'course_title' => 'Field Methods in Psychology',
                'units' => '3',
                'course_type' => 'Lec',
                'class_section' => 'TBA',
                'instructor_name' => 'TBA',
                'curriculum_code' => 'curriculum20242025'
            ],
    
            [
                'class_code' => 'TBA',
                'class_year' => '3rd',
                'semester' => '2nd',
                'course_code' => 'Psych 108',
                'course_title' => 'Field Methods in Psychology',
                'units' => '2',
                'course_type' => 'Lab',
                'class_section' => 'TBA',
                'instructor_name' => 'TBA',
                'curriculum_code' => 'curriculum20242025'
            ],
    
            [
                'class_code' => 'TBA',
                'class_year' => '3rd',
                'semester' => '2nd',
                'course_code' => 'Psych 115',
                'course_title' => 'Introduction to Counseling',
                'units' => '3',
                'course_type' => 'Lec',
                'class_section' => 'TBA',
                'instructor_name' => 'TBA',
                'curriculum_code' => 'curriculum20242025'
            ],
    
            [
                'class_code' => 'TBA',
                'class_year' => '3rd',
                'semester' => '2nd',
                'course_code' => 'Psych 112',
                'course_title' => 'Cognitive Psychology',
                'units' => '3',
                'course_type' => 'Lec',
                'class_section' => 'TBA',
                'instructor_name' => 'TBA',
                'curriculum_code' => 'curriculum20242025'
            ],
    
            [
                'class_code' => 'TBA',
                'class_year' => '3rd',
                'semester' => '2nd',
                'course_code' => 'Psych 118',
                'course_title' => 'Special Topics in Psychology',
                'units' => '3',
                'course_type' => 'Lec',
                'class_section' => 'TBA',
                'instructor_name' => 'TBA',
                'curriculum_code' => 'curriculum20242025'
            ],
    
    
            [
                'class_code' => 'TBA',
                'class_year' => '3rd',
                'semester' => '2nd',
                'course_code' => 'Philo 101',
                'course_title' => 'Philosophy of Science',
                'units' => '3',
                'course_type' => 'Lec',
                'class_section' => 'TBA',
                'instructor_name' => 'TBA',
                'curriculum_code' => 'curriculum20242025'
            ],
    
    
            [
                'class_code' => 'TBA',
                'class_year' => '3rd',
                'semester' => '2nd',
                'course_code' => 'Local Lang',
                'course_title' => 'Local Language',
                'units' => '3',
                'course_type' => 'Lec',
                'class_section' => 'TBA',
                'instructor_name' => 'TBA',
                'curriculum_code' => 'curriculum20242025'
            ],
    
            [
                'class_code' => 'TBA',
                'class_year' => '3rd',
                'semester' => 'Midyear',
                'course_code' => 'Psych 199',
                'course_title' => 'Practicum in Psychology (160 hours)',
                'units' => '3',
                'course_type' => 'Lec',
                'class_section' => 'TBA',
                'instructor_name' => 'TBA',
                'curriculum_code' => 'curriculum20242025'
            ],
    
            [
                'class_code' => 'TBA',
                'class_year' => '4th',
                'semester' => '1st',
                'course_code' => 'Psych 200 A',
                'course_title' => 'Thesis 1',
                'units' => '3',
                'course_type' => 'Lec',
                'class_section' => 'TBA',
                'instructor_name' => 'TBA',
                'curriculum_code' => 'curriculum20242025'
            ],
    
            [
                'class_code' => 'TBA',
                'class_year' => '4th',
                'semester' => '2nd',
                'course_code' => 'Psych 200 B',
                'course_title' => 'Thesis 2',
                'units' => '3',
                'course_type' => 'Lec',
                'class_section' => 'TBA',
                'instructor_name' => 'TBA',
                'curriculum_code' => 'curriculum20242025'
            ]

            ];
            DB::table('classes')->insert($classes);
    }
}