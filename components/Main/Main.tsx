import { useQuery } from "@apollo/client"
import { Button, CircularProgress, TextField } from "@material-ui/core"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { REACT_REPOS } from "../../Queries/queries"
import Table from "../Table/Table"

interface TableProps {}

const SpinnerContainer = styled.div`
  display: "flex";
  justify-content: "center";
  align-items: center;
  margin-top: "1rem";
  margin: 0 auto;
  width: 50px;
`

export const Main: React.FC<TableProps> = () => {
  const [Page, setPage] = useState<string>()
  const [Topic, setTopic] = useState<string>("react")

  // Get datas from github graphql api with schema
  const { data = {}, loading, error } = useQuery(REACT_REPOS, {
    variables: {
      search_term: `topic:${Topic} sort:stars-desc`,
      after: Page,
    },
  })

  const { search = { edges: [] } } = data

  const [repoList, setRepoList] = useState(search.edges)
  useEffect(() => {
    if (!loading) {
      setRepoList(search.edges)
    }
  }, [loading])

  // Search Input onChange Handler
  const topicOnChange = (e: any) => {
    e.preventDefault()
    setTopic(e.target.value)
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
            onChange={topicOnChange}
            value={Topic}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setPage(data.search.pageInfo.endCursor)}
          >
            Next Page
          </Button>
        </div>
        {loading ? (
          <SpinnerContainer>
            <CircularProgress />
          </SpinnerContainer>
        ) : null}
        {error ? <p>Error</p> : null}

        {/* Display Table Component */}
        <Table edges={repoList} />
      </div>
    </>
  )
}

export default Main
