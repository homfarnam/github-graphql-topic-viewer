import styled from "styled-components"
import Main from "../components/Main/Main"

const MyContainer = styled.div`
  width: 1170px;
`

const IndexPage = () => {
  return (
    <>
      <MyContainer>
        <Main />
      </MyContainer>
    </>
  )
}

export default IndexPage
