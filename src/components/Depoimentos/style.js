import styled from 'styled-components'

export const DepoimentoWrapper = styled.div`
  align-items: center;
  display: flex;
  padding: 10px 0;
  width: 100%;

  &:not(:last-child) {
    border-bottom: 1px solid #f4f4f4;
  }
`

export const Avatar = styled.img`
  border-radius: 50%;
  height: 60px;
  margin-right: 10px;
  width: 60px;
`

export const DepoimentoPost = styled.span`
  align-items: center;
  display: flex;
  gap: 5px;

  a {
    color: #6f92bb;
    text-decoration: none;
  }

  p {
    font-size: 11px;
  }
`
