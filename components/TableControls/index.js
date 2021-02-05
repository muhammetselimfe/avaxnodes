const maxPagesToShow = 5

const TableControls = ({
  page,
  setPage,
  perPage,
  setPerPage,
  pagination = {},
}) => {

  const numberOfPages = Math.ceil(pagination.count / perPage) || 0

  let startPage = page - Math.floor(maxPagesToShow / 2)
  if (startPage < 1) {
    startPage = 1
  }
  if (startPage > numberOfPages - maxPagesToShow && numberOfPages - maxPagesToShow > maxPagesToShow) {
    startPage = numberOfPages - maxPagesToShow
  }
  const endPage = Math.min(startPage + maxPagesToShow, numberOfPages)

  console.log({
    page,
    startPage,
    endPage,
    pagination,
    perPage,
    numberOfPages,
  })

  return (
    <div className="row">
      <div className="col-sm-3">
        <div className="dataTables_length bs-select" id="datatable_length">
          <label>
            Show
            {' '}
            <select
              name="datatable_length"
              aria-controls="datatable"
              className=""
              onChange={(event) => setPerPage(parseInt(event.target.value, 10))}
              value={perPage}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="-1">All</option>
            </select>
            {' '}
            entries
          </label>
        </div>
      </div>
      <div className="col-sm-3"></div>
      <div className="col-sm-6">
        <div className="dataTables_paginate paging_simple_numbers" id="datatable_paginate">
          <a
            className={`paginate_button previous ${page === 1 ? 'disabled' : ''}`}
            aria-controls="datatable"
            data-dt-idx="0"
            tabIndex="-1"
            id="datatable_previous"
            onClick={(e) => {
              e.preventDefault()
              setPage(page - 1)
            }}
          >
            <div>
              <img src="/static/images/prev.svg" className="dark-angle" />
              <img src="/static/images/left-angle.svg" className="light-angle" style={{ display: 'none' }} />
            </div>
          </a>
          <span>
            {Array.from(Array(Math.max(endPage - startPage, 1)).keys()).map(index => {
              const pageNumber = startPage + index
              return (
                <a
                  key={`${index}-${pageNumber}`}
                  className={`paginate_button ${page === pageNumber ? 'current' : ''}`}
                  aria-controls="datatable"
                  data-dt-idx="1"
                  tabIndex="0"
                  onClick={(e) => {
                    e.preventDefault()
                    setPage(pageNumber)
                  }}
                >
                  {pageNumber}
                </a>
              )
            })}
          </span>
          <a
            className={`paginate_button next ${page === numberOfPages ? 'disabled' : ''}`}
            aria-controls="datatable"
            data-dt-idx="3"
            tabIndex="0"
            id="datatable_next"
            onClick={(e) => {
              e.preventDefault()
              setPage(page + 1)
            }}
          >
            <div>
              <img src="/static/images/next.svg" className="dark-angle" />
              <img src="/static/images/right-angle.svg" className="light-angle" style={{ display: 'none' }} />
            </div>
          </a>
        </div>
        <div id="jump-to-page">
          <span>Jump to page:</span>
          <div className="dataTables_length bs-select">
            <select
              disabled={numberOfPages < 40}
              className="selectpage"
              // tabIndex="-98"
              onChange={(event) => setPage(parseInt(event.target.value, 10))}
              value={page}
            >
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
            </select>
            {/* <button
              type="button"
              className="btn dropdown-toggle btn-light"
              data-toggle="dropdown"
              role="combobox"
              aria-owns="bs-select-3"
              aria-haspopup="listbox"
              aria-expanded="false"
              title="20"
            >
              <div className="filter-option">
                <div className="filter-option-inner">
                  <div className="filter-option-inner-inner">20</div>
                </div>
              </div>
            </button> */}
            {/* <div className="dropdown-menu ">
              <div className="inner show" role="listbox" id="bs-select-3" tabIndex="-1">
                <ul className="dropdown-menu inner show" role="presentation" style={{ marginTop: '0px', marginBottom: '0px' }}>
                  <li className="selected active">
                    <a role="option" className="dropdown-item active selected" id="bs-select-5-0" tabIndex="0" aria-setsize="3" aria-posinset="1" aria-selected="true">
                      <span className="text">20</span>
                    </a>
                  </li>
                  <li>
                    <a role="option" className="dropdown-item" id="bs-select-5-1" tabIndex="0">
                      <span className="text">30</span>
                    </a>
                  </li>
                  <li>
                    <a role="option" className="dropdown-item" id="bs-select-5-2" tabIndex="0">
                      <span className="text">40</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TableControls
