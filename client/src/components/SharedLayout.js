import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"


const SharedLayout = () => {
  return (
    <>
    <Navbar></Navbar>
    <Outlet></Outlet>
    </>
  )
}

export default SharedLayout