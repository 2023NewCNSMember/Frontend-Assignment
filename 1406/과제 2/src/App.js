import styled from 'styled-components'

function App() {
  // const url=`https://api.openweathermap.org/data/2.5/weather?q=Daegu&appid=7c46055859ec788fbb07ad6e7c1eba1e`
  const url=`https://api.openweathermap.org/data/2.5/weather?q=Daegu&appid=7c46055859ec788fbb07ad6e7c1eba1e&units=metric`;
//   const todayData = () => {
//     const week = ['월','화','수','목','금','토','일'];
//     let now = new Date();
//     let todayMonth = (now.getMonth()+1) > 9 ? (now.getMonth()+1) : (now.getMonth()+1);
//     let todayDate = now.getDate() > 9 ? now.getDate() : '0' + now.getDate();
//     let dayOfWeek = week[now.getDay()];
//     return todayMonth + '월 ' + todayDate + '일 ' + dayOfWeek + '요일'
// }
  return (
    <AppWrap>
      <div className="AppContentWrap">

      </div>

    </AppWrap>
  );
}

export default App;

const AppWrap = styled.div`
  width:100vw;
  height:100vh;
  border:1px black solid;

  .AppContentWrap {
    left:50%;
    top:50%;
    tranform:translate(-50%, -50%);
    position:absolute;
    border:1px blue solid;
    padding:20px;
  }

`;