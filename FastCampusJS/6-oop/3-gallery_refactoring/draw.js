import {drawClipPath, createVideoItem, getOrgSize } from "./util.js";

// 오디오 파일이 로드될 때 썸네일 대신 표시될 기본 이미지를 생성
const defaultAudioImg = document.createElement("img");
defaultAudioImg.src = "./images/mp3.png";
defaultAudioImg.onload = () => {
    console.log("audio image loaded");
};

class DrawStrategy {
    draw(ctx, item) {
        throw new Error('구현');
    }
}

export class NormalDraw extends DrawStrategy {
    draw(ctx, item) {
        const { left, top, width, height } = item.position;

        // 스케일(확대/축소)이 적용된 최종 목적지 너비를 계산합니다.
        const destWidth = width * item.scale;
        // 스케일(확대/축소)이 적용된 최종 목적지 높이를 계산합니다.
        const destHeight = height * item.scale;
        // 스케일 적용 후 아이템이 중앙에 위치하도록 최종 목적지 왼쪽 좌표를 계산합니다.
        const destLeft = left + (width - destWidth) / 2;
        // 스케일 적용 후 아이템이 중앙에 위치하고, 현재 스크롤 위치(scrollY)를 반영한 최종 목적지 위쪽 좌표를 계산합니다.
        const destTop = top  + (height - destHeight) / 2;

        // 현재 캔버스 드로잉 상태를 저장합니다. (클리핑 등의 설정을 복원하기 위함)
        ctx.save();
        drawClipPath(ctx, destLeft, destTop, destWidth, destHeight, 10); // 둥근 테두리 적용
        // 이미지를 캔버스에 그립니다.
        // isDrawableItem 함수를 통해 그릴 수 있는 아이템인지 확인하고, 아니면(오디오 파일 등) defaultAudioImg를 사용합니다.
        ctx.drawImage(
            isDrawableItem(item.source) ? item.source : defaultAudioImg,
            destLeft,
            destTop,
            destWidth,
            destHeight
        );
        // 이전에 저장했던 캔버스 드로잉 상태를 복원합니다. (클리핑 해제 등)
        ctx.restore();
    }
}


export class SelectDraw extends DrawStrategy {
    draw(ctx, item) {
            const source = visualizerMap.get(item)?.renderer || item.source;
            const canvas = ctx.canvas;
            // 선택된 아이템의 원본 너비와 높이를 가져옵니다.
            const { width, height } = getOrgSize(source);
            // 아이템의 가로세로 비율을 계산합니다.
            const imgAspectRatio = width / height;
            // 캔버스의 가로세로 비율을 계산합니다.
            const canvasAspectRatio = canvas.width / canvas.height;
            // 렌더링될 너비, 높이, 그리고 캔버스 내 x, y 오프셋을 저장할 변수를 선언합니다.
            // 아이템의 가로세로 비율이 캔버스의 가로세로 비율보다 큰 경우 (아이템이 캔버스보다 옆으로 넓은 경우)
            let renderWidth, renderHeight, offsetX, offsetY;
            if (imgAspectRatio > canvasAspectRatio) {
                renderWidth = canvas.width; // 렌더링 너비를 캔버스 너비에 맞춥니다.
                renderHeight = canvas.width / imgAspectRatio; // 비율에 맞게 렌더링 높이를 계산합니다.
                offsetX = 0; // x축 오프셋은 0입니다.
                offsetY = (canvas.height - renderHeight) / 2; // y축 오프셋은 캔버스 중앙에 위치하도록 계산합니다.
            } else { // 아이템의 가로세로 비율이 캔버스의 가로세로 비율보다 작거나 같은 경우 (아이템이 캔버스보다 위아래로 길거나 비율이 같은 경우)
                renderWidth = canvas.height * imgAspectRatio; // 비율에 맞게 렌더링 너비를 계산합니다.
                renderHeight = canvas.height; // 렌더링 높이를 캔버스 높이에 맞춥니다.
                offsetX = (canvas.width - renderWidth) / 2; // x축 오프셋은 캔버스 중앙에 위치하도록 계산합니다.
                offsetY = 0; // y축 오프셋은 0입니다.
            }
            // 현재 캔버스 드로잉 상태를 저장합니다.
            ctx.save();
            ctx.fillStyle = "rgba(0, 0, 0, 0.5)";   // 어두운 배경
            // 캔버스 전체를 반투명 검은색으로 채웁니다.
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            // 계산된 위치와 크기로 선택된 아이템(또는 오디오 시각화 렌더러)을 그립니다.
            ctx.drawImage(item, offsetX, offsetY, renderWidth, renderHeight);
            // 이전에 저장했던 캔버스 드로잉 상태를 복원합니다.
            ctx.restore();
    }
}

