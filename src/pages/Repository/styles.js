import styled, {keyframes} from 'styled-components';
import {Link} from "react-router-dom";

const rotate = keyframes`
  from {
    transform: rotate(0deg)
  }

  to {
    transform: rotate(360deg)
  }
`;

export const Container = styled.div`
  max-width: 700px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin: 80px auto;
  position: relative;

  h1 {
    font-size: 20px;
    display: flex;
    align-items: center;
    flex-direction: row;

    svg {
      margin-right: 10px;
    }
  }
`;

export const Loading = styled.div`
  color: white;
  font-size: 16px;
  font-weight: 600;
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 100%;

  svg {
    animation: ${rotate} infinite linear 1s;
    display: block;
    margin-bottom: 20px;
  }
`;


export const Owner = styled.div`
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;

  img {
    display: block;
    margin: 0 auto 10px;
    max-width: 80px;
    border-radius: 50%;
  }
  
  p {
    color: #555;
    margin-top: 5px;
  }
  
`;

export const IssuesList = styled.div`
  display: block;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
`;

export const Issue = styled.h2`
  display: block;
  padding: 10px 10px;
  border: 1px solid #eee;
  border-radius: 2px;
  word-break: break-all;
  line-height: 1.2;
  transition: 0.3s ease;
  
  & + h2 {
    border-top: none;
  }
  
  &:hover {
    background-color: #eee;
  }
  
  a {
    font-size: 15px;
    font-weight: bold;
    text-decoration: none;
    cursor:pointer;
    color: #333;
  }
  
  span {
    display: inline-block;
    padding: 4px 7px;
    font-size: 14px;
    transition: all ease 0.2s;
    box-shadow: 0 0 5px rgba(0,0,0,0.1);
    border-radius: 2px;
    color: #444;
    font-weight: 500;
    margin-left: 5px;
    
    &:nth-child(1) {
      margin-left: 15px;
    }
    
    &:hover {
      background-color: #7159c2;
      color: white;
    }
  }
`;

export const BackLink = styled(Link)`
  position: absolute;
  right: 20px;
  top: 20px;
  text-decoration: none;
`;