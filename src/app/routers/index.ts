import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { StudentRoutes } from "../modules/student/student.route";
import { AcademicSemesterRoutes } from "../modules/academic-semester/academicSemester.route";
import { AcademicFacultyRoutes } from "../modules/academic-faculty/academicFaculty.route";
import { AcademicDepartmentRoutes } from "../modules/academic-department/academicDepartment.route";
import { FacultyRoutes } from "../modules/faculty/faculty.route";
import { AdminRoutes } from "../modules/admin/admin.route";
import { CourseRoutes } from "../modules/course/course.route";
import { offeredCourseRoutes } from "../modules/OfferedCourse/OfferedCourse.route";
import { semesterRegistrationRoutes } from "../modules/semesterRegistration/semesterRegistration.route";

const router = Router();

const moduleRoutes = [
    {
        path: '/users',
        route: UserRoutes
    },
    {
        path: '/students',
        route: StudentRoutes
    },
    {
        path: '/faculties',
        route: FacultyRoutes,
    },
    {
        path: '/admins',
        route: AdminRoutes,
    },
    {
        path: '/academic-semesters',
        route: AcademicSemesterRoutes
    },
    {
        path: '/academic-faculties',
        route: AcademicFacultyRoutes
    },
    {
        path: '/academic-departments',
        route: AcademicDepartmentRoutes
    },
    {
        path: '/courses',
        route: CourseRoutes,
    },
    {
        path: '/semester-registrations',
        route: semesterRegistrationRoutes
    },
    {
        path: '/offered-courses',
        route: offeredCourseRoutes
    },
]

moduleRoutes.forEach(({ path, route }) => router.use(path, route))

export default router;