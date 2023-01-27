import { useEffect, useState } from "react"
import { useAppContext } from "../../context/AppContext"
import styled from "styled-components"
import Alert from "../../components/Alert"
import {useNavigate} from "react-router-dom"

const Alljobs = () => {
  const { getAllJob, deleteJob, setEditJob } = useAppContext()
  const [jobs, setJobs] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [show, setshow] = useState(false)
  const navigate =useNavigate()
  const fetchData = async() =>{
    const data = await getAllJob()
    setJobs(data.jobs)
    
    setLoading(false)
  }
  useEffect(() => {
    fetchData()
    
  }, [])

  const editHandler=(el)=>{
    setEditJob(el)
    navigate('/dashboard/add-job')
    
  }
  const deleteHandler=(el)=>{
    deleteJob(el)
    fetchData()
    setshow(true)
    setTimeout(() => {
      setshow(false)

    }, 4000);
  }
  if (isLoading) {
    return <>
      Loading
    </>
  }
  else {
    

    return (
      <>
        <Wrapper>

          <div className="content-main">
            <div>
              <h3>Search Form</h3>
            </div>
            {show && <Alert></Alert>}
            <div className="content-sec">
              <div className="card">
                <div>
                  Search
                </div>
                <div>
                  <input type="text" />
                </div>
              </div>


              <div className="card">
                <div>
                  Status
                </div>
                <div>
                  <select >

                    <option value="all" selected>all</option>

                    <option value="pending" >pending</option>

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
                  <select >

                    <option value="full-time" defaultValue='full-time'>full-time</option>
                    <option value="part-time">part-time</option>

                    <option value="remote">remote</option>

                    <option value="internship">internship</option>

                  </select>
                </div>
              </div>
              <div className="card">
                <div>
                  Type
                </div>
                <div>
                  <select >

                    <option value="latest" defaultValue='latest'>latest</option>
                    <option value="oldest">oldest</option>

                    <option value="a-z">a-z</option>

                    <option value="z-a">z-a</option>

                  </select>
                </div>
              </div>
              <div className="card-btn">
                <button className="btn" >Clear Filters</button>
              </div>
            </div>
          </div>
          <div className="sec">
            {jobs.map((el)=>{
                return<>
              <div className="job-card">
                <div className="title">
                  <div className="icon">
                    {el.company.charAt(0)}
                  </div>
                  <div>
                    <div>
                      {el.position}
                    </div>
                    <div>
                      {el.company}
                    </div>
                  </div>
                </div>
                <div className="text">
                  <div>
                    <div className="text-component">
                      {el.status}
                    </div>
                    <div className="text-component">
                      {el.location}
                    </div>
                    <div className="text-component">
                      <button className="btn" onClick={()=>editHandler(el)}> edit</button>
                          <button className="btn" onClick={() => deleteHandler(el) }> delete</button>
                    </div>

                  </div>
                  <div >
                    <div className="text-component">
                      {el.updatedAt}
                    </div>
                    <div className="text-component-btn">
                      <button className="btn">{el.status}</button>
                    </div>
                  </div>

                </div>
              </div>
            </>
            })}

          </div>
        </Wrapper>
        </>
        )
      }
}
const Wrapper = styled.div`
font-size:1.2em;
text-component-btn{
  display:flex;
  justify-content:space-between;
  
}

.job-card{
  width:30%;
  background-color:aliceblue;
  padding:1.2rem;
  margin:1.2rem;
}
.text-component{
  margin:1.2rem;
  display:flex;
 
  justify-content:space-between;
  
}

.title{
  display:flex;
  
}
.icon{
  background-color:#2cb1bc;
  color:white;
  width:30%; 
  margin:0 1.2rem;
}

.text{
  display:flex;
  justify-content:space-between;
  flex-wrap:wrap;
}
.sec{
  display:flex;
  flex-wrap:wrap;
}
background-color:white;
padding:1.8rem;
box-shadow:0 0.5rem 0rem #20b5d6;

.btn{
  margin-top:2rem;
  height:50%;
  width:100%;
  
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
  .text-component .btn{
   margin:0;
}

`

export default Alljobs
