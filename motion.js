// 変数の定義
let timeLeft = 25 * 60; // 25分（秒単位）
let timerId = null;     // タイマーを動かすための入れ物
let isWorkTime = true;  // trueなら作業時間、falseなら休憩時間

let cycleCount = 0;     // 完了したサイクル数
let totalStudyMinutes = 0; // 合計勉強時間（分）

// 画面の数字を更新する関数
function updateDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    // 1桁のときに頭に「0」をつける処理
    let minText = minutes < 10 ? "0" + minutes : minutes;
    let secText = seconds < 10 ? "0" + seconds : seconds;

    document.getElementById("timer").textContent = minText + ":" + secText;
}

// 1秒ごとに呼ばれる処理
function count() {
    if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
    } else {
        // 時間が0になったとき
        if (isWorkTime) {
            // 25分が終わったら
            alert("25分の作業が終わりました！5分間の休憩に入ります。");
            cycleCount++;
            totalStudyMinutes += 25; // 合計時間に25分足す
            
            // 画面の数値を更新
            document.getElementById("cycle-count").textContent = cycleCount;
            document.getElementById("total-time").textContent = totalStudyMinutes;

            // 休憩モード（5分）に切り替え
            isWorkTime = false;
            timeLeft = 5 * 60;
            document.getElementById("status-text").textContent = "休憩タイム (5分)";
            document.getElementById("status-text").style.color = "#10b981";
        } else {
            // 5分が終わったら
            alert("休憩終了！次の作業を始めましょう。");

            // 作業モード（25分）に戻す
            isWorkTime = true;
            timeLeft = 25 * 60;
            document.getElementById("status-text").textContent = "集中タイム (25分)";
            document.getElementById("status-text").style.color = "#4f46e5";
        }
        updateDisplay();
    }
}

// スタートボタン
function startTimer() {
    if (timerId === null) { // 二重スタートを防ぐ
        timerId = setInterval(count, 1000); // 1秒ごとにcount関数を動かす
    }
}

// 一時停止ボタン
function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
}

// リセットボタン
function resetTimer() {
    pauseTimer();
    isWorkTime = true;
    timeLeft = 25 * 60;
    document.getElementById("status-text").textContent = "集中タイム (25分)";
    document.getElementById("status-text").style.color = "#4f46e5";
    updateDisplay();
}

// ページを開いたときの初期表示
updateDisplay();