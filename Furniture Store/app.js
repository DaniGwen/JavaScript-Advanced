window.addEventListener('load', solve);

function solve() {
    let buttonAddElement = document.getElementById('add');

    let inputElements = Array.from(document.querySelector('form').querySelectorAll('input'));
    let descriptionElement = document.getElementById('description');

    let furnitureListElement = document.getElementById('furniture-list');

    buttonAddElement.addEventListener('click', e => {
        e.preventDefault();
        let yearParsed = Number(inputElements.find(x => x.id == 'year').value);
        let priceParsed = Number(inputElements.find(x => x.id == 'price').value);

        if (descriptionElement.value == '' || inputElements.find(x => x.id === 'model').value == '') {
            return;
        }
        if (yearParsed < 0 || priceParsed < 0) {
            return;
        }

        let model = inputElements.find(x => x.id === 'model').value;
        let year = inputElements.find(x => x.id === 'year').value;
        let price = inputElements.find(x => x.id === 'price').value;
        let description = descriptionElement.value;

        let infoTableRowElement = document.createElement('tr');
        infoTableRowElement.classList.add('info');

        let tdModelElement = document.createElement('td');
        tdModelElement.innerText = model;
        infoTableRowElement.appendChild(tdModelElement);

        let tdPriceElement = document.createElement('td');
        tdPriceElement.innerText = Number(price).toFixed(2);
        infoTableRowElement.appendChild(tdPriceElement);

        //BUTTONS Section
        let tdButtonsElement = document.createElement('td');
        let moreBtnElement = document.createElement('button');
        moreBtnElement.classList.add('moreBtn');
        moreBtnElement.innerText = 'More Info';

        let buyBtnElement = document.createElement('button');
        buyBtnElement.classList.add('buyBtn');
        buyBtnElement.innerText = 'Buy it';

        tdButtonsElement.appendChild(moreBtnElement);
        tdButtonsElement.appendChild(buyBtnElement);
        infoTableRowElement.appendChild(tdButtonsElement);

        //YEAR AND DESCRIPTION
        let yearDescriptionTrElement = document.createElement('tr');
        yearDescriptionTrElement.classList.add('hide');

        let yearTdElement = document.createElement('td');
        yearTdElement.innerText = `Year: ${year}`;

        let descriptionTdElement = document.createElement('td');
        descriptionTdElement.colSpan = 3;
        descriptionTdElement.innerText = `Description: ${description}`;

        yearDescriptionTrElement.appendChild(yearTdElement);
        yearDescriptionTrElement.appendChild(descriptionTdElement);

        furnitureListElement.appendChild(infoTableRowElement);
        furnitureListElement.appendChild(yearDescriptionTrElement);

        //ClEAR INPUT FIELDS
        inputElements.map(x => x.value = '');
        descriptionElement.value = '';

        //MORE BUTTON
        moreBtnElement.addEventListener('click', e => {
            if (e.currentTarget.innerText == 'Less Info') {
                e.currentTarget.innerText = 'More Info';
                yearDescriptionTrElement.style.display = 'none';
            }
            else {
                e.currentTarget.innerText = 'Less Info';
                yearDescriptionTrElement.style.display = 'contents';
            }
        })

        //BUY BUTTON
        buyBtnElement.addEventListener('click', e => {
            //TOTAL PRICE
            let totalPriceEl = document.getElementsByClassName('total-price')[0];
            let total = Math.round(Number(totalPriceEl.innerText) + Number(price));
            totalPriceEl.innerText = total.toFixed(2);

            tdModelElement.remove();
            tdPriceElement.remove();
            tdButtonsElement.remove();
            yearTdElement.remove();
            descriptionTdElement.remove();
        })
    })
}