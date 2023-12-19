
"use client";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import "./transactionTemplateSubadminDashboard.css";
import AnimateHeight from "react-animate-height";
import { TransactionTemplatePropsSubadmins } from "@/types";
import formatNumberWithCommasAndDecimal from "@/components/(Utils)/formatNumber";
import { FaCircle } from "react-icons/fa6";
import TransactionResultsSubadmin from "@/components/(TransactionTemplateSubadmin)/(TransactionResultsSubadmin)/TransactionResultsSubadmin"
import { FaArrowRight } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import Link from "next/link";
import { CgTrashEmpty } from "react-icons/cg";
import { FaFilter } from "react-icons/fa";
const SubadminTransactionTemplate = ({ title, select, name ,
totalSuccessful, totalFailed, data, allData, showReceipt,  getUserDetails
}: any ) => {
  // Access the query object to get the passed parameter
  

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
console.log(data)
  }, [data])

// useEffect(() => {
//   if (allData) {
//     const reversedData = allData.slice().reverse();
//     console.log(reversedData);
//   }
// }, [allData]);

// // Assuming 'data' is your array
// const reversedData = data.slice().reverse();

// const slicedData = reversedData.slice(0, 3);

// const mappedData = slicedData.map((item, index) => (
//   <TransactionResultsSubadmin
//     key={index}
//     time={item.time}
//     amount={item.amount}
//     receipt={item.receipt}
//     betId={item.betId}
//     status={item.status}
//     type={item.type}
//   />
// ));




  useEffect(() => {
    // Save state to localStorage whenever it changes
    localStorage.setItem("transactionTemplateSubadminState", JSON.stringify(state));

    if (state === select.firstSelect.big) {
      setStateViewMore(data?.length > 3);
    } else if (state === select.secondSelect.big) {
      setStateViewMore(
        data?.filter((item: { status: string; }) => item.status === "Pending").length > 3
      );
    } else if (state === select.thirdSelect.big) {
      setStateViewMore(
        data?.filter((item: { status: string; }) => item.status === "Successful").length > 3
      );
    } else if (state === select.fourthSelect.big) {
      setStateViewMore(
        data?.filter((item: { status: string; }) => item.status === "Failed").length > 3
      );
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
    if (data?.filter((item: { status: string; }) => item.status === "Pending").length > 3) {
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

    if (data?.filter((item: { status: string; }) => item.status === "Successful").length > 3) {
      setStateViewMore(true);
    } else {
      setStateViewMore(false);
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  function changeState4(value: any) {
    setLoading(true);
    setState(value);

    if (data?.filter((item: { status: string; }) => item.status === "Failed").length > 3) {
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
      className='transaction_template_container_subadmin-1'
      style={{
        background: "rgba(0, 0, 0, 0.5)",
        alignItems: "center",
        justifyContent: "center",
   }}
    >
      <div id='container-signin_subadmin'>
        <div id='html-spinner-signin_subadmin'></div>
      </div>
    </div>
  ) : (
    <div className='transaction_template_container_subadmin-1' 
>
      <div className='transaction_template_container_header_subadmin'>
        <span className='transaction_template_container_header_1_subadmin'>
          {title.name} {title.icon}
        </span>
        <span className='transaction_template_container_header_2_subadmin'>
          <div>
            {" "}
            <span className='transaction_template_container_header_2_span_1_subadmin'>
              Total {name === "Dépôts"? "dépôt": "Retraits"} réussi:{" "}
            </span>{" "}
            <span>
              {" "}
              XOF{" "}
              {formatNumberWithCommasAndDecimal(
                totalSuccessful === undefined
                  ? 0
                  : totalSuccessful
              )}
            </span>
          </div>
          <div>
            <span
              className='transaction_template_container_header_2_span_2_subadmin'
              style={{ color: "red" }}
            >
              Total Échec du {name === "Dépôts"? "dépôt": "Retraits"}
            </span>{" "}
            <span>
              {" "}
              XOF{" "}
              {formatNumberWithCommasAndDecimal(
                totalFailed === undefined ? 0 : totalFailed
              )}
            </span>
          </div>
        </span>
      </div>
      <div className='transaction_template_container_body_subadmin'>
        <div className='transaction_template_container_body_1_subadmin'>
          <div className='transaction_template_container_body_1_1_subadmin'>
            {/* filtre &nbsp;
            <FaFilter /> */}
          </div>

          <div className='transaction_template_container_body_1_2_subadmin'>
            <span
              className={`transaction_template_container_body_1_2_1_subadmin ${
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
              className='transaction_template_container_body_1_2_1_subadmin'
              style={{
                borderColor: state === "Les ordres en attente" ? "#5E968B" : "",
              }}
            >
              {select.secondSelect.big} &nbsp;{" "}
              <FaCircle color='rgba(128, 128, 128, 1)' fontSize='10px' />
            </span>
            <span
              onClick={() => changeState3(select.thirdSelect.big)}
              className='transaction_template_container_body_1_2_1_subadmin'
              style={{
                borderColor: state === "Commandes réussies" ? "#5E968B" : "",
              }}
            >
              {select.thirdSelect.big} &nbsp;{" "}
              <FaCircle color='rgba(0, 128, 0, 1)' fontSize='10px' />
            </span>
            <span
              onClick={() => changeState4(select.fourthSelect.big)}
              className='transaction_template_container_body_1_2_1_subadmin'
              style={{
                borderColor: state === "Commandes échouées" ? "#5E968B" : "",
              }}
            >
              {select.fourthSelect.big} &nbsp;{" "}
              <FaCircle color='rgba(128, 0, 0, 1)' fontSize='10px' />
            </span>
          </div>
          <div
            className='transaction_template_container_body_1_3_subadmin'
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
              <div className='dropdown-content_subadmin'>
                <div
                  className='dropdown-content_1_subadmin'
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
                  className='dropdown-content_2_subadmin'
                  style={{
                    background: state === "Les ordres en attente" ? "grey" : "",
                    color: state === "" ? "black" : "",
                  }}
                >
                  {select.secondSelect.big}
                </div>
                <div
                  onClick={() => changeState3(select.thirdSelect.big)}
                  className='dropdown-content_3_subadmin'
                  style={{
                    background: state === "Commandes réussies" ? "grey" : "",
                    color: state === "Commandes réussies" ? "black" : "",
                  }}
                >
                  {select.thirdSelect.big}
                </div>
                <div
                  onClick={() => changeState4(select.fourthSelect.big)}
                  className='dropdown-content_3_subadmin'
                  style={{
                    background: state === "Commandes échouées" ? "grey" : "",
                    color: state === "Commandes échouées" ? "black" : "",
                  }}
                >
                  {select.fourthSelect.big}
                </div>
              </div>
            </AnimateHeight>
          </div>
        </div>
        {loading ? (
          <div id='container-signin-outer_subadmin'>
            <div id='container-signin_subadmin'>
              <div id='html-spinner-signin_subadmin'></div>
            </div>
          </div>
        ) : (
          <div
            className='transaction_template_container_body_2_subadmin animate-pop-in_subadmin'
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginTop: "5px",
            }}
          >
            {pathname === "/subadmin/deposit/transactions" || pathname === "/subadmin/withdrawal/transactions" ? (
              state === "Les ordres en attente" ? (
                data?.filter((item: any) => item.status === "Pending").length >
                0 ? (
                  data
                    ?.filter((item: any) => item.status === "Pending")
                    .slice()
                    .reverse()
                    .map((filteredData: any, index: any) => (
                      <TransactionResultsSubadmin
                        key={index}
                        time={filteredData.registrationDateTime}
                        amount={filteredData.amount}
                        transactionId={filteredData.transactionId}
                        identifierId={filteredData.identifierId}
                        betId={filteredData.betId}
                        status={filteredData.status}
                        type={filteredData.fundingType}
                        userId={filteredData.userid}
                        cashdeskId={allData._id}
                        isSubmitted={filteredData.isSubmitted}
                         showReceipt={showReceipt}
                        username={filteredData.username}
                        userNumber={filteredData.userNumber}
                         getUserDetails={getUserDetails}
                          withdrawalCode= {filteredData.withdrawalCode}
                          momoName={filteredData.momoName}
                        momoNumber={filteredData.momoNumber}
                      />
                    ))
                ) : (
                  <div
                    className='no-result_subadmin animate-pop-in_subadmin'
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
              ) : state === "Commandes réussies" ? (
                data?.filter((item: any) => item.status === "Successful")
                  .length > 0 ? (
                  data
                    ?.filter((item: any) => item.status === "Successful")
                    .slice()
                    .reverse()
                    .map((filteredData: any, index: any) => (
                      <TransactionResultsSubadmin
                        key={index}
                        time={filteredData.registrationDateTime}
                        amount={filteredData.amount}
                        transactionId={filteredData.transactionId}
                        identifierId={filteredData.identifierId}
                        betId={filteredData.betId}
                        status={filteredData.status}
                        type={filteredData.fundingType}
                        userId={filteredData.userid}
                        cashdeskId={allData._id}
                        isSubmitted={filteredData.isSubmitted}
                         showReceipt={showReceipt}
                         username= {filteredData.username}
                        userNumber= {filteredData.userNumber}
                         withdrawalCode= {filteredData.withdrawalCode}
                         getUserDetails={getUserDetails}
                         momoName={filteredData.momoName}
                        momoNumber={filteredData.momoNumber}
                      />
                    ))
                ) : (
                  <div
                    className='no-result_subadmin animate-pop-in_subadmin'
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
              ) : state === "Commandes échouées" ? (
                data?.filter((item: any) => item.status === "Failed").length >
                0 ? (
                  data
                    ?.filter((item: any) => item.status === "Failed")
                    .slice()
                    .reverse()
                    .map((filteredData: any, index: any) => (
                      <TransactionResultsSubadmin
                        key={index}
                        time={filteredData.registrationDateTime}
                        amount={filteredData.amount}
                        transactionId={filteredData.transactionId}
                        identifierId={filteredData.identifierId}
                        betId={filteredData.betId}
                        status={filteredData.status}
                        type={filteredData.fundingType}
                        userId={filteredData.userid}
                        cashdeskId={allData._id}
                        isSubmitted={filteredData.isSubmitted}
                         showReceipt={showReceipt}
                          username= {filteredData.username}
                        userNumber= {filteredData.userNumber}
                         withdrawalCode= {filteredData.withdrawalCode}
                         getUserDetails={getUserDetails}
                         momoName={filteredData.momoName}
                        momoNumber={filteredData.momoNumber}
                      />
                    ))
                ) : (
                  <div
                    className='no-result_subadmin animate-pop-in_subadmin'
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
                  ?.slice()
                  .reverse()
                  .map((data: any, index: any) => (
                    <TransactionResultsSubadmin
                      key={index}
                      time={data.registrationDateTime}
                      amount={data.amount}
                      transactionId={data.transactionId}
                      identifierId={data.identifierId}
                      betId={data.betId}
                      status={data.status}
                      type={data.fundingType}
                      userId={data.userid}
                      cashdeskId={allData._id}
                      isSubmitted={data.isSubmitted}
                       showReceipt={showReceipt}
                         username= {data.username}
                        userNumber= {data.userNumber}
                         withdrawalCode= {data.withdrawalCode}
                         getUserDetails={getUserDetails}
                         momoName={data.momoName}
                        momoNumber={data.momoNumber}
                    />
                  ))
              ) : (
                <div
                  className='no-result_subadmin animate-pop-in_subadmin'
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
            ) : state === "Les ordres en attente" ? (
              data?.filter((item: any) => item.status === "Pending").length >
              0 ? (
                data
                  ?.filter((item: any) => item.status === "Pending")
                  .slice()
                  .reverse()
                  .slice(0, 3)
                  .map((filteredData: any, index: any) => (
                    <TransactionResultsSubadmin
                      key={index}
                      time={filteredData.registrationDateTime}
                      amount={filteredData.amount}
                      transactionId={filteredData.transactionId}
                      identifierId={filteredData.identifierId}
                      betId={filteredData.betId}
                      status={filteredData.status}
                      type={filteredData.fundingType}
                      userId={filteredData.userid}
                      cashdeskId={allData._id}
                      isSubmitted={filteredData.isSubmitted}
                       showReceipt={showReceipt}
                         username= {filteredData.username}
                        userNumber= {filteredData.userNumber}
                        withdrawalCode= {filteredData.withdrawalCode}
                         getUserDetails={getUserDetails}
                         momoName={filteredData.momoName}
                        momoNumber={filteredData.momoNumber}
                    />
                  ))
              ) : (
                <div
                  className='no-result_subadmin animate-pop-in_subadmin'
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
            ) : state === "Commandes réussies" ? (
              data?.filter((item: any) => item.status === "Successful").length >
              0 ? (
                data
                  ?.filter((item: any) => item.status === "Successful")
                  .slice()
                  .reverse()
                  .slice(0, 3)
                  .map((filteredData: any, index: any) => (
                    <TransactionResultsSubadmin
                      key={index}
                      time={filteredData.registrationDateTime}
                      amount={filteredData.amount}
                      transactionId={filteredData.transactionId}
                      identifierId={filteredData.identifierId}
                      betId={filteredData.betId}
                      status={filteredData.status}
                      type={filteredData.fundingType}
                      userId={filteredData.userid}
                      cashdeskId={allData._id}
                      isSubmitted={filteredData.isSubmitted}
                       showReceipt={showReceipt}
                          username= {filteredData.username}
                        userNumber= {filteredData.userNumber}
                         withdrawalCode= {filteredData.withdrawalCode}
                         getUserDetails={getUserDetails}
                         momoName={filteredData.momoName}
                        momoNumber={filteredData.momoNumber}
                    />
                  ))
              ) : (
                <div
                  className='no-result_subadmin animate-pop-in_subadmin'
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
            ) : state === "Commandes échouées" ? (
              data?.filter((item: any) => item.status === "Failed").length >
              0 ? (
                data
                  ?.filter((item: any) => item.status === "Failed")
                  .slice()
                  .reverse()
                  .slice(0, 3)
                  .map((filteredData: any, index: any) => (
                    <TransactionResultsSubadmin
                      key={index}
                      time={filteredData.registrationDateTime}
                      amount={filteredData.amount}
                      transactionId={filteredData.transactionId}
                      identifierId={filteredData.identifierId}
                      betId={filteredData.betId}
                      status={filteredData.status}
                      type={filteredData.fundingType}
                      userId={filteredData.userid}
                      cashdeskId={allData._id}
                      isSubmitted={filteredData.isSubmitted}
                       showReceipt={showReceipt}
                           username= {filteredData.username}
                        userNumber= {filteredData.userNumber}
                         withdrawalCode= {filteredData.withdrawalCode}
                         getUserDetails={getUserDetails}
                         momoName={filteredData.momoName}
                        momoNumber={filteredData.momoNumber}
                    />
                  ))
              ) : (
                <div
                  className='no-result_subadmin animate-pop-in_subadmin'
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
                .slice()
                .reverse()
                .slice(0, 3)
                .map((data: any, index: any) => (
                  <TransactionResultsSubadmin
                    key={index}
                    time={data.registrationDateTime}
                    amount={data.amount}
                    transactionId={data.transactionId}
                    identifierId={data.identifierId}
                    betId={data.betId}
                    status={data.status}
                    type={data.fundingType}
                    userId={data.userid}
                    cashdeskId={allData._id}
                    isSubmitted={data.isSubmitted}
                    showReceipt={showReceipt}
                        username= {data.username}
                        userNumber= {data.userNumber}
                         withdrawalCode= {data.withdrawalCode}
                         getUserDetails={getUserDetails}
                         momoName={data.momoName}
                        momoNumber={data.momoNumber}
                  />
                ))
            ) : (
              <div
                className='no-result_subadmin animate-pop-in_subadmin'
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

            {pathname === "/subadmin/deposit/transactions" || pathname === "/subadmin/withdrawal/transactions" ? null : viewMore ===
              true ? (
              <div className='view-more'>
                <Link
                  href={{
                    pathname: pathname === "/subadmin/deposit/dashboard" ? "/subadmin/deposit/transactions"  : "/subadmin/withdrawal/transactions",
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

export default SubadminTransactionTemplate;
