import styled from 'styled-components';

export const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin: 10px 0;
    border: 1px solid #ccc;
`;

export const StyledTH = styled.th`
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    text-align: left;
    padding: 4px 8px;
    width: 33%;
`;

export const StyledTD = StyledTH.extend`
    border-top: 0;
    font-weight: normal;
    padding: 6px 8px;
`;

export const StyledTBody = styled.tbody`
    tr:nth-child(odd) {
        background-color: #ddd;
    }
`;