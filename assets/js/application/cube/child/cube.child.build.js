import * as THREE from '../../../lib/three.module.js'
import METHOD from './cube.child.method.js'
import {Cube} from './cube.child.class.js'

export default class{
    constructor({group}){
        this.init()
        this.create()
        this.add(group)
        this.createTween(METHOD.getRandomPosition({...this, ...this.param}))
    }


    // init
    init(){
        this.param = {
            size: 100,
            gap: 30,
            count: 3,
            color: 'white',
            opacity: 0.5,
            time: 600,
            delay: 300
        }

        this.position = []
        this.cube = new Cube(this.param.count)
        this.degree = 0
        this.play = false
    }


    // add
    add(group){
        group.add(this.local)
    }


    // create
    create(){
        this.local = new THREE.Group()

        this.position = METHOD.getCubePosition(this.param)

        this.position.forEach((e, i) => {
            const {x, y, z} = e

            const group = new THREE.Group() 
            const mesh = this.createMesh(i)

            group.index = i
            mesh.position.set(x, y, z) 

            group.add(mesh)
            this.local.add(group)
        })

    }
    createMesh(i){
        const geometry = this.createGeometry()
        const material = this.createMaterial(i)
        return new THREE.LineSegments(geometry, material)
    }
    createGeometry(){
        const object = new THREE.BoxGeometry(this.param.size, this.param.size, this.param.size)
        return new THREE.EdgesGeometry(object)
    }
    createMaterial(i){
        return new THREE.LineBasicMaterial({
            color: i === 0 || i === 9 || i === 18 ? 'red' : this.param.color,
            transparent: true,
            opacity: this.param.opacity
        })
    }


    // tween
    createTween({index, dir}){
        for(let i = 0; i < index.length; i++){
            const start = {degree: 0}
            const end = {degree: 90}

            const tween = new TWEEN.Tween(start)
            .to(end, this.param.time)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onStart(() => this.onStartTween())
            .onUpdate(() => this.onUpdateTween(index[i], dir, start))
            .onComplete(() => this.onCompleteTween(index[i], i))
            .delay(this.param.delay)
            .start()
        }
    }
    onStartTween(){
    }
    onUpdateTween(i, dir, {degree}){
        const group = this.local.children[i]
        
        if(dir === 0) group.rotation.x = degree * RADIAN
        else if(dir === 1) group.rotation.y = degree * RADIAN
        else group.rotation.z = degree * RADIAN
    }
    onCompleteTween(i, idx){
        // this.local.children[i].rotation.set(0, 0, 0)
        // console.log(i)
        if(idx === this.param.count ** 2 - 1){
            const flatten = this.cube.flatten()

            for(let j = 0; j < this.param.count ** 3; j++){
                const index = flatten[j]
                const group = this.local.children.find(e => e.index === index)
                const mesh = group.children[0]
                const {x, y, z} = this.position[j]

                group.rotation.set(0, 0, 0)
                mesh.position.set(x, y, z)
            }

            this.createTween(METHOD.getRandomPosition({...this, ...this.param}))
            // console.log(this.position)
            // console.log(flatten)
            // console.log(this.cube.get())
            // console.log(this.local.children.map(e => e.index))
            // console.log(this.local.children.map(e => ({x: e.rotation.x, y: e.rotation.y, z: e.rotation.z})))
            // console.log(this.local.children.map(e => e.children[0].position))
        }
        // this.play = true
    }


    // animate
    animate(){
        // if(!this.play) return
        // this.local.rotation.x += 0.005
        // this.local.rotation.y += 0.005
    }
}