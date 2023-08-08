import { useState, useEffect, useMemo } from "react";
import "./style.css";

import { useCoupons } from "../../context/CouponContext";

export function CouponValues({ updateValues, type }) {
  const { updateStats, winningNumbers, plusNumbers } = useCoupons();
  const [values, setValues] = useState(Array(6).fill(""));
  const [statsSet, setStatsSet] = useState(false);

  useEffect(() => {
    if (updateValues === undefined) return;

    const debounce = setTimeout(() => {
      updateValues(values);
    }, 300);

    return () => clearTimeout(debounce);
  }, [values, updateValues]);

  function handleValueChange(value, id) {
    setValues(
      values.map((v, i) => {
        if (i === id) {
          return value;
        } else {
          return v;
        }
      })
    );
  }

  const status = useMemo(() => {
    if (type === "input") return null;

    if (values.includes("")) return null;

    const winMatches = values.filter(
      (value) => value !== null && winningNumbers.includes(value)
    );

    const plusMatches = values.filter(
      (value) => value !== null && plusNumbers.includes(value)
    );

    if (winMatches.length >= 3) {
      return { status: "success", weight: winMatches.length };
    }

    if (plusMatches.length >= 3) {
      return { status: "plus", weight: plusMatches.length };
    }

    return { status: "fail" };
  }, [winningNumbers, values, type, plusNumbers]);

  useEffect(() => {
    if (!status) return;

    if (["success", "plus"].includes(status.status) && statsSet === false) {
      updateStats(status.weight, values, status.status);
      setStatsSet(true);
    }
  }, [status, values, updateStats, statsSet]);

  return (
    <div
      className={`container ${
        type === "input" ? "win-numbers" : "coupon-container"
      }`}
    >
      <div className="coupon-values">
        {values.map((value, index) => {
          return (
            <input
              className={`coupon-value ${
                type !== "input"
                  ? winningNumbers && winningNumbers.includes(value)
                    ? "success"
                    : plusNumbers && plusNumbers.includes(value)
                    ? "plus"
                    : ""
                  : ""
              }`}
              value={value}
              key={index}
              onChange={(e) => handleValueChange(e.target.value, index)}
            />
          );
        })}
      </div>
      {status && (
        <div className={`win-status ${status && status.status}`}>
          {status && status.status === "success"
            ? `You won! (${status.weight})`
            : status && status.status === "plus"
            ? `You won plus! (${status.weight})`
            : "You lost!"}
        </div>
      )}
    </div>
  );
}
