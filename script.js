// Timer
        let timeLeft = 30 * 60;
        let timerStarted = false;
        let timerInterval;
        let isTimeUp = false;

        function startTimer() {
            if (timerStarted) return;
            timerStarted = true;
            timerInterval = setInterval(() => {
                if (timeLeft <= 0 && !isTimeUp) {
                    clearInterval(timerInterval);
                    isTimeUp = true;
                    document.getElementById('timerDisplay').innerHTML = '<i class="far fa-clock"></i> 00:00';
                    document.getElementById('timerDisplay').classList.add('timer-warning');
                    alert("⏰ Time's up! Certificate cannot be issued.");
                    return;
                }
                if (timeLeft > 0) {
                    const minutes = Math.floor(timeLeft / 60);
                    const seconds = timeLeft % 60;
                    document.getElementById('timerDisplay').innerHTML = `<i class="far fa-clock"></i> ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                    if (timeLeft <= 60) document.getElementById('timerDisplay').classList.add('timer-warning');
                    timeLeft--;
                }
            }, 1000);
        }

        function isWithinTimeLimit() { return !isTimeUp && timeLeft > 0; }

        // Quiz Data
        const quizQuestions = [
            { q: "What does Big O Notation primarily measure?", opts: ["Code aesthetics", "Growth rate of time/memory", "Number of code lines", "Programming language"], correct: 1, exp: "Big O measures growth rate of time and memory" },
            { q: "Which algorithm has O(log n) time complexity?", opts: ["Linear Search", "Bubble Sort", "Binary Search", "Array access"], correct: 2, exp: "Binary Search halves data each step" },
            { q: "What is the Big O of nested loops both running n times?", opts: ["O(n)", "O(n log n)", "O(n²)", "O(2ⁿ)"], correct: 2, exp: "n × n iterations = O(n²)" },
            { q: "Which rule is correct?", opts: ["O(2n)=O(n²)", "O(n²+n)=O(n²)", "O(n)+O(n²)=O(n³)", "O(n)×O(n)=O(n)"], correct: 1, exp: "Keep dominant term: O(n²+n) → O(n²)" },
            { q: "Most efficient for large n?", opts: ["O(n²)", "O(2ⁿ)", "O(n log n)", "O(n!)"], correct: 2, exp: "O(n log n) is most efficient among these" }
        ];

        const exercises = [
            { q: "What is the Big O of accessing array[index]?", opts: ["O(1)", "O(n)", "O(log n)", "O(n²)"], correct: "O(1)", exp: "Array access is constant time" },
            { q: "What is the Big O of Binary Search?", opts: ["O(1)", "O(n)", "O(log n)", "O(n²)"], correct: "O(log n)", exp: "Binary Search halves data each step" },
            { q: "What is the Big O of Linear Search?", opts: ["O(1)", "O(n)", "O(log n)", "O(n²)"], correct: "O(n)", exp: "Must check each element" },
            { q: "What is the worst-case Big O of Bubble Sort?", opts: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"], correct: "O(n²)", exp: "Requires multiple passes" },
            { q: "What is the Big O of Merge Sort?", opts: ["O(n)", "O(n²)", "O(n log n)", "O(log n)"], correct: "O(n log n)", exp: "Divides and merges" },
            { q: "What is the average-case Big O of Quick Sort?", opts: ["O(n)", "O(n²)", "O(n log n)", "O(log n)"], correct: "O(n log n)", exp: "Efficient average performance" },
            { q: "What is the Big O of a single for loop from 0 to n?", opts: ["O(1)", "O(n)", "O(n²)", "O(log n)"], correct: "O(n)", exp: "Iterates n times" },
            { q: "What is the Big O of double nested loops both running n times?", opts: ["O(n)", "O(n log n)", "O(n²)", "O(2ⁿ)"], correct: "O(n²)", exp: "n × n iterations" },
            { q: "What is the average Big O of Hash Table lookup?", opts: ["O(1)", "O(n)", "O(log n)", "O(n²)"], correct: "O(1)", exp: "Direct access" },
            { q: "What is the Big O of recursive Fibonacci?", opts: ["O(n)", "O(n²)", "O(2ⁿ)", "O(n log n)"], correct: "O(2ⁿ)", exp: "Exponential branching" },
            { q: "Simplify O(100) to its simplest form:", opts: ["O(100)", "O(1)", "O(n)", "O(log n)"], correct: "O(1)", exp: "Drop constants" },
            { q: "Simplify O(3n² + 5n + 2):", opts: ["O(n)", "O(n²)", "O(n³)", "O(3n²)"], correct: "O(n²)", exp: "Keep the dominant term" },
            { q: "What is O(n) + O(n²)?", opts: ["O(n)", "O(n²)", "O(n³)", "O(2n²)"], correct: "O(n²)", exp: "Keep the largest term" },
            { q: "What is O(n) × O(n)?", opts: ["O(n)", "O(n²)", "O(2n)", "O(log n)"], correct: "O(n²)", exp: "Multiply complexities" },
            { q: "What is the Big O of searching a balanced BST?", opts: ["O(1)", "O(n)", "O(log n)", "O(n²)"], correct: "O(log n)", exp: "Tree height" },
            { q: "What is the Big O of Selection Sort?", opts: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"], correct: "O(n²)", exp: "Compares all pairs" },
            { q: "What is the Big O of Heap Sort?", opts: ["O(n)", "O(n²)", "O(n log n)", "O(log n)"], correct: "O(n log n)", exp: "Heap operations" },
            { q: "What is the Big O of finding even numbers in an array?", opts: ["O(1)", "O(n)", "O(log n)", "O(n²)"], correct: "O(n)", exp: "Single pass through array" },
            { q: "What is the Big O of naive matrix multiplication (n×n)?", opts: ["O(n²)", "O(n³)", "O(n log n)", "O(2ⁿ)"], correct: "O(n³)", exp: "Triple nested loops" },
            { q: "What Big O describes constant-time operations?", opts: ["O(10)", "O(1)", "O(n)", "O(log n)"], correct: "O(1)", exp: "Constant time" }
        ];

        let quizAnswers = new Array(5).fill(null);
        let exerciseAnswers = new Array(20).fill(null);

        function loadQuiz() {
            const container = document.getElementById('quizContainer');
            container.innerHTML = quizQuestions.map((q, i) => `<div class="quiz-question"><p><strong>Question ${i+1}. ${q.q}</strong></p><div>${q.opts.map((opt, j) => `<label class="quiz-option"><input type="radio" name="q${i}" value="${j}" onchange="saveQuizAnswer(${i}, ${j}); startTimer();">${String.fromCharCode(65+j)}. ${opt}</label>`).join('')}</div><button onclick="checkQuizAnswer(${i})">Check Answer</button><div id="quizFeedback${i}" class="feedback"></div></div>`).join('');
        }

        function saveQuizAnswer(qid, ans) { quizAnswers[qid] = ans; }
        function checkQuizAnswer(qid) {
            const ans = quizAnswers[qid];
            const fb = document.getElementById(`quizFeedback${qid}`);
            if (ans === null) { fb.innerHTML = 'Please select an answer'; fb.className = 'feedback wrong'; return; }
            const isCorrect = ans === quizQuestions[qid].correct;
            fb.innerHTML = isCorrect ? `✅ ${quizQuestions[qid].exp}` : `❌ Correct: ${String.fromCharCode(65+quizQuestions[qid].correct)}. ${quizQuestions[qid].opts[quizQuestions[qid].correct]}`;
            fb.className = isCorrect ? 'feedback correct' : 'feedback wrong';
            updateQuizScore();
        }
        function updateQuizScore() {
            const correctCount = quizAnswers.filter((a,i) => a === quizQuestions[i].correct).length;
            document.getElementById('quizScore').style.display = 'block';
            document.getElementById('quizScore').innerHTML = `📊 Quiz Score: ${correctCount}/5 (${correctCount*20}%)`;
        }

        function loadExercises() {
            const container = document.getElementById('exercisesContainer');
            container.innerHTML = exercises.map((ex, i) => `<div class="exercise-item"><p><strong>Exercise ${i+1}. ${ex.q}</strong></p><div>${ex.opts.map((opt, j) => `<label class="quiz-option"><input type="radio" name="ex${i}" value="${opt}" onchange="saveExerciseAnswer(${i}, '${opt}'); startTimer();">${String.fromCharCode(65+j)}. ${opt}</label>`).join('')}</div><button onclick="checkExerciseAnswer(${i})">Check Answer</button><div id="exerciseFeedback${i}" class="feedback"></div></div>`).join('');
        }

        function saveExerciseAnswer(eid, ans) { exerciseAnswers[eid] = ans; }
        function checkExerciseAnswer(eid) {
            const ans = exerciseAnswers[eid];
            const fb = document.getElementById(`exerciseFeedback${eid}`);
            if (!ans) { fb.innerHTML = 'Please select an answer'; fb.className = 'feedback wrong'; return; }
            const isCorrect = ans === exercises[eid].correct;
            fb.innerHTML = isCorrect ? `✅ Correct! ${exercises[eid].exp}` : `❌ Incorrect. Correct: ${exercises[eid].correct}. ${exercises[eid].exp}`;
            fb.className = isCorrect ? 'feedback correct' : 'feedback wrong';
            updateExerciseScore();
        }
        function updateExerciseScore() {
            const correctCount = exerciseAnswers.filter((a,i) => a === exercises[i].correct).length;
            document.getElementById('exercisesScore').style.display = 'block';
            document.getElementById('exercisesScore').innerHTML = `📊 Exercises Score: ${correctCount}/20 (${Math.round(correctCount/20*100)}%)`;
        }

        function isAllCompleted() {
            return quizAnswers.filter((a,i) => a === quizQuestions[i].correct).length === 5 && exerciseAnswers.filter((a,i) => a === exercises[i].correct).length === 20;
        }

        // Graph
        const functions = { O1: { fn: x => 1, color: "#10b981" }, Ologn: { fn: x => Math.log2(x), color: "#3b82f6" }, On: { fn: x => x / 2, color: "#f59e0b" }, Onlogn: { fn: x => x * Math.log2(x) / 5, color: "#8b5cf6" }, On2: { fn: x => (x * x) / 50, color: "#ef4444" } };
        let active = ["O1", "Ologn", "On", "Onlogn", "On2"];
        let currentN = 100;

        function drawGraph() {
            const canvas = document.getElementById('bigOChart');
            const ctx = canvas.getContext('2d');
            canvas.width = canvas.offsetWidth;
            canvas.height = 400;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const scaleX = canvas.width / currentN;
            const scaleY = canvas.height / 100;
            active.forEach(type => {
                const { fn, color } = functions[type];
                ctx.beginPath();
                ctx.strokeStyle = color;
                ctx.lineWidth = 2.5;
                for (let x = 1; x <= currentN; x++) {
                    let y = Math.min(fn(x), 100);
                    let px = x * scaleX;
                    let py = canvas.height - y * scaleY;
                    if (x === 1) ctx.moveTo(px, py);
                    else ctx.lineTo(px, py);
                }
                ctx.stroke();
            });
        }

        document.querySelectorAll('.graph-toggle').forEach(cb => cb.addEventListener('change', () => { active = Array.from(document.querySelectorAll('.graph-toggle:checked')).map(cb => cb.dataset.fn); drawGraph(); }));
        document.getElementById('nSlider').addEventListener('input', (e) => { currentN = parseInt(e.target.value); document.getElementById('nValue').innerText = currentN; drawGraph(); });

        // Benchmark
        let benchmarkResults = { linear: null, binary: null, bubble: null, quick: null, merge: null, selection: null };

        async function runSingleBenchmark(type) {
            const size = parseInt(document.getElementById('benchmarkSize').value);
            const iterations = parseInt(document.getElementById('benchmarkIterations').value);
            const resultDiv = document.getElementById(`${type}Result`);
            resultDiv.innerHTML = '<i class="fas fa-spinner fa-pulse"></i>';
            let totalTime = 0;
            for (let iter = 0; iter < iterations; iter++) {
                await new Promise(r => setTimeout(r, 10));
                const data = Array.from({ length: size }, () => Math.floor(Math.random() * size));
                const target = data[data.length - 1];
                let start, end;
                if (type === 'linear') { start = performance.now(); data.indexOf(target); end = performance.now(); }
                else if (type === 'binary') { const sorted = [...data].sort((a,b)=>a-b); start = performance.now(); let l=0,r=sorted.length-1; while(l<=r){let m=Math.floor((l+r)/2); if(sorted[m]===target) break; if(sorted[m]<target) l=m+1; else r=m-1;} end = performance.now(); }
                else if (type === 'bubble') { start = performance.now(); const arr = [...data]; for(let i=0;i<arr.length-1;i++) for(let j=0;j<arr.length-i-1;j++) if(arr[j]>arr[j+1]) [arr[j],arr[j+1]]=[arr[j+1],arr[j]]; end = performance.now(); }
                else if (type === 'quick') { start = performance.now(); const qs = (arr) => { if(arr.length<=1) return arr; const p=arr[arr.length-1], l=[], r=[]; for(let i=0;i<arr.length-1;i++) arr[i]<p?l.push(arr[i]):r.push(arr[i]); return [...qs(l), p, ...qs(r)]; }; qs([...data]); end = performance.now(); }
                else if (type === 'merge') { start = performance.now(); const ms = (arr) => { if(arr.length<=1) return arr; const m=Math.floor(arr.length/2); const merge=(l,r)=>{ let res=[], i=0,j=0; while(i<l.length&&j<r.length) l[i]<r[j]?res.push(l[i++]):res.push(r[j++]); return [...res,...l.slice(i),...r.slice(j)]; }; return merge(ms(arr.slice(0,m)), ms(arr.slice(m))); }; ms([...data]); end = performance.now(); }
                else if (type === 'selection') { start = performance.now(); const arr = [...data]; for(let i=0;i<arr.length-1;i++){ let min=i; for(let j=i+1;j<arr.length;j++) if(arr[j]<arr[min]) min=j; if(min!==i)[arr[i],arr[min]]=[arr[min],arr[i]]; } end = performance.now(); }
                totalTime += (end - start);
            }
            const avgTime = totalTime / iterations;
            benchmarkResults[type] = avgTime;
            resultDiv.innerHTML = `${avgTime.toFixed(2)} ms <span style="font-size:0.8rem;">(avg of ${iterations})</span>`;
            updateBenchmarkStats(); updateResultsTable(); drawBenchmarkChart();
        }

        async function runAllBenchmarks() { for (const type of ['linear','binary','bubble','quick','merge','selection']) await runSingleBenchmark(type); }
        function clearBenchmarkResults() { Object.keys(benchmarkResults).forEach(k => { benchmarkResults[k]=null; document.getElementById(`${k}Result`).innerHTML='-'; }); updateBenchmarkStats(); updateResultsTable(); drawBenchmarkChart(); }

        function updateBenchmarkStats() {
            const results = Object.values(benchmarkResults).filter(v=>v!==null);
            document.getElementById('totalTests').innerText = results.length;
            if(results.length>0){
                const avg = results.reduce((a,b)=>a+b,0)/results.length;
                document.getElementById('avgTime').innerText = avg.toFixed(2);
                const entries = Object.entries(benchmarkResults).filter(([_,v])=>v!==null);
                const fastest = entries.reduce((a,b)=>a[1]<b[1]?a:b);
                const slowest = entries.reduce((a,b)=>a[1]>b[1]?a:b);
                const names = { linear:'Linear', binary:'Binary', bubble:'Bubble', quick:'Quick', merge:'Merge', selection:'Selection' };
                document.getElementById('fastestAlgo').innerHTML = `${names[fastest[0]]} (${fastest[1].toFixed(2)} ms)`;
                document.getElementById('slowestAlgo').innerHTML = `${names[slowest[0]]} (${slowest[1].toFixed(2)} ms)`;
            } else { document.getElementById('avgTime').innerText='0'; document.getElementById('fastestAlgo').innerHTML='-'; document.getElementById('slowestAlgo').innerHTML='-'; }
        }

        function updateResultsTable() {
            const tbody = document.getElementById('resultsTableBody');
            const names = { linear:'Linear Search', binary:'Binary Search', bubble:'Bubble Sort', quick:'Quick Sort', merge:'Merge Sort', selection:'Selection Sort' };
            const complexities = { linear:'O(n)', binary:'O(log n)', bubble:'O(n²)', quick:'O(n log n)', merge:'O(n log n)', selection:'O(n²)' };
            let html = '';
            for(const [key,val] of Object.entries(benchmarkResults)){
                html += `<tr><td>${names[key]}</td><td>${complexities[key]}</td><td>${val?`${val.toFixed(2)} ms`:'-'}</td><td>${val?Math.round(val*1000):'-'}</td><td style="color:${val?'#10b981':'#f59e0b'}">${val?'✓ Completed':'⏳ Not tested'}</td></tr>`;
            }
            if(Object.values(benchmarkResults).every(v=>v===null)) html='<tr><td colspan="5">No tests run yet. Click "Run All Tests" to start benchmarking.</td></tr>';
            tbody.innerHTML = html;
        }

        function drawBenchmarkChart() {
            const canvas = document.getElementById('benchmarkChart');
            if(!canvas) return;
            const ctx = canvas.getContext('2d');
            canvas.width = canvas.offsetWidth;
            canvas.height = 300;
            ctx.clearRect(0,0,canvas.width,canvas.height);
            const results = Object.entries(benchmarkResults).filter(([_,v])=>v!==null);
            if(results.length===0){ ctx.fillStyle='#64748b'; ctx.font='14px Inter'; ctx.textAlign='center'; ctx.fillText('Run tests to see performance comparison', canvas.width/2, canvas.height/2); return; }
            const names = { linear:'Linear', binary:'Binary', bubble:'Bubble', quick:'Quick', merge:'Merge', selection:'Selection' };
            const colors = { linear:'#f59e0b', binary:'#3b82f6', bubble:'#ef4444', quick:'#8b5cf6', merge:'#10b981', selection:'#ef4444' };
            const barWidth = canvas.width/results.length*0.6;
            const startX = (canvas.width/results.length-barWidth)/2;
            const maxTime = Math.max(...results.map(([_,v])=>v),1);
            results.forEach(([key,time],idx)=>{
                const x = (canvas.width/results.length)*idx+startX;
                const height = (time/maxTime)*(canvas.height-60);
                const y = canvas.height-height-30;
                ctx.fillStyle = colors[key];
                ctx.fillRect(x,y,barWidth,height);
                ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--text-primary');
                ctx.font='10px Inter';
                ctx.textAlign='center';
                ctx.fillText(names[key], x+barWidth/2, canvas.height-10);
                ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--accent-primary');
                ctx.fillText(`${time.toFixed(2)}ms`, x+barWidth/2, y-5);
            });
            ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--text-muted');
            ctx.font='10px Inter';
            ctx.textAlign='right';
            for(let i=0;i<=4;i++){ let val=(maxTime/4)*i; let y=canvas.height-30-(val/maxTime)*(canvas.height-60); ctx.fillText(val.toFixed(0)+'ms', canvas.width-5, y); }
        }

        // Certificate Functions
        function escapeHtml(text) { const div = document.createElement('div'); div.textContent = text; return div.innerHTML; }

        async function generateCertificate() {
            const name = document.getElementById('studentName').value.trim();
            if(!name) { 
                // alert('Please enter your name'); 
                // แทนที่ alert('Please enter your name');
                Swal.fire({
                    title: '⚠️ Missing Information',
                    text: 'Please enter your name before generating the certificate!',
                    icon: 'warning',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#3b82f6',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    iconColor: '#f59e0b'
                });
                return; 
            }
            if(isTimeUp || timeLeft <= 0) { alert('Time limit exceeded! Certificate cannot be issued.'); return; }
            if(!isAllCompleted()) { 
                const qc = quizAnswers.filter((a,i)=>a===quizQuestions[i].correct).length;
                const ec = exerciseAnswers.filter((a,i)=>a===exercises[i].correct).length;
                // alert(`Complete all questions!\nQuiz: ${qc}/5, Exercises: ${ec}/20`); 
                // แทนที่ alert() ด้วย Swal.fire()
                Swal.fire({
                    title: '⚠️ Incomplete Questions',
                    html: `
                        <div style="text-align: left;">
                            <p><strong>Quiz:</strong> ${qc}/5</p>
                            <p><strong>Exercises:</strong> ${ec}/20</p>
                            <p><strong>Total:</strong> ${qc + ec}/25</p>
                        </div>
                    `,
                    icon: 'warning',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#3b82f6',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)'
                });
                return; 
            }
            
            const date = new Date().toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' });
            const qc = quizAnswers.filter((a,i)=>a===quizQuestions[i].correct).length;
            const ec = exerciseAnswers.filter((a,i)=>a===exercises[i].correct).length;
            const total = qc + ec;
            const isLight = document.body.classList.contains('light-mode');
            const bgColor = isLight ? '#f8fafc' : '#0f172a';
            const certId = `BIGO-${Date.now().toString(36).toUpperCase()}`;
            
            const certHTML = `
                <div id="certificateImage" class="certificate" style="background: ${bgColor};">
                    <div class="certificate-icon"><i class="fas fa-certificate"></i></div>
                    <h2>CERTIFICATE OF ASSESSMENT</h2>
                    <p style="color: var(--text-muted); margin: 0.5rem 0;">This certificate is proudly presented to</p>
                    <div class="student-name">${escapeHtml(name)}</div>
                    <p style="margin: 0.5rem 0;">for successfully completing the course</p>
                    <h3 style="margin: 0.5rem 0; font-size: 1.2rem;">"Big O Notation: Algorithm Efficiency Analysis"</h3>
                    
                    <div class="certificate-score-grid">
                        <div class="certificate-score-card">
                            <div class="score-label">Quiz Score</div>
                            <div class="score-value" style="color: var(--accent-primary);">${qc}/5</div>
                            <div class="score-percent" style="color: #10b981;">${Math.round(qc/5*100)}%</div>
                        </div>
                        <div class="certificate-score-card">
                            <div class="score-label">Exercises Score</div>
                            <div class="score-value" style="color: var(--accent-primary);">${ec}/20</div>
                            <div class="score-percent" style="color: #10b981;">${Math.round(ec/20*100)}%</div>
                        </div>
                        <div class="certificate-score-card">
                            <div class="score-label">Total Score</div>
                            <div class="score-value" style="color: #d4af37;">${total}/25</div>
                            <div class="score-percent" style="color: #d4af37;">${Math.round(total/25*100)}%</div>
                        </div>
                    </div>
                    
                    <div class="certificate-badge">
                        <i class="fas fa-check-circle"></i> Time Completed: Within 30 minutes
                    </div>
                    
                    <p style="margin: 1rem 0;">Awarded on ${date}</p>
                    
                    <div style="display: flex; justify-content: center; gap: 2rem; margin: 1rem 0; flex-wrap: wrap;">
                        <div style="text-align: center;">
                            <div class="signature-line"></div>
                            <p class="signature-name">Aj. Thinnaphat Borirak</p>
                            <p class="signature-title">Course Instructor</p>
                        </div>
                    </div>
                    
                    <p style="font-size: 0.7rem; color: var(--text-muted); margin-top: 1rem;">
                        Certificate ID: ${certId}
                    </p>
                    
                    <button id="downloadCertBtn" style="margin-top: 1rem;">
                        <i class="fas fa-download"></i> Download as JPG
                    </button>
                </div>
            `;
            
            document.getElementById('certificateContainer').innerHTML = certHTML;
            const downloadBtn = document.getElementById('downloadCertBtn');
            if (downloadBtn) downloadBtn.onclick = () => downloadCertificate();
        }

        async function downloadCertificate() {
            const element = document.getElementById('certificateImage');
            if (!element) { alert('Certificate not found.'); return; }
            
            const btn = document.getElementById('downloadCertBtn');
            const originalText = btn ? btn.innerHTML : 'Download';
            if (btn) { btn.innerHTML = '<i class="fas fa-spinner fa-pulse"></i> Generating...'; btn.disabled = true; }
            
            try {
                const originalWidth = element.style.width;
                element.style.width = '750px';
                const isLight = document.body.classList.contains('light-mode');
                const canvas = await html2canvas(element, { scale: 3, backgroundColor: isLight ? '#f8fafc' : '#0f172a', logging: false });
                element.style.width = originalWidth;
                
                const link = document.createElement('a');
                const studentName = document.getElementById('studentName').value.trim().replace(/\s/g, '_');
                link.download = `Big_O_Certificate_${studentName}.jpg`;
                link.href = canvas.toDataURL('image/jpeg', 0.95);
                link.click();
                
                const toast = document.createElement('div');
                toast.style.cssText = 'position:fixed;bottom:20px;right:20px;background:#10b981;color:white;padding:12px 24px;border-radius:12px;z-index:9999;';
                toast.innerHTML = '<i class="fas fa-check-circle"></i> Certificate downloaded successfully!';
                document.body.appendChild(toast);
                setTimeout(() => toast.remove(), 3000);
            } catch (error) {
                console.error(error);
                alert('Error generating certificate. Please try again.');
            } finally {
                if (btn) { btn.innerHTML = originalText; btn.disabled = false; }
            }
        }

        // Theme
        document.getElementById('themeToggle').addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            const icon = document.getElementById('themeToggle').querySelector('i');
            icon.classList.toggle('fa-moon'); icon.classList.toggle('fa-sun');
            drawGraph(); drawBenchmarkChart();
        });

        window.addEventListener('scroll', () => { const win = document.documentElement.scrollTop; const h = document.documentElement.scrollHeight - document.documentElement.clientHeight; document.getElementById('progressFill').style.width = (win/h)*100 + '%'; });
        document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', e => { e.preventDefault(); document.getElementById(a.getAttribute('href').substring(1)).scrollIntoView({ behavior: 'smooth' }); }));
        window.addEventListener('resize', () => { drawGraph(); drawBenchmarkChart(); });

        loadQuiz(); loadExercises(); drawGraph();