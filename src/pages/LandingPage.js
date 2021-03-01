import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import YearPicker from "react-year-picker";
import { API_URL } from '../API';

function LandingPage({ history, match }) {
    const [year, setyear] = useState(null)
    const [launch, setlaunch] = useState(null)
    const [land, setland] = useState(null)
    const [data, setdata] = useState(null)
    
    useEffect(async () => {
        if(match.params.id === undefined){
            const res = await axios.get(`${API_URL}`)
            setdata(res.data)
        }else{
            const res = await axios.get(`${API_URL}${match.params.id}`)
            setdata(res.data)
        }
        
    }, [match])
    const handleSubmit = (e) => {
        e.preventDefault()
        history.push(`/&launch_success=${launch}&land_success=${land}&launch_year=${year}`)
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link to="/" className="navbar-brand">SpaceX - Project</Link>
                </div>
            </nav>
            <div className="container-fluid main-body">
                <div className="filter-box">
                    <form className="form" onSubmit={(e)=>{handleSubmit(e)}}>
                        <div className="row">
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="form-group">
                                    <label>Launch Year</label>
                                    <YearPicker onChange={(date)=>  {setyear(date)}} required/>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="form-group">
                                    <label>Launch Success</label>
                                    <select className="form-control" onChange={(e)=>setlaunch(e.target.value)} required value={launch}>
                                        <option value={null}>Select Launch type</option>
                                        <option value={true}>Success</option>
                                        <option value={false}>Failed</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="form-group">
                                    <label>Land Success</label>
                                    <select className="form-control" onChange={(e)=>setland(e.target.value)} required value={land}>
                                        <option value={null}>Select Landing type</option>
                                        <option value={true}>Success</option>
                                        <option value={false}>Failed</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-3 col-sm-6">
                            <div className="form-group">
                                    <label>Apply Filters?</label>   
                                    <input type="submit" className="btn btn-primary form-control" />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            
            
            <div className="table-container table-responsive">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Flight Number</th>
                            <th>Launch Site Name</th>
                            <th>Rocket Id</th>
                            <th>Rocket Name</th>
                            <th>Rocket Type</th>
                            <th>Launch Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((item,idx) => {
                            return <tr key={idx}>
                                        <td>{item.flight_number}</td>
                                        <td>{item.launch_site.site_name}</td>
                                        <td>{item.rocket.rocket_id}</td>
                                        <td>{item.rocket.rocket_name}</td>
                                        <td>{item.rocket.rocket_type}</td>
                                        <td>{item.launch_date_utc && new Date(item.launch_date_utc).toDateString()}</td>
                                    </tr>
                        })}
                    </tbody>
                </table>
            </div>
            </div>
        </div >
    )
}

export default LandingPage
