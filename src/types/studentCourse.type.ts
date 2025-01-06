import { TAcademicDepartment, TAcademicFaculty, TAcademicSemester } from "./academicManagement.type";
import { TSemester } from "./courseManagement.type";
import { TFaculty, TStudent } from "./userManagement.type";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type TOfferedCourse = {
  _id: string;
  semesterRegistration: string;
  academicSemester: string;
  academicFaculty: string;
  academicDepartment: string;
  course: TCourse;
  faculty: string;
  maxCapacity: number;
  section: number;
  days: string[];
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  enrolledCourses: any[];
  completedCourses: any[];
  completedCourseIds: any[];
  isPreRequisitesFulFilled: boolean;
  isAlreadyEnrolled: boolean;
};

export type TEnrolledCourse = {
  _id: string;
  semesterRegistration: TSemester;
  academicSemester: TAcademicSemester;
  academicFaculty: TAcademicFaculty;
  academicDepartment: TAcademicDepartment;
  offeredCourse: TOfferedCourse;
  course: TCourse;
  student: TStudent
  faculty: TFaculty;
  isEnrolled: boolean;
  courseMarks: TEnrolledCourseMarks;
  grade: TGrade;
  gradePoints: number;
  isCompleted: boolean;
};

export type TCourse = {
  _id: string;
  title: string;
  prefix: string;
  code: number;
  credits: number;
  preRequisiteCourses: any[];
  isDeleted: boolean;
  __v: number;
};

export type TGrade = 'A' | 'B' | 'C' | 'D' | 'F' | 'NA';

export type TEnrolledCourseMarks = {
  classTest1: number;
  midTerm: number;
  classTest2: number;
  finalTerm: number;
};