import React from "react";
import notFound404 from "../../../assets/img/notFound-404.gif";

const NotFound404 = () => {
  return (
    <>
      <div className="container mt-3 text-center">
        <img src={notFound404} height={'500'} width={'1300'} alt="" />
      </div>
    </>
  );
};

export default NotFound404;
