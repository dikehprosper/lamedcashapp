"use client";
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
import Link from "next/link";
import { CgTrashEmpty } from "react-icons/cg";
import { FaFilter } from "react-icons/fa";
  
const TransactionTemplate = ({ title, select, 
totalWithdrawals, totalDeposits, data, allData, showReceipt
}: any) => {


  const [state, setState] = useState(select.firstSelect.big)
  const [viewMore, setStateViewMore] = useState<boolean>();
  const pathname = usePathname();
  const [height, setHeight] = useState(0);
  const [loading, setLoading] = useState(false)

   function adjustHeight() {
    setHeight((prev): any => {
      if (prev === 0) {
        return "auto";
      } else {
        return 0;
      }
    });
  }
  const state2 = {
    param1: state,
  };

  useEffect(() => {
    // Save state to localStorage whenever it changes
    localStorage.setItem("transactionTemplateState", JSON.stringify(state));

    if (state === select.firstSelect.big) {
      setStateViewMore(data?.length > 3);
    } else if (state === select.secondSelect.big) {
      setStateViewMore(data?.filter((item: { fundingType: string; }) => item.fundingType === "deposits").length > 3);
    } else if (state === select.thirdSelect.big) {
      setStateViewMore(data?.filter((item: { fundingType: string; }) => item.fundingType === "withdrawals").length > 3);
    }
  }, [state, data]);

  function changeState1(value: any) {
    setLoading(true);
    setState(value);
    // No need to check conditions here, it will be handled in useEffect
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }




  function changeState2(value: any) {
    setLoading(true);
    setState(value);
    if (data?.filter((item: any) => item.fundingType === "deposits").length > 3) {
      setStateViewMore(true);
    } else {
      setStateViewMore(false);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  function changeState3(value: any) {
    setLoading(true);
    setState(value);

    if (data?.filter((item: any) => item.fundingType === "withdrawals").length > 3) {
      setStateViewMore(true);
    } else {
      setStateViewMore(false);
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  return allData === undefined ? (
    // Render the loading spinner when loading is true
    <div
      className='transaction_template_container '
      style={{
        background: "rgba(0, 0, 0, 0.5)",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div id='container-signin'>
        <div id='html-spinner-signin'></div>
      </div>
    </div>
  ) : (
    <div className='transaction_template_container'>
      <div className='transaction_template_container_header'>
        <span className='transaction_template_container_header_1'>
          {title.name} {title.icon}
        </span>
        <span className='transaction_template_container_header_2'>
          <div>
            {" "}
            <span className='transaction_template_container_header_2_span_1'>
              Total des Dépôts:{" "}
            </span>{" "}
            <span>
              {" "}
              XOF{" "}
              {formatNumberWithCommasAndDecimal(
                totalDeposits === undefined ? 0 : totalDeposits
              )}
            </span>
          </div>
          <div>
            <span className='transaction_template_container_header_2_span_2'>
              Retraits totaux:{" "}
            </span>{" "}
            <span>
              {" "}
              XOF{" "}
              {formatNumberWithCommasAndDecimal(
                totalWithdrawals === undefined ? 0 : totalWithdrawals
              )}
            </span>
          </div>
        </span>
      </div>
      <div className='transaction_template_container_body'>
        <div className='transaction_template_container_body_1'>
          <div className='transaction_template_container_body_1_1'>
            {/* filtre &nbsp;
            <FaFilter /> */}
          </div>

          <div className='transaction_template_container_body_1_2'>
            <span
              className={`transaction_template_container_body_1_2_1 ${
                state === "All" && "active_selection_big"
              }`}
              style={{ borderColor: state === "Voir tout" ? "#5E968B" : "" }}
              onClick={() => changeState1(select.firstSelect.big)}
            >
              {select.firstSelect.big} &nbsp;{" "}
              <FaCircle color='#fff' fontSize='10px' />
            </span>
            <span
              onClick={() => changeState2(select.secondSelect.big)}
              className='transaction_template_container_body_1_2_1'
              style={{
                borderColor: state === "Voir les Dépôts" ? "#5E968B" : "",
              }}
            >
              {select.secondSelect.big} &nbsp;{" "}
              <FaCircle color='#658900' fontSize='10px' />
            </span>
            <span
              onClick={() => changeState3(select.thirdSelect.big)}
              className='transaction_template_container_body_1_2_1'
              style={{
                borderColor: state === "Afficher les Retraits" ? "#5E968B" : "",
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
                left: "-40px",
                zIndex: 30,
              }}
            >
              <div className='dropdown-content'>
                <div
                  className='dropdown-content_1'
                  onClick={() => changeState1(select.firstSelect.big)}
                  style={{
                    background: state === "Voir tout" ? "grey" : "",
                    color: state === "Voir tout" ? "black" : "",
                  }}
                >
                  {select.firstSelect.big}
                </div>
                <div
                  onClick={() => changeState2(select.secondSelect.big)}
                  className='dropdown-content_2'
                  style={{
                    background: state === "Voir les Dépôts" ? "grey" : "",
                    color: state === "Voir les Dépôts" ? "black" : "",
                  }}
                >
                  {select.secondSelect.big}
                </div>
                <div
                  onClick={() => changeState3(select.thirdSelect.big)}
                  className='dropdown-content_3'
                  style={{
                    background: state === "Afficher les Retraits" ? "grey" : "",
                    color: state === "Afficher les Retraits" ? "black" : "",
                  }}
                >
                  {select.thirdSelect.big}
                </div>
              </div>
            </AnimateHeight>
          </div>
        </div>
        {loading ? (
          <div id='container-signin-outer'>
            <div id='container-signin'>
              <div id='html-spinner-signin'></div>
            </div>
          </div>
        ) : (
          <div
            className='transaction_template_container_body_2 animate-pop-in'
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginTop: "5px",
            
            }}
          >
            {pathname === "/transactions" ? (
              state === "Voir les Dépôts" ? (
                data?.filter((item: any) => item.fundingType === "deposits")
                  .length > 0 ? (
                  data
                    ?.filter((item: any) => item.fundingType === "deposits")
                   .slice().reverse()
                    .map((filteredData: any, index: any) => (
                      <TransactionResults
                        key={index}
                        time={filteredData.registrationDateTime}
                        amount={filteredData.amount}
                        receipt={filteredData._id}
                        betId={filteredData.betId}
                        status={filteredData.status}
                        type={filteredData.fundingType}
                          showReceipt={showReceipt}
                           withdrawalCode={filteredData.withdrawalCode}
                        momoName={filteredData.momoName}
                        momoNumber={filteredData.momoNumber}
                        identifierId={filteredData.identifierId}
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
                    <h2>Aucune donnée à afficher</h2>
                  </div>
                )
              ) : state === "Afficher les Retraits" ? (
                data?.filter((item: any) => item.fundingType === "withdrawals")
                  .length > 0 ? (
                  data
                    ?.filter((item: any) => item.fundingType === "withdrawals")
                     .slice().reverse().map((filteredData: any, index: any) => (
                      <TransactionResults
                        key={index}
                        time={filteredData.registrationDateTime}
                        amount={filteredData.amount}
                        receipt={filteredData._id}
                        betId={filteredData.betId}
                        status={filteredData.status}
                        type={filteredData.fundingType}
                        showReceipt={showReceipt}
                        withdrawalCode={filteredData.withdrawalCode}
                        momoName={filteredData.momoName}
                        momoNumber={filteredData.momoNumber}
                        identifierId={filteredData.identifierId}
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
                    <h2>Aucune donnée à afficher</h2>
                  </div>
                )
              ) : data?.length > 0 ? (
                data
                  ?.slice().reverse().map((data: any, index: any) => (
                    <TransactionResults
                      key={index}
                      time={data.registrationDateTime}
                      amount={data.amount}
                      receipt={data._id}
                      betId={data.betId}
                      status={data.status}
                      type={data.fundingType}
                        showReceipt={showReceipt}
                        withdrawalCode={data.withdrawalCode}
                        momoName={data.momoName}
                        momoNumber={data.momoNumber}
                        identifierId={data.identifierId}
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
                  <h2>Aucune donnée à afficher</h2>
                </div>
              )
            ) : state === "Voir les Dépôts" ? (
              data?.filter((item: any) => item.fundingType === "deposits")
                .length > 0 ? (
                data
                  ?.filter((item: any) => item.fundingType === "deposits")
                .slice().reverse().slice(0, 3).map((filteredData: any, index: any) => (
                    <TransactionResults
                      key={index}
                      time={filteredData.registrationDateTime}
                      amount={filteredData.amount}
                      receipt={filteredData._id}
                      betId={filteredData.betId}
                      status={filteredData.status}
                      type={filteredData.fundingType}
                        showReceipt={showReceipt}
                           withdrawalCode={filteredData.withdrawalCode}
                        momoName={filteredData.momoName}
                        momoNumber={filteredData.momoNumber}
                        identifierId={filteredData.identifierId}
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
                  <h2>Aucune donnée à afficher</h2>
                </div>
              )
            ) : state === "Afficher les Retraits" ? (
              data?.filter((item: any) => item.fundingType === "withdrawals")
                .length > 0 ? (
                data
                  ?.filter((item: any) => item.fundingType === "withdrawals")
                 .slice().reverse().slice(0, 3).map((filteredData: any, index: any) => (
                    <TransactionResults
                      key={index}
                      time={filteredData.registrationDateTime}
                      amount={filteredData.amount}
                      receipt={filteredData._id}
                      betId={filteredData.betId}
                      status={filteredData.status}
                      type={filteredData.fundingType}
                        showReceipt={showReceipt}
                           withdrawalCode={filteredData.withdrawalCode}
                        momoName={filteredData.momoName}
                        momoNumber={filteredData.momoNumber}
                        identifierId={filteredData.identifierId}
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
                  <h2>Aucune donnée à afficher</h2>
                </div>
              )
            ) : data?.length > 0 ? (
              data?.slice().reverse().slice(0, 3).map((data: any, index: any) => (
                  <TransactionResults
                    key={index}
                    time={data.registrationDateTime}
                    amount={data.amount}
                    receipt={data._id}
                    betId={data.betId}
                    status={data.status}
                    type={data.fundingType} 
                      showReceipt={showReceipt}    
                         withdrawalCode={data.withdrawalCode}
                        momoName={data.momoName}
                        momoNumber={data.momoNumber}
                        identifierId={data.identifierId}             />
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
                <h2>Aucune donnée à afficher</h2>
              </div>
            )}

            {pathname === "/transactions" ? null : viewMore === true ? (
              <div className='view-more'>
                <Link
                  href={{
                    pathname: "/transactions",
                    query: { slug: state },
                  }}
                >
                  Voir plus &nbsp;
                  <FaArrowRight />
                </Link>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionTemplate;
