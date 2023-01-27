import { useEffect, useState } from "react"
import { useAppContext } from "../../context/AppContext"
import styled from "styled-components"
import Alert from "../../components/Alert"
const Profile = () => {
  const { user, showAlert, displayAlert, updateUser, isLoading , state} = useAppContext()
  const userdata=JSON.parse(user)
  const [name, setName] = useState(userdata?.name)
  
  const [email, setEmail] = useState(userdata?.email)
  const [lastname, setLastname] = useState(userdata?.lastname)
  const [location, setLocation] = useState(userdata?.location)
  const [show, setshow] = useState(false)
  

  const clickHandlerName = (e) => {
    setName(e.target.value)
  }
  const clickHandlerEmail = (e) => {
    setEmail(e.target.value)
  }
  const clickHandlerLastName = (e) => {
    setLastname(e.target.value)
  }
  const clickHandlerLocation = (e) => {
    setLocation(e.target.value)
  }
  const handleSubmit=(e)=>{
    e.preventDefault()

    if (!email  || !location ||  !lastname || !name) {
      displayAlert()
      setshow(true)
      setTimeout(() => {
        setshow(false)

      }, 1500);
      return
    }
    updateUser({name, email, location, lastname})
    setshow(true)
    setTimeout(() => {
      setshow(false)

    }, 1500);
    return
  }
  return (
    <>
      <Wrapper>

        <div className="content-main">
          <div>
            <h3>Profile</h3>
          </div>
          {show && <Alert></Alert>}
          <div className="content-sec">
            <div className="card">
              <div>
                Name
              </div>
              <div>
                <input type="text" onChange={(e) => clickHandlerName(e)} value={name}/>
              </div>
            </div>
            <div className="card">
              <div>
                LastName
              </div>
              <div>
                <input type="text" onChange={(e) => clickHandlerLastName(e)} value={lastname} />
              </div>
            </div>
            <div className="card">
              <div>
                Email
              </div>
              <div>
                <input type="text" onChange={(e) => clickHandlerEmail(e)} value={email} />
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
            <div className="card-btn">
              <button className="btn" onClick={(e) => handleSubmit(e)}>Save Changes</button>
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
`

export default Profile
