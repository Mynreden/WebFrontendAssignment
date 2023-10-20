let a;
fetch('https://mas-store.vercel.app/goods/').then(response => response.text()).then(text => {
    console.log(text);
    let a = eval(text)
    console.log(a[0]['id'])
})
console.log(a)