import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./views/unauthorized_view/views_main/LandingPage";
import Login from "./views/unauthorized_view/views_main/Login";
import GuestLayout from "./views/unauthorized_view/views_main/GuestLayout";
import DefaultLayout from "./views/authorized_view/views_main/DefaultLayout";
import Home from "./views/authorized_view/views_main/Home";
import PreRegistration from "./views/authorized_view/views_main/PreRegistration"
import Links from "./views/authorized_view/views_main/Links";
import AdminLayout from "./views/authorized_view/views_main/AdminLayout";
import Dashboard from "./views/authorized_view/views_main/Dashboard";
import ManageUsers from "./views/authorized_view/views_main/ManageUsers";
import StudentList from "./views/authorized_view/views_components/StudentList";
import EmployeeList from "./views/authorized_view/views_components/EmployeeList";
import Classes from "./views/authorized_view/views_main/Classes"
import Curriculum from "./views/authorized_view/views_main/Curriculum"
import StaffLayout from "./views/authorized_view/views_main/StaffLayout";
import InstructorLayout from "./views/authorized_view/views_main/InstructorLayout";
import PreRegistrationForm from "./views/authorized_view/views_components/Pre_Registration_Components/PreRegistrationForm";
import PreRegistrationForContinuing from "./views/authorized_view/views_components/Pre_Registration_Components/PreRegistrationForContinuing";
import LinksForStudent from "./views/authorized_view/views_main/LinksForStudent";
import CurriculumChecklist from "./views/authorized_view/views_main/CurriculumChecklist";
import ClassesForInstructors from "./views/authorized_view/views_main/ClassesForInstructors";
import ClassesForStudents from "./views/authorized_view/views_main/ClassesForStudents";
import InputEmail from "./views/unauthorized_view/views_components/Forgot_Password/InputEmail";
import InputCode from "./views/unauthorized_view/views_components/Forgot_Password/InputCode";
import Settings from "./views/authorized_view/views_main/Settings";

const router = createBrowserRouter([
    
    {
        path: '/admin',
        element: <AdminLayout />,
        children:[
            {
                path: 'home',
                element: <Home />
            },

            {
                path: 'dashboard',
                element: <Dashboard />
            },
            {
                path: 'classes',
                element: <Classes />
            },
            {
                path: 'preregistration',
                element: <PreRegistration />
            },
            {
                path: 'links',
                element: <Links />
            },

            {
                path: 'manageusers',
                element: <ManageUsers />,
                children:[
                    {
                        path: '',
                        element: <StudentList />
                    },

                    {
                        path: '',
                        element: <EmployeeList />
                    }
                ]
            },
            {
                path: 'curriculum',
                element: <Curriculum />
            },
            {
                path: 'settings',
                element: <Settings />
            }
        ]
    },

    {
        path: '/staff',
        element: <StaffLayout />,
        children: [
            {
                path: 'home',
                element: <Home />
            },

            {
                path: 'dashboard',
                element: <Dashboard />
            },
            {
                path: 'classes',
                element: <Classes />
            },
            {
                path: 'preregistration',
                element: <PreRegistration />
            },
            {
                path: 'links',
                element: <Links />
            },

            {
                path: 'manageusers',
                element: <ManageUsers />,
                children:[
                    {
                        path: '',
                        element: <StudentList />
                    },

                    {
                        path: '',
                        element: <EmployeeList />
                    }
                ]
            },
            {
                path: 'curriculum',
                element: <Curriculum />
            },
        ]
    },
    
    {
        path: '/instructor',
        element: <InstructorLayout />,
        children: [
            {
                path: 'home',
                element: <Home />
            },
            {
                path: 'classes',
                element: <ClassesForInstructors />
            },
            {
                path: 'links',
                element: <Links />
            },
        ]  
    },

    {
        path: '/student',
        element: <DefaultLayout />,
        children: [
            {
                path: 'home',
                element: <Home />
            },

            {
                path: 'preregistrationforcontinuing',
                element: <PreRegistrationForContinuing />
            },

            {
                path: 'classes',
                element: <ClassesForStudents />
            },

            {
                path: 'links',
                element: <LinksForStudent />
            },

            {
                path: 'curriculumchecklist',
                element: <CurriculumChecklist />
            }

            
        ]
    },
    
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                // Set the landing page as the default route
                path: '',
                element: <LandingPage />
              },

            {
                path: 'landingpage',
                element: <LandingPage />
            },

            {
        
                path: 'preregistrationforincoming',
                element: <PreRegistrationForm />
                
            },

            {
                path: 'preregistrationforcontinuing',
                element: <PreRegistrationForContinuing />
            },  
           
            {
                path: 'login',
                element: <Login />
            },

            {
                path: 'forgotpassword',
                element: <InputEmail />
            },

            {
                path: 'code',
                element: <InputCode />
            },
        ]
    }
])

export default router;