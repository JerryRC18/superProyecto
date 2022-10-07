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