import React, {Component} from 'react'
import Button from '../shared/Button'
import Input from '../shared/Input/Input'
import './style.css'

const INITIAL_STATE = {
    email: "",
    password: "",
    confirmPassword: "",
    userName: ""
}

class RegisterForm extends Component {

    state = {...INITIAL_STATE}

    handleChange = ({target}) => {
        const {name, value} = target
        this.setState({[name]: value})
    }

    handleSubmit = e => {

        e.preventDefault()


        const {email, password, confirmPassword} = this.state

        if(password === confirmPassword){
            console.log(`
                Email: ${email}
                Password: ${password}
            `)

            this.setState({...INITIAL_STATE})
        }

        else {
            console.log('passwords are not equals!!!!')
        }

    }

    render() {
        const {title, buttontext} = this.props
        const {email, password, confirmPassword, userName} = this.state
        return (
            <form className="loginForm" onSubmit={this.handleSubmit}>
                <h2 className="loginFormTitle">{title}</h2>
                <div className="row">
                    <label className="label" htmlFor="email">email</label>
                    <Input className="input" name="email" type="email" onChange={this.handleChange} value={email}/>
                </div>
                <div className="row">
                    <label className="label" htmlFor="userName">user name</label>
                    <Input className="input" name="userName" type="text" onChange={this.handleChange}
                           value={userName}/>
                </div>
                <div className="row">
                    <label className="label" htmlFor="password">password</label>
                    <Input className="input" name="password" type="password" onChange={this.handleChange}
                           value={password}/>
                </div>
                <div className="row">
                    <label className="label" htmlFor="confirmPassword">confirm-password</label>
                    <Input className="input" name="confirmPassword" type="password" onChange={this.handleChange}
                           value={confirmPassword}/>
                </div>
                <div className="row">
                    <Button className="loginBtn" type="text" text={buttontext}/>
                </div>

            </form>
        )
    }
}

export default RegisterForm