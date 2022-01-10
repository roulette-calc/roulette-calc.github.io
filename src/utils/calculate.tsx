import React from "react";

export const calculate = ({ money, bet }: { money: number; bet: number }) => {
  let iter = 0;
  let spin = 0;
  let total = 0;
  let prevWin = false;
  let res: {
    spin: number;
    curBet: number;
    total: number;
    money: number;
    won?: boolean;
  }[] = [];
  if (!money || !bet) return [];

  while (money >= 0) {
    const chance = Math.random() * 100;
    const curBet = prevWin ? bet : Math.pow(2, iter) * bet;

    if (chance < 45) {
      money += curBet;
      total += curBet;
      iter = 0;
      prevWin = true;
      res.push({
        spin: spin + 1,
        curBet,
        total,
        money,
        won: true,
      });
    } else {
      total -= curBet;
      money -= curBet;
      prevWin = false;
      money >= 0 &&
        res.push({
          spin: spin + 1,
          curBet,
          total,
          money,
        });
      iter++;
    }

    spin++;
  }

  return res;
};
