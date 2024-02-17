import styled from "styled-components";

export const Container = styled.div`
  width: 90%;
  margin: 0 auto;
  margin-left: 15%;
  position: relative;

  .filterContainer {
    position: absolute;
    top: 100px;
    margin-left: 40%;
    display: flex;
    justify-content: center;

    button {
      width: 75px;
      height: 35px;
      border-radius: 10px;
      transition : 1000ms;
      cursor: pointer;
      margin-right: 10px;
      transition: filter 0.2s;
      &:hover {
      filter: brightness(0.8);
      }
      &.selecionado{
        background: var(--blue-100);
      }
    }

    select {
      margin-left: 20px;
    }
}
`

export const HeaderContainer = styled.div`
  width: 95%; 
  height: 250px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
  border-bottom: 1px solid var(--blue-200);
  background: var(--blue-700);
  h1 {
    color: #fff;
  }
  div {
    margin-top: 10px;
  }

  .userContainer {
    display: flex;
    align-items: center;
    p {
      font-weight: bold;
    }
    span {
      font-size: 11px;
    }
  }
  .avatar {
    margin-right: 10px;
    padding: 20px;
    background: var(--blue-250);
    width: 25px;
    height: 25px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
  }

  .searchContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid var(--blue-200);
    padding: 10px;
    border-radius:20px;

    svg {
      margin-right: 10px;
      transform: rotateY(180deg);
      color: #fff;
    }
    input {
      border: none;
      font-weight: bold;
      background: none;
      color: #fff;
      &:focus {
        outline: none;
      }
      &::placeholder {
        color: #fff;
      }
    }
  }
`

export const SumaryContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-top: -70px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2rem;

    div {
      background: var(--shape);
      padding: 1.5rem 2rem;
      border-radius: 0.25rem;
      color: var(--text-title);

      header {
          display: flex;
          align-items: center;
          justify-content: space-between;
      }

      strong {
          display: block;
          margin-top: 1rem;
          font-size: 2rem;
          font-weight: 500;
          line-height: 3rem; 
          
      }
      &.highlight-background {
         background:  var(--green);
         color: #FFF;
         
      }

      &.overdueBackground{
        background:  var(--red);
        color: #FFF;

      }
      &.defaultBackground{
        background: var(--gray);
      }
    }
`

export const NotesContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: space-between;
  justify-content: center;

  text-align: center;

  h2 {
    margin-bottom: 20px;
  }
  table {
  }
`

export const ChartContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  div {
   display: flex;
   flex-direction: column;
   align-items: center;
  }
`