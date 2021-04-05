import React from "react"
import {connect} from "react-redux";
import {Redirect} from "react-router-dom"

function useAuth(WrappedComponent) {
    return connect(mapStateToProps, null)(class extends React.Component {
        render() {
            if (!this.props.session.connected) {
                return (
                    <Redirect to={"/"}/>
                )
            } else {
                return (
                    <div>
                        <WrappedComponent/>
                    </div>
                )
            }
        }
    })
}

function noAuth(WrappedComponent) {
    return connect(mapStateToProps, null)(class extends React.Component {
        render() {
            if (this.props.session.connected) {
                return (
                    <Redirect to={"/dashboard"}/>
                )
            } else {
                return (
                    <div>
                        <WrappedComponent/>
                    </div>
                )
            }
        }
    })
}

const mapStateToProps = (state) => {
    return {
        session: state.session
    }
}


export {
    useAuth,
    noAuth
}
