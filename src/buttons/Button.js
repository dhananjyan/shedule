import React from 'react'
import { css } from "@emotion/core";
import PulseLoader from "react-spinners/PulseLoader"

export default function Button({name,loading, onClick, disabled, className, type }) {
    const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
    return (
        <button onClick={onClick} disabled={disabled} className={className} type={type}>
            {loading ? <PulseLoader
            css={override}
            size={8}
            color={"#FFFFFF"}
            loading={loading}
            /> : name}
            
        </button>
    )
}
