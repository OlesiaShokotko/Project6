let firstProducts = [
    { id: 1, title: 'Велосипед', count: 4 },
    { id: 2, title: 'Велосипед', count: 2 },
    { id: 3, title: 'Велосипед', count: 10 },
    { id: 4, title: 'Велосипед', count: 1 }
]

let products = JSON.parse(localStorage.getItem('products')) ?? firstProducts

let form_elem = document.querySelector('form')
let div_root = document.querySelector('.div_root')
let div_wrapper = document.createElement('div')
div_wrapper.className = 'product_wrapper'

form_elem.onsubmit = (event) => {
    event.preventDefault()
    let form_data = new FormData(event.target)
    let data = Object.fromEntries(form_data)
    let cnt_id
    if(products.length === 0){
        cnt_id = 0
    } else {
        cnt_id = Math.max(...products.map(elem => elem.id))
    }
    data.id = ++cnt_id
    data.count = 1
    products.push(data)
    form_elem.reset()
    rerender(products)
}

function rerender(array){
    localStorage.setItem('products', JSON.stringify(array))
    div_wrapper.innerHTML = ''
    render(array)
}

function render(array) {
    for (let elem of array) {
        let div_elem = document.createElement('div')
        let count_wrapper = document.createElement('div')
        let p_title = document.createElement('p')
        let p_count = document.createElement('p')
        let decrement_btn = document.createElement('button')
        let increment_btn = document.createElement('button')

        div_elem.className = 'product_item'
        count_wrapper.className = 'count_wrapper'
        p_title.className = 'product_title'
        p_count.className = 'product_count'
        decrement_btn.className = 'decrement_btn'
        increment_btn.className = 'increment_btn'

        p_title.innerText = elem.title
        p_count.innerText = elem.count
        decrement_btn.innerText = '-'
        increment_btn.innerText = '+'
        increment_btn.addEventListener("click", () => incrementCount(elem))
        decrement_btn.addEventListener("click", () => decrementCount(elem))
        count_wrapper.append(decrement_btn, p_count, increment_btn)
        div_elem.append(p_title, count_wrapper)
        div_wrapper.append(div_elem)
    }
        div_root.append(div_wrapper)
}

function incrementCount(product){
    product.count += 1
    rerender(products) 
}

function decrementCount(product){
    product.count -= 1
    if(product.count === 0){
        removeProductCard(product.id)
    } else {
        rerender(products)
    }
}

function removeProductCard(productId){
    products = products.filter(product => product.id !== productId)
    rerender(products)
}

render(products)
