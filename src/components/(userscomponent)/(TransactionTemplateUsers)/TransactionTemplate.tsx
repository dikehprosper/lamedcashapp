"use client"
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import "./transactionTemplate.css";
import AnimateHeight from "react-animate-height";
import { TransactionTemplateProps } from "@/types";
import formatNumberWithCommasAndDecimal from "@/components/(Utils)/formatNumber";
import { FaCircle } from "react-icons/fa6";
import TransactionResults from "@/components/(userscomponent)/(TransactionTemplateUsers)/(TransactionResults)/TransactionResults";
import { FaArrowRight } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import data from "../../(Utils)/exampleData.json";
import Link from "next/link";
import { CgTrashEmpty } from "react-icons/cg";
import { FaFilter } from "react-icons/fa";

const TransactionTemplate = ({ title, select }: TransactionTemplateProps) => {
  const [state, setState] = useState(select.firstSelect.big);
  const [viewMore, setStateViewMore] = useState<boolean>();
  const pathname = usePathname();
  const [height, setHeight] = useState(0);

  function adjustHeight() {
    setHeight((prev): any => {
      if (prev === 0) {
        return "auto";
      } else {
        return 0;
      }
    });
  }

  useEffect(() => {
    if (state === select.firstSelect.big) {
      if (data.length > 3) {
        setStateViewMore(true);
      } else {
        setStateViewMore(false);
      }
    } else if (state === select.secondSelect.big) {
      if (data.filter((item) => item.type === "deposits").length > 3) {
        setStateViewMore(true);
      } else {
        setStateViewMore(false);
      }
    } else if (state === select.thirdSelect.big) {
      if (data.filter((item) => item.type === "withdrawals").length > 3) {
        setStateViewMore(true);
      } else {
        setStateViewMore(false);
      }
    }
  }, [state, data]);

  function changeState1(value: any) {
    setState(value);
    if (data.length > 3) {
      setStateViewMore(true);
    } else {
      setStateViewMore(false);
    }
  }
  function changeState2(value: any) {
    setState(value);
    if (data.filter((item) => item.type === "deposits").length > 3) {
      setStateViewMore(true);
    } else {
      setStateViewMore(false);
    }
  }

  function changeState3(value: any) {
    setState(value);
    if (data.filter((item) => item.type === "withdrawals").length > 3) {
      setStateViewMore(true);
    } else {
      setStateViewMore(false);
    }
  }

  return (
    <div className='transaction_template_container'>
      <div className='transaction_template_container_header'>
        <span className='transaction_template_container_header_1'>
          {title.name} {title.icon}
        </span>
        <span className='transaction_template_container_header_2'>
          <h3>
            {" "}
            <span className='transaction_template_container_header_2_span_1'>
              Total Deposits:{" "}
            </span>{" "}
            <> XOF {formatNumberWithCommasAndDecimal(378899456567.99)}</>
          </h3>
          <h3>
            <span className='transaction_template_container_header_2_span_2'>
              Total Withdrawals:{" "}
            </span>{" "}
            <> XOF {formatNumberWithCommasAndDecimal(378899456567.99)}</>
          </h3>
        </span>
      </div>
      <div className='transaction_template_container_body'>
        <div className='transaction_template_container_body_1'>
          <div className='transaction_template_container_body_1_1'>
            filter &nbsp;
           <FaFilter />
          </div>

          <div className='transaction_template_container_body_1_2'>
            <span
              className={`transaction_template_container_body_1_2_1 ${
                state === "All" && "active_selection_big"
              }`}
              style={{ borderColor: state === "View All" ? "#5E968B" : "" }}
              onClick={() => changeState1(select.firstSelect.big)}
            >
              {select.firstSelect.big} &nbsp;{" "}
              <FaCircle color='#fff' fontSize='10px' />
            </span>
            <span
              onClick={() => changeState2(select.secondSelect.big)}
              className='transaction_template_container_body_1_2_1'
              style={{
                borderColor: state === "View Deposits" ? "#5E968B" : "",
              }}
            >
              {select.secondSelect.big} &nbsp;{" "}
              <FaCircle color='#658900' fontSize='10px' />
            </span>
            <span
              onClick={() => changeState3(select.thirdSelect.big)}
              className='transaction_template_container_body_1_2_1'
              style={{
                borderColor: state === "View Withdrawals" ? "#5E968B" : "",
              }}
            >
              {select.thirdSelect.big} &nbsp;{" "}
              <FaCircle color='#0076B8' fontSize='10px' />
            </span>
          </div>
          <div
            className='transaction_template_container_body_1_3'
            aria-expanded={height !== 0}
            aria-controls='example-panel'
            onClick={adjustHeight}
          >
            {state}&nbsp;{" "}
            {height === 0 ? <IoMdArrowDropdown /> : <IoMdArrowDropup />}
            <AnimateHeight
              id='example-panel'
              duration={300}
              height={height}
              style={{
                background: "black",
                position: "absolute",
                top: "28px",
                right: 0,
                left: "-30px",
                zIndex: 22,
              }}
            >
              <div className='dropdown-content'>
                <div
                  className='dropdown-content_1'
                  onClick={() => setState(select.firstSelect.big)}
                  style={{
                    background: state === "View All" ? "grey" : "",
                    color: state === "View All" ? "black" : "",
                  }}
                >
                  {select.firstSelect.big}
                </div>
                <div
                  onClick={() => setState(select.secondSelect.big)}
                  className='dropdown-content_2'
                  style={{
                    background: state === "View Deposits" ? "grey" : "",
                    color: state === "View Deposits" ? "black" : "",
                  }}
                >
                  {select.secondSelect.big}
                </div>
                <div
                  onClick={() => setState(select.thirdSelect.big)}
                  className='dropdown-content_3'
                  style={{
                    background: state === "View Withdrawals" ? "grey" : "",
                    color: state === "View Withdrawals" ? "black" : "",
                  }}
                >
                  {select.thirdSelect.big}
                </div>
              </div>
            </AnimateHeight>
          </div>
        </div>

        <div
          className='transaction_template_container_body_2'
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            paddingBottom: "20px",
            marginTop: "5px",
            minHeight: "100%",
            flex: "1",
          }}
        >
          {pathname === "/transactions" ? (
            state === "View Deposits" ? (
              data.filter((item: any) => item.type === "deposits").length >
              0 ? (
                data
                  .filter((item: any) => item.type === "deposits")
                  .map((filteredData: any, index: any) => (
                    <TransactionResults
                      key={index}
                      date={filteredData.date}
                      time={filteredData.time}
                      amount={filteredData.amount}
                      receipt={filteredData.receipt}
                      betId={filteredData.betId}
                      status={filteredData.status}
                      type={filteredData.type}
                    />
                  ))
              ) : (
                <div
                  className='no-result animate-pop-in'
                  style={{
                    display: "flex",
                    width: "100%",
                    height: "100%",
                    flex: "1",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "30px",
                    flexDirection: "column",
                  }}
                >
                  <CgTrashEmpty fontSize='80px' />
                  <h2>No Data to Show</h2>
                </div>
              )
            ) : state === "View Withdrawals" ? (
              data.filter((item: any) => item.type === "withdrawals").length >
              0 ? (
                data
                  .filter((item: any) => item.type === "withdrawals")
                  .map((filteredData: any, index: any) => (
                    <TransactionResults
                      key={index}
                      date={filteredData.date}
                      time={filteredData.time}
                      amount={filteredData.amount}
                      receipt={filteredData.receipt}
                      betId={filteredData.betId}
                      status={filteredData.status}
                      type={filteredData.type}
                    />
                  ))
              ) : (
                <div
                  className='no-result animate-pop-in'
                  style={{
                    display: "flex",
                    width: "100%",
                    height: "100%",
                    flex: "1",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "30px",
                    flexDirection: "column",
                  }}
                >
                  <CgTrashEmpty fontSize='80px' />
                  <h2>No Data to Show</h2>
                </div>
              )
            ) : data.length > 0 ? (
              data.map((data: any, index: any) => (
                <TransactionResults
                  key={index}
                  date={data.date}
                  time={data.time}
                  amount={data.amount}
                  receipt={data.receipt}
                  betId={data.betId}
                  status={data.status}
                  type={data.type}
                />
              ))
            ) : (
              <div
                className='no-result animate-pop-in'
                style={{
                  display: "flex",
                  width: "100%",
                  height: "100%",
                  flex: "1",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "30px",
                  flexDirection: "column",
                }}
              >
                <CgTrashEmpty fontSize='80px' />
                <h2>No Data to Show</h2>
              </div>
            )
          ) : state === "View Deposits" ? (
            data.filter((item: any) => item.type === "deposits").length > 0 ? (
              data
                .filter((item: any) => item.type === "deposits")
                .slice(0, 3)
                .map((filteredData: any, index: any) => (
                  <TransactionResults
                    key={index}
                    date={filteredData.date}
                    time={filteredData.time}
                    amount={filteredData.amount}
                    receipt={filteredData.receipt}
                    betId={filteredData.betId}
                    status={filteredData.status}
                    type={filteredData.type}
                  />
                ))
            ) : (
              <div
                className='no-result animate-pop-in'
                style={{
                  display: "flex",
                  width: "100%",
                  height: "100%",
                  flex: "1",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "30px",
                  flexDirection: "column",
                }}
              >
                <CgTrashEmpty fontSize='80px' />
                <h2>No Data to Show</h2>
              </div>
            )
          ) : state === "View Withdrawals" ? (
            data.filter((item: any) => item.type === "withdrawals").length >
            0 ? (
              data
                .filter((item: any) => item.type === "withdrawals")
                .slice(0, 3)
                .map((filteredData: any, index: any) => (
                  <TransactionResults
                    key={index}
                    date={filteredData.date}
                    time={filteredData.time}
                    amount={filteredData.amount}
                    receipt={filteredData.receipt}
                    betId={filteredData.betId}
                    status={filteredData.status}
                    type={filteredData.type}
                  />
                ))
            ) : (
              <div
                className='no-result animate-pop-in'
                style={{
                  display: "flex",
                  width: "100%",
                  height: "100%",
                  flex: "1",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "30px",
                  flexDirection: "column",
                }}
              >
                <CgTrashEmpty fontSize='80px' />
                <h2>No Data to Show</h2>
              </div>
            )
          ) : data.length > 0 ? (
            data
              .slice(0, 3)
              .map((data: any, index: any) => (
                <TransactionResults
                  key={index}
                  date={data.date}
                  time={data.time}
                  amount={data.amount}
                  receipt={data.receipt}
                  betId={data.betId}
                  status={data.status}
                  type={data.type}
                />
              ))
          ) : (
            <div
              className='no-result animate-pop-in'
              style={{
                display: "flex",
                width: "100%",
                height: "100%",
                flex: "1",
                alignItems: "center",
                justifyContent: "center",
                gap: "30px",
                flexDirection: "column",
              }}
            >
              <CgTrashEmpty fontSize='80px' />
              <h2>No Data to Show</h2>
            </div>
          )}

          {/* {pathname === "/transactions" ? null : 
         viewMore === true? <div className='view-more'>
              <Link href='/transactions'>
                View More &nbsp;
                <FaArrowRight />
              </Link>
            </div> : null
          } */}

          {/* {pathname === "/transactions" ? null : viewMore === true ? (
            <div className='view-more'>
              <Link
                href={{
                  pathname: "/transactions",
                  query: state,
                }}
              >
                View More &nbsp;
                <FaArrowRight />
              </Link>
            </div>
          ) : null} */}
        </div>
      </div>
    </div>
  );
};

export default TransactionTemplate;
