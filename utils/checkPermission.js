import UnauthenticatedError from '../errors/UnauthenticatedError.js'

const checkPermission=( userObj, createdUserId)=>{
    
    if (userObj.userId === createdUserId.toString()) return
    throw new UnauthenticatedError('Permission denied')

}


export default checkPermission