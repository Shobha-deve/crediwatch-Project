import React, { useState, useEffect } from 'react'
import ScorePagination from '../src/ScorePagination';
function MyScoretable() {
    let [scoredata, updatedata] = useState([]);
    let [search, updatesearch] = useState("");
    const [currentPage, setcurrentPage] = useState(1);
    const [postsPerPage] = useState(10);


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
    let [highRisk, updateHigh] = useState(0);
    let [mediumRisk, updateMedium] = useState(0);
    let [lowRisk, updatelow] = useState(0);

    const getscorecolor = (score) => {
        if (score === "NA") {
            return (
                <div style={{ backgroundColor: "grey" }}>N/A</div>
            );
        }
        else if (score === 0 || score <= 5) {
            // updatelow(lowRisk++);
            return (
                <div>
                    <div style={{ backgroundColor: "green" }}>LOW</div>
                </div>
            );

        }
        else if (score <= 10) {
            // updateMedium(mediumRisk++);
            return (

                <div style={{ backgroundColor: "yellow" }}>MEDIUM</div>

            );

        }
        else if (score <= 15) {
            // updateHigh(highRisk++);
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

    //get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(scoredata.length / postsPerPage); i++) {
        pageNumbers.push(i);

    }
    //change page
    const paginate = (pageNumber) => setcurrentPage(pageNumber);
    return (
        <div className='container-fluid'>
            {/* start of row1 */}
            <div className='row'>
                <div className='col-lg-9 mt-5'>
                    <label>High Risk </label>
                    <span class="badge rounded-pill text-bg-danger">{highRisk}</span>
                    <label>Medium Risk</label>
                    <span class="badge rounded-pill text-bg-primary">{mediumRisk}</span>
                    <label>Low Risk</label>
                    <span class="badge rounded-pill text-bg-info">{lowRisk}</span>
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
                            <td colSpan={2}>Party Name</td>
                            <td>Financial Risk Score</td>
                            <td>Public data Score</td>
                            <td>Private Risk Score</td>
                            <td>Overall Risk</td>
                        </thead>
                        <tbody>
                            {getfilter(search).map((data, index) => {
                                return (<tr key={index}>
                                    <td>

                                        <div class="dropdown">
                                            <button type='button'
                                                className='btn btn-light dropdown-toggle'
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false" >
                                                <i class="fa-solid fa-plus"></i>
                                                </button>
                                                {scoredata.map((data,index)=>{
                                                    <ul key={index} class="dropdown-menu" >
                                                        <li><a class="dropdown-item" href="#">A</a></li>
                                                        <li><a class="dropdown-item" href="#">Another action</a></li>
                                                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                                                    </ul>
                                                })}
                                        </div>
                                    </td>
                                    <td>{data.party_name}</td>
                                    <td>{getscorecolor(data.financial_risks.score)}</td>
                                    <td>{getscorecolor(data.non_financial_risks.score)}</td>
                                    <td>{getscorecolor(data.private_data_risks.score)}</td>
                                    <td>{getscorecolor(data.score)}</td>
                                </tr>
                                )
                            }).slice(indexOfFirstPost, indexOfLastPost)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {/* end of row2 */}
            <div className='row'>
                <div className='col-lg-10 offset-2'>
                    <nav>
                        <ul className="pagination">
                            {pageNumbers.map((number) => {
                                <li key={number} className='page-item'>
                                    <a onClick={() => paginate(number)} href="!#" className="page-link">
                                        {number}
                                    </a>
                                </li>
                            })}
                        </ul>
                    </nav>
                </div>
            </div>
        </div>

    )
}
export default MyScoretable;