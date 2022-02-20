window.addEventListener('load', solve);

function solve() {
    const genreInput = document.getElementById('genre');
    const nameInput = document.getElementById('name');
    const authorInput = document.getElementById('author');
    const dateInput = document.getElementById('date');

    document.getElementById('add-btn').addEventListener('click', e => {
        e.preventDefault();
        const allHitsContainerEl = document.querySelector('.all-hits-container');
        const savedHitsContainerEl = document.querySelector('.saved-container');

        //HEADERS
        let h2GenreEl = document.createElement('h2');
        h2GenreEl.innerText = `Genre: ${genreInput.value}`;
        let h2NameEl = document.createElement('h2');
        h2NameEl.innerText = `Name: ${nameInput.value}`;
        let h2AuthorEl = document.createElement('h2');
        h2AuthorEl.innerText = `Author: ${authorInput.value}`;
        let h3DateEl = document.createElement('h3');
        h3DateEl.innerText = `Date: ${dateInput.value}`;

        //CLEAR INPUT VALUES
        genreInput.value = '';
        nameInput.value = '';
        authorInput.value = '';
        dateInput.value = '';

        //IMAGE
        let imgEl = document.createElement('img');
        imgEl.setAttribute('src', './static/img/img.png');

        //BUTTONS
        let saveBtnEl = document.createElement('button');
        saveBtnEl.classList.add('save-btn');
        saveBtnEl.textContent = 'Save song';

        let likeBtnEl = document.createElement('button');
        likeBtnEl.classList.add('like-btn');
        likeBtnEl.textContent = 'Like song';
        likeBtnEl.addEventListener('click', e => {
            let totalLikesEl = document.querySelector('#total-likes .likes p');
            totalLikes = Number(totalLikesEl.textContent.split(' ')[2]) + 1;
            totalLikesEl.textContent = `Total Likes: ${totalLikes}`;
            e.currentTarget.disabled = true;
        })

        let deleteBtnEl = document.createElement('button');
        deleteBtnEl.classList.add('delete-btn');
        deleteBtnEl.textContent = 'Delete';

        //APPEND ELEMENTS TO PARENT
        let divAllHitsEl = document.createElement('div');
        divAllHitsEl.classList.add('hits-info');
        divAllHitsEl.appendChild(imgEl);
        divAllHitsEl.appendChild(h2GenreEl);
        divAllHitsEl.appendChild(h2NameEl);
        divAllHitsEl.appendChild(h2AuthorEl);
        divAllHitsEl.appendChild(h3DateEl);
        divAllHitsEl.appendChild(saveBtnEl);
        divAllHitsEl.appendChild(likeBtnEl);
        divAllHitsEl.appendChild(deleteBtnEl);
        allHitsContainerEl.appendChild(divAllHitsEl);
        deleteBtnEl.addEventListener('click', _ => {
            allHitsContainerEl.removeChild(divAllHitsEl);
        })

        let divSavedHitsEl = document.createElement('div');
        divSavedHitsEl.classList.add('hits-info');
        let buttonDeleteForSavedHitEl = deleteBtnEl.cloneNode(true);
        buttonDeleteForSavedHitEl.addEventListener('click', _ => {
            savedHitsContainerEl.removeChild(divSavedHitsEl);
        })
        divSavedHitsEl.appendChild(imgEl.cloneNode(true));
        divSavedHitsEl.appendChild(h2GenreEl.cloneNode(true));
        divSavedHitsEl.appendChild(h2NameEl.cloneNode(true));
        divSavedHitsEl.appendChild(h2AuthorEl.cloneNode(true));
        divSavedHitsEl.appendChild(h3DateEl.cloneNode(true));
        divSavedHitsEl.appendChild(buttonDeleteForSavedHitEl);

        saveBtnEl.addEventListener('click', _ => {
            allHitsContainerEl.removeChild(divAllHitsEl);
            savedHitsContainerEl.appendChild(divSavedHitsEl);
        })
    })
}