import React from 'react';
import { connect } from 'react-redux';

const Alert = ({error, errorType}) => {

  const renderError = error.filter((err) => err.type === errorType).map((err) => {
    return (
      <p 
        key={err.id}
        className="alert__text"
      >
          {err.message}
      </p>
    )
  })

  return (
    <div className="alert">
      {renderError && renderError}
    </div>
  )
}

const mapStateToProps = (state) => ({
  error: state.error
})

export default connect(mapStateToProps)(Alert);