import React from "react";

// let iter = 0;
//   while (money > 0) {
//     money -= Math.pow(2, iter) * bet;
//     if (money < 0) {
//       console.log("At most", iter, "spins.\n");
//       break;
//     }
//     if (money == 0) {
//       console.log("Exactly", iter + 1, "spins.\n");
//     }
//     iter++;
//   }

export const calculate = ({ money, bet }: { money: number; bet: number }) => {
  let iter = 0;
  let total = 0;
  let res: { spin: number; curBet: number; total: number }[] = [];
  if (!money || !bet) return [];

  while (money >= 0) {
    let curBet = Math.pow(2, iter) * bet;
    total += curBet;
    money -= curBet;
    money >= 0 && res.push({ spin: iter + 1, curBet, total });

    iter++;
  }

  return res;
};
