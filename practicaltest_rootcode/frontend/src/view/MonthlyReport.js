import React, { useEffect, useState } from "react";

import Select from 'react-select';
import swal from 'sweetalert';
import { Line , PolarArea, Bar} from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import {CategoryScale} from 'chart.js'; 

import {getMonthlyReport} from '../controllers/expense.js';

import closeImage from '../images/close.png';

export default function (props) {

  Chart.register(CategoryScale);

  const categories = [
    'Food', 'Household', 'Social Life', 'Transportation', 'Health', 'Miscellaneous'
  ];

  const [data, setData] = useState([]);
  // const [newCategories, setNewCategories] = useState([]);

  useEffect(() => {
    getMonthlyReport().then((res) => {
        // console.log(res);
        if (res.isSuccess) {
          // console.log(res.result);
          setData(res.result);
          // let x=[]
          // x = Object.keys(res.result)
          // console.log(x);
          // setNewCategories(x)
        } else {
          swal({
            title: "Error!",
            text: "Something went wrong with the network. Try reloading page",
            icon: "error",
            dangerMode: true,
            button: true,
          }).then((reload) => {
            window.location.reload();
          });
        }
      })
      .catch((err) => {
        swal({
          title: "Error!",
          text: "Something went wrong with the network. Try reloading page",
          icon: "error",
          dangerMode: true,
          button: true,
        }).then((reload) => {
          window.location.reload();
        });
      });
  }, [])

  const closeOnClickHandler = (e) => {
    e.preventDefault();
    props.onCloseHandler();
  }

  return (
    <div  class="card border bg-light w-60 shadow p-5 border border-dark" 
    style={{
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)", 
      zIndex:1, 
      width: "800px"
    }}>
        <div className="row d-flex justify-content-between mb-4">
            <div className="col-5">
                <h4>Monthly Report</h4>
            </div>
            <div className="col-3 d-flex justify-content-end m-0">
                <img src={closeImage} className="img-fluid img-thumbnail mx-1" style={{height: "30px", width: "30px"}}
                onClick={closeOnClickHandler}/>
            </div>
        </div>
        <div className="row d-flex justify-content-between mb-4">
        <Bar
                            datasetIdKey='id'
                            data={{
                                labels: categories,
                                datasets: [{
                                    label: 'Monthly Expenses Summary',
                                    data: data,
                                    backgroundColor: [
                                        'rgb(255, 99, 132)',
                                        'rgb(75, 192, 192)',
                                        'rgb(255, 205, 86)',
                                        'rgb(201, 203, 207)',
                                        'rgb(54, 162, 235)',
                                        'rgb( 80, 175, 52 )',
                                        'rgb( 153, 97, 217 )',
                                        'rgb(  189, 81, 153 )',
                                        'rgb(  159, 183, 63 )'
                                    ]
                                  }]
                            }}
                            />
        </div>
      

      <div>
        
      </div>
    </div>
  );
}
