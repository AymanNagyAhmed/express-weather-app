
let form = document.getElementById('form1')
let submit_nav_button = document.getElementById('submit_nav_button')
submit_nav_button.addEventListener('click',(e)=>{
    e.preventDefault()
    const addres2 = document.getElementById('address').value
    if (addres2) {
        window.location.href = 'http://localhost:3000/weather?address='+addres2;
        form.reset()
    }else{
    window.location.href = 'http://localhost:3000/weather';
    form.reset()
    }
})

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    weatherFunction()
    form.reset()
})
const errorF = document.getElementById('error')
const locationF = document.getElementById('location')
const forecastF = document.getElementById('forecast')

// async --> function return promise
let weatherFunction = async() =>{
    try{
        const address = document.getElementById('address').value
        const res = await fetch('http://localhost:3000/weather?address='+address)
        const data = await res.json()
        if(data.error){
            errorF.innerText = data.error
            locationF.innerText =""
            forecastF.innerText =""
        }
        else {
            locationF.innerText = data.location
            forecastF.innerText = data.forecast
            errorF.innerText =""
        }
    }
    catch(e){
        console.log(e)
    }
}

// 3 