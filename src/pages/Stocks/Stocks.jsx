import Layouts from '@/Layouts/Layouts'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DataTable from 'react-data-table-component'


function Stocks() {

    const [data , setData] = useState([])
    const location = useLocation()
    const stocks = location.state?.data
    console.log(stocks);

    const conditionalRowStyles  = [
        {
          when: row => row.is_active || !row.is_active,
          style: {
            backgroundColor: '#fffff',
            fontWeight:'bold',
          
          },
    
          
        },
        
      ]

    const coloumn = [

        {
          name:'STOCK',
          selector : row => row.STOCK,
        },
        {
          name:"STOCK PRICE",
          selector : row => row.CLOSE,    
        },
    
        {
          name:"OPEN",
          selector : row => row.OPEN,
        },
    
        {
          name:"CHANGE",
          selector : row => row.CLOSE - row.OPEN,   
          cell: row => (
            <div style={{ color: row.CLOSE - row.OPEN > 0 ? "green" : "red" }}>
              {row.CLOSE - row.OPEN}
            </div>
         ), 
        },
        {
            name:"CAP",
          selector : row => row.CLOSE,
        },
        {
            name:"VOLUME",
          selector : row => row.VOLUME,
        },

     
        
      ]  
    
      useEffect(() => {
        const transformData = stocks.map((stockObj) => {
           const stockSymbol = Object.keys(stockObj)[0];
           const stockDetails = stockObj[stockSymbol];
           return {
             STOCK: stockSymbol,
             OPEN: stockDetails.Open[0],
             HIGH: stockDetails.High[0],
             LOW: stockDetails.Low[0],
             CLOSE: stockDetails.Close[0],
             VOLUME: stockDetails.Volume[0],
           };
        });
        setData(transformData);
       }, [stocks]);
       

  return (
    <Layouts>
    <div >
      <DataTable
      columns ={coloumn}
      data = {data}
      pagination
      selectableRows
      conditionalRowStyles={conditionalRowStyles}
      customStyles={{
        headCells : {
          style: {
            paddingLeft: '8px',
            paddingRight : '8px',
            backgroundColor :'#000000',
            fontWeight : 'bold',
            color: '#ffffff', 
              borderBottom: '1px solid #ddd',
      
            },
          },
          cells : {
            style: {
              paddingLeft:'8px',
              paddingRight: '8px',
              borderBottom: '1px solid #ddd',
            }
        }
      }}
      >
      </DataTable>
    </div>

    </Layouts>
  )
}

export default Stocks
