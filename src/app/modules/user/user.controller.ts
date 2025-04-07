import { UserServices } from "./user.service";
import userValidationSchema from "./user.validation";
import { TStudent } from "../student/student.interface";
import sendResponse from "../../utils/sendResponse";
import { status } from "http-status";
import catchAsync from "../../utils/catchAsync";

export const createStudent = catchAsync(
    async (request, response) => {

        const { password: passwordFromRequestBody, student: studentData }: { password: string, student: TStudent } = request.body

        // Validate request body with ZOD
        const { password } = userValidationSchema.parse({ password: passwordFromRequestBody })
        // response data after create student
        const createdStudent = await UserServices.createStudentIntoDB(password, studentData);

        // Send response to utility send response function
        sendResponse(request, response, {
            status: status.CREATED,
            success: true,
            message: 'Student create successfully',
            data: createdStudent
        })
    }
)

const createFaculty = catchAsync(async (request, response) => {
    const { password, faculty: facultyData } = request.body;

    const result = await UserServices.createFacultyIntoDB(password, facultyData);

    sendResponse(request, response, {
        status: status.OK,
        success: true,
        message: 'Faculty is created succesfully',
        data: result,
    });
});

const createAdmin = catchAsync(async (request, response) => {

    const { password, admin: adminData } = request.body;
    const result = await UserServices.createAdminIntoDB(password, adminData);

    sendResponse(request, response, {
        status: status.OK,
        success: true,
        message: 'Admin is created succesfully',
        data: result,
    });
});

export const UserController = {
    createStudent,
    createFaculty,
    createAdmin
} 