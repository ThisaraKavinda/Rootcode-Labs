import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Select from "react-select";
import swal from "sweetalert";

import {
  getAllExpenses,
  getExpensesByCategory,
  deletExpences,
  getMonthlyReport
} from "../controllers/expense.js";
import CreateExpense from "./CreateExp.js";
import EditExpense from "./EditExpense.js";
import MonthlyReport from "./MonthlyReport.js";

import deleteImage from '../images/bin.png';
import editImage from '../images/pencil.png';

export default function Home() {
  const [expenses, setExpenses] = useState([]);
  const [isCreateExpenePopUpActive, setIsCreateExpensePopupActive] = useState(false);
  const [isEditExpenePopUpActive, setIsEditExpensePopupActive] = useState(false);
  const [isViewReportPopUpActive, setIsViewReportPopUpActive] = useState(false);
  const [item, setItem] = useState({});
  // const [data, setData] = useState([]);

  // const categoryList = [
  //   'Food', 'Household', 'Social Life', 'Transportation', 'Health', 'Miscellaneous'
  // ];

  const categories = [
    { value: "All", label: "All" },
    { value: "Food", label: "Food" },
    { value: "Household", label: "Household" },
    { value: "Social Life", label: "Social Life" },
    { value: "Transportation", label: "Transportation" },
    { value: "Health", label: "Health" },
    { value: "Miscellaneous", label: "Miscellaneous" },
  ];

  useEffect(() => {
    getAllExpenses()
      .then((result) => {
        if (result.isSuccess) {
          setExpenses(result.result);
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
  }, []);

  const onCategoryChange = async (e) => {
    getExpensesByCategory(e.value)
      .then((res) => {
        if (res.isSuccess) {
          setExpenses(res.result);
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
    // setExpenses(expenses.filter(exp =>
    //   exp.category == e.value
    // ))
    // console.log(expenses)
  };

  const onViewReport = async () => {
    await setIsViewReportPopUpActive(true);
  }

  const onCloseViewReport = async () => {
    await setIsViewReportPopUpActive(false);
  }

  const onCreateExpense = async () => {
    await setIsCreateExpensePopupActive(true);
  };

  const onCloseHandlerForCreate = async () => {
    await setIsCreateExpensePopupActive(false);
  };

  const onCloseHandlerForEdit = async () => {
    await setIsEditExpensePopupActive(false);
  };

  const onEditExpense = async (value) => {
    await setItem(value);
    await setIsEditExpensePopupActive(true);
  };

  function deleteExp(id) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this expense!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deletExpences(id)
          .then((result) => {
            if (result.isSuccess) {
              swal("Poof! Your expense has been deleted!", {
                icon: "success",
                title: "Delete Successfully!",
                buttons: false,
                timer: 2000,
              }).then(() => {
                window.location.reload();
              });
            } else {
              swal({
                title: "Error!",
                text: "Something went wrong with the network. Try reloading page",
                icon: "error",
                dangerMode: true,
                button: true,
              }).then(() => {
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
      }
    });
  }

  return (
    <div className="my-5 mx-5">
      <div className="row d-flex justify-content-between mx-3">
        <div className="col-3">
          <Select
            isSearchable
            options={categories}
            onChange={onCategoryChange}
            defaultValue={categories[0]}
          />
        </div>
        <div className="col-3 d-flex flex-row-reverse">
          <button
            type="button"
            className="btn btn-primary px-5"
            onClick={onCreateExpense}
          >
            Create Expense
          </button>
        </div>
      </div>

      <div className="d-flex m-3 flex-wrap justify-content-start">
        {expenses.map((value, index) => {
          return (
            <div className="col m-4" style={{width: "400px", minWidth:"400px", maxWidth: "400px"}}>
              <div className="card p-2">
                <div className="card-body" key={index}>
                  <div className="d-flex flex-column">
                    <div className="row d-flex mb-2">
                      <div className="col-7">
                        <h5> {value.title} </h5>
                      </div>
                      <div className="col-5 m-0 d-flex justify-content-end">
                        <h5> {value.date} </h5>
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col">
                        <h5> {value.des.slice(0, 25)}...</h5>
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col">
                        <h5 className="fw-bolder font-monospace"> {value.category.toUpperCase()} </h5>
                      </div>
                    </div>
                    <div className="row justify-content-between">
                      <div className="col-7">
                        <h5> {value.amount} LKR</h5>
                      </div>
                      <div className="col d-flex justify-content-end">
                        <div className="d-flex">
                          <div>
                            <img src={editImage} className="img-fluid img-thumbnail mx-1" style={{height: "30px", width: "30px"}}
                            onClick={() => onEditExpense(value)}/>
                          </div>
                          <div>
                            <img src={deleteImage} className="img-fluid img-thumbnail mx-1" style={{height: "30px", width: "30px"}}
                            onClick={() => deleteExp(value._id)}/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="row d-flex justify-content-between mx-3">
        <div className="col-3 d-flex">
          <button
            type="button"
            className="btn btn-success px-5"
            onClick={onViewReport}
          >
            View Report
          </button>
        </div>
      </div>

      {isCreateExpenePopUpActive ? (<CreateExpense onCloseHandler={onCloseHandlerForCreate} />) : null}
      {isEditExpenePopUpActive ? (<EditExpense onCloseHandler={onCloseHandlerForEdit} item={item} />) : null}
      {isViewReportPopUpActive ? (<MonthlyReport onCloseHandler={onCloseViewReport}/>) : null}
    </div>
  );
}
