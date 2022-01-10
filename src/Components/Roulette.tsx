import React, { useState } from "react";
import styled from "styled-components";
import { calculate } from "../utils/calculate";

export const Roulette = () => {
  const [started, setStarted] = useState<boolean>(false);
  let [hasErrors, setHasErrors] = React.useState<boolean>(false);
  let [errors, setErrors] = React.useState<{ money: boolean; bet: boolean }>({
    money: false,
    bet: false,
  });
  const errMessage = "Please enter a valid amount of money!";
  const [result, setResult] = useState<
    {
      spin: number;
      curBet: number;
      total: number;
      money: number;
      won?: boolean;
    }[]
  >();
  const moneyInput = React.useRef<HTMLInputElement>(null);
  const betInput = React.useRef<HTMLInputElement>(null);

  const calculateResult = React.useCallback(
    () =>
      setResult(
        calculate({
          money: Number(moneyInput.current?.value),
          bet: Number(betInput.current?.value),
        })
      ),
    [setResult]
  );

  const checkForErrors = React.useCallback(
    (
      valueRef: React.RefObject<HTMLInputElement>,
      betRef: React.RefObject<HTMLInputElement>
    ) => {
      const moneyErr = isNaN(Number(valueRef.current?.value));
      const betErr = isNaN(Number(betRef.current?.value));

      if (moneyErr || betErr) {
        if (isNaN(Number(valueRef.current?.value))) {
          setErrors({ money: true, bet: errors.bet });
        }

        if (isNaN(Number(betRef.current?.value))) {
          setErrors({ money: errors.money, bet: true });
        }
        setHasErrors(true);
      } else {
        setHasErrors(false);
        setErrors({ money: false, bet: false });
      }
    },
    [errors.bet, errors.money]
  );

  const Submit = React.useCallback(() => {
    calculateResult();
    setStarted(true);
  }, [calculateResult]);

  const keyPressed = React.useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        checkForErrors(moneyInput, betInput);
        if (!hasErrors) {
          Submit();
        }
      }
    },
    [Submit]
  );

  React.useEffect(() => {
    window.addEventListener("keypress", (e: KeyboardEvent) => keyPressed(e));

    return window.removeEventListener("keypress", (e: KeyboardEvent) =>
      keyPressed(e)
    );
  }, [keyPressed]);

  return (
    <Wrapper>
      <Form>
        <Title>Roulette Calculator</Title>
        <InputContainer>
          <Label>How much money do you have?</Label>
          <Input ref={moneyInput} />
          {hasErrors && errors.money && <Error>{errMessage}</Error>}
        </InputContainer>
        <InputContainer>
          <Label>What's the starting bet?</Label>
          <Input ref={betInput} />
          {hasErrors && errors.bet && <Error>{errMessage}</Error>}
        </InputContainer>
        <Button onClick={Submit}>Go</Button>
        {started && <Label>Total spins: {result?.length}</Label>}
      </Form>

      {started && (
        <Result key={result?.length}>
          {result?.map((el) => {
            return (
              <span key={el.spin}>
                <Res>
                  <LeftBox win={el.won}>
                    <SpinNum>{el.spin}</SpinNum>
                  </LeftBox>
                  <Right>
                    <Bet>
                      Current bet: <b>{el.curBet.toFixed(2)}</b>
                    </Bet>
                    <MoneyLeft>
                      Money Left: <b>{el.money.toFixed(2)}</b>
                    </MoneyLeft>
                    <Total win={el.total}>
                      Total Wins:{" "}
                      <b style={{ color: "red" }}>${el.total.toFixed(2)}</b>{" "}
                    </Total>
                  </Right>
                </Res>
              </span>
            );
          })}
        </Result>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div``;
const Title = styled.h1``;
const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 800px) {
    align-items: start;
  }
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  @media (min-width: 800px) {
    flex-direction: row;
    items-align: start;
  }
  margin-bottom: 1rem;
`;
const Label = styled.label`
  margin: 1rem 0;
  font-size: 1.4rem;
`;
const Input = styled.input`
  height: 2rem;
  margin-left: 1rem;
`;
const Button = styled.button`
  background: #bb33ff;
  border: 2px solid #8800bb;
  border-radius: 0.3rem;
  width: 4rem;
  height: 2rem;
  cursor: pointer;
`;

const Result = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  gap: 0.5rem;
`;
const Res = styled.div`
  display: flex;
`;
const LeftBox = styled.div<{ win?: boolean }>`
  width: 100%;
  max-width: 3rem;
  height: 4rem;
  background: ${(props) => (props.win ? "#00aa00" : "#aa0000")};
  border-radius: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Right = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  & > p {
    margin: 0;
  }
`;
const Bet = styled.p`
  padding-left: 1rem;
`;
const MoneyLeft = styled.div`
  margin-left: 10rem !important;
`;

const Total = styled(MoneyLeft)<{ win?: number }>`
  &::after {
    ${({ win }) =>
      win && win >= 0
        ? `
      content: " 💸";
    `
        : `content: " 💀"`};
  }
`;

const SpinNum = styled.p`
  font-size: 1.6rem;
  font-weight: 700;
`;

const Error = styled.p`
  color: #cc0000;
`;
