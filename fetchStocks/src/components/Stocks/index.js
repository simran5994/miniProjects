import React , {useState, useEffect} from 'react';
import stocks from "../../stocks";

function Users() {

  const months =["January","February","March","April","May","June","July","August","September","October","November","December"];
  const [list,setList] = useState([]);
  const [profit,setProfit]= useState(0);
  const [loss,setLoss] = useState(0);

  const calculateProfitLoss = filteredList=>{
    let openPrice = 0;
    let closePrice = 0;
    for(let i = 0; i < filteredList.length; i++){
      openPrice += filteredList[i].open;
      closePrice += filteredList[i].close;
    };
    if(closePrice-openPrice>0){
      setProfit((profit)=>closePrice-openPrice);
      setLoss((loss)=>0);



    }
    else{
      setLoss((loss)=>closePrice-openPrice);
      setProfit((profit)=>0);

    }
    return openPrice;
  };

  useEffect(()=>{
    const janList = stocks.filter(stock => {
      const d = new Date(stock.date);
      if(months[d.getMonth()]==="January"){
        return d;
      }
    })
    setList(janList);
    calculateProfitLoss(janList);
    // eslint-disable-next-line 
  },[])




  const filterData = (e)=>{
    const filteredList = stocks.filter(stock => {
      const d = new Date(stock.date);
      if(months[d.getMonth()]===e.target.value){
        return d;
      }
    });
    calculateProfitLoss(filteredList);
    setList(filteredList);

  }

  const monthList =  months.map((e)=>{
      return (<option key={e} value={e}>{e}</option>)
  });

  const getProfit = (dataObject)=>{
    let prof = dataObject.close-dataObject.open;
    if(prof>0){
      return(
        <p className='ma-0'>Profit: <span role='img' aria-label='profit'>✅</span> ({prof.toFixed(2)})</p> 
      );
    }
    else{
      return(
        <p className='ma-0'>Profit: <span role='img' aria-label='close'>❌</span> ({prof.toFixed(2)})</p> 
      );
    }

  }

  const sortData = ()=>{
    const sortedList = list.sort((a,b) => {
      return ((a.close-a.open) - (b.close-b.open))
    })
    setList((list) => [...sortedList].reverse());
  }


  return (
    <>
        <div className='layout-row justify-content-center'>
        <select className='mt-13 mr-5' data-testid="select-month" onChange={filterData}>
          {monthList}
        </select>
          <button data-testid="sort" onClick={()=>sortData()}>Sort</button>
        </div>
        <div className='layout-row wrap w-100 justify-content-center' data-testid="stocks">

        {list.map((stock,i)=>{
      return (
        <div className='card layout-column w-20 ma-10 px-8' key={i}>
            <p className='ma-0'>Date: {stock.date}</p>
            <p className='ma-0'>High: {stock.high}</p>
            <p className='ma-0'>Low: {stock.low}</p>
            {/* <p className='ma-0'>Profit: ❌({(3201.23 - 2889.23).toFixed(2)})</p> ✅ for profit and ❌ for loss */}
            {getProfit(stock)}
        </div>
      )
    })}
        </div>
        <div className='layout-column justify-content-center align-items-center' >
          <p className='mb-0 font-weight-bold' data-testid='total-profit'>Total Profit: <span style={{color: "#1ba94c"}}>{profit}</span></p>
          <p className='font-weight-bold' data-testid='total-loss'>Total Loss: <span style={{color: "red"}}>{loss}</span></p>
        </div>
    </>
  )
}

export default Users;