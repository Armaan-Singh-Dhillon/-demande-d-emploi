import { useState, useContext } from 'react'
import React from 'react';
import axios from 'axios'

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const location = localStorage.getItem('location')

const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: null || user,
    token: null || token,
    userLocation: '' || location,
    location: '' || location,
    isEditing: false,
    job: {}


}

const AppContext = React.createContext()


const AppProvider = ({ children }) => {

    let [state, setState] = useState(initialState)

    const displayAlert = () => {

        setState({ ...state, showAlert: true, alertText: 'Please provide all values !', alertType: 'danger' })

    }
    const authfetch = axios.create({
        baseURL: 'http://localhost:5000/api/v1',

    })


    const addUserToLocalStorage = ({ user, token, location }) => {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
        localStorage.setItem('location', location)

    }
    const removeUserFromLocalStorage = ({ user, token, location }) => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('location')

    }
    const registerUser = async (currentUser) => {
        setState({ isLoading: true, ...state })
        try {

            const response = await axios.post('http://localhost:5000/api/v1/auth/register', currentUser)

            const { user, token, location } = response.data
            console.log(response.data)

            addUserToLocalStorage({ user, token, location })

            setState({ ...state, user: user, token, location, isLoading: false, alertType: 'success', showAlert: true, alertText: 'User Created! Redirectiong ...' })
        } catch (error) {
            setState({ ...state, isLoading: false, showAlert: true, alertType: 'danger', alertText: error.response.data.message })
        }
    }
    const loginUser = async (currentCredentials) => {
        setState({ isLoading: true, ...state })
        try {

            const response = await axios.post('http://localhost:5000/api/v1/auth/login', currentCredentials)

            const { user, token, location } = response.data

            addUserToLocalStorage({ user, token, location })

            setState({ ...state, user: user, token, location, isLoading: false, alertType: 'success', showAlert: true, alertText: 'Logging in ..' })
        } catch (error) {
            setState({ ...state, isLoading: false, showAlert: true, alertType: 'danger', alertText: error.response.data.message })
        }
    }
    const logotUser = () => {
        removeUserFromLocalStorage()
    }
    const updateUser = async (currentUser) => {

        try {
            const { data } = await authfetch.patch('/auth/updateUser', currentUser)
            const { user, token, location } = data
            addUserToLocalStorage({ user, token, location })

            setState({ ...state, user: user, token, location, isLoading: false, alertType: 'success', showAlert: true, alertText: 'User Profile Updated !' })
        } catch (error) {
            setState({ ...state, user: user, token, location, isLoading: false, alertType: 'danger', showAlert: true, alertText: error.response })
        }
    }
    authfetch.interceptors.request.use(
        (config) => {
            config.headers.Authorization = `Bearer ${state.token}`
            return config
        },
        (error) => {
            return Promise.reject(error)
        }
    )
    authfetch.interceptors.request.use(
        (response) => {

            return response

        },
        (error) => {
            console.log(error.response);
            if (error.response.status == 401) {
                console.log('Auth Error')
            }
            return Promise.reject(error)
        }
    )
    const createJob = async (job) => {
        try {
            const { data } = await authfetch.post('/jobs', job)

            setState({ ...state, user: user, token, location, isLoading: false, alertType: 'success', showAlert: true, alertText: 'Job Created' })
            return data
        } catch (error) {
            console.log(error.response);
        }
    }
    const getAllJob = async (job) => {
        setState({ isLoading: true, ...state })
        try {
            const { data } = await authfetch.get('/jobs')

           console.log(data)
            return data
        } catch (error) {
            console.log(error.response);
        }
    }
    const setEditJob = (job) => {
        setState({ isLoading: true, ...state, isEditing: true ,job })
        
    }
    const editJob = async(job) => {
        console.log(job)
        try {
            await authfetch.patch(`/jobs/${job._id}`,job)

            setState({ ...state, user: user, token, location, isLoading: false, alertType: 'danger', showAlert: true, alertText: 'Job Updated' })


        } catch (error) {
            console.log(error.response);
        }

    }
    const deleteJob =async (job) => {
        
        try {
          await authfetch.delete(`/jobs/${job._id}`)

            setState({ ...state, user: user, token, location, isLoading: false, alertType: 'danger', showAlert: true, alertText: 'Job Delted' })

            
        } catch (error) {
            console.log(error.response);
        }

    }


    return <AppContext.Provider value={{ state, setState, displayAlert, registerUser, loginUser, updateUser, user, editJob, createJob, getAllJob, deleteJob, editJob, setEditJob }}>
        {children}
    </AppContext.Provider>
}
const useAppContext = () => {

    return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }