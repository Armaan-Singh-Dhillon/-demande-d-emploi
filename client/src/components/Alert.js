import { useAppContext } from "../context/AppContext"


const Alert = () => {
    const {state} = useAppContext()

  return (
    <>
   
          <div className={`alert alert-${state.alertType}`}>
              
              {`${state.alertText}`}
       </div>
    
    </>
  )
}

export default Alert