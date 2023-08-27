let date = new Date();
let year = date.getFullYear();
let month = "0" + (date.getMonth() + 1);
let month2 = month.substr(-2);
let day = "0" + date.getDate();
let day2 = day.substr(-2);
let initDate = year + month2 + day2;

let hour = date.getHours();
let minute = date.getMinutes();
let sec = date.getSeconds();
let nowTime = hour + "0" + "0";
//console.log(initTime)

if (hour >= 6 && hour < 18) initTime = "0600";
else initTime = "1800";
if (hour >= 0 && hour < 6) initDate -= 1;

let initDame = initDate + initTime;
console.log(initDame);

$.ajax({
  url: `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=wD1v3TeCYcGgMmpbjqdtPA%2FBWkLhzUH2tLvEtEAU%2Bw52K2AVXXICxoqJqNXVLkBE1PqRJ8eUebMcbaD6s64rdQ%3D%3D&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${initDate}&base_time=0500&nx=86&ny=86`,
  success: function (short) {
    console.log(short);
    let itemss = short.response.body.items.item;

    let temper = itemss.filter((item) => {
      return item.category == "TMP";
    });

    let foundTemperature = false;

    for (let i = 0; i < temper.length; i++) {
      if (temper[i].fcstTime == nowTime && !foundTemperature) {
        let content = temper[i].fcstValue + "℃";
        $("p.conTent").append(content);
        foundTemperature = true;
        break;
      }
    }
  },
});

$.ajax({
  url: `https://apis.data.go.kr/1360000/MidFcstInfoService/getMidTa?serviceKey=wD1v3TeCYcGgMmpbjqdtPA%2FBWkLhzUH2tLvEtEAU%2Bw52K2AVXXICxoqJqNXVLkBE1PqRJ8eUebMcbaD6s64rdQ%3D%3D&pageNo=1&numOfRows=10&dataType=JSON&regId=11H10701&tmFc=${initDame}`,
  success: function (result) {
    console.log(result);
    let item_s = result.response.body.items.item;
    let Maxtemper = [];
    let Mintemper = [];

    Maxtemper.push(item_s[0].taMax3);
    Maxtemper.push(item_s[0].taMax4);
    Maxtemper.push(item_s[0].taMax5);
    Maxtemper.push(item_s[0].taMax6);
    Maxtemper.push(item_s[0].taMax7);
    Maxtemper.push(item_s[0].taMax8);
    Maxtemper.push(item_s[0].taMax9);
    Maxtemper.push(item_s[0].taMax10);

    Mintemper.push(item_s[0].taMin3);
    Mintemper.push(item_s[0].taMin4);
    Mintemper.push(item_s[0].taMin5);
    Mintemper.push(item_s[0].taMin6);
    Mintemper.push(item_s[0].taMin7);
    Mintemper.push(item_s[0].taMin8);
    Mintemper.push(item_s[0].taMin9);
    Mintemper.push(item_s[0].taMin10);

    let maxTemperContent = ""; // 출력될 내용을 저장할 변수
    let j = 2;
    for (let i = 0; i < Maxtemper.length; i++) {
      j++;
      maxTemperContent += Maxtemper[i] + "/" + Mintemper[i] + "<br>";
      $("td.days").append("<br>" + j + "</br>");
    }
    $("td.outPut").append("<br>" + maxTemperContent + "<br>");
  },
});
$.ajax({
  url: `https://apis.data.go.kr/1360000/MidFcstInfoService/getMidLandFcst?serviceKey=wD1v3TeCYcGgMmpbjqdtPA%2FBWkLhzUH2tLvEtEAU%2Bw52K2AVXXICxoqJqNXVLkBE1PqRJ8eUebMcbaD6s64rdQ%3D%3D&pageNo=1&numOfRows=10&dataType=JSON&regId=11H10701&tmFc=${initDame}`,
  success: function (data) {
    console.log(data);
    let items = data.response.body.items.item;
    let rnStAm = [];
    let rnStPm = [];

    rnStAm.push(items[0].rnSt3Am);
    rnStPm.push(items[0].rnSt3Pm);
    rnStAm.push(items[0].rnSt4Am);
    rnStPm.push(items[0].rnSt4Pm);
    rnStAm.push(items[0].rnSt5Am);
    rnStPm.push(items[0].rnSt5Pm);
    rnStAm.push(items[0].rnSt6Am);
    rnStPm.push(items[0].rnSt6Pm);
    rnStAm.push(items[0].rnSt7Am);
    rnStPm.push(items[0].rnSt7Pm);
    rnStAm.push(items[0].rnSt8);
    rnStAm.push(items[0].rnSt9);
    rnStAm.push(items[0].rnSt10);

    let rnContent = "";

    for (let i = 0; i < rnStAm.length; i++) {
      if (rnStPm[i] === undefined) rnContent += rnStAm[i] + "<br>";
      else rnContent += rnStAm[i] + "/" + rnStPm[i] + "<br>";
    }
    $("td.output").append("<br>" + rnContent + "<br>");
  },
});
