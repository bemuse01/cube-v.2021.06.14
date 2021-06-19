export default {
    createCubePosition(length, row){
        const arr = [], size = row * row
        const start = Math.floor(row / 2)
        const init = {x: -start, y: start, z: start}
        let x = [], y = [], z = []
        
        for(let i = 0; i < (row % 2 === 0 ? row + 1 : row); i++){
            x[i] = init.x++
            y[i] = init.y--
            z[i] = init.z--
        }

        if(row % 2 === 0) {
            x.splice(start, 1)
            y.splice(start, 1)
            z.splice(start, 1)
            x = x.map(x => x - Math.sign(x) * 1 / 2)
            y = y.map(x => x - Math.sign(x) * 1 / 2)
            z = z.map(x => x - Math.sign(x) * 1 / 2)
        }

        for(let i = 0; i < length; i++) arr[i] = {x: x[i % row], y: y[Math.floor(i / size)], z: z[Math.floor((i % size) / row)]}

        return arr
    },
    getCubePosition({count, gap, size}){
        const arr = []
        const pos = this.createCubePosition(count ** 3, count)

        pos.forEach(e => {
            arr.push({
                x: e.x * size + e.x * gap, 
                y: e.y * size + e.y * gap, 
                z: e.z * size + e.z * gap
            })
        })

        return arr
    },
    getRandomPosition({count}){
        const r = ~~(Math.random() * count)
        const size = count ** 2
        const dir = ~~(Math.random() * 3)

        switch(dir){
            case 0:
                return {index: Array.from({length: size}, (e, i) => r * size + i), dir}
            case 1: 
                return {index: Array.from({length: size}, (e, i) => r + i * count), dir}
            case 2: 
                return {index: Array.from({length: size}, (e, i) => ~~(i / count) * size + (i % count) + (r * count)), dir}
        }
    }
}