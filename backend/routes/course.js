const express = require('express');
const router = express.Router();

// Import required controllers

// course controllers 
const {
    createCourse,
    getCourseDetails,
    getAllCourses,
    getFullCourseDetails,
    editCourse,
    deleteCourse,
    getInstructorCourses,

} = require('../controllers/course')

const { updateCourseProgress } = require('../controllers/courseProgress')

// categories Controllers
const {
    createCategory,
    showAllCategories,
    getCategoryPageDetails,
} = require('../controllers/category');


// sections controllers
const {
    createSection,
    updateSection,
    deleteSection,
} = require('../controllers/section');


// subSections controllers
const {
    createSubSection,
    updateSubSection,
    deleteSubSection
} = require('../controllers/subSection');


// rating controllers
const {
    createRating,
    getAverageRating,
    getAllRatingReview
} = require('../controllers/ratingAndReview');


// Middlewares
const { auth, isAdmin, isInstructor, isStudent } = require('../middleware/auth')


// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************
// Courses can Only be Created by Instructors

router.post('/createCourse', auth, isInstructor, createCourse);

//Add a Section to a Course
router.post('/addSection', auth, isInstructor, createSection);
// Update a Section
router.post('/updateSection', auth, isInstructor, updateSection);
// Delete a Section
router.post('/deleteSection', auth, isInstructor, deleteSection);

// Add a Sub Section to a Section
router.post('/addSubSection', auth, isInstructor, createSubSection);
// Edit Sub Section
router.post('/updateSubSection', auth, isInstructor, updateSubSection);
// Delete Sub Section
router.post('/deleteSubSection', auth, isInstructor, deleteSubSection);


// Get Details for a Specific Courses
router.post('/getCourseDetails', getCourseDetails);
// Get all Courses
router.get('/getAllCourses', getAllCourses);
// get full course details
router.post('/getFullCourseDetails', auth, getFullCourseDetails);
// Get all Courses Under a Specific Instructor
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)


// Edit Course routes
router.post("/editCourse", auth, isInstructor, editCourse)

// Delete a Course
router.delete("/deleteCourse", auth, isInstructor, deleteCourse)

// update Course Progress
router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress)



// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin

router.post('/createCategory', auth, isAdmin, createCategory);
router.get('/showAllCategories', showAllCategories);
router.post("/getCategoryPageDetails", getCategoryPageDetails)




// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post('/createRating', auth, isStudent, createRating);
router.get('/getAverageRating', getAverageRating);
router.get('/getReviews', getAllRatingReview);


module.exports = router;