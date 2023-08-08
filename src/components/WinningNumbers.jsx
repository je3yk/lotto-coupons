import { useCoupons } from "../context/CouponContext";
import { CouponValues } from "./CouponValues";

import "./style.css";

export default function WinningNumbers() {
  const { setWinningNumbers, setPlusNumbers, stats, couponRows } = useCoupons();

  return (
    <div className="win-header">
      <div className="win-section">
        <div>
          <h2>Winning numbers</h2>
          <CouponValues
            className="win-nums"
            updateValues={setWinningNumbers}
            type="input"
          />
        </div>
        <div>
          <h2>Plus numbers</h2>
          <CouponValues
            className="win-nums"
            updateValues={setPlusNumbers}
            type="input"
          />
        </div>
      </div>
      <div className="stats">
        <h3>Stats</h3>
        <div
          className="stat"
          key={`coupon-rows-${Math.floor(Math.random() * 50) + 1}`}
        >
          Number of rows: {couponRows.length}
        </div>
        <div className="stat-columns">
          {Object.keys(stats).map((category) => {
            return (
              <div className="stat-category" key={category}>
                <h4>{category} matches</h4>
                {Object.keys(stats[category]).map((key) => {
                  return (
                    <div className="stat" key={`${category}-${key}`}>
                      {key}: {stats[category][key].length}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
