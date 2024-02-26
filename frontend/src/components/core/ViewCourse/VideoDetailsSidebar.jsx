import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"

import IconBtn from './../../common/IconBtn';
import { setCourseViewSidebar } from "../../../slices/sidebarSlice"

import { BsChevronDown } from "react-icons/bs"
import { IoIosArrowBack } from "react-icons/io"

import { IoMdClose } from 'react-icons/io'
import { HiMenuAlt1 } from 'react-icons/hi'



export default function VideoDetailsSidebar({ setReviewModal }) {

  const [activeStatus, setActiveStatus] = useState("") // store curr section id
  const [videoBarActive, setVideoBarActive] = useState("") // store curr SubSection Id
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch();

  const { sectionId, subSectionId } = useParams()
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse)


  const { courseViewSidebar } = useSelector(state => state.sidebar)


  // set which section - subSection is selected 
  useEffect(() => {
    ; (() => {
      if (!courseSectionData.length) return
      const currentSectionIndx = courseSectionData.findIndex((data) => data._id === sectionId)
      const currentSubSectionIndx = courseSectionData?.[currentSectionIndx]?.subSection.findIndex((data) => data._id === subSectionId)
      const activeSubSectionId = courseSectionData[currentSectionIndx]?.subSection?.[currentSubSectionIndx]?._id
      setActiveStatus(courseSectionData?.[currentSectionIndx]?._id)
      setVideoBarActive(activeSubSectionId)
    })()
  }, [courseSectionData, courseEntireData, location.pathname])




  return (
    <>
      <div className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800">
        <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
          <div className="flex w-full items-center justify-between ">

            {/* open - close side bar icons */}
            <div
              className="sm:hidden text-white cursor-pointer "
              onClick={() => dispatch(setCourseViewSidebar(!courseViewSidebar))}
            >
              {courseViewSidebar ? <IoMdClose size={33} /> : <HiMenuAlt1 size={33} />}
            </div>

            {/* go back dashboard */}
            <button
              onClick={() => { navigate(`/dashboard/enrolled-courses`) }}
              className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90"
              title="back"
            >
              <IoIosArrowBack size={30} />
            </button>

            {/* add review button */}
            <IconBtn
              text="Add Review"
              // customClasses="ml-auto"
              onclick={() => setReviewModal(true)}
            />
          </div>

          {/* course Name - total No Of Lectures*/}
          <div className="flex flex-col">
            <p>{courseEntireData?.courseName}</p>
            <p className="text-sm font-semibold text-richblack-500">
              {completedLectures?.length} / {totalNoOfLectures}
            </p>
          </div>
        </div>


        {/* render all section -subSection */}
        <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
          {courseSectionData.map((section, index) => (
            <div
              className="mt-2 cursor-pointer text-sm text-richblack-5"
              onClick={() => setActiveStatus(section?._id)}
              key={index}
            >
              {/* Section */}
              <div className="flex justify-between bg-richblack-700 px-5 py-4">
                <div className="w-[70%] font-semibold">
                  {section?.sectionName}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[12px] font-medium">
                    Lession {section?.subSection.length}
                  </span>
                  <span
                    className={`${activeStatus === section?._id
                      ? "rotate-0 transition-all duration-500"
                      : "rotate-180"
                      } `}
                  >
                    <BsChevronDown />
                  </span>
                </div>
              </div>

              {/* Sub Sections */}
              {activeStatus === section?._id && (
                <div className="transition-[height] duration-500 ease-in-out">
                  {section.subSection.map((topic, i) => (
                    <div
                      className={`flex gap-3  px-5 py-2 ${videoBarActive === topic._id
                        ? "bg-yellow-200 font-semibold text-richblack-800"
                        : "hover:bg-richblack-900"
                        } `}
                      key={i}
                      onClick={() => {
                        navigate(`/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`)
                        setVideoBarActive(topic._id)
                        courseViewSidebar && window.innerWidth <= 640 ? dispatch(setCourseViewSidebar(false)) : null;
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={completedLectures.includes(topic?._id)}
                        onChange={() => { }}
                      />
                      {topic.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
