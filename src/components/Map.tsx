import { useEffect } from 'react';

function Map() {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const center = new window.kakao.maps.LatLng(
        position.coords.latitude,
        position.coords.longitude
      );

      const container = document.getElementById('map'); // 지도를 담을 영역의 DOM 레퍼런스
      const options = {
        center: center, // 지도 중심 좌표
        level: 3, // 지도의 레벨(확대, 축소 정도)
      };

      // center가 설정된 후 지도 생성
      window.kakaoMap = new window.kakao.maps.Map(container, options);
    });
  }, []);

  return <div id="map" style={{ width: '100%', height: '300px' }}></div>;
}

export default Map;
