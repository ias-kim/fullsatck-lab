
import { NormalDraw, SelectDraw } from "./draw.js";
import { createImageItem, createVideoItem, isDrawbleItem } from './util.js';
import { getVisualizer } from './visualizer.js';
class Drawable {
    #drawStrategy;
    constructor() {
        this.#drawStrategy = new NormalDraw();
    }
    draw(ctx) {
        this.#drawStrategy.draw(ctx, this);
    }
    setDrawStrategy(drawStrategy) {
        this.#drawStrategy = drawStrategy;
    }
}
class Item extends Drawable {
    #position;
    #animateHandel;
    scale;
    visualizer;
    constructor(index, gallery) {
        super();
        this.visualizer = null;
        this.source = null;
        this.index = index;
        this.scale = 1;
        this.#calcPosition(gallery, index);
    }
    get position() {
        return this.#position;
    }
    #calcPosition(gallery, index) {
        const { column, margin, itemWidth, itemHeight } = gallery;
        const row = Math.floor(index / column);
        const col = index % column;

        this.#position = {
            left: col * (itemWidth + margin),
            top: col * (itemHeight + margin),
            width: itemWidth,
            height: itemHeight,
        };
    }

    #animateScale(targetScale, duration = 250) {
            // 애니메이션 시작 시간을 기록합니다.
            const start = Date.now();
            // 애니메이션 시작 시점의 초기 배율을 1로 설정합니다. (항상 1에서 시작해서 targetScale로 변경)
            const initialScale = 1;
            // 초기 배율과 목표 배율 간의 차이를 계산합니다.
            const diff = targetScale - initialScale;

            // 애니메이션의 각 프레임을 처리하는 내부 함수입니다.
            const step = () => {
                // 애니메이션 시작 후 현재까지 경과된 시간을 계산합니다.
                const timePassed = Date.now() - start;
                // 전체 애니메이션 시간 대비 현재 경과 시간의 비율을 계산합니다. (0.0 ~ 1.0)
                const progress = timePassed / duration;
                // 현재 프레임에서의 확대 배율을 계산합니다. (초기 배율 + (변화량 * 진행률))
                // 애니메이션 진행률이 1 미만이면 (애니메이션이 아직 끝나지 않았으면)
                if (progress < 1) {
                    // 다음 애니메이션 프레임을 요청합니다. (재귀 호출)
                    this.#animateHandel = requestAnimationFrame(step);
                }
            };
            // 애니메이션의 첫 번째 프레임을 시작합니다.
            step();
    }
    select() {
        this.setDrawStrategy(new SelectDraw());
    }
    unselect() {
        this.setDrawStrategy(new Select)
    }
    hover() {
        this.#animateScale(1.2);
    }
    leave() {
        cancelAnimationFrame(this.#animateHandel);
        this.scale = 1;
    }
    hitTest(x, y) {
        const {left, top, width, height} = this.#position;
        return x > left && x < left + width && y > top && y < top + height;
    }
    draw(ctx) {
        this.source && super.draw(ctx);
    }
}

export class ImageItem extends Item {
    constructor(index, src, gallery) {
        super(index, gallery);
        createImageItem(src).then((image) => {
            this.source = image;
        });
    }
}

export class VideoItem extends Item {
    constructor(index, src, gallery) {
        super(index, gallery);
        createVideoItem(src).then((video) => {
            this.source = video;
            video.muted = true;
            video.play();
        });
    }
    #initVisualizer() {
        this.visualizer === null &&
        !IsDrawbleItem(this.source) &&
        (this.visualizer = getVisualizer(this.source, 640, 30));
    }

    select() {
        this.#initVisualizer();
        this.visualizer?.play();
        this.source.muted = false;
        this.source.play();
        super.select();
    }
    unselect() {
        this.source.muted = true;
        this.source.pause();
        this.visualizer?.pause();
        super.unselect();
    }
}

export class ItemFactory {
    create(index, src, gallery) {
        return this.createItem(index, src, gallery);
    }
    createItem(index, src, gallery) {
        throw new Error('구현');
    }
}
export class ImageItemFactory extends ItemFactory {
    createItem(index, src, gallery) {
        return new ImageItem(index, src, gallery);
    }
}

export class VideoItemFactory extends ItemFactory {
    createItem(index, src, gallery) {
        return new VideoItem(index, src, gallery);
    }
}