import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Logo from '../components/Logo'
import Alert from '../components/Alert'
import { useAppContext } from '../context/AppContext'

const Register = () => {
 
  const navigate = useNavigate()
  const { isLoading, displayAlert, registerUser, state, loginUser } = useAppContext()
  

  const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true,
    showalert: state.showAlert,
    location:'mycity'
  }
  const [val, setVal] = useState(initialState)


  const { name, password, email, isMember, showalert, location } = val
  const clickHandler = () => {

    setVal({ ...val, isMember: !(val.isMember) })

  }
  const handleChangeMail = (e) => {


    setVal({ ...val, email: e.target.value })
  }
  const handleChangeName = (e) => {

    setVal({ ...val, name: e.target.value })
  }
  const handleChangePassword = (e) => {


    setVal({ ...val, password: e.target.value })
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()

    if (!email || !password || (!isMember && !name)) {

      displayAlert()

      setVal({ ...val, showalert: !state.showalert })
      setTimeout(() => {
        setVal({ ...val, showalert: false })

      }, 1500);
      return
    }

    const currentUser = { name, password, email, isMember ,location }

    const currentCredentials = { password, email}
    if (isMember) {
      loginUser(currentCredentials)
    }
    else {
      registerUser(currentUser)
    }
    setVal({ ...val, showalert: state.showAlert })
    setTimeout(() => {
      setVal({ ...val, showalert: false })
     
    }, 1000);

    
  }
  
  useEffect(() => {

    if (state.user) {
      setTimeout(() => {

        navigate('/dashboard')
      }, 2000)
    }
  }, [state.user, navigate])
  return (
    <>
      <Wrapper>

        <div className='main'>
          <div className='inner'>
            <div className='center'>

              <Logo></Logo>
            </div>
            <div className='center'>
              <h2>{isMember ? 'Login' : 'Register'}</h2>
            </div>
            {showalert && <Alert></Alert>}
            <div className={isMember ? 'noshow' : 'show'}>
              <h4>Name</h4>
            </div>
            <div className={isMember ? 'noshow' : 'show'}>
              <input type="text" onChange={(e) => handleChangeName(e)} />
            </div>
            <div>
              <h4>Email</h4>
            </div>
            <div>
              <input type="text" onChange={(e) => handleChangeMail(e)} />
            </div>
            <div>
              <h4>Password</h4>
            </div>
            <div>
              <input type="password" onChange={(e) => handleChangePassword(e)} />
            </div>
            <div>
              <button className='btn' disabled={isLoading} onClick={(e) => handleSubmit(e)}>Submit</button>
            </div>
            <div className='last center'>
              <h6>{isMember ? 'Not a member yet ?' : 'Already a member ?'}
                <button className='text' onClick={clickHandler}>

                  {isMember ? 'Register' : 'Login'}
                </button>
              </h6>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  )
}
const Wrapper = styled.div`
.noshow{
  display:none;
}
.text{
  border:none;
  background:none;
  font-size:1.1rem;
  color:#20b5d6;


}
.text:hover{
 cursor:pointer;
}
.last{
  font-size:1.6rem;
}
.last h6{
     padding:0;
     margin:1rem ;
     font-wieght:300;
}
.btn{
  width:100%;
  font-size:1.2rem;
}
input{
  width:100%;  
  font-size:1.5rem;
  margin-bottom:1.2rem;
  background-color:#edfbff;
  padding:1.2rem;
  border:none;
}
.center{
  text-align:center;
}
.main{
  display:flex;
  
  justify-content:space-evenly;
  height:50rem;
  align-items:center;

}
.inner{
  width:30%;
  background-color:green;
  display:flex;
  flex-direction:column;
  padding:1.6rem;
  background-color:white;
  box-shadow:0 0.5rem #20b5d6;
  border-radius:1.2rem;
}
background-color:aliceblue;
`

export default Register