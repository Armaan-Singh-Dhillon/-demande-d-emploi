import { useEffect, useState } from "react"
import { useAppContext } from "../../context/AppContext"
import styled from "styled-components"
import Alert from "../../components/Alert"

const Addjob = () => {
  const { displayAlert, createJob, state, editJob  } = useAppContext()
  const [position, setPosition] = useState(state.job.position||'')
  const [company, setCompany] = useState(state.job.company ||'')
  const [location, setLocation] = useState(state.job.location|| 'jobLoaction')
  const [status, setStatus] = useState('pending')
  const [jobType, setjobType] = useState('full-time')
  const [show, setshow] = useState(false)

  const clickHandlerPosition = (e) => {
    setPosition(e.target.value)
  }
  const clickHandlerCompany = (e) => {
    setCompany(e.target.value)
  }
  const clickHandlerLocation = (e) => {
    setLocation(e.target.value)
  }
  const handleChangeStatus = (e) => {
    setStatus(e.target.value)
  }
  const handleChangeType = (e) =>{
    setjobType(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if(state.isEditing){
      editJob({ ...state.job, position, company, location, status, jobType, show })
      return
    }
  
    if (!position || !company ) {
      
      displayAlert()
      setshow(true)
      setTimeout(() => {
        setshow(false)

      }, 1500);
      return
    }
    createJob({ position, company, location, status, jobType })
    setshow(true)
    setTimeout(() => {
      setshow(false)

    }, 1500);
    return
  }
  const handleClear = () => {
    setPosition("")
    setCompany("")
    
  }
  
  return (
    <>
      <Wrapper>

        <div className="content-main">
          <div>
            <h3>{state.isEditing ? 'Editing':'Add Job'}</h3>
          </div>
          {show && <Alert></Alert>}
          <div className="content-sec">
            <div className="card">
              <div>
                Position
              </div>
              <div>
                <input type="text" onChange={(e) => clickHandlerPosition(e)} value={position} />
              </div>
            </div>
            <div className="card">
              <div>
                Company
              </div>
              <div>
                <input type="text" onChange={(e) => clickHandlerCompany(e)} value={company} />
              </div>
            </div>
            <div className="card">
              <div>
                Location
              </div>
              <div>
                <input type="text" onChange={(e) => clickHandlerLocation(e)} value={location} />
              </div>
            </div>
            <div className="card">
              <div>
                Status
              </div>
              <div>
                <select onChange={handleChangeStatus}>

                  <option value="pending" selected>pending</option>

                  <option value="interview">interview</option>

                  <option value="declined">declined</option>

                </select>
              </div>
            </div>
            <div className="card">
              <div>
                Type
              </div>
              <div>
                <select onChange={handleChangeType}>

                  <option value="full-time" selected>full-time</option>
                  <option value="part-time">part-time</option>

                  <option value="remote">remote</option>

                  <option value="internship">internship</option>

                </select>
              </div>
            </div>
            <div className="card-btn">
              <button className="btn" onClick={(e) => handleSubmit(e)}>Submit</button>
              <button className="btn" onClick={(e) => handleClear(e)}>Clear</button>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  )
}
const Wrapper = styled.div`
background-color:white;
padding:1.8rem;
box-shadow:0 0.5rem 0rem #20b5d6;
.btn{
  margin-top:2rem;
  height:50%;
  width:30%;
  
}
.card-btn{
  display:flex;
  justify-content:space-evenly;
  
  width:30%;
}
.content-sec{
  display: flex;
  flex-wrap: wrap;

  
}
.card {
    width: 30%;
    margin-right:1.4rem;
    font-size:1.2rem;
    border-radius: 10px;
    
  }
.card input {
  width:100%;  
  font-size:1.5rem;
  margin-bottom:1.2rem;
  background-color:#edfbff;
  padding:1rem;
  border:none;
  }
.card select {
  width:100%;  
  font-size:1.5rem;
  margin-bottom:1.2rem;
  background-color:#edfbff;
  padding:1rem;
  border:none;
  }
`
export default Addjob