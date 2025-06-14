// 이미지 요소 생성 및 로딩 후 그리기
export async function createImageItem(src, index) {
    return new Promise((resolve) => {
        // 새로운 <img> HTML 요소를 생성
        const image = document.createElement("img");
        // 이미지 요소의 소스(경로)를 설정
        image.src = src;
        // 이미지가 완전히 로드되면 실행될 콜백 함수를 설정
        image.onload = () => {
            // 로드된 이미지를 해당 인덱스 위치에 그리기
            resolve(image);
        };
    })
}

// 비디오 요소 생성 후 자동 재생 및 업데이트마다 그리기
export async function createVideoItem(src, index) {
    return new Promise((resolve) => {
        // 새로운 <video> HTML 요소를 생성
        const video = document.createElement("video");
        // 비디오 요소의 소스(경로)를 설정
        video.src = src;
        // 비디오 소리가 나지 않도록 음소거 상태로 설정합니다. (마우스 호버 시에는 소리 없이 재생)
        video.muted = true; // hover에서는 무음으로 재생
        // 비디오 데이터가 로드되어 재생 가능한 상태가 되면 실행될 콜백 함수를 설정
        video.onloadeddata = () => {
            // 비디오 재생을 시작
            video.play();
        };
        // 비디오의 현재 재생 시간이 업데이트될 때마다 실행될 콜백 함수를 설정합니다. (프레임 변경 시)
        video.ontimeupdate = () => {
            // 현재 비디오 프레임을 해당 인덱스 위치에 그림
            resolve(video);
        };
    })
}

// 둥근 모서리를 가진 사각형 영역으로 클리핑 경로를 설정하는 함수
export function drawClipPath(ctx, left, top, width, height, radius) {
    // 새로운 경로 그리기를 시작합니다.
    ctx.beginPath();
    // 경로의 시작점을 설정합니다. (왼쪽 상단 모서리 시작점)
    ctx.moveTo(left + radius, top);
    // 오른쪽 상단 모서리를 그립니다.
    ctx.arcTo(left + width, top, left + width, top + height, radius);
    // 오른쪽 하단 모서리를 그립니다.
    ctx.arcTo(left + width, top + height, left, top + height, radius);
    // 왼쪽 하단 모서리를 그립니다.
    ctx.arcTo(left, top + height, left, top, radius);
    // 왼쪽 상단 모서리를 그립니다.
    ctx.arcTo(left, top, left + width, top, radius);
    // 경로를 닫습니다. (시작점과 끝점을 연결)
    ctx.closePath();
    // 현재 설정된 경로를 클리핑 영역으로 사용합니다. 이후 그리는 내용은 이 영역 내부에만 표시됩니다.
    ctx.clip();
}

export function getOrgSize(item) {
    // 아이템이 HTMLVideoElement의 인스턴스인 경우
    if (item instanceof HTMLVideoElement) {
        // 비디오의 videoWidth와 videoHeight를 반환합니다.
        return { width: item.videoWidth, height: item.videoHeight };
    } else { // 그 외의 경우 (HTMLImageElement 등)
        // 요소의 width와 height 속성을 반환합니다.
        return { width: item.width, height: item.height };
    }
}