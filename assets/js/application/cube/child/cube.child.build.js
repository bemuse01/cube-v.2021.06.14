import * as THREE from '../../../lib/three.module.js'
import METHOD from './cube.child.method.js'

THREE.Object3D.prototype.updateMatrix = function () {

    this.matrix.compose( this.position, this.quaternion, this.scale )

    var pivot = this.pivot

    if ( pivot != null ) {

      var px = pivot.x, py = pivot.y,  pz = pivot.z
      var te = this.matrix.elements

      te[ 12 ] += px - te[ 0 ] * px - te[ 4 ] * py - te[ 8 ] * pz
      te[ 13 ] += py - te[ 1 ] * px - te[ 5 ] * py - te[ 9 ] * pz
      te[ 14 ] += pz - te[ 2 ] * px - te[ 6 ] * py - te[ 10 ] * pz

    }

    this.matrixWorldNeedsUpdate = true

}

export default class{
    constructor({group}){
        this.init()
        this.create()
        this.add(group)
        this.createTween(METHOD.getRandomPosition(this.param))
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
        this.cube = []
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

        const position = METHOD.getCubePosition(this.param)
        this.index = [0, 3, 6, 9, 12, 15, 18, 21, 24]

        position.forEach((e, i) => {
            const {x, y, z} = e

            const mesh = this.createMesh()

            mesh.index = i
            mesh.position.set(x, y, z) 

            mesh.pivot = new THREE.Vector3(-x, -y, -z)
            // if(i < 9) mesh.rotation.x = 90 * RADIAN

            this.local.add(mesh)
        })

    }
    createMesh(){
        const geometry = this.createGeometry()
        const material = this.createMaterial()
        return new THREE.LineSegments(geometry, material)
    }
    createGeometry(){
        const object = new THREE.BoxGeometry(this.param.size, this.param.size, this.param.size)
        return new THREE.EdgesGeometry(object)
    }
    createMaterial(){
        return new THREE.LineBasicMaterial({
            color: this.param.color,
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
            .onUpdate(() => this.onUpdateTween(index[i], dir, start))
            .onComplete(() => this.onCompleteTween(index[i], i))
            .delay(this.param.delay)
            .start()
        }
    }
    onUpdateTween(i, dir, {degree}){
        if(dir === 0) this.local.children[i].rotation.y = degree * RADIAN
        else if(dir === 1) this.local.children[i].rotation.x = degree * RADIAN
        else this.local.children[i].rotation.z = degree * RADIAN
    }
    onCompleteTween(i, index){
        this.local.children[i].rotation.set(0, 0, 0)
        if(index === this.param.count ** 2 - 1){
            this.createTween(METHOD.getRandomPosition(this.param))
        }
        // this.play = true
    }


    // animate
    animate(){
        // if(!this.play) return
        // const mesh = this.local.children[0]
        // mesh.rotation.y += 0.01
        this.local.rotation.x += 0.005
        this.local.rotation.y += 0.005

        // this.local.children.forEach((e, i) => {
        //     if(i < this.param.count ** 2) e.rotation.y += 0.01
        // })

        // for(let i = 0; i < this.index.length; i++){
        //     const mesh = this.local.children[this.index[i]]
        //     mesh.rotation.x += 0.01
        // }
    }
}