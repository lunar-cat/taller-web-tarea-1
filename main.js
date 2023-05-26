const getCities = async () => {
    const response = await fetch('https://gist.githubusercontent.com/juanbrujo/0fd2f4d126b3ce5a95a7dd1f28b3d8dd/raw/b8575eb82dce974fd2647f46819a7568278396bd/comunas-regiones.json');
    const json = await response.json();
    const { regiones } = json;
    createOptions(regiones);
};

const createOptions = (regiones) => {
    const selectCity = document.querySelector('#city');
    if (!selectCity) {
        return;
    }
    regiones.forEach(({ region }) => {
        const option = document.createElement('option');
        option.textContent = region;
        option.setAttribute('value', region);
        selectCity.appendChild(option);
    });
};

const submitForm = () => {
    const formElement = document.querySelector('form');
    const formData = new FormData(formElement);
    const isValid = formElement.checkValidity();

    if (isValid) {
        // send form
        const obj = [...formData].reduce((p, [k, v]) => {
            p[k] = v;
            return p;
        }, {});
        console.log('Object to POST', obj);
    }
    formElement.reportValidity();
};

document.addEventListener('DOMContentLoaded', () => void getCities());
document.querySelector('#btn-submit')?.addEventListener('click', submitForm);