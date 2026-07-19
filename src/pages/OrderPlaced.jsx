import { Button } from "react-bootstrap";
import { GiPartyPopper } from "react-icons/gi";
import { PiTruckFill } from "react-icons/pi";
import { Link } from "react-router-dom";

export default function OrderPlaced() {
  return (
    <>

      <div className="rounded p-4 mb-4 d-flex flex-column align-items-center justify-content-center text-center">
        <GiPartyPopper size={80} className="text-warning mb-3" />
        <h1 className="fw-bold">Order placed successfully!</h1>
      </div>

      <div className="rounded p-4 mb-4" style={{ backgroundColor: "#ffe6f0" }}>
        <div className="d-flex align-items-center gap-2 mb-4">
          <h3 className="mb-0 fw-bold">Estimated Delivery</h3>
          <PiTruckFill className="fs-4 text-primary" />
        </div>
        
        <h6 className="text-muted mb-5">Saturday October 10<sup>th</sup>, 2025</h6>

        <div className="d-flex align-items-center w-100">
          
          <div className="d-flex align-items-center gap-2">
            <span 
              className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" 
              style={{ width: "30px", height: "30px", minWidth: "30px" }}
            >
              1
            </span>
            <span className="fw-bold text-primary small">Placed</span>
          </div>

          <div className="flex-grow-1 mx-2" style={{ height: "2px", backgroundColor: "#4338ca" }}></div>

          <div className="d-flex align-items-center gap-2">
            <span 
              className="border border-primary text-primary bg-white rounded-circle d-flex align-items-center justify-content-center fw-bold" 
              style={{ width: "30px", height: "30px", minWidth: "30px" }}
            >
              2
            </span>
            <span className="fw-bold text-primary small">Processing</span>
          </div>

          <div className="flex-grow-1 mx-2" style={{ height: "2px", backgroundColor: "#cbd5e1" }}></div>

          <div className="d-flex align-items-center gap-2">
            <span 
              className="border text-muted bg-white rounded-circle d-flex align-items-center justify-content-center fw-bold" 
              style={{ width: "30px", height: "30px", minWidth: "30px" }}
            >
              3
            </span>
            <span className="text-muted small">Shipped</span>
          </div>

        </div>

            <div className="flex-grow-1 mx-2 mt-5" style={{ height: "2px", backgroundColor: "#cbd5e1" }}></div>

            <div className=" d-flex justify-content-between  mt-2 mb-5">
            <div>
                <h5> Shipping Address </h5> 
                <h8> Hadeer Ibrahim Ali </h8>
                <h8> 123 Alexandria, Egypt </h8>
            </div>
            <div>
                <h5> Shipping Method </h5>
                <h8> Express Delivery (2-3 Bussiness Days)</h8>
            </div>
      </div>
      </div>

      <Button as={Link} to={"/products"} className="rounded p-4 mb-4 w-100 fw-semibold fs-5" variant="outline-primary"> Continue Shopping </Button>
    </>
  );
}