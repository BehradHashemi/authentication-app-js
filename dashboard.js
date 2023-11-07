import authHandler from './utils/authorization.js';
import { getData } from './utils/httpReq.js';
import { e2p } from './utils/replaceNumber.js';

const mainContent = document.querySelector('#container');
const logOut = document.querySelector('#logout');

const renderUsers = (users) => {
    mainContent.innerHTML = '';

    const userOne = users[1];

    const firstname = userOne.name.firstname;
    const substring = firstname.slice(0, 1)
    const upperWord = substring.toUpperCase()
    const finalfirstname = firstname.replace(substring, upperWord)

    const lastname = userOne.name.lastname;
    const substringLast = lastname.slice(0, 1)
    const upperWordLast = substringLast.toUpperCase()
    const finallastname = lastname.replace(substringLast, upperWordLast)


    const phone = userOne.phone;

    const jsx = `
            <div>
                <p><i class='fa-solid fa-user'></i> نام و نام خانوادگی: <span>${finalfirstname} ${finallastname}</span></p>
            </div>
            <div>
                <p><i class='fa-solid fa-paperclip'></i> نام کاربری: <span>${userOne.username}</span></p>
            </div>
            <div>
                <p><i class='fa-solid fa-envelope'></i> ایمیل: <span>${userOne.email}</span></p>
            </div>
            <div>
                <p><i class='fa-solid fa-phone'></i> تلفن: <span>${e2p(phone)}</span></p>
            </div>
            <div>
                <p><i class='fa-solid fa-location-dot'></i> آدرس: <span>${userOne.address.city}_${userOne.address.street}_${e2p(userOne.address.zipcode)}</span></p>
            </div>
        `;
    mainContent.innerHTML += jsx;

    console.log(`your info = ${JSON.stringify(users[1])}`);
}

const init = async () => {
    authHandler();
    const users = await getData('users');
    renderUsers(users);
};

const logoutHandler = () => {
    document.cookie = 'token=; max-age=0'
    location.assign('index.html')
}

document.addEventListener('DOMContentLoaded', init);
logOut.addEventListener('click', logoutHandler);
