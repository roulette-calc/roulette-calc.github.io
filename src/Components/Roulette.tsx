import React, { useState } from "react";
import styled from "styled-components";
import { calculate } from "../utils/calculate";

export const Roulette = () => {
  const [money, setMoney] = useState<number>(0);
  const [bet, setBet] = useState<number>(0);
  const [started, setStarted] = useState<boolean>(false);
  const [result, setResult] = useState<
    {
      spin: number;
      curBet: number;
      total: number;
    }[]
  >();

  const handleClick = () => {
    setResult(calculate({ money, bet }));
    setStarted(true);
  };

  return (
    <>
      <Wrapper>
        <Title>Roulette Calculator</Title>
        <InputContainer>
          <Label>How much money do you have?</Label>
          <Input onChange={(e) => setMoney(Number(e.target.value))} />
        </InputContainer>
        <InputContainer>
          <Label>What's the starting bet?</Label>
          <Input onChange={(e) => setBet(Number(e.target.value))} />
        </InputContainer>
        <Button onClick={handleClick}>Go</Button>

        {started && (
          <Result key={result?.length}>
            {result?.map((el) => {
              return (
                <span key={el.spin}>
                  <Res>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                      }}>
                      <Line>Spin: {el.spin}</Line>
                      <Line>current bet: {el.curBet}</Line>
                    </div>
                    <Line total>Total spent: {el.total}</Line>
                  </Res>
                  <Divider />
                </span>
              );
            })}
          </Result>
        )}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div``;
const Title = styled.h1``;
const InputContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;
const Label = styled.p``;
const Input = styled.input`
  height: 2rem;
  margin-left: 1rem;
`;
const Button = styled.button`
  background: #eee;
  border: 1px solid #aaa;
  width: 4rem;
  height: 2rem;
  cursor: pointer;
`;

const Result = styled.div`
  display: flex;
  flex-direction: column;
`;
const Res = styled.div`
  display: flex;
  align-items: center;

  gap: 2rem;
`;
const Line = styled.p<{ total?: boolean }>`
  margin: 0;
  margin-top: 0.5rem;
  ${(props) => props.total && `font-weight: 700;`}
`;
const Divider = styled.div`
  width: 100%;
  height: 1px;
  border-bottom: 1px dashed #bbb;
  margin-top: 1rem;
`;
