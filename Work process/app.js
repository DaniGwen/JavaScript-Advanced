function solve() {
    let firstNameEl = document.getElementById('fname');
    let lastNameEl = document.getElementById('lname');
    let emailEl = document.getElementById('email');
    let birthEl = document.getElementById('birth');
    let positionEl = document.getElementById('position');
    let salaryEl = document.getElementById('salary');

    let btnAddWorker = document.getElementById('add-worker');

    btnAddWorker.addEventListener('click', e => {
        e.preventDefault();

        let inputValues = [];
        firstName = firstNameEl.value;
        inputValues.push(firstName);
        lastName = lastNameEl.value;
        inputValues.push(lastName);
        email = emailEl.value;
        inputValues.push(email);
        birth = birthEl.value;
        inputValues.push(birth);
        position = positionEl.value;
        inputValues.push(position);
        salary = salaryEl.value;
        inputValues.push(salary);

        //VALIDATION
        for (let i = 0; i < inputValues.length; i++) {
            const element = inputValues[i];
            if (element == '' || element == ' ') {
                return;
            }
        }

        //CLEAR FIELDS
        firstNameEl.value = '';
        lastNameEl.value = '';
        emailEl.value = '';
        birthEl.value = '';
        positionEl.value = '';
        salaryEl.value = '';

        //ATTACH INPUT VALUES TO TABLE
        let tbodyEl = document.getElementById('tbody');
        let tbodyTrEl = document.createElement('tr');

        //Fired and Edit buttons
        let tbodyButtonsTdEl = document.createElement('td');
        let firedBtnEl = document.createElement('button');
        firedBtnEl.innerText = 'Fired';
        firedBtnEl.classList.add('fired');
        let editBtnEl = document.createElement('button');
        editBtnEl.innerText = 'Edit';
        editBtnEl.classList.add('edit');
        tbodyButtonsTdEl.appendChild(firedBtnEl);
        tbodyButtonsTdEl.appendChild(editBtnEl);

        for (let i = 0; i < inputValues.length; i++) {
            const value = inputValues[i];
            let tdEl = document.createElement('td');
            tdEl.innerText = value;
            tbodyTrEl.appendChild(tdEl);
        }

        tbodyTrEl.appendChild(tbodyButtonsTdEl);
        tbodyEl.appendChild(tbodyTrEl);

        //ADD SUM to SUM ELEMENT
        let sumEl = document.getElementById('sum');
        sumEl.innerText = (Number(sumEl.innerText) + Number(salary)).toFixed(2);

        //EDIT FUNCTIONALITY
        editBtnEl.addEventListener('click', e => {
            let inputEls = Array.from(document.querySelectorAll('form input'));
            for (let i = 0; i < inputEls.length; i++) {
                const value = inputValues[i];
                inputEls[i].value = value;
            }

            //REMOVE TABLE TR
            tbodyTrEl.remove();

            //DEDUCT SALARY FROM SUM
            sumEl.innerText = (Number(sumEl.innerText) - Number(salary)).toFixed(2);
        });

        //FIRED FUNCTIONALITY
        firedBtnEl.addEventListener('click', e => {
            tbodyTrEl.remove();
               //DEDUCT SALARY FROM SUM
               sumEl.innerText = (Number(sumEl.innerText) - Number(salary)).toFixed(2);
        })
    })
}
solve()