import Link from "next/link"
import * as React from "react"
import styled from "styled-components"

interface TableProps {
  data: any
}

const TableCols = styled.thead`
  height: 60px;
  background: #36304a;
  color: white;
`

export const Table: React.FC<TableProps> = ({ data }) => {
  return (
    <table>
      <TableCols>
        <tr>
          <th>Name</th>
          <th>Stars</th>
          <th>Forks</th>
        </tr>
      </TableCols>
      <tbody>
        {data.edges.length > 0 &&
          data.edges.map(
            (repo: {
              node: {
                id: number
                name: string
                stargazerCount: number
                forkCount: number
                url: string
              }
            }) => {
              return (
                <tr key={repo.node.id}>
                  <td>
                    <Link href={repo.node.url}>{repo.node.name}</Link>
                  </td>
                  <td>{repo.node.stargazerCount}</td>
                  <td>{repo.node.forkCount}</td>
                </tr>
              )
            }
          )}
      </tbody>
    </table>
  )
}

export default Table
