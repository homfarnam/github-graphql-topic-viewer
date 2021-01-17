import Link from "next/link"
import * as React from "react"
import Skeleton from "react-loading-skeleton"
import styled from "styled-components"

interface TableProps {
  edges: any
}

const TableCols = styled.thead`
  height: 60px;
  background: #36304a;
  color: white;
`

// Table cell data component
const TableCell = ({ repo }: any) => {
  return (
    <tr>
      <td>
        <Link href={repo.node.url}>{repo.node.name}</Link>
      </td>
      <td>{repo.node.stargazerCount}</td>
      <td>{repo.node.forkCount}</td>
    </tr>
  )
}

// Table body data component
const Tbody = ({ edges = [] }) => {
  return (
    <tbody>
      {edges.map((repo: { node: { id: number } }) => (
        <TableCell repo={repo} key={repo.node.id} />
      ))}
    </tbody>
  )
}

export const Table: React.FC<TableProps> = ({ edges = [] }) => {
  return (
    // Table columns title
    <table>
      <TableCols>
        <tr>
          <th>Name</th>
          <th>Stars</th>
          <th>Forks</th>
        </tr>
      </TableCols>
      {edges.length ? (
        <Tbody edges={edges} />
      ) : (
        // Skeleton loading  before fetching data
        <tr>
          <Skeleton count={15} />
        </tr>
      )}
    </table>
  )
}

export default Table
