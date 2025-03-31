import { TAcademicSemesterCode, TAcademicSemesterName, TCheckAcademicSemesternameAndCode, TMonths } from "./academicSemesterInterface"

export const AcademicSemesterName: TAcademicSemesterName[] = ["Autumn", "Fall", "Summer"]
export const AcademicSemesterCode: TAcademicSemesterCode[] = ["01", "02", "03"]
export const Months: TMonths[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export const checkAcademicSemesternameAndCode: TCheckAcademicSemesternameAndCode = {
    Autumn: '01',
    Summer: '02',
    Fall: '03'
}