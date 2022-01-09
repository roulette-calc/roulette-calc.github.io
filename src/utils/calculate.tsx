import React from "react";

export const calculate = ({ money, bet }: { money: number; bet: number }) => {
  let iter = 0;
  let spin = 0;
  let total = 0;
  let res: { spin: number; curBet: number; total: number; won?: boolean }[] =
    [];
  if (!money || !bet) return [];

  while (money >= 0) {
    let chance = Math.random() * 100;
    console.log("money: ", money);
    if (chance < 49) {
      money += bet;
      iter = 0;
      res.push({ spin: spin + 1, curBet: bet, total, won: true });
    } else {
      let curBet = Math.pow(2, iter) * bet;
      total += curBet;
      money -= curBet;
      money >= 0 && res.push({ spin: spin + 1, curBet, total });
    }

    iter++;
    spin++;
  }

  return res;
};
