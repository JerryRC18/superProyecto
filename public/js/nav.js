const navbar = document.querySelector('.navbar')

window.addEventListener('scroll', () =>{
    console.log('scroll', scrollY)
    if(scrollY => 180){
        navbar.classList.add('bg')
    }else {
        navbar.classList.remove('bg')
    }
})

const createNavbar = () =>{
    navbar.innerHTML += 
    `
    <ul class="links-container">
        <li class="link-item">
            <a href="#" class="link active">Home</a>
        </li>
        <li class="link-item">
            <a href="#" class="link">Product</a>
        </li>
        <li class="link-item">
            <a href="#" class="link">About</a>
        </li>
        <li class="link-item">
            <a href="#" class="link">Contact</a>
        </li>
    </ul>
    `
}

createNavbar()

//User icon popup
let userIcon = document.querySelector('.user-icon')
let userPopupIcon = document.querySelector('.user-icon-popup')

userIcon.addEventListener('click', () => {
    userPopupIcon.classList.toggle('active')
})

let text = userPopupIcon.querySelector('p')
let actionBtn = userPopupIcon.querySelector('a')
let user = JSON.parse(sessionStorage.user || null)

if(user != null){
    text.innerHTML = `log in as, ${user.name}`
    actionBtn.innerHTML `log out`
    actionBtn.addEventListener('click', () => {
        logout()
    })
}else{
    text.innerHTML = 'log in to your account'
    actionBtn.innerHTML = 'login'
    actionBtn.addEventListener('click', () => {
        location.href('/login')
    })
}

const logout = () => {
    sessionStorage.clear()
    location.reload()
}
