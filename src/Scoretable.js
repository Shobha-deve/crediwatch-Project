import React, { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate';
import ScoreRiskBadge from './ScoreRiskBadge';
function Scoretable() {
    let [scoredata, updatedata] = useState([]);
    let [search, updatesearch] = useState("");

    const getscore = () => {
        fetch("https://cdn.crediwatch.com/assets/json/ews_score.json")
            .then(response => response.json())
            .then(sdata => {
                updatedata(sdata.data);
            }
            )
    }
    
    const getfilter = (value) => {
        return (
            scoredata.filter((temp) => {     // for search option code
                if (value === "") {
                    return temp;
                } else if (temp.party_name.toLowerCase().includes(value.toLowerCase())) {
                    return temp;
                }
            })
        )
    }
    const getscorecolor = (score) => {
        if (score === "NA") {
            return (
                <div style={{ backgroundColor: "grey" }}>N/A</div>
            );
        }
        else if (score === 0 || score <= 5) {
            return (
                <div>
                    <div style={{ backgroundColor: "green" }}>LOW</div>
                </div>
            );
        }
        else if (score <= 10) {
            return (
                <div style={{ backgroundColor: "yellow" }}>MEDIUM</div>
            );
        }
        else if (score <= 15) {
            return (
                <div>
                    <div style={{ backgroundColor: "red" }}>HIGH</div>
                </div>
            );
        }
    }
    useEffect(() => {
        getscore();
    }, [])

    const PER_PAGE = 7;
    const [currentPage, setCurrentPage] = useState(1);
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage)
    }
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(scoredata.length / PER_PAGE);

    return (
        <div className='container-fluid'>
            {/* start of row1 */}
            <div className='row'>
                <div className='col-lg-9 mt-5'>
                    <label>High Risk </label>
                    <span class="badge rounded-pill text-bg-danger"><ScoreRiskBadge {...scoredata} risk="high"/></span>
                    <label>Medium Risk</label>
                    <span class="badge rounded-pill text-bg-primary"><ScoreRiskBadge {...scoredata} risk="medium" /></span>
                    <label>Low Risk</label>
                    <span class="badge rounded-pill text-bg-info"><ScoreRiskBadge {...scoredata} risk="low" /></span>
                </div>
                <div className='form-floating col-lg-3 mt-4 mb-4'>

                    <input type="text"
                        className='form-control'
                        onChange={(obj) => updatesearch(obj.target.value)}
                        value={search}
                        placeholder='Search'
                        id="floatingInput"
                    ></input>
                    <label for="floatingInput">Search</label>

                </div>
            </div>
            {/* End of row1 */}
            {/* start of row2 */}
            <div className='row'>
                <div className='col-lg-12'>
                    <table className='table table-border'>
                        <thead className='bg-info'>
                            <th>Action</th>
                            <td>Party Name</td>
                            <td>Financial Risk Score</td>
                            <td>Public data Score</td>
                            <td>Private Risk Score</td>
                            <td>Overall Risk</td>
                        </thead>
                        <tbody>
                            {getfilter(search).slice(offset, offset + PER_PAGE).map((data, index) => {
                                return (<tr key={index}>
                                    <td><button type='button'
                                        className='btn btn-light' >
                                        <i class="fa-solid fa-plus">
                                        </i></button></td>
                                    <td>{data.party_name}</td>
                                    <td>{getscorecolor(data.financial_risks.score)}</td>
                                    <td>{getscorecolor(data.non_financial_risks.score)}</td>
                                    <td>{getscorecolor(data.private_data_risks.score)}</td>
                                    <td>{getscorecolor(data.score)}</td>
                                </tr>
                                )
                            })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {/* end of row2 */}
            <div className='row'>
                <div className='col-lg-6 mt-4'>
                    <h6>Displaying parties {offset} to {offset + PER_PAGE} of {scoredata.length} in Total Records</h6>
                </div>
                <div className='col-lg-6'>
                    <div className="mb-4 mt-2">
                        <ReactPaginate
                            previousLabel={"Previous"}
                            nextLabel={"Next"}
                            breakLabel={"..."}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={3}
                            onPageChange={handlePageClick}
                            containerClassName={"pagination  justify-content-center"}
                            pageClassName={"page-item "}
                            pageLinkClassName={"page-link"}
                            previousClassName={"page-item"}
                            previousLinkClassName={"page-link"}
                            nextClassName={"page-item"}
                            nextLinkClassName={"page-link"}
                            breakClassName={"page-item"}
                            breakLinkClassName={"page-link"}
                            activeClassName={"active primary"}
                        />
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Scoretable;