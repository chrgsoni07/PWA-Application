import styled from "@emotion/styled";
import React from "react";

type ButtonGroupProps = React.CSSProperties;
export const ButtonGroup = styled.div<ButtonGroupProps>`
  display: flex;
  gap: 0.5rem;
  justify-content: ${(props) => props.justifyContent || "start"};
`;
