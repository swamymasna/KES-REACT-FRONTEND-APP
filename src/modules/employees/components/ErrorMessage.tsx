import React from 'react'

interface IProps{
    message: string;
}

const ErrorMessage:React.FC<IProps> = (props) => {
  return (
    <>
      <div className="container">
        <div className="row">
            <div className="col">
                <span className='text-danger'>{props.message}</span>
            </div>
        </div>
      </div>
    </>
  )
}

export default ErrorMessage
