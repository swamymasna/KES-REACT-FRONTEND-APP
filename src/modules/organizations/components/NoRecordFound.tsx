import React from "react";
import noRecordsFoundImg from "../../../assets/img/noRecordFound.jpg";

const NoRecordFound: React.FC = () => {
  return (
    <>
      <div className="container">
        <div className="row text-center">
          <div className="col">
            {/* <img src={noRecordsFoundImg} height={600} width={600} alt="" /> */}
            <h2 className="text-danger">No Records Found</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoRecordFound;
