import makeCarousel from "../2-carousel/module.js"

document.addEventListener("DOMContentLoaded", () => {
    // 주요 DOM 요소 할당
    const typingSection = document.querySelector(".typing-effect");
    const imageSliderSection = document.getElementById("image-slider");
    const videoSection = document.getElementById("video-player");
    const modelViewerSection = document.getElementById("model-viewer");
    const tilltEffectSection = document.querySelector(".tilt-effect-container");
    const tiltContents = document.querySelector(".tilt-effect");
    const progress = document.getElementById("scroll-progress");

    // 줌 제어용 변수
    let zoomLevel = 1;
    const minZoomLevel = 0.01;
    const maxZoomLevel = 2;
    let camera = null;

    // 초기 기능 실행
    init3DViewr(modelViewerSection);
    registTiltEffectHandler(tiltContents);
    initProgressAnimation(progress)

    // 상단 진행 바 애니메이션 (ScrollTimeline API 사용)
    function initProgressAnimation(target) {
        target.animate(
            {
            width: ["0%", "100%"],
        },
            {
            timeline: new ScrollTimeline({
                scrollOffsets: [
                    { target, edge: "start", threshold: "0"},
                    { target, edge: "end", threshold: "1"}
                ],
            }),
        }
        );
    }

    // 마우스 이동에 따라 요소를 3D로 기울이기
    function registTiltEffectHandler(contents) {
        tilltEffectSection.addEventListener("mousemove", (event) => {
            const {left, top, width, height} = tilltEffectSection.getBoundingClientRect();
            const mouseX = event.clientX - left - width / 2;
            const mouseY = event.clientY - top - height / 2;

            const rotateX = (mouseX / height) * 30;
            const rotateY = (mouseY / height) * -30;

            contents.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg`;
        })
    }

    // 스크롤 비활성화 (줌 조작 시)
    function disableScroll() {
        document.body.style.overflow = "hidden";
        document.body.style.height = "100vh";
    }

    // 스크롤 다시 활성화
    function enablesScroll() {
        document.body.style.overflow = "";
        document.body.style.height = "";
    }

    // 줌 조작 시작: 스크롤 활성화하고 wheel 이벤트 등록
    function registZoomHandler() {
        disableScroll();
        document.addEventListener(`wheel`, onWheel, { passive: false });
    }

    // 줌 조작 종료:
    function unregistZoomHandler() {
        document.removeEventListener(`wheel`, onWheel);
        enablesScroll();
    }

    // 특정 섹션으로 스크롤 이동 (3D 뷰어용)
    function scrollToSection(section) {
        const targetPosition = section.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
            top: targetPosition,
            behavior: "smooth",

        });
    }

    // 마우스 휠을 통한 줌 처리
    function onWheel(event) {
        event.preventDefault();
        event.stopPropagation();
        zoomLevel += event.deltaY * 0.001;

        // camera.postion.z = 10 / zoomLevel;
        if (zoomLevel > maxZoomLevel || zoomLevel < minZoomLevel) {
            zoomLevel = Math.min(Math.max(minZoomLevel, zoomLevel), maxZoomLevel);
            unregistZoomHandler();
        }
    }

    // Three.js를 사용한 3D 회전 박스 렌더링
    function init3DViewr(container) {
        const scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        const geometry = new THREE.PlaneGeometry(5, 5);
        const material = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            side: THREE.DoubleSide,
        });

        camera.position.z = 10 / zoomLevel;

        const rectangle = new THREE.Mesh(geometry, material);
        scene.add(rectangle);
        renderer.render(scene, camera);

        // 애니메이션 루프
        const animate = () => {
            requestAnimationFrame(animate);
            rectangle.rotation.x += 0.01;
            rectangle.rotation.y += 0.01;
            renderer.render(scene, camera);
        };
        animate();
    }

    // 비디오 요소 생성 및 재생
    const video = document.createElement("video");
    video.pause();
    video.muted = true;
    video.src = "./videos/01.webm";
    video.loop = true;
    video.onloadeddata = () => {
        video.play();
    };
    videoSection.appendChild(video);

    // 비디오에 마우스 조작 이벤트 등록
    registVideoEventHandler(video);

    // 타이핑 애니메이션
    let index = 0;
    function typeText(text) {
        if(index < text.length) {
            typingSection.textContent += text.charAt(index);
            index++;
            setTimeout(() => typeText(text), 100);
        }
    }

    // 이미지 슬라이더 생성
    imageSliderSection.appendChild(makeCarousel([
        "../2-carousel/images/02.jpg",
        "../2-carousel/images/03.jpg",
        "../2-carousel/images/04.jpg",
        "../2-carousel/images/05.jpg",
    ], {
        visibleCount: 2, slideCount: 2, captionPos: "left top"
    }))

    // 비디오 조작 이벤트 등록 함수
    function registVideoEventHandler(video) {
        video.addEventListener("mousedown", (event) => {
            video.pause();
        });
        // 커서를 좌우로 움직여 탐색하는 기능
        function seekTo(duration) {
            return new Promise((resolve) => {
                let seekTime = video.currentTime + duration;
                seekTime = seekTime > video.duration ? seekTime % video.duration : seekTime;
                video.currentTime = seekTime < 0 ? video.duration + seekTime : seekTime;
                video.ontimeupdate = () => {
                    resolve(video.currentTime);
                };
            });
        }

        let promise = null;
        video.addEventListener("mousemove", (event) => {
            if (video.paused) {
                const duration = event.movementX / 10;
                // video.currentTime += duration; promise가 있어야 자연스럽게 동작가능
                if (!promise) {
                    promise = seekTo(duration).then(time => {
                        console.log("updated", time);
                        promise = null;
                    })
                }
            }
        });

        video.addEventListener("mouseup", (event) => {
            video.play();
        })
    }

    // IntersectionObserver로 각 section의 등장 감지
    const observerOptions = { root: null, threshold: [0.5] };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                if (entry.target === typingSection) {
                    typeText("Hello, welcome to interactive web site!");
                }
                if (entry.target === modelViewerSection) {
                    registZoomHandler();
                    scrollToSection(modelViewerSection);
                }
            } else {
                entry.target.classList.remove("is-visible");
                if (entry.target === typingSection) {
                    index = 0;
                    typingSection.textContent = "";
                }
                if (entry.target === modelViewerSection) {
                    unregistZoomHandler();
                }
            }
        });
    }, observerOptions);

    // 모든 섹션 요소에 관찰자 연결
    document.querySelectorAll("section").forEach((section) => {
            observer.observe(section);
    });

})