import "./style.css";

import { useCoupons } from "../../context/CouponContext";
import { CouponValues } from "../CouponValues";

export function UserValues() {
  const { couponRows, addCouponRow, resetCoupons, deleteLastRow } =
    useCoupons();

  return (
    <div className="user-values">
      <h2>Your coupons</h2>
      <div className="controls">
        <button className="add-row" onClick={addCouponRow}>
          Add row
        </button>
        <button className="clear-all" onClick={resetCoupons}>
          Clear all
        </button>
        <button className="delete-row" onClick={deleteLastRow}>
          Delete row
        </button>
      </div>
      <div className="user-rows">
        {couponRows.map((row, index) => {
          return <CouponValues key={`${index}-${row}`} />;
        })}
      </div>
    </div>
  );
}
