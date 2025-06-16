//initRecognition();
// OpenAi API 키 설정
const OPENAI_API_KEY =
    `oepn ai key`;

// 음성인식 시작 버큰 클릭 이벤트 핸들러 등록
let recognition = null;
document.getElementById("startBtn").onclick = () => {
    wakeUp();
}
// 음성시작 챗 메새지 출력 후 음성인식 객체 초기화
async function wakeUp() {
    await addChatMessage("음성인식을 시작합니다.", "ai");
    recognition = initRecognition();
}

// 음성 인식 시작
function startRecognition() {
    try {
        recognition.start();
    } catch (err) {
        //
    }
}

// 음성 인식 중단
function stopRecognition() {
    try {
        recognition.stop();
    } catch (err) {
        //
    }
}

// 채팅창에 메시지 추가 함수
async function addChatMessage(text, author='user', url = null) {
    const chatContainer = document.getElementById('chatContainer');
    const messageElement = document.createElement('div');
    messageElement.classList.add("chatMessage", author);
    messageElement.textContent = text;

    // 이미지 url 있으면 이미지도 추가
    if (url) {
        const image = document.createElement('img');
        image.src = url;
        messageElement.appendChild(image);
    }

    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    //author === "ai" && (await speak(text));
}

// 기상청 api를 이용하여 날씨 정보 반환 함수
async function weatherForecast() {
    const API_KEY =
        "weather key";
    const now = new Date();
    // 날짜 형식
    const date = new Date().toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    })
        .replaceAll(". ", "").replace(". ", "");

    // 시간: HH00 형식(정시 단위)
    const time = String(now.getHours()).padStart(2, "0") + "00";

    const url = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=${API_KEY}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${date}&base_time=${time}&nx=61&ny=125`;

    const response = await fetch(url);
    const data = await response.json()
    // 기온, 습도 추출
    const items = data.response.body.items.item;
    const temperature = items.find(
        (item) => item.category === "T1H"
    ).obsrValue;
    const humidity = items.find(
        (item) => item.category === "REH"
    ).obsrValue;
    return `현재 기온은 ${temperature}도이고 습도는 ${humidity}%입니다.`;
}

// 사용자 입력 테스트 처리 함수: 명령어 파싱 및 읍당 처리
async function process(message) {
    let aiMessage = `죄송합니다 이해할 수 없습니다.`;
    let url = null;
    if (message.startsWith("날씨")) {
        aiMessage = await weatherForecast();
    } else if (message.startsWith("번역")) {
        aiMessage =await translate(
            message.split("번역")[1]
        )
    } else if (message.startsWith("그림")) {
        url = (await generateImage(message.split("그림")[1])).url;
        aiMessage = "";
    } else {
        aiMessage = await askQuestion(message);
    }
    await addChatMessage(aiMessage, "ai", url);
}

// 변역 기능: 영어로 요청
async function translate(text) {
    return await askQuestion(`${text}을 영어로 변역한 결과를 설명없이 알려줘`);
}


// GPT 모델에게 질문하고 텍스트 응답 받기
async function askQuestion(question) {
    const response = await fetch("https://api.openai.com/v1/chat/completions",
        {
            method: "POST",
            headers: {
                "Content-Type":  "application/json",
                Authorization: `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4",
                messages: [
                    {
                        role: "user",
                        content: question,
                    },
                ],
            }),
        }
    );
    return  (await response.json()).choices[0].message.content;
}

// Open AI 이미지 생성 API를 사용해 이미지 URL 변환
async function generateImage(text) {
    text = await translate(text);
    const response = await fetch("https://api.openai.com/images/generations", {
            method: "POST",
            headers: {
                "Content-Type":  "application/json",
                Authorization: `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "dall-e-2",
                prompt: text,
                n: 1,
                size: "256x256"
            }),
        }
    );
    const result = await response.json();
    return {
        created:result.created,
        url: result.data[0].url,
    }
}

// 음성 인식 초기화 및 콜백 정의
function initRecognition() {
    let isRun = Promise.resolve(false);
    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    console.log(recognition);
    recognition.continous = true;
    recognition.lang = 'ko-KR';
    recognition.interimResults = false;

    recognition.onstart = () => {
        console.log("started");
    }

    recognition.onresult = (event) => {
        const text = event.results[event.results.length - 1][0].transcript;
        isRun = process(text);
        addChatMessage(text, 'user');
        //speak(text);
    };

    recognition.onend = () => {
        // 콜백 함수 실행
        isRun.then(() => {
            recognition.start();
        })
    }

    return recognition;
}

// 음성 출력 후 자동 인식 재시작
function speak(text) {
    stopRecognition();
    const utterance = new SpeechSynthesisUtterance('말하기 버튼을 눌렀습니다');
    speechSynthesis.speak(utterance);
    utterance.onend = () => {
        startRecognition();
    };
}

