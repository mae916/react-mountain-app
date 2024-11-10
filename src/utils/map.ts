export function setMarkers(datas: any) {
  const positions = datas.map(
    (datas: any) => new window.kakao.maps.LatLng(datas.y, datas.x)
  );

  let bounds = new window.kakao.maps.LatLngBounds(); // 모든 좌표를 포함한 중심영역

  const markers = positions.map((position: any) => {
    const marker = new window.kakao.maps.Marker({
      map: window.kakaoMap,
      position,
    });
    // LatLngBounds에 마커의 좌표 추가
    bounds.extend(position);

    return marker;
  });

  markers.forEach((marker: any) => {
    marker.setMap(null);
    marker.setMap(window.kakaoMap);
  });

  console.log('bounds', bounds);
  // 모든 마커가 포함된 영역을 지도에 반영
  window.kakaoMap.setBounds(bounds);
}

export function setPolyline(path: string[]) {
  const polyline = new window.kakao.maps.Polyline({
    map: window.kakaoMap,
    path: path, // 경로 좌표 배열
    strokeWeight: 2,
    strokeColor: '#00a8ff',
    strokeOpacity: 0.8,
    strokeStyle: 'solid',
  });

  polyline.setMap(window.kakaoMap);
  return polyline;
}

export function removePolyline(polyline: any) {
  polyline.setMap(null);
}

export function setCenters(datas: string[]) {
  let bounds = new window.kakao.maps.LatLngBounds(); // 모든 좌표를 포함한 중심영역

  datas.forEach((data: any) => {
    // LatLngBounds에 마커의 좌표 추가
    bounds.extend(data);
  });
  window.kakaoMap.setBounds(bounds);
}

export function setRectangle(coor: number[]) {
  var rectangle = new window.kakao.maps.Rectangle({
    map: window.kakaoMap,
    bounds: new window.kakao.maps.LatLngBounds(
      new window.kakao.maps.LatLng(coor[1], coor[0]),
      new window.kakao.maps.LatLng(coor[3], coor[2])
    ),
    strokeWeight: 2,
    strokeColor: '#0097e6',
    strokeOpacity: 0.8,
    strokeStyle: 'solid',
  });
  rectangle.setMap(window.kakaoMap); // 지도에 올린다.
}
