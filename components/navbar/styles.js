import styled from "styled-components"

export const NavbarContainer = styled.div`
  position: absolute;
  top: 0;
  width: 15%;
  height: 120vh;
  background: var(--blue-250);

  display: flex;
  justify-content: space-between;
  align-items: space-between;
  padding: 1rem;
  color: #fff;

  ul {
    height: 80%;
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    li {
      margin-top: 10px;
      width: 270px;
      padding: 10px;
      a {
        font-size: 20px;
        color: #fff;
        text-decoration: none;
      }
      &.active {
        width: 270px;
        padding: 10px;
        background: white;
        border-radius: 30px 0 0 30px;

        a {
         color: var(--blue-250);
         font-weight: bold;
        }
      }
      &:first-child {
        margin-top: 100px;
      }
    }
  }
`





