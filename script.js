// script.js
const quizArea = document.getElementById('quiz-area');
const resultArea = document.getElementById('result-area');
const questionText = document.getElementById('question-text');
const answerOptions = document.getElementById('answer-options');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const timerDisplay = document.querySelector('#timer span');
const scoreDisplay = document.getElementById('score');
const totalQuestionsDisplay = document.getElementById('total-questions');
const restartBtn = document.getElementById('restart-btn');
const resultDetails = document.getElementById('result-details');

// Dữ liệu câu hỏi gốc (chưa xáo trộn)
const originalQuestions = [
    {
        question: "Đối với URLConnection, để mở kết nối tới một URL, sử dụng phương thức gì?",
        options: ["openConnect", "openConnection", "openStream", "openLiveStream"],
        correctAnswer: "openConnection"
    },
    {
        question: "Phương thức getOutputStream() của URLConnection dùng để làm gì?",
        options: ["Cho phép ghi thông tin vào HTTP connection", "Thiết lập timeout cho connection", "Mở một trang web", "Quay lại trang web trước"],
        correctAnswer: "Cho phép ghi thông tin vào HTTP connection"
    },
    {
        question: "Đối với URLConnection, sử dụng phương thức nào để thiết lập timeout cho connection?",
        options: ["setTimeout()", "setInternetTimeout()", "setURLTimeout()", "setConnectTimeout()"],
        correctAnswer: "setConnectTimeout()"
    },
    {
        question: "Để tải thông tin qua HTTP, chúng ta phải làm gì?",
        options: ["Sử dụng thư viện chuẩn của Java", "Không thể tải thông tin qua HTTP", "Sử dụng HttpGet", "Sử dụng URLRequesting"],
        correctAnswer: "Sử dụng thư viện chuẩn của Java"
    },
    {
        question: "Để thay đổi thông tin về trình duyệt, sử dụng lớp nào?",
        options: ["WebSettings", "WebSetting", "WebSettingUp", "WebSetUp"],
        correctAnswer: "WebSettings"
    },
    {
        question: "Sử dụng lớp nào để truy cập và thay đổi thông tin trên trình duyệt Chrome?",
        options: ["WebSafariClient", "WebClient", "WebFirefoxClient", "WebChromeClient"],
        correctAnswer: "WebChromeClient"
    },
    {
        question: "Điều khiển được sử dụng để hiển thị nội dụng trang web trong ứng dụng Android?",
        options: ["EditText", "WebView", "Button", "Spinner"],
        correctAnswer: "WebView"
    },
    {
        question: "Trong SQLiteOpenHelper, để tạo thực thi câu lệnh SQL ta dùng phương thức nào?",
        options: ["execSQL()", "runSQL()", "execSQLite()", "runSQLite()"],
        correctAnswer: "execSQL()"
    },
    {
        question: "Trong SQLiteOpenHelper, phương thức được gọi khi thay đổi version database",
        options: ["onCreate", "onResume", "onUpgrade", "onOpen"],
        correctAnswer: "onUpgrade"
    },
    {
        question: "Lớp trợ giúp tạo ra cơ sở dữ liệu và phiên bản cho chính nó là",
        options: ["SQLiteHelper", "SQLiteCloseHelper", "SQLiteOpenHelp", "SQLiteOpenHelper"],
        correctAnswer: "SQLiteOpenHelper"
    },
    {
        question: "Hãy cho biết kết quả khi chạy đoạn lệnh sau: String sql = \"create table student(id primary key, name text)\"; database.exec(sql);",
        options: ["Chương trình có lỗi khi chạy.", "Chương trình sẽ tạo ra bảng student có 3 trường.", "Chương trình sẽ tạo ra bảng student có 2 trường id và trường name.", "Chương trình có lỗi khi biên dịch."],
        correctAnswer: "Chương trình có lỗi khi biên dịch."
    },
    {
        question: "Kiểu dữ liệu lưu trữ số thực trong SQLite là gì?",
        options: ["Int", "Integer", "Real", "Number"],
        correctAnswer: "Real"
    },
    {
        question: "Kiểu dữ liệu có giá trị đúng sai được lưu trữ trong SQLite là kiểu gì?",
        options: ["Boolean", "Number", "Integer", "Text"],
        correctAnswer: "Integer"
    },
    {
        question: "Android cung cấp class nào hỗ trợ SQLite?",
        options: ["QLiteOpenHelper, SQLiteDatabase", "SQLiteDatabase", "SQLiteOpenHelper", "SQLiteOpenDatabase"],
        correctAnswer: "QLiteOpenHelper, SQLiteDatabase"
    },
    {
        question: "Thư mục nào để chứa layout cho giao diện khi màn hình ở chế độ portrait mode?",
        options: ["res/layout", "res/layout-land", "res/values", "res/menu"],
        correctAnswer: "res/layout"
    },
    {
        question: "Kiểu Progress Bar nào để hiển thị chi tiết phần trăm hoàn thành một công việc nào đó",
        options: ["determinate", "indeterminate", "determinating", "determination"],
        correctAnswer: "determinate"
    },
    {
        question: "Để hiển thị một thông báo trên status bar, phải sử dụng công cụ gì?",
        options: ["Sử dụng Toast.", "Sử dụng Notification Manager.", "Không thể hiển thị một thông báo trên status bar.", "Sử dụng Context Menu."],
        correctAnswer: "Sử dụng Notification Manager."
    },
    {
        question: "Lớp nào được sử dụng để khởi tạo menu từ file XML menu?",
        options: ["MenuInflater", "Menu", "Xmlmenu", "MenuInflating"],
        correctAnswer: "MenuInflater"
    },
    {
        question: "Câu nào sau đây là đúng?",
        options: ["Option Menu và Context Menu xuất hiện khi ấn vào phím Menu trên điện thoại.", "Option Menu hỗ trợ checkbox.", "Option Menu hỗ trợ radiobutton.", "Option Menu xuất hiện khi ấn vào phím Menu, Context Menu xuất hiện khi click vào View một vài giây."],
        correctAnswer: "Option Menu xuất hiện khi ấn vào phím Menu, Context Menu xuất hiện khi click vào View một vài giây."
    },
    {
        question: "Phương thức nào được sử dụng để xử lý khi một View được click và giữ một lúc?",
        options: ["setOnKeyListener", "setOnClickListener", "setOnLongClickListener", "setOnTouchListener"],
        correctAnswer: "setOnLongClickListener"
    },
    {
        question: "Phương thức nào dùng để xử lý một item trong Menu được chọn?",
        options: ["onMenuItem", "onMenuItemSelected", "onMenuItemClicked", "onOptionsItemSelected"],
        correctAnswer: "onOptionsItemSelected"
    },
    {
        question: "Thư mục nào dùng để lưu trữ code java trong project android?",
        options: ["res/", "assets/", "src/", "bin/"],
        correctAnswer: "src/"
    },
    {
        question: "Styles của giao diện được lưu trong thư mục nào?",
        options: ["res/values", "res/layout", "res/drawable-hdpi", "res/drawable-ldpi"],
        correctAnswer: "res/values"
    },
    {
        question: "Trong Java, sử dụng phương thức nào để lấy thông tin về View theo Id của View?",
        options: ["findViewById", "findViewByName", "searchViewById", "searchViewByName"],
        correctAnswer: "findViewById"
    },
    {
        question: "Để ràng buộc nội dung động vào View trong ListView, chúng ta sử dụng gì?",
        options: ["String", "ArrayAdapter", "Button", "SeekBar"],
        correctAnswer: "ArrayAdapter"
    },
    {
        question: "Layout nào mà các thành phần con dựa trên mối quan hệ với các thành phần khác?",
        options: ["LinearLayout", "FrameLayout", "RelativeLayout", "TabLayout"],
        correctAnswer: "RelativeLayout"
    },
    {
        question: "Layout nào cho phép sắp xếp các view con ở phía trong theo chiều dọc hoặc chiều ngang?",
        options: ["LinearLayout", "FrameLayout", "RelativeLayout", "TabLayout"],
        correctAnswer: "LinearLayout"
    },
    {
        question: "Tất cả thành phần của chương trình được nhóm trong tag nào của AndroidManifest?",
        options: ["permission", "user-permission", "application", "applications"],
        correctAnswer: "application"
    },
    {
        question: "File nào liệt kê quyền mà ứng dụng yêu cầu?",
        options: ["AndroidManifest.xml", "string.xml", "activity_main.xml", "R.java"],
        correctAnswer: "AndroidManifest.xml"
    },
    {
        question: "File nào có chứa các thông tin Resource ID dùng để truy cập đến các tài nguyên (drawable, layout, styles, string)?",
        options: ["style.java", "R.java", "Resource.java", "Resources.java"],
        correctAnswer: "R.java"
    },
    {
        question: "Phương thức nào được gọi khi activity chuẩn bị biến mất?",
        options: ["onDestroy()", "onDestroying()", "onPausing()", "onPause()"],
        correctAnswer: "onPause()"
    },
    {
        question: "Để activity xuất hiện ở launcher, phải khai báo category trong intent_filter như thế nào?",
        options: ["android.intent.category.LAUNCHER", "android.intent.category.LAUNCH", "android.intent.category.START", "android.intent.category.RESTART"],
        correctAnswer: "android.intent.category.LAUNCHER"
    },
    {
        question: "Phương thức nào được gọi khi activity đầu tiên được tạo?",
        options: ["onPausing()", "onPause()", "onCreating()", "onCreate()"],
        correctAnswer: "onCreate()"
    },
    {
        question: "Phương thức nào là phương thức không đồng bộ?",
        options: ["startingActivitiesForResult", "startingActivityForResult", "startActivitiesForResult", "startActivityForResult"],
        correctAnswer: "startActivityForResult"
    },
    {
        question: "Phương thức nào thích hợp nhất để lưu các dữ liệu quan trọng?",
        options: ["Activity.onFreeze()", "Activity.onPause()", "Activity.onStop()", "Activity.onDestroy()"],
        correctAnswer: "Activity.onPause()"
    },
    {
        question: "Trong quá trình biên dịch, android project được biên dịch và đóng gói thành file có đuôi gì?",
        options: ["apk hoặc aab", "exe hoặc aaa", "dex hoặc bbb", "bat hoặc dub"],
        correctAnswer: "apk hoặc aab"
    },
    {
        question: "Công nghệ máy ảo nào do Google tạo ra cho hệ điều hành Android?",
        options: ["Virtual Box", "Dalvik Virtual Machine", "VMWare", "Virtual Driver"],
        correctAnswer: "Dalvik Virtual Machine"
    },
    {
        question: "IDE nào KHÔNG dùng để phát triển ứng dụng trên Android?",
        options: ["Visual Studio", "Visual Studio code", "Android Studio", "Eclipse"],
        correctAnswer: "Visual Studio"
    },
    {
        question: "Thành phần nào là thành phần của Android runtime?",
        options: ["Oracle", "Dalvik Virtual Machine", ".NET", "SQL Server"],
        correctAnswer: "Dalvik Virtual Machine"
    },
    {
        question: "Google đã mua lại hãng điện thoại nào để sản xuất điện thoại Android để cạnh tranh với Apple và Samsung?",
        options: ["HTC", "LG", "Lenovo", "Motorola"],
        correctAnswer: "Motorola"
    },
    {
        question: "Android Studio do công ty nào tạo ra?",
        options: ["HTC", "Amazon", "Google", "Yahoo"],
        correctAnswer: "Google"
    },
    {
        question: "Tổ chức nào phối hợp với Google để tạo ra Android?",
        options: ["Nokia", "Apple", "Open handset alliance", "Microsoft"],
        correctAnswer: "Open handset alliance"
    }
];

let questions = []; // Mảng này sẽ chứa các câu hỏi đã được xáo trộn
let currentQuestionIndex = 0;
let userAnswers = []; // Lưu trữ câu trả lời của người dùng (có thể cần reset khi start quiz)
let score = 0;
let timeLeft = 60 * 5; // 5 phút = 300 giây
let timerInterval;

// Hàm để xáo trộn một mảng (Fisher-Yates shuffle)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Hoán đổi phần tử
    }
    return array;
}

function startQuiz() {
    // Xáo trộn các câu hỏi trước khi bắt đầu bài thi
    questions = shuffleArray([...originalQuestions]); // Tạo bản sao để không làm thay đổi mảng gốc

    currentQuestionIndex = 0;
    userAnswers = new Array(questions.length).fill(null); // Reset userAnswers
    score = 0;
    timeLeft = 60 * 5; // Đặt lại thời gian
    quizArea.classList.remove('hidden');
    resultArea.classList.add('hidden');
    submitBtn.style.display = 'none';
    prevBtn.disabled = true;

    loadQuestion();
    startTimer();
}

function loadQuestion() {
    const question = questions[currentQuestionIndex];
    questionText.textContent = question.question;
    answerOptions.innerHTML = ''; // Xóa các đáp án cũ

    // Xáo trộn các đáp án cho câu hỏi hiện tại
    const shuffledOptions = shuffleArray([...question.options]); // Tạo bản sao để không làm thay đổi mảng gốc

    shuffledOptions.forEach((option) => {
        const optionDiv = document.createElement('div');
        optionDiv.classList.add('answer-option');
        optionDiv.textContent = option;
        optionDiv.dataset.option = option;

        if (userAnswers[currentQuestionIndex] === option) {
            optionDiv.classList.add('selected');
        }

        optionDiv.addEventListener('click', () => selectAnswer(option));
        answerOptions.appendChild(optionDiv);
    });

    prevBtn.disabled = currentQuestionIndex === 0;
    nextBtn.disabled = currentQuestionIndex === questions.length - 1;

    if (currentQuestionIndex === questions.length - 1) {
        submitBtn.style.display = 'inline-block';
    } else {
        submitBtn.style.display = 'none';
    }
}

function selectAnswer(selectedOption) {
    userAnswers[currentQuestionIndex] = selectedOption;

    document.querySelectorAll('.answer-option').forEach(optionDiv => {
        optionDiv.classList.remove('selected');
    });

    // Thêm class 'selected' vào tùy chọn được chọn
    // Đảm bảo chọn đúng div dựa trên dataset.option
    const selectedDiv = document.querySelector(`.answer-option[data-option="${selectedOption}"]`);
    if (selectedDiv) {
        selectedDiv.classList.add('selected');
    }
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            submitQuiz();
            alert('Hết giờ! Bài thi của bạn đã được nộp tự động.');
        }
    }, 1000);
}

function submitQuiz() {
    clearInterval(timerInterval);
    calculateScore();
    displayResults();
}

function calculateScore() {
    score = 0;
    questions.forEach((question, index) => {
        if (userAnswers[index] === question.correctAnswer) {
            score++;
        }
    });
}

function displayResults() {
    quizArea.classList.add('hidden');
    resultArea.classList.remove('hidden');

    scoreDisplay.textContent = score;
    totalQuestionsDisplay.textContent = questions.length;
    resultDetails.innerHTML = '';

    questions.forEach((question, index) => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item');

        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer === question.correctAnswer;

        resultItem.innerHTML = `
            <p><strong>Câu ${index + 1}:</strong> ${question.question}</p>
            <p>Đáp án đúng: <span class="correct-answer">${question.correctAnswer}</span></p>
            <p>Câu trả lời của bạn: <span class="${isCorrect ? 'user-answer' : 'incorrect-answer'}">
                ${userAnswer !== null ? userAnswer : 'Không trả lời'}
            </span></p>
        `;
        resultDetails.appendChild(resultItem);
    });
}

// Bắt sự kiện click cho các nút
nextBtn.addEventListener('click', nextQuestion);
prevBtn.addEventListener('click', prevQuestion);
submitBtn.addEventListener('click', submitQuiz);
restartBtn.addEventListener('click', startQuiz);

// Bắt đầu bài thi khi tải trang
startQuiz();
