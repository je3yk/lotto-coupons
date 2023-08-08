import { createContext, useContext } from "react";
import { useState } from "react";

export const CouponContext = createContext(null);

export function CouponProvider({ children }) {
  const [winningNumbers, setWinningNumbers] = useState(Array(6).fill(""));
  const [plusNumbers, setPlusNumbers] = useState(Array(6).fill(""));
  const [couponRows, setCouponRows] = useState(
    Array(3)
      .fill(null)
      .map(() => {
        return Math.floor(Math.random() * 500) + 1;
      })
  );
  const [stats, setStats] = useState({
    success: {
      3: [],
      4: [],
      5: [],
      6: [],
    },
    plus: {
      3: [],
      4: [],
      5: [],
      6: [],
    },
  });

  function updateStats(key, values, type) {
    const prevValues = stats[type];
    const filteredPrevValues = prevValues[key].filter((v) => {
      return v.join("") !== values.join("");
    });

    setStats({
      ...stats,
      [type]: {
        ...prevValues,
        [key]: [...filteredPrevValues, values],
      },
    });
  }

  function addCouponRow() {
    setCouponRows([...couponRows, Math.floor(Math.random() * 500) + 1]);
  }

  function resetCoupons() {
    setCouponRows(
      Array(3)
        .fill(null)
        .map(() => Math.floor(Math.random() * 500) + 1)
    );

    setStats({
      3: [],
      4: [],
      5: [],
      6: [],
    });
  }

  function deleteLastRow() {
    setCouponRows(couponRows.slice(0, couponRows.length - 1));
  }

  return (
    <CouponContext.Provider
      value={{
        winningNumbers,
        setWinningNumbers,
        plusNumbers,
        setPlusNumbers,
        addCouponRow,
        resetCoupons,
        deleteLastRow,
        couponRows,
        updateStats,
        stats,
      }}
    >
      {children}
    </CouponContext.Provider>
  );
}

export function useCoupons() {
  const context = useContext(CouponContext);

  if (!context) {
    throw new Error("useCoupons must be used within a CouponProvider");
  }

  return context;
}
