import styled from 'styled-components'
import Logo from './Logo'
import { AiFillDatabase } from 'react-icons/ai';
import { ImStatsDots } from 'react-icons/im';
import { BsFillBriefcaseFill } from 'react-icons/bs';
import { BsClipboardMinus } from 'react-icons/bs';
import { ImProfile } from 'react-icons/im';
import { Link, Outlet } from 'react-router-dom';
import {useState} from 'react'
import Stats from '../pages/dashboard/stats'
const DashboardLayout = () => {

    const [show,setShow]= useState(true)
    const [status,setStatus]= useState(false)
    const handleClick=()=>{
        setShow(!show)
    }
    const statsHandler=()=>{
        setStatus(true)
    }

    return (
        <>

            <Wrapper>
                <div className="main">

                    <div className={`sidebar ${show ? '' : 'none'}`}>
                        <div className="image">
                            <Logo></Logo>
                        </div>
                        <div className='links'>

                            <div className='link'>
                                <ImStatsDots className='icon'></ImStatsDots><Link to='/dashboard/stats' className='Link'>

                                    <button className='button' onClick={statsHandler}>Stats</button>
                                </Link>
                            </div>
                            <div className='link'>
                                <BsFillBriefcaseFill className='icon'></BsFillBriefcaseFill><Link to='/dashboard/all-jobs' className='Link'>

                                    <button className='button' onClick={statsHandler}>All Jobs</button>
                                </Link>
                            </div>
                            <div className='link'>
                                <BsClipboardMinus className='icon'></BsClipboardMinus><Link to='/dashboard/add-job' className='Link'>

                                    <button className='button' onClick={statsHandler}>Add Job</button>
                                </Link>
                            </div>
                            <div className='link'>
                                <ImProfile className='icon'></ImProfile><Link to='/dashboard/profile' className='Link'>

                                    <button className='button' onClick={statsHandler}>Profile</button>
                                </Link>
                            </div>
                        </div>

                    </div>
                    <div className='dashboard'>
                        <div className='dashboard-upper'>
                            <div>
                                <AiFillDatabase onClick={handleClick} className='icon'></AiFillDatabase>
                            </div>
                            <div>
                                <h2>Dashboard</h2>
                            </div>
                            <div>
                                <button className='button'>login</button>
                            </div>
                        </div>

                        <div className='content'>
                                
                            {status ? <Outlet /> : <Stats></Stats>}
                            
                        </div>
                    </div>
                </div>
            </Wrapper>
        </>

    )
}

const Wrapper = styled.div`
.icon{
    color:black;
    font-size:2rem;
    cursor:pointer;
    
}
.Link{
     display:flex;
}
.link{
    display:flex;
    align-item:center;
}
.links{
    display:flex;
    flex-direction:column;
    height:30rem;
    justify-content:space-evenly;
    
}

.button{
    background:none;
    border:none;
    font-size:1.4rem;
    color: #38bec9;
}
.button:hover{
    cursor:pointer;
    background-color:aliceblue;
}
.content{
   
  
    margin:2rem;
}
.main{
    display:flex;
    height:100vh;
  
}
.dashboard{
   
    width:100%;
   
}
.dashboard-upper{
  display:flex;
  justify-content:space-between;
  background-color:white;
  margin:0;
  align-items:center;
  padding:1.2rem;
  
}
.sidebar{
    padding:1.4rem;
    width:20%;
    font-size:1.4rem;
    background-color:white;
    
   
}
.none{
  display:none

}

`

export default DashboardLayout