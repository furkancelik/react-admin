import React from "react";

import { useTable, useSortBy, useFilters, usePagination } from "react-table";
import { Spinner, Table, Pagination, Form, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function EmptyFilter() {
  return <Form.Control type="text" disabled />;
}

export function SelectFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
  optionsLabel = null,
  options: optionsValue = null
}) {
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach(row => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  return (
    <Form.Control
      as="select"
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined);
      }}>
      <option value="">Tümü</option>
      {optionsValue === null
        ? options.map((option, i) => (
            <option key={i} value={option}>
              {optionsLabel ? optionsLabel[option] : option}
            </option>
          ))
        : optionsValue.map((option, i) => (
            <option key={i} value={option.value}>
              {option.label}
            </option>
          ))}
    </Form.Control>
  );
}

export function CheckFilter({ column: { filterValue, setFilter, id } }) {
  return (
    <Form.Label
      className={"text-center"}
      style={{ width: "100%", height: "100%" }}>
      <Form.Check
        onChange={e => {
          setFilter(e.target.checked || undefined);
        }}
      />
    </Form.Label>
  );
}

function DefaultFilter({ column: { filterValue, setFilter } }) {
  return (
    <Form.Control
      type="text"
      value={filterValue || ""}
      onChange={e => {
        setFilter(e.target.value || undefined);
      }}
    />
  );
}

function pagination(totalButton = 7, current = 1, size = 28) {
  return Array(totalButton)
    .fill(null)
    .map((v, i) => {
      if (current - 4 < 0) {
        return `${i + 1}`;
      } else {
        if (current > size - 3) {
          return `${i + 1 + size - totalButton}`;
        }
        return `${i + current - 3}`;
      }
    });
}

export default function ReactTable({
  columns,
  data,
  loading = null,
  pageSize: totalPage = 10,
  pageIndex: currentPage = 0
}) {
  const filterTypes = React.useMemo(
    () => ({
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      }
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultFilter
      // width: 200,
      // minWidth: 100,
      // maxWidth: 300
    }),
    []
  );
  console.log("DATA-->", data);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
      initialState: {
        pageSize: totalPage,
        pageIndex: currentPage
      },
      autoResetPage: false,
      autoResetFilters: false,
      autoResetSortBy: false
    },
    useFilters,
    useSortBy,
    usePagination
  );

  return (
    <>
      <Table striped bordered responsive hover {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <>
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    <span className={"position-absolute ml-1"}>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <FontAwesomeIcon icon={["fas", "sort-amount-up"]} />
                        ) : (
                          <FontAwesomeIcon
                            icon={["fas", "sort-amount-down-alt"]}
                          />
                        )
                      ) : (
                        ""
                      )}
                    </span>
                  </th>
                ))}
              </tr>
              <tr>
                {headerGroup.headers.map(column => (
                  <th className={"m-0 p-2"} {...column.getHeaderProps()}>
                    <div>
                      {column.canFilter ? column.render("Filter") : null}
                    </div>
                  </th>
                ))}
              </tr>
            </>
          ))}
        </thead>
        {loading ? (
          <tbody {...getTableBodyProps()}>
            <tr>
              <td
                disabled
                colSpan={999}
                style={{
                  padding: "2rem",
                  height: 450,
                  "vertical-align": "middle"
                }}>
                <p className={"text-center"} style={{ fontSize: "1.2rem" }}>
                  <div>
                    <Spinner animation="grow" />
                    <Spinner animation="grow" />
                    <Spinner animation="grow" />
                  </div>
                  <div style={{ fontSize: "1rem" }}>
                    Veriler getiriliyor lütfen bekleyiniz.
                  </div>
                </p>
              </td>
            </tr>
          </tbody>
        ) : rows.length > 0 ? (
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td
                        {...cell.getCellProps({
                          style: cell.column.style,
                          className: cell.column.className
                        })}>
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        ) : (
          <tbody {...getTableBodyProps()}>
            <tr>
              <td
                disabled
                colSpan={999}
                style={{
                  padding: "2rem",
                  height: 450,
                  "vertical-align": "middle"
                }}>
                <p className={"text-center"} style={{ fontSize: "1rem" }}>
                  Kayıtlı veri bulunamadı!
                </p>
              </td>
            </tr>
          </tbody>
        )}
      </Table>

      <div className={"float-left"}>
        <Pagination className={"ml-3"}>
          <Pagination.First
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          />
          <Pagination.Prev
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          />
          {pageCount > 7 && pageIndex + 1 >= 5 && <Pagination.Ellipsis />}
          {pagination(
            Math.ceil(pageCount) >= 7 ? 7 : Math.ceil(pageCount),
            parseInt(pageIndex) + 1,
            Math.ceil(pageCount)
          ).map(v => (
            <Pagination.Item
              key={v}
              onClick={() => gotoPage(v - 1)}
              active={v - 1 === pageIndex}>
              {v}
            </Pagination.Item>
          ))}
          {pageCount > 7 && pageCount - 4 > pageIndex && (
            <Pagination.Ellipsis />
          )}

          <Pagination.Next onClick={() => nextPage()} disabled={!canNextPage} />
          <Pagination.Last
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          />
        </Pagination>
      </div>
      <div className={"float-left ml-3 mb-3"}>
        <Form.Control
          as="select"
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
          }}>
          {[5, 10, 20, 25, 50, 100].map((v, i) => (
            <option key={i} value={v}>
              {v} Satır
            </option>
          ))}
        </Form.Control>
      </div>
    </>
  );
}
