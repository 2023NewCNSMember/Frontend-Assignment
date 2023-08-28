import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p className="cns">CNS</p>
        <p className="in">로그인</p>
        <p className="in2">회원가입</p>
      </header>
    </div>
  );
}
function Bpp() {
  return (
    <div className="box">
        <p className="care">Care aNd Service</p>
        <p className="lo">로그인</p>
      <div className="please">
        <p className="login">아이디</p>
        <input type="text" id="login" placeholder=" 아이디를 입력해주세요."></input>
        <p className="login">비밀번호</p>
        <input type="password" id="login" placeholder="  비밀번호를 입력해주세요." color="#909090"></input>
        <br></br>
        <input type="submit" className="realLogin" value="로그인"></input>
        <p id="Gyejung">계정이 없으신가요?</p>
      </div>
    </div>
  );                   
}

function AppWithBpp() {
  return (
    <div>
      <App />
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Bpp />
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
}

export default AppWithBpp;