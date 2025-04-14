import { UserServices } from "./user.service";
import { TStudent } from "../student/student.interface";
import sendResponse from "../../utils/sendResponse";
import { status } from "http-status";
import catchAsync from "../../utils/catchAsync";
import { userValidation } from "./user.validation";

export const createStudent = catchAsync(

    async (request, response) => {

        const {
            password: passwordFromRequestBody,
            student: studentData
        }: { password: string, student: TStudent } = request.body
        // Validate request body with ZOD
        const { password } = userValidation.userValidationSchema.parse({ password: passwordFromRequestBody })

        // response data after create student
        const createdStudent = await UserServices.createStudentIntoDB(
            request.file,
            password,
            studentData
        );

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

    const result = await UserServices.createFacultyIntoDB(
        request.file,
        password,
        facultyData,
    );

    sendResponse(request, response, {
        status: status.OK,
        success: true,
        message: 'Faculty is created succesfully',
        data: result,
    });
});

const createAdmin = catchAsync(async (request, response) => {

    const { password, admin: adminData } = request.body;

    const result = await UserServices.createAdminIntoDB(
        request.file,
        password,
        adminData
    );

    sendResponse(request, response, {
        status: status.OK,
        success: true,
        message: 'Admin is created succesfully',
        data: result,
    });
});

const getMe = catchAsync(async (request, response) => {

    // const token = req.headers.authorization;
    // if (!token) {
    //   throw new AppError(httpStatus.NOT_FOUND, 'Token not found !');
    // }

    const { userId, role } = request.user;
    const result = await UserServices.getMe(userId, role);

    sendResponse(request, response, {
        status: status.OK,
        success: true,
        message: 'User is retrieved succesfully',
        data: result,
    });
});

const changeStatus = catchAsync(async (request, response) => {

    const id = request.params.id;
    const result = await UserServices.changeStatus(id, request.body);

    sendResponse(request, response, {
        status: status.OK,
        success: true,
        message: 'Status is updated succesfully',
        data: result,
    });
});

export const UserController = {
    createStudent,
    createFaculty,
    createAdmin,
    getMe,
    changeStatus
} 