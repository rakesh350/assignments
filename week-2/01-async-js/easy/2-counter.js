function counter(count) {
    setTimeout(() => {
        console.log(count++);
        counter(count);
    }, 1000);
}

counter(1)