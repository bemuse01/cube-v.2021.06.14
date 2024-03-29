class Cube{
    constructor(size){
        this.size = size
        this.cube = Array.from({length: size}, (_, i) => Array.from({length: size ** 2}, (_, j) => i * (size ** 2) + j))
    }

    rotateX(r, direction = 1){
        const temp = Array.from({length: this.size}, () => [])

        this.cube.forEach((story, i) => {
            story.forEach((child, j) => {
                if(j % this.size === r) temp[i].push(child)
            })
        })

        for(let i = 0; i < this.size; i++){
            for(let j = 0; j < this.size; j++){
                if(direction === 1) this.cube[i][j * this.size + r] = temp[this.size - 1 - j][i]
                else this.cube[i][j * this.size + r] = temp[j][this.size - 1 - i]
            }
        }
    }

    rotateY(r, direction = 1){
        const temp = []

        for(let i = 0; i < this.size; i++){
            temp.push(this.cube[r].slice(i * this.size, i * this.size + this.size))
        }

        for(let i = 0; i < this.size; i++){
            for(let j = 0; j < this.size; j++){
                if(direction === 1) this.cube[r][i * this.size + j] = temp[j][this.size - 1 - i]
                else this.cube[r][i * this.size + j] = temp[this.size - 1 - j][i]
            }
        }
    }

    rotateZ(r, direction = 1){
        const temp = []

        for(let i = 0; i < this.size; i++){
            temp.push(this.cube[i].slice(r * this.size, r * this.size + this.size))
        }

        for(let i = 0; i < this.size; i++){
            for(let j = 0; j < this.size; j++){
                if(direction === 1) this.cube[i][r * this.size + j] = temp[j][this.size - 1 - i]
                else this.cube[i][r * this.size + j] = temp[this.size - 1 - j][i]
            }
        }
    }

    get(){
        return this.cube
    }

    flatten(){
        return this.cube.flat()
    }
}


export {Cube}