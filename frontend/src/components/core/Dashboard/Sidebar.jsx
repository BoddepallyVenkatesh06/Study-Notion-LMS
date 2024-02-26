import { useEffect, useState } from "react"
import { VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { sidebarLinks } from './../../../../data/dashboard-links';
import { logout } from "../../../services/operations/authAPI"
import ConfirmationModal from "../../common/ConfirmationModal"
import SidebarLink from "./SidebarLink"
import Loading from './../../common/Loading';

import { HiMenuAlt1 } from 'react-icons/hi'
import { IoMdClose } from 'react-icons/io'

import { setOpenSideMenu, setScreenSize } from "../../../slices/sidebarSlice";




export default function Sidebar() {
  const { user, loading: profileLoading } = useSelector((state) => state.profile)
  const { loading: authLoading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // to keep track of confirmation modal
  const [confirmationModal, setConfirmationModal] = useState(null)


  // handle side bar menu - open / close
  // const [openSideMenu, setOpenSideMenu] = useState(false)
  // const [screenSize, setScreenSize] = useState(undefined)

  const { openSideMenu, screenSize } = useSelector((state) => state.sidebar)
  // console.log('openSideMenu ======' , openSideMenu)
  // console.log('screenSize ======' , screenSize)

  useEffect(() => {
    const handleResize = () => dispatch(setScreenSize(window.innerWidth))

    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // If screen size is small then close the side bar
  useEffect(() => {
    if (screenSize <= 640) {
      dispatch(setOpenSideMenu(false))
    }
    else dispatch(setOpenSideMenu(true))
  }, [screenSize])



  if (profileLoading || authLoading) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
        <Loading />
      </div>
    )
  }

  return (
    <>
      <div className="sm:hidden text-white absolute left-7 top-3 cursor-pointer " onClick={() => dispatch(setOpenSideMenu(!openSideMenu))}>
        {
          openSideMenu ? <IoMdClose size={33} /> : <HiMenuAlt1 size={33} />
        }
      </div>


      {
        openSideMenu &&
        <div className="flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10 ">
          <div className="flex flex-col mt-6">
            {sidebarLinks.map((link) => {
              if (link.type && user?.accountType !== link.type) return null
              return (
                <SidebarLink key={link.id} link={link} iconName={link.icon} setOpenSideMenu={setOpenSideMenu} />
              )
            })}
          </div>

          <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />

          <div className="flex flex-col">
            <SidebarLink
              link={{ name: "Settings", path: "/dashboard/settings" }}
              iconName={"VscSettingsGear"}
              setOpenSideMen={setOpenSideMenu}
            />

            <button
              onClick={() =>
                setConfirmationModal({
                  text1: "Are you sure ?",
                  text2: "You will be logged out of your account.",
                  btn1Text: "Logout",
                  btn2Text: "Cancel",
                  btn1Handler: () => dispatch(logout(navigate)),
                  btn2Handler: () => setConfirmationModal(null),
                })
              }
              className=" "
            >
              <div className="flex items-center gap-x-2 px-8 py-2 text-sm font-medium text-richblack-300 hover:bg-richblack-700 relative">
                <VscSignOut className="text-lg" />
                <span>Logout</span>
              </div>
            </button>

          </div>
        </div>
      }


      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}