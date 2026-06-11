async function onLogin(event) {
    event.preventDefault();

    let usernameInput = document.querySelector('input[name=username]').value;
    let passwordInput = document.querySelector('input[name=password]').value;

    let response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: usernameInput,
            password: passwordInput
        })
    });

    if (response.ok) {
        let data = await response.json();

        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);

        document.getElementById('login-page').classList.add('hidden');
        document.getElementById('profile-page').classList.remove('hidden');

        getProfile();
    } else {
        alert('Tài khoản hoặc mật khẩu không đúng!');
    }
}

async function getProfile() {
    let accessToken = localStorage.getItem('accessToken');

    let response = await fetch('https://dummyjson.com/auth/me', {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + accessToken }
    });

    if (response.status === 401) {
        let refreshToken = localStorage.getItem('refreshToken');

        let refreshResponse = await fetch('https://dummyjson.com/auth/refresh', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken: refreshToken })
        });

        if (refreshResponse.ok) {
            let newData = await refreshResponse.json();

            localStorage.setItem('accessToken', newData.accessToken);
            localStorage.setItem('refreshToken', newData.refreshToken);

            accessToken = newData.accessToken;
            response = await fetch('https://dummyjson.com/auth/me', {
                method: 'GET',
                headers: { 'Authorization': 'Bearer ' + accessToken }
            });
        } else {
            alert('Đã quá thời gian đăng nhập. Vui lòng đăng nhập lại!');
            logout();
            return;
        }
    }

    if (response.ok) {
        let userProfile = await response.json();

        document.getElementById('profile-info').innerHTML = `
            <img src="${userProfile.image}" alt="avatar" style="width: 80px; border-radius: 50%;">
            <p><strong>Họ và tên:</strong> ${userProfile.firstName} ${userProfile.lastName}</p>
            <p><strong>Giới tính:</strong> ${userProfile.gender}</p>
            <p><strong>Email:</strong> ${userProfile.email}</p>
            <p><strong>Role:</strong> ${userProfile.role}</p>
            <p style="color: green; font-size: 12px;">Online</p>
        `;
    }
}

function logout() {
    localStorage.clear();

    document.getElementById('profile-page').classList.add('hidden');
    document.getElementById('login-page').classList.remove('hidden');
}

document.getElementById('login-form').addEventListener('submit', onLogin);
document.getElementById('logout-btn').addEventListener('click', logout);

if (localStorage.getItem('accessToken')) {
    document.getElementById('login-page').classList.add('hidden');
    document.getElementById('profile-page').classList.remove('hidden');
    getProfile();
}