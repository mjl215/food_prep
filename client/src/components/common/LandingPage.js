import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

const LandingPage = ({auth}) => {
    if(auth.authorized){
        return  <Redirect to='/meals'/>
    }


    return (
        <div className="landing--page">
            <div className="landing--page__content">
                <h1>Welcome </h1>
                <h4>Food Prep allows you book private chefs to come to your house and prep your meals for the week</h4>
                <div className="landing--page__content__button--container">
                    <button className="landing--page__content__button view--meal--button"><Link className="landing--page__link" to="/meals">Veiw the meals</Link></button>
                    <button className="landing--page__content__button"><Link className="landing--page__link" to="/register">Register</Link></button>
                    <button className="landing--page__content__button"><Link className="landing--page__link" to="/login">Log in</Link></button>
                </div>
                
            </div>
            
        </div>
    )
}

const mapStateToProps =(state) => ({
    auth: state.auth
  })

export default connect(mapStateToProps)(LandingPage);
