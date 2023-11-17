"use client";
import { usePathname } from "next/navigation";
import React, {useState} from "react";
import "./transactionTemplate.css";
import AnimateHeight from "react-animate-height";
import { TransactionTemplateProps } from "@/types";
import { LuHistory } from "react-icons/lu";
import formatNumberWithCommasAndDecimal from "@/components/(Utils)/formatNumber";
import { FaCircle } from "react-icons/fa6";
import TransactionResults from "@/components/(userscomponent)/(TransactionTemplate)/(TransactionResults)/TransactionResults";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
const TransactionTemplate = ({ title }: TransactionTemplateProps) => {
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

  return (
    <div className='transaction_template_container'>
      <div className='transaction_template_container_header'>
        <span className='transaction_template_container_header_1'>
          Transaction History <LuHistory />
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
            <>  XOF {formatNumberWithCommasAndDecimal(378899456567.99)}</>
          </h3>
        </span>
      </div>
      <div className='transaction_template_container_body'>
        <div className='transaction_template_container_body_1'>
          <div className='transaction_template_container_body_1_1'>
            Jan 12 2023 . feb 12 2023 &nbsp;#
          </div>

          <div className='transaction_template_container_body_1_2'>
            <span
              className='transaction_template_container_body_1_2_1'
              style={{ borderColor: " #5E968B" }}
            >
              View All &nbsp; <FaCircle color='#fff' fontSize='10px' />
            </span>
            <span className='transaction_template_container_body_1_2_1'>
              View Deposits &nbsp; <FaCircle color='#658900' fontSize='10px' />
            </span>
            <span className='transaction_template_container_body_1_2_1'>
              View Wihdrawals &nbsp;{" "}
              <FaCircle color='#0076B8' fontSize='10px' />
            </span>
          </div>
          <div className='transaction_template_container_body_1_3'  aria-expanded={height !== 0}
            aria-controls="example-panel" onClick={adjustHeight}>
             Wihdrawals&nbsp;#
  <AnimateHeight
        id="example-panel"
        duration={300}
        height={height}
        style={{
        background: 'black',
        position: "absolute",
        top: "28px" ,
        right: 0,
        left: 0,
         zIndex: 12,
        
       
        }}
      >

            <div className="dropdown-content">
              <div className="dropdown-content_1" style={{background: "rgba(256, 256, 256, 0.3)"}}>All</div>
              <div  className="dropdown-content_2">Deposits</div>
              <div  className="dropdown-content_3">Withdrawals</div>
            </div>
           </AnimateHeight>


          </div>
        </div>

        <div
          className='transaction_template_container_body_2'
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            paddingBottom: "20px",
            marginTop: "10px",
          }}
        >
          <TransactionResults
            date='24 - Jun - 2023'
            time='10:30:25 p.M'
            amount={4448488843}
            receipt='235721XGFDH'
            betId='874546379'
            status='Failed'
            type='deposit'
          />
          <TransactionResults
            date='24 - Jun - 2023'
            time='10:30:25 p.M'
            amount={994565678899}
            receipt='235721XGFDH'
            betId='874546379'
            status='Successful'
            type='withdraw'
          />
          <TransactionResults
            date='24 - Jun - 2023'
            time='10:30:25 p.M'
            amount={6723884449}
            receipt='235721XGFDH'
            betId='874546379'
            status='Successful'
            type='withdraw'
          />
          {pathname === "/transactions" && (
            <>
              <TransactionResults
                date='24 - Jun - 2023'
                time='10:30:25 p.M'
                amount={6723884449}
                receipt='235721XGFDH'
                betId='874546379'
                status='Successful'
                type='withdraw'
              />
              <TransactionResults
                date='24 - Jun - 2023'
                time='10:30:25 p.M'
                amount={4448488843}
                receipt='235721XGFDH'
                betId='874546379'
                status='Failed'
                type='deposit'
              />
              <TransactionResults
                date='24 - Jun - 2023'
                time='10:30:25 p.M'
                amount={4448488843}
                receipt='235721XGFDH'
                betId='874546379'
                status='Failed'
                type='deposit'
              />
              <TransactionResults
                date='24 - Jun - 2023'
                time='10:30:25 p.M'
                amount={4448488843}
                receipt='235721XGFDH'
                betId='874546379'
                status='Failed'
                type='deposit'
              />
              <TransactionResults
                date='24 - Jun - 2023'
                time='10:30:25 p.M'
                amount={6723884449}
                receipt='235721XGFDH'
                betId='874546379'
                status='Successful'
                type='withdraw'
              />

              <TransactionResults
                date='24 - Jun - 2023'
                time='10:30:25 p.M'
                amount={6723884449}
                receipt='235721XGFDH'
                betId='874546379'
                status='Successful'
                type='withdraw'
              />
              <TransactionResults
                date='24 - Jun - 2023'
                time='10:30:25 p.M'
                amount={6723884449}
                receipt='235721XGFDH'
                betId='874546379'
                status='Successful'
                type='withdraw'
              />
            </>
          )}
          {pathname === "/transactions" ? null : (
            <div className='view-more'>
              <Link href='/transactions'>
                View More &nbsp;
                <FaArrowRight />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionTemplate;
