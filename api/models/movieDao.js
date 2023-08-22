const {dataSource} = require('./dataSource');
//get 요청에 영화 정보 보내주는 기능
//일정 시간마다 예매울 업데이트하는 기능
//예매율은 현재 상영작 전체 기준, 만약 상영이 종료되거나 아직 미개봉 상태인 영화가 데이터에 들어간다면 movie table에 상영상태를 나타내는 칼럼도 필요
const calculateBookingRate = async(movie.id) => {dataSource.query(
  `SELECT `
)}