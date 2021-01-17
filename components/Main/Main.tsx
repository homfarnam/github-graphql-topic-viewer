import { useQuery } from "@apollo/client"
import Link from "next/link"
import { useState } from "react"
import styled from "styled-components"
import { REACT_REPOS } from "../../Queries/queries"
import { Button, CircularProgress, TextField } from "@material-ui/core"
import Table from "../Table/Table"

interface TableProps {}

const SpinnerContainer = styled.div`
  display: "flex";
  justify-content: "center";
  align-items: center;
  margin-top: "1rem";
  margin: 0 auto;
`

export const Main: React.FC<TableProps> = () => {
  const [Page, setPage] = useState<string>()

  const { data, loading, error } = useQuery(REACT_REPOS, {
    variables: {
      search_term: "topic:react sort:stars-desc",
      after: Page,
    },
  })

  if (loading) {
    return (
      <SpinnerContainer>
        <CircularProgress />
      </SpinnerContainer>
    )
  }
  if (error) {
    return <div>{error}</div>
  }

  if (!data.search) {
    return <p>There are no data!</p>
  }

  return (
    <>
      <div className="flex justify-center items-center flex-col w-full">
        <div className="flex flex-row justify-evenly w-10/12 my-10">
          <Button
            variant="contained"
            color="primary"
            onClick={() => setPage(data.search.pageInfo.startCursor)}
          >
            Previous Page
          </Button>
          <TextField
            id="standard-search"
            label="Search field"
            type="search"
            color="primary"
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setPage(data.search.pageInfo.endCursor)}
          >
            Next Page
          </Button>
        </div>
        {data ? <Table data={data.search} /> : ""}
      </div>
    </>
  )
}

export default Main
