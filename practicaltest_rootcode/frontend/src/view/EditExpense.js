import React, { useEffect, useState } from "react";

import Select from 'react-select';
import swal from 'sweetalert';

import {addExpense, updateExpense} from '../controllers/expense.js';

export default function (props) {

  const categories = [
    { value: 'Food', label: 'Food' },
    { value: 'Household', label: 'Household' },
    { value: 'Social Life', label: 'Social Life' },
    { value: 'Transportation', label: 'Transportation' },
    { value: 'Health', label: 'Health' },
    { value: 'Miscellaneous', label: 'Miscellaneous' },
  ];

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [des, setDes] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
        setTitle(props.item.title);
        setCategory(props.item.category);
        setAmount(props.item.amount);
        setDes(props.item.des);
        setDate(props.item.date);
        setId(props.item._id)
  }, [props.item]);

  const closeOnClickHandler = (e) => {
    e.preventDefault();
    props.onCloseHandler();
  }

  const onChangeCategory = (e) => {
    setCategory(e.value)
  }

  const onAddExpense = (e) => {
    e.preventDefault();

    if (title == "") {
      swal("Please enter a title")
    } else if (category == "") {
      swal("Please select a category")
    } else if (des == "") {
      swal("Please enter a description")
    } else if (amount == "") {
      swal("Please enter the amount you spent")
    } else if (isNaN(amount)) {
      swal("Please enter a  valid amount")
    }else if (date == "") {
      swal("Please enter the date")
    } else {
      const newExpense = {
        title: title,
        category: category,
        des: des,
        amount: amount,
        date: date
      }
      updateExpense(id, newExpense).then((result) => {
        console.log(result);
        if (result.isSuccess) {
          swal({
            title: "Success!",
            text: "Expense updated successfully",
            icon: 'success',
            timer: 2000,
            button: false,
          }).then(() => {
            window.location.reload();
          });
        } else {
          swal({
            title: "Error!",
            text: "Something went wrong went wrong. Try again",
            icon: 'error',
            dangerMode: true,
            button: false,
          }).then(() => {
            window.location.reload();
          });
        }       
      }).catch((error) => {
        console.log(error);
        swal({
          title: "Error!",
          text: "Something went wrong went wrong. Try again",
          icon: 'error',
          dangerMode: true,
          button: false,
        }).then(() => {
          window.location.reload();
        });
      })
    }
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
      <h4 className="mb-5">Update Expense</h4>

      <div>
        <form>
          <fieldset>
            <div className="row mb-4 d-flex justify-content-between">
              <div className="col">
                <input
                  type="text"
                  id="disabledTextInput"
                  className="form-control"
                  placeholder="Enter the title"
                  onChange={e => setTitle(e.target.value)}
                  value={title}
                />
              </div>
              <div className="col">
                <Select
                  isSearchable
                  options={categories}
                  onChange={onChangeCategory}
                  value = {
                    categories.filter(option => 
                       option.label === category)
                }
                />
              </div>
            </div>
            <div className="row mb-4 d-flex justify-content-between">
              <div className="col">
                <textarea 
                  id="disabledTextInput"
                  className="form-control"
                  placeholder="Description"
                  rows="4"
                  onChange={e => setDes(e.target.value)}
                  value={des}
                />
              </div>
            </div>

            <div className="row mb-5 d-flex justify-content-between">
              <div className="col">
                <input
                  type="date"
                  id="disabledTextInput"
                  className="form-control"
                  placeholder="Enter the title"
                  onChange={e => setDate(e.target.value)}
                  value={date}
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  id="disabledTextInput"
                  className="form-control"
                  placeholder="Enter the amount spent"
                  onChange={e => setAmount(e.target.value)}
                  value={amount}
                />
              </div>
            </div>

            <div className="row mb-3 d-flex justify-content-end mt-5">
              <div className="col-2">
                <button className="btn btn-danger px-4" onClick={closeOnClickHandler}>
                  Cancel
                </button>
              </div>
              <div className="col-2 d-flex justify-content-end">
                <button type="submit" className="btn btn-primary px-4" onClick={onAddExpense}>
                  Update
                </button>
              </div>
            </div>
            
          </fieldset>
        </form>
      </div>
    </ div>
  );
}
