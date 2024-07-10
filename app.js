
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const tasklist = document.querySelector("ul");
let streak = 0;


window.addEventListener('beforeunload', function (e) {
    e.preventDefault();
    e.returnValue = '';
});


taskForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const taskname = taskInput.value;
    if (taskname) {
        const li = document.createElement("li");
        li.classList.add("taskList");

        const texth6 = document.createElement("h6");
        texth6.className = "task";
        texth6.textContent = taskname;

        const emojih6 = document.createElement("h6");
        emojih6.className = "emoji";
        emojih6.textContent = `${streak}🔥`;

        const done = document.createElement("button");
        done.classList.add("done");
        done.textContent = "Done";

        const timer = document.createElement("span");
        timer.className = "timer";
        timer.style.display = "none";

        done.addEventListener("click", function (e) {
            e.preventDefault();
            streak++;
            emojih6.textContent = `${streak}🔥`;

            done.disabled = true;
            timer.style.display = "inline";

            let remainingTime = 24 * 60 * 60;

            const interval = setInterval(() => {
                remainingTime--;
                const hours = Math.floor(remainingTime / 3600);
                const minutes = Math.floor((remainingTime % 3600) / 60);
                const seconds = remainingTime % 60;
                timer.textContent = ` ${hours}h ${minutes}m ${seconds}s`;

                if (remainingTime <= 0) {
                    clearInterval(interval);
                    done.disabled = false;
                    timer.style.display = "none";
                }
            }, 1000);
        });

        li.appendChild(texth6);
        li.appendChild(emojih6);
        li.appendChild(done);
        li.appendChild(timer);

        tasklist.appendChild(li);
        taskInput.value = "";
    }
});
