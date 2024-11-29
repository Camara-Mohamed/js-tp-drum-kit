/*
document.documentElement.classList.add('js-enabled');

function playSound(e) {
    const key = e.type === "keydown" ? e.key.toLowerCase() : e.target.closest('.key').dataset.key;
    const audioElement = document.querySelector(`audio[data-key="${key}"]`);
    const keyElement = document.querySelector(`.key[data-key="${key}"]`);

    if (!audioElement || !keyElement) return;

    audioElement.currentTime = 0;
    audioElement.play();

    keyElement.classList.add("playing");
    document.body.className = '';
    document.body.classList.add(key);

    keyElement.addEventListener("transitionend", () => {
        keyElement.classList.remove("playing");
    }, { once: true });
}

window.addEventListener("keydown", playSound);
document.querySelectorAll(".key").forEach(key => {
    key.addEventListener("click", playSound);
});
*/

const drumApp = {
    divElements: document.querySelectorAll(".key"),

    initData() {
        this.letters = {};
        for (const divElement of this.divElements) {
            this.letters[divElement.dataset.key] = {
                audioElement: document.querySelector(`div[data-key=${divElement.dataset.key}]`),
                divElement: divElement
            }
        }
    },

    init() {
        document.documentElement.classList.add('js-enabled');
        this.addEventListeners();
        this.initData();
        console.log(this.initData());
    },

    addClasses(letter) {
        if (this.letters[letter]) {
            this.letters[letter].divElement.classList.add('playing');
            document.body.classList.add(letter);
        }
    },

    playSound(letter) {
        if (this.letters[letter]) {
            this.letters[letter].audioElement.play();
        }
    },

    removeClasses(evt) {
        if (evt.propertyName === 'transform') {
            document.body.classList.remove(evt.currentTarget.dataset.key);
            evt.currentTarget.classList.remove('playing');
        }
    },

    addEventListeners() {
        this.divElements.forEach((divElement) => {
            divElement.addEventListener('transitionend', (evt) => {
                this.removeClasses(evt);
            });

            divElement.addEventListener('click', (evt) => {
                this.addClasses(evt.currentTarget.dataset.key);
                this.playSound(evt.currentTarget.dataset.key);
            });

            window.addEventListener("keydown", (evt) => {
                this.addClasses(evt.key);
                this.playSound(evt.key);
            });
        });
    }
};

drumApp.init();