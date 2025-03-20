class CustomArray {
    constructor(data) {
        this.data = data;
    }

    // Custom filter method like JS filter
    static myFilter(callback) {
        const result = [];
        for (let i = 0; i < this.data.length; i++) {
            if (callback(this.data[i], i, this.data)) {
                result.push(this.data[i]);
            }
        }
        return result;
    }

    static myMap(callback) {
        const result = []
        for (let i = 0; i < this.data.length; i++) {
            if (callback(this.data[i], i, this.data)) {
                result.push(this.data[i]);
            }
        }
        return result;
    }
}

console.log({
    test: CustomArray.myFilter([1,2,3])
});


// Example usage:
const arr = new CustomArray([1, 2, 3, 4, 5]);
console.log({
    arr
});

// const filtered = arr.myFilter((item) => item > 2 && item < 5);
// console.log(filtered); // Output: [3, 4, 5]
